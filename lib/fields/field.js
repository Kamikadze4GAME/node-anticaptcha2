'use strict';

class Field {
  constructor(label) {
    if(!Array.isArray(label)) {
      label = [label];
    }

    this._label = label;
  }

  toJSON() {
    let res = {
      label: this._label[0]
    };

    if(typeof this._label[1] !== 'undefined') {
      res.labelHint = this._label[1];
    }

    return res;
  }
}

class ContentField extends Field {
  constructor(label, type, content) {
    super(label);
    this._type = type;
    this._content = content;
  }

  toJSON() {
    return Object.assign(super.toJSON(), {
      contentType: this._type,
      content: this._content
    });
  }
}

class InputField extends Field {
  constructor(label, type, name, opts, value) {
    super(label);
    this._type = type;
    this._name = name;
    this._options = opts;
    this._value = value;
  }

  toJSON() {
    let opts = this._options;

    if(opts && !Array.isArray(opts)) {
      opts = Object.keys(opts || {}).reduce((acc, cur) => {
        if(typeof opts[cur] !== 'undefined') {
          acc[cur] = opts[cur];
        }
        return acc;
      }, {});
    }

    return Object.assign(super.toJSON(), {
      name: this._name,
      // TODO: add value
      value: this._value,
      inputType: this._type,
      inputOptions: opts
    });
  }
}

module.exports              = Field;
module.exports.Field        = Field
module.exports.ContentField = ContentField
module.exports.InputField   = InputField
