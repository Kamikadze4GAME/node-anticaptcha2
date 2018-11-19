'use strict';

const ContentField = require('./field').ContentField;

class LinkField extends ContentField {
  constructor(label, url, text) {
    super(label, 'link', {url, text});
  }
}

module.exports = LinkField;
