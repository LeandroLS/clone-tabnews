const { exec } = require('node:child_process')
function checkPostgres() {
  exec('docker exec postgres-dev pg_isready --host localhost', handleReturn)
  function handleReturn(error, stdout) {
    if (stdout.search('accepting connections') === -1) {
      console.log('Postgres not accepeting connections yet')
      process.stdout.write('.')
      checkPostgres()
      return
    }
    console.log('\nPostgres is accepting conections\n')
  }
}
process.stdout.write('\n\n Waiting for Postgres accept connections')
checkPostgres()