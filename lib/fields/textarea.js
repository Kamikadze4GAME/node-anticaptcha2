'use strict';

const InputField = require('./field').InputField;

class TextareaField extends InputField {
  constructor(label, name, opts = {/*placeholder, width, rows*/}) {
    super(label, 'textarea', name, {
      placeHolder: opts.placeholder,
      width: opts.width,
      rows: opts.rows
    });
  }
}

module.exports = TextareaField;
