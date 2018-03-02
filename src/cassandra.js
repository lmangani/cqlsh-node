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
  config.contactPoints = ['127.0.0.1:9042']
  if (program.args.length>0) config.contactPoints = program.args;
  if (program.keyspace) config.keyspace = program.keyspace;
  if (program.username && program.password) {
    const authProvider = new cassandra.auth.PlainTextAuthProvider(program.username,program.password);
    config.authProvider = authProvider;
  }

  const client = new cassandra.Client(config);

  if (program.debug){
    client.on('log', function(level, className, message, furtherInfo) {
      logger('log event: %s:red -- %s:green', level, message);
    });
  }

  const query = program.execute || '';
  client.execute(query)
  	  .then(function(result){
		if(result.rows){
		  logger(toColumns(result.rows));
 		  logger("(%s Rows)", result.rows.length);
		}
		return client.shutdown();
	  })
	  .catch(function (err) {
		logger('%s:red',err)
		return client.shutdown();
	  });
}
