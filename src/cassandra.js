const cassandra = require('cassandra-driver');
const logger = require('./logger');
const columnify = require('columnify')
const vorpal = require('vorpal')()

var toColumns = function(data){
  return columnify(JSON.parse(JSON.stringify(data)), {
    columnSplitter: ' | '
  });
}

const doQuery = function(client,query,keep){
  client.execute(query)
          .then(function(result){
                if(result.rows){
                  logger(toColumns(result.rows));
                  logger("(%s Rows)", result.rows.length);
                }
                if(!keep) return client.shutdown();
		else keep();
          })
          .catch(function (err) {
                logger('%s:red',err)
                if(!keep) return client.shutdown();
		else keep();
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

  if(program.execute){
    const query = program.execute || '';
    doQuery(client,query);

  } else {

    logger('Connected to %s:blue',client.options.contactPoints);

    vorpal
      .delimiter('')
      .catch('[query...]', 'CQL Shell')
      .action(function (args, cb) {
        doQuery(client,args.query.join(' '), cb );
    });
    vorpal
      .delimiter('cqlsh> ')
      .show();
  }

}
