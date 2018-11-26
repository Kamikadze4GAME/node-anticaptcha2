'use strict';

const Anticaptcha = require('..');
const Proxy = Anticaptcha.Proxy;




let proxy = new Proxy({
  type: 'http',
  address: '31.202.121.62',
  port: '36156',
  agent: 'XUI'
});

let a = new Anticaptcha('c4fbd67246c4b57dc89c2c3187ae2e71');

let task = new Anticaptcha.NoCaptchaTask({url:'https://www.boards.ie/', sitekey: '6LfBixYUAAAAABhdHynFUIMA_sa4s-XsJvnjtgB0'}, proxy);

// a.getTaskResult(122284760, {extended: false, wait:true})
a.solve(task)
.then(_ => {
  console.log('res', _);
})
.catch(err => {
  console.log(err);
})
