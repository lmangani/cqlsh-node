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
  .option('-e, --execute <string>', 'Execute the statement and quit', String)
  .option('-u, --username <string>', 'Authenticate as user', String)
  .option('-p, --password <string>', 'Authenticate using password', String)
  .option('-k, --keyspace <string>', 'Authenticate to the given keyspace', String)
  .option('-q, --cqlversion <string>', 'Specify a particular CQL version', String)
  .option('-c, --configfile <configfile>', 'configuration file', String)
  .parse(process.argv)

cassandra.db(program);
