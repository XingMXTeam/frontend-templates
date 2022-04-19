module.exports = command

const { exec } = require('child_process')

function build({ add }) {
  if(add) {
    exec('xxx', (error, stdout, stderr) => {
      if (error) {
        console.error(`git add error: ${error}`);
        return;
      }
    });
  }
}

function command(program) {
  program
    .command('build')
    .option('--add', 'comment', true)
    .action(build)
}
