'use strict';

const InputField = require('./field').InputField;

class CheckboxField extends InputField {
  constructor(label, name, text) {
    super(label, 'checkbox', name, { label: text });
  }
}

module.exports = CheckboxField;
