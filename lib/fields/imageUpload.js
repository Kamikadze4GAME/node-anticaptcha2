'use strict';

const InputField = require('./field').InputField;

class ImageUploadField extends InputField {
  constructor(label, name) {
    super(label, 'imageUpload', name);
  }
}

module.exports = ImageUploadField;
