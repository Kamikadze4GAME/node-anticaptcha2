'use strict';

const ContentField = require('./field').ContentField;

class ImageField extends ContentField {
  constructor(label, url) {
    super(label, 'image', url);
  }
}

module.exports = ImageField;
