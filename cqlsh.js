/*
 * cqlsh node
 * (c) 2018 QXIP BV
 * See LICENSE for details
 */

//'use strict';

const program = require('commander');
const setConfig = require('./src/config').setConfig;
const cassandra = require('./src/cassandra');
const pkg = require('./package.json');

program
  .version(pkg.version)
  .usage('-e "SELECT ... limit 1" 127.0.0.1:9042')
  .option('-e, --execute <string>', 'Execute the statement and quit', String)
  .option('-k, --keyspace <string>', 'Authenticate to the given keyspace', String)
  .option('-u, --username <string>', 'Authenticate as user', String)
  .option('-p, --password <string>', 'Authenticate using password', String)
  .option('-c, --cqlversion <string>', 'Specify a particular CQL version', String)
  .option('-d, --debug <bool>', 'Debug Driver messages', Boolean)
  .parse(process.argv)

if (!program.execute) program.help();

cassandra.db(program);
