'use strict';

const Anticaptcha = require('..');
const Proxy = Anticaptcha.Proxy;
const Form = Anticaptcha.Form;


let proxy = new Proxy({
  type: 'http',
  address: '31.202.121.62',
  port: '36156',
  agent: 'XUI'
});

let a = new Anticaptcha('c4fbd67246c4b57dc89c2c3187ae2e71');

let task = new Anticaptcha.NoCaptchaTask({url:'https://www.boards.ie/', sitekey: '6LfBixYUAAAAABhdHynFUIMA_sa4s-XsJvnjtgB0'});
//
// a.getTaskResult(123518664, {
//   extended: true,
//   wait: true
// })
// // a.createTask(task)
// .then(_ => {
//   console.log('res', _);
// })
// .catch(err => {
//   console.log(err);
// })


let form = new Form();

// form.add(new Form.TextField('Label of the field', 'Some text...'));
// form.add(new Form.TextareaField(['Enter some text', 'For example your story'], 'nameOfArea', {
//     placeholder: 'Placeholder for texarea'
// }));
// form.add(new Form.SelectField('Select HEX', 'nameOfSelect', {
//     red: '#F00',
//     black: '#000',
//     white: '#FFF'
// }));

form.add(new Form.TextareaField('Describe car', 'desc', {
    // placeholder: 'Placeholder for texarea'
}));
form.add(new Form.SelectField('Select color', 'color', {
    red: 'red',
    black: 'black',
    white: 'white'
}));
form.add(new Form.CheckboxField('Is it car?', 'isCar', {
    text: 'Yes',
    value: 'yes'
}));
form.add(new Form.CheckboxField('Is it car?', 'isCar2', {
    text: 'Yes'
}));

form.add(new Form.CheckboxField('Is it bus?', 'isBus', {
    text: 'Yes',
    value: 'no'
}));

form.add(new Form.TextboxField('Do not touch it', 'text', {
    placeholder: 'DO NOT TOUCH'
}));

// console.dir(form.toJSON(), {depth:null});

// form.add(new Form.CheckboxField('Is it ?', 'isBus', {
//     text: 'Yes',
//     value: 'yes'
// }));


/*
[ { label: 'Describe car',
    name: 'desc',
    value: undefined,
    inputType: 'textarea',
    inputOptions: {} },
  { label: 'Select color',
    name: 'color',
    value: undefined,
    inputType: 'select',
    inputOptions:
     [ { value: 'red', caption: 'red' },
       { value: 'black', caption: 'black' },
       { value: 'white', caption: 'white' } ] },
  { label: 'Is it car?',
    name: 'isCar',
    value: 'yes',
    inputType: 'checkbox',
    inputOptions: { label: 'Yes' } },
  { label: 'Is it car?',
    name: 'isCar2',
    value: undefined,
    inputType: 'checkbox',
    inputOptions: { label: 'Yes' } },
  { label: 'Is it bus?',
    name: 'isBus',
    value: 'no',
    inputType: 'checkbox',
    inputOptions: { label: 'Yes' } },
  { label: 'Do not touch it',
    name: 'text',
    value: 'DO NOT TOUCH PLEASE',
    inputType: 'text',
    inputOptions: { placeHolder: 'DO NOT TOUCH' } } ]
 */

let task2 = new Anticaptcha.CustomCaptchaTask({url:'https://www.drivespark.com/car-image/640x480x100/car/300x225x46701008-audi_a3_cabriolet.jpg.pagespeed.ic.drG8tpM8fT.jpg_', assignment: 'Select color of the car and upload any file', forms: [ { label: 'Describe car',
    name: 'desc',
    value: undefined,
    inputType: 'textarea',
    inputOptions: {} },
  { label: 'Select color',
    name: 'color',
    value: undefined,
    inputType: 'select',
    inputOptions:
     [ { value: 'red', caption: 'red' },
       { value: 'black', caption: 'black' },
       { value: 'white', caption: 'white' } ] },
  { label: 'Is it car?',
    name: 'isCar',
    value: 'yes',
    inputType: 'checkbox',
    inputOptions: { label: 'Yes' } },
  { label: 'Is it car?',
    name: 'isCar2',
    value: false,
    inputType: 'checkbox',
    inputOptions: { label: 'Yes' } },
  { label: 'Is it bus?',
    name: 'isBus',
    value: false,
    inputType: 'checkbox',
    inputOptions: { label: 'Yes' } } ]});



// 26433
a.getTaskResult(10524514, {
  extended: true,
  wait: true
})
// a.createTask(task2)
.then(_ => {
  console.log('res', _);
})
.catch(err => {
  console.log(err);
})
