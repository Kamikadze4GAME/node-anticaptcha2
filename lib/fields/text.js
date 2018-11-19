'use strict';

const ContentField = require('./field').ContentField;

class TextField extends ContentField {
  constructor(label, text) {
    super(label, 'text', text);
  }
}

module.exports = TextField;
