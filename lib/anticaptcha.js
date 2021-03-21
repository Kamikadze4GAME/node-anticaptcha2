'use strict';

const Promise = require('bluebird');
const rp = require('request-promise');

const Errors = require('./errors');
const Task = require('./tasks/task');
const Proxy = require('./proxy');
const WAIT_TIME = [5000, 2000]; // 5s, 2s


class Anticaptcha {
  constructor(opts) {
    this._key = opts.key;
    this._rp  = rp.defaults({ json: true });
    this.setProxy(opts.proxy);
    this._url = opts.url || "http://api.anti-captcha.com";
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

    if(typeof method !== 'string') {
      return Promise.reject(new TypeError('Method must be a string'))
    }

    if(method[0] !== '/') {
      method = '/' + method;
    }

    return this._rp({
      method: 'POST',
      url: this._url + method,
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
    return this.method('getBalance', {}, true)
      .then(res => {
        return res.balance;
      });
  }

  getQueueStats(queueId) {
    return this.method('getQueueStats', {queueId}, false);
  }

  reportIncorrectImageCaptcha(taskId) {
    return this.method('reportIncorrectImageCaptcha', {taskId}, true);
  }

  test(data) {
    return this.method('test', data, false);
  }

  createTask(task = {}, opts = {/*?softId, ?languagePool, ?callbackUrl*/}) {
    let data = { task: null };
    let taskId;

    return Promise.resolve()
    .then(_ => {
      if(task instanceof Task) {
        data.task = task.toJSON();
      }
      else {
        data.task = Object.assign({}, task);
      }

      // Set default proxy
      if(data.task.proxy === true) {
        if(!this.getProxy()) {
          throw new Error('No default proxy');
        }
        data.task.proxy = this.getProxy();
      }

      // Override alias proxy
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

      // Sending task
      return this.method('createTask', data, true);
    })
    .then(res => {
      if(typeof res.taskId === 'undefined') {
        let err = new Error('Unexpected response');
        err.response = res;
        throw err;
      }

      return res.taskId;
    })
    ;
  }

  getTaskResult(taskId, opts = {/*extended:false, wait: false, waitTime, _step = 0*/}) {
    let waitTime;

    // One time request
    if(!opts || !opts.wait) {
      return this.method('getTaskResult', { taskId, isExtended: true }, true)
        .then(res => {
          if(!opts.extended) {
            return res.solution;
          }
          return res;
        })
      ;
    }

    if(opts.timeout && typeof opts.timeout !== "number") {
      return Promise.reject(new TypeError('Timeout must be a number'));
    }

    waitTime = WAIT_TIME.slice();
    if(!Array.isArray(opts.waitTime)) {
      opts.waitTime = [opts.waitTime];
    }

    if(opts.waitTime[0]) {
      waitTime[0] = opts.waitTime[0];
    }

    if(opts.waitTime[1]) {
      waitTime[1] = opts.waitTime[1];
    }

    if(!opts._createTime) {
      opts._createTime = Date.now().valueOf();
    }

    return this.getTaskResult(taskId, { extended: true })
      .then(res => {
        if(!res) return res;

        if(opts.timeout) {
          let nowTimestamp = Date.now().valueOf();
          if(nowTimestamp - opts._createTime > opts.timeout) //check if we hit timeout
            throw Errors[1001] //Custom timeout error
        }


        if(res.status === 'processing') {
          return Promise.delay(waitTime[(opts._step === 1 ? 1 : 0)])
            .then(_ => {
              opts._step = 1;
              return this.getTaskResult(taskId, opts);
            })
          ;
        }

        // status === 'ready' or else
        if(!opts.extended) {
          return res.solution;
        }

        return res;
      });

  }


  solve(task = {}, opts = {/*?softId, ?languagePool, ?callbackUrl, extended: false*/}) {
    let taskId;

    return this.createTask(task, opts)
      .then(taskId => {
        return this.getTaskResult(taskId, {
          extended: opts.extended,
          wait: true,
          waitTime: opts.waitTime,
          timeout: opts.timeout
        });
      })
    ;
  }

}

module.exports = Anticaptcha;
