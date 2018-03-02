# cqlsh-node
Minimal CQLSH emulator for Nodejs. Only supports basic functionality.

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
