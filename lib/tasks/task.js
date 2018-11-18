'use strict';

const Proxy = require('../proxy');
const clone = require('clone');

class Task {
  constructor(types /*=[typeProxyLess, typeProxy]*/, data, proxy, waitTime) {
    this.types = Array.isArray(types) ? types.slice() : [types];
    this.type  = this.types[0];
    this.data  = data  || null;
    this.proxy = proxy || null;
    this.waitTime = waitTime;
  }

  get type() {
    return this._type;
  }

  // set type(type) {
  //   this._type = type;
  // }

  get data() {
    return this._data;
  }

  // TODO: add mask
  set data(data) {
    this._data = clone(data);
    // if(typeof data === 'object') {
    //   this._data = {};
    //   Object.keys(data).forEach(key => {
    //     this._data[key] = data[key];
    //   });
    // }
    // if(!data) {
    //   this._data = null;
    // }
  }

  get proxy() {
    return this._proxy;
  }

  set proxy(proxy) {
    if (proxy) {
      this._proxy = new Proxy(proxy);

      // If we have typeProxy
      if(typeof this._types[1] !== 'undefined') {
        this._type = this._types[1];
      }
    }
    else {
      this._proxy = null;

      // Set typeProxyLess
      this._type = this._types[0];
    }
  }

  toJSON(data) {
    let res = {
      type: this.type
    };

    if(typeof data === 'undefined') {
      data = this.data || {};
    }

    Object.keys(data).forEach(key => {
      res[key] = data[key];
    });

    if(this.proxy) {
      if(this.proxy === true) {
        res.proxy = true;
      }
      else {
        Object.assign(res, this.proxy.toJSON(true));
      }
    }

    return res;
  }
}

module.exports = Task;
