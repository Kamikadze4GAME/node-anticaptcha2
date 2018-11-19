'use strict';

const InputField = require('./field').InputField;

class RadioField extends InputField {
  constructor(label, name, keyvals = {}) {
    let opts = Object.keys(keyvals).map(key => ({ value: key, caption: keyvals[key] }) );

    super(label, 'radio', name, opts);
  }
}

module.exports = RadioField;
