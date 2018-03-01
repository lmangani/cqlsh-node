const cassandra = require('cassandra-driver');
const logger = require('./logger');
const columnify = require('columnify')

var toColumns = function(data){
  return columnify(JSON.parse(JSON.stringify(data)), {
    columnSplitter: ' | '
  });
}

exports.db = function(program){

  var config = {};
  config.contactPoints = program.args || ['127.0.0.1:9042']
  if (program.keyspace) config.keyspace = program.keyspace;

  const client = new cassandra.Client(config);

  if (program.debug){
    client.on('log', function(level, className, message, furtherInfo) {
      logger('log event: %s -- %s', level, message);
    });
  }

  const query = program.execute || '';
  try {
  	client.execute(query)
  	  .then(function(result){
		logger(toColumns(result.rows));
 		logger("(%s Rows)", result.rows.length);
	  	process.exit();
	  });
  } catch(e) { console.log(e); }
}
