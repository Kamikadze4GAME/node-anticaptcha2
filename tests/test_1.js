'use strict';

const Anticaptcha = require('..');

let a = new Anticaptcha('a33c8bc33086ecae2bc285fb9e8bdae3');

let task = new Anticaptcha.NoCaptchaTask({url:'https://www.boards.ie/', sitekey: '6LfBixYUAAAAABhdHynFUIMA_sa4s-XsJvnjtgB0'});
// a.test({a:'wefbhjnk'})
// a.getBalance()
// a.getQueueStats(1)
// a.getTaskResult(70254143)

// let taskId = 0;
// a.createTask({
//   task: {
//     type: 'NoCaptchaTaskProxyless',
//     websiteURL: 'https://www.boards.ie/b/',
//     websiteKey: '6LfBixYUAAAAABhdHynFUIMA_sa4s-XsJvnjtgB0',
//     // 70254143
//   }
// })
// .then(res => {
//   console.log(res);
//   taskId = res.taskId;
//   console.log(new Date(), 'taskId', taskId);
//   return a.getTaskResult2(taskId);
// })
a.solve(task)
.then(_ => {
  console.log('res', _);
})
.catch(err => {
  console.log(err);
})
