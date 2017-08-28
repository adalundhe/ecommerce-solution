const exec = cmd => require('child_process').execSync(cmd, {stdio: 'inherit'})

const isWin = /^win/.test(process.platform)

console.log('Launching mocha testing server...')

if (isWin) {
  exec('SET NODE_ENV=test && mocha --timeout 10000')
} else {
  exec('NODE_ENV=test && mocha --timeout 10000')
}
