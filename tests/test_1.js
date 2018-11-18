'use strict';

const Anticaptcha = require('..');

let a = new Anticaptcha('a33c8bc33086ecae2bc285fb9e8bdae3');

let b = a.getBalance()
// a.getTaskResult({taskId:7511931})
// a.getQueueStats({queueId:20})
// let taskId = 0;
// a.createTask({
//   task: {
//     type: 'NoCaptchaTaskProxyless',
//     websiteURL: 'https://www.boards.ie/b/',
//     websiteKey: '6LfBixYUAAAAABhdHynFUIMA_sa4s-XsJvnjtgB0',
//     // 7511931
//   }
// })
// .then(res => {
//   console.log(res);
//   taskId = res.taskId;
//   console.log('taskId', taskId);
//   return a.getTaskResult2(taskId);
// })
.then(_ => {
  console.log('res', _);
})
.catch(err => {
  console.log(err);
})
