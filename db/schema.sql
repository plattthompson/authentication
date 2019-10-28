DROP DATABASE IF EXISTS authentication_db;
CREATE database authentication_db;

USE authentication_db;

CREATE TABLE 'Users' (
	'id' varchar(15) NOT NULL AUTO_INCREMENT,
	'username' varchar(15) NOT NULL,
	'password' varchar(15) NOT NULL
)