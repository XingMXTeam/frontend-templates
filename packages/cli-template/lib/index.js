'use strict';

module.exports = cliTemplate;

const { Command } = require('commander')

const pkg = require('../package.json')

const buildCommand = require('./command/build')

function cliTemplate() {
    const program = new Command()

    program
      .name(Object.keys(pkg.bin)[0])
      .usage('<command> [options]')
      .version(pkg.version)
      .option('-d, --debug', 'debug', 'false')

    program.on('option:debug', function() {
      if(program.debug) {
        process.env.LOG_LEVEL = 'verbose'
      }
      else {
        process.env.LOG_LEVEL = 'info'
      }
    })

    buildCommand(program)

    program.parse(process.argv)

    if(program.args && program.args.length === 0) {
      program.outputHelp()
    }

}
