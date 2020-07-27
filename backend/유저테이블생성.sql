-- create user table
CREATE TABLE gucci.`user` (
	`no` INT auto_increment NOT NULL,
	id varchar(20) NOT NULL,
	password varchar(20) NOT NULL,
	name varchar(10) NOT NULL,
	email varchar(50) NOT NULL,
	phone_number varchar(20) NULL,
	is_manager BOOL NULL,
	CONSTRAINT user_pk PRIMARY KEY (`no`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
