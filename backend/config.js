const pg = require('pg');

const   connection = {
		host	: 'moonwalk-1.postgres.database.azure.com',
		user: process.env.USER,
		password: process.env.PASS,
		database: 'postgres',
		port: 5432,
		ssl: true
};


const client = new pg.Client(connection);

client.connect(function(err){
	if(!err) {
		    console.log("Database is connected");
	} else {
		    console.log("Error while connecting with database");
	}
});
module.exports = client;
