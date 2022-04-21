'use strict';

const path = require('path');
const fs = require('fs');

const files = fs.readdirSync(path.resolve(__dirname, 'utils'));
const modules = {};
files.forEach(file => {
  const fileInfo = path.parse(file);
  const name = fileInfo.name.replace(/-\S/g, s => s.slice(1).toUpperCase());
  modules[name] = require('./utils/' + file);
});

module.exports = modules;
