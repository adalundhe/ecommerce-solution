const exec = cmd => require('child_process').execSync(cmd, {stdio: 'inherit'})

const isWin = /^win/.test(process.platform)

console.log('Launching nodemon server...')

if (isWin) {
  exec('SET NODE_ENV=dev && nodemon ./server.js')
} else {
  exec('NODE_ENV=dev && nodemon ./server.js')
}
