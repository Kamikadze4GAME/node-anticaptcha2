'use strict';

const FormBuilder = require('./formBuilder');

let form = new FormBuilder();

form.add(new FormBuilder.TextField('labelBig', 'TEXR'));
form.add(new FormBuilder.TextField(['labelBig', 'labelSmall'], 'TEXR'));

form.add(new FormBuilder.LinkField(['LinkFieldLabel', 'LinkFieldLabelSmall'], 'http://google.com', 'Text of link'));

form.add(new FormBuilder.ImageField(['ImageLabel', 'small'], 'https://www.w3schools.com/w3css/img_lights.jpg'));

form.add(new FormBuilder.TextboxField(['TextboxField', 'TextboxFieldSmall'], 'nameofTextbox'));
form.add(new FormBuilder.TextboxField(['TextboxField', 'TextboxFieldSmall'], 'nameofTextbox', {
  placeholder: 'PLACEHOLDER',
  width: 25
}));

form.add(new FormBuilder.TextareaField('TextareaField', 'nameofTextareaField' ));
let b = form.add(new FormBuilder.TextareaField('TextareaField', 'nameofTextareaField', {
  placeholder: 'PLACEHOLDER',
  width: 25,
  rows: 1
}));

form.add(new FormBuilder.CheckboxField(['CheckboxField', 'CheckboxFieldSMALL'], 'nameofTextareaField', 'wesxdrc jnkm'));

form.add(new FormBuilder.SelectField(['SelectField', 'CheckboxFieldSMALL'], 'nameofSelect', {key: 'value', key2: 'value2'}));

form.add(new FormBuilder.RadioField(['RadioField', 'RadioFieldSMALL'], 'nameofRadioField'));
form.add(new FormBuilder.RadioField(['RadioField', 'RadioFieldSMALL'], 'nameofRadioField', {key: 'value', key2: 'value2'}));

form.add(new FormBuilder.ImageUploadField(['ImageUploadField'], 'nameofImageUploadField'));
form.add(new FormBuilder.ImageUploadField(['ImageUploadField', 'ImageUploadField'], 'nameofImageUploadField'));


console.log(b);

console.dir(form.toJSON(), {depth:null});

let c = form.remove(b);

console.log(c);
console.log(form.toJSON());
