'use strict';

const Fields = require('./fields');
const Field = Fields.Field;

class Form {
  // TODO: add check fields name
  constructor(opts = {/*checkname:false*/}) {
    this._opts = opts;

    this._lastId = 0;
    this._fieldsOrder = [];
    this._fields = {};
  }

  add(field) {
    let id;
    if(!(field instanceof Field)) {
      throw new Error('Argument is not instance of Field class');
    }
    id = this._lastId++;
    this._fields[id] = field;
    this._fieldsOrder.push(id);
    return id;
  }

  remove(id) {
    if(this._fields[id] && this._fieldsOrder.indexOf(id) !== -1) {
      this._fieldsOrder.splice(this._fieldsOrder.indexOf(id), 1);
      delete this._fields[id];
      return true;
    }
    return false;
  }

  toJSON() {
    return this._fieldsOrder.map(id => this._fields[id].toJSON());
  }

}

Object.keys(Fields).forEach(field => {
  Form[field] = Fields[field];
});

module.exports = Form;
