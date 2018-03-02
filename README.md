<img width=150 src="https://user-images.githubusercontent.com/1423657/36921477-d3c68a5a-1e64-11e8-8301-9abac90cfc2f.png">

# cqlsh-node
##### Minimal [Cassandra](https://github.com/apache/cassandra) CQLSH for NodeJS
Provides `cqlshjs` command supporting basic CQLSH functionality

### Install
```
npm install -g cqlsh-node
```

#### Examples

##### Execute Shell
```
# cqlshjs
Connected to 127.0.0.1:9042.
cqlsh> CREATE KEYSPACE examples WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }
```

##### Execute Query
```
# cqlshjs -e "CREATE KEYSPACE examples WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }"
```

### Options

```
  Usage: cqlshjs -e "SELECT ... limit 1" 127.0.0.1:9042


  Options:

    -V, --version                  output the version number
    -e, --execute <string>         Execute the statement and quit
    -u, --username <string>        Authenticate as user
    -p, --password <string>        Authenticate using password
    -k, --keyspace <string>        Authenticate to the given keyspace
    -q, --cqlversion <string>      Specify a particular CQL version
    -h, --help                     output usage information
```
##### Acknowledgement

Apache Cassandra, CQL and Cassandra are trademarks of the Apache Software Foundation or its subsidiaries in Canada, the United States and/or other countries. 

###### This project is Sponsored by [QXIP BV](http://qxip.net)
