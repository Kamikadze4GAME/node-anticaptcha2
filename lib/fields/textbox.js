'use strict';

const InputField = require('./field').InputField;

class TextboxField extends InputField {
  constructor(label, name, opts = {/*placeholder, width*/}) {
    super(label, 'text', name, {
      placeHolder: opts.placeholder,
      width: opts.width
    });
  }
}

module.exports = TextboxField;
