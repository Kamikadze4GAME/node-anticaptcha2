'use strict';

const InputField = require('./field').InputField;

class SelectField extends InputField {
  constructor(label, name, keyvals = {}) {
    let opts = Object.keys(keyvals).map(key => ({ value: key, caption: keyvals[key] }) );
    
    super(label, 'select', name, opts);
  }
}

module.exports = SelectField;
