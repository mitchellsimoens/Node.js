/*

This example uses table NodeSample.MyTable

CREATE TABLE `NodeSample`.`MyTable` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    `firstname` VARCHAR( 20 ) NOT NULL ,
    `lastname` VARCHAR( 20 ) NOT NULL ,
    `message` TEXT NOT NULL
) ENGINE = MYISAM ;

Don't forget to update username (line 21) and password (line 22) to connect to MYSQL

 */
require.paths.unshift(__dirname + '/node_modules'); //allow modules to be loaded from ./node_modules

var sys    = require('sys'),
    Client = require('mysql').Client,
    client = new Client();

client.user     = 'something';
client.password = 'something';

console.log('Connecting to MySQL...');

client.connect(function(error, results) {
  if(error) {
    console.log('Connection Error: ' + error.message);
    return;
  }
  console.log('Connected to MySQL');
  ClientConnectionReady(client);
});

ClientConnectionReady = function(client) {
    client.query('USE NodeSample', function(error, results) {
        if(error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }
        ClientReady(client);
    });
};

ClientReady = function(client) {
  var values = ['Chad', 'Lung', 'Hello World'];
  client.query('INSERT INTO MyTable SET firstname = ?, lastname = ? , message = ?', values,
    function(error, results) {
      if(error) {
        console.log("ClientReady Error: " + error.message);
        client.end();
        return;
      }
      console.log('Inserted: ' + results.affectedRows + ' row.');
      console.log('Id inserted: ' + results.insertId);
    }
  );
  GetData(client);
}

GetData = function(client) {
  client.query(
    'SELECT * FROM MyTable',
    function selectCb(error, results, fields) {
      if (error) {
          console.log('GetData Error: ' + error.message);
          client.end();
          return;
      }

      if(results.length > 0)
      {
        var firstResult = results[0];
        console.log('First Name: ' + firstResult['firstname']);
        console.log('Last Name: ' + firstResult['lastname']);
        console.log('Message: ' + firstResult['message']);
      }
  });

  client.end();
  console.log('Connection closed');
};
