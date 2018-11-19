'use strict';

const Promise = require('bluebird');
const rp = require('request-promise');

const Errors = require('./errors');
const Task = require('./tasks/task');
const Proxy = require('./proxy');

const API_URL = 'http://api.anti-captcha.com';
const WAIT_TIME = [5000, 2000]; // 5s, 2s


class Anticaptcha {
  constructor(key, proxy) {
    this._key   = key;
    this._proxy = new Proxy(proxy);
    this._rp    = rp.defaults({ json: true });
  }

  get key() { return this._key; }

  getProxy() {
    return this._proxy;
  }

  setProxy(proxy) {
    if(proxy) {
      this._proxy = new Proxy(proxy);
    }
    else {
      this._proxy = null;
    }
  }

  method(method, data = {}, isPrivate) {
    if (isPrivate) {
      data.clientKey = this.key;
    }

    return this._rp({
      method: 'POST',
      url: API_URL + method,
      body: data
    })
    .then(res => {
      let err;

      if (!res) return res;

      if (typeof res.errorId !== 'undefined' && res.errorId !== 0) {
        err = Errors[res.errorId];
        // No such error
        if(!err) {
          err = new Errors.ApiError(res.errorId, res.errorCode, res.errorDescription);
        }
        throw err;
      }

      delete res.errorId;
      return res;
    })
  }

  getBalance() {
    return this.method('/getBalance', {}, true)
      .then(res => {
        return res.balance;
      });
  }

  getQueueStats(queueId) {
    return this.method('/getQueueStats', {queueId}, false);
  }

  createTask(opts = {/*task:{}, ?softId, ?languagePool, ?callbackUrl*/}) {
    let data = {};

    return this.method('/createTask', opts/*data*/, true);
  }

  getTaskResult(taskId) {
    return this.method('/getTaskResult', {taskId, isExtended: true}, true);
  }

  reportIncorrectImageCaptcha(taskId) {
    return this.method('/reportIncorrectImageCaptcha', {taskId}, true);
  }

  test(data) {
    return this.method('/test', data, false);
  }

  getTaskResult2(taskId, opts = {/*waitTime, step = 0*/}) {
    let waitTime;

    if(!Array.isArray(opts.waitTime)) {
      opts.waitTime = [opts.waitTime, WAIT_TIME[1]];
      if(!opts.waitTime[0]) {
        opts.waitTime[0] = WAIT_TIME[0];
      }
    }
    waitTime = opts.waitTime || WAIT_TIME;

    return this.getTaskResult(taskId)
      .then(res => {
        if(!res) return res;
        if(res.status === 'processing') {
          return Promise.delay(waitTime[(opts.step === 0 ? 0 : 1)])
            .then(_ => {
              return this.getTaskResult2(taskId, { waitTime, step:1 });
            })
          ;
        }
        // status === 'ready' or else
        return res;
      })
    ;
  }

  solve(task, opts = {/*?softId, ?languagePool, ?callbackUrl*/}) {
    console.log('solving tesk', task);
    let data = { task: null };
    let taskId;

    return Promise.resolve()
      .then(_ => {
        if(!(task instanceof Task)) {
          throw new TypeError('Task must be instance of Task class.');
        }

        data.task = task.toJSON();

        if(data.task.proxy === true) {
          data.task.proxy = this.getProxy();
        }

        if(data.task.proxy) {
          Object.assign(data.task, data.task.proxy.toJSON());
          delete data.task.proxy;
        }

        // Extra params
        if(typeof opts.softId !== 'undefined') {
          data.softId = opts.softId;
        }
        if(typeof opts.languagePool !== 'undefined') {
          data.languagePool = opts.languagePool;
        }
        if(typeof opts.callbackUrl !== 'undefined') {
          data.callbackUrl = opts.callbackUrl;
        }
        console.log('data ', data);
        // Sending task
        return this.createTask(data)
      })
      .then(res => {
        console.log('createTask res', res);
        if(typeof res.taskId === 'undefined') {
          let err = new Error('Unexpected response');
          err.response = res;
          throw err;
        }

        taskId = res.taskId;

        return this.getTaskResult2(taskId, { waitTime: task.waitTime });
      })
    ;
  }

}

module.exports = Anticaptcha;
