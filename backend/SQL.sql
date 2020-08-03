-- gucci.book definition
CREATE TABLE `book` (
  `book_no` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'book_no',
  `isbn` varchar(255) DEFAULT NULL COMMENT 'isbn',
  `title` varchar(255) DEFAULT NULL COMMENT 'title',
  `CategoryName` varchar(255) DEFAULT NULL COMMENT 'CategoryName',
  `author` varchar(255) DEFAULT NULL COMMENT 'author',
  `publisher` varchar(255) DEFAULT NULL COMMENT 'publisher',
  `pubdate` date DEFAULT NULL COMMENT 'pubdate',
  `description` varchar(255) DEFAULT NULL COMMENT 'description',
  `cover` varchar(255) DEFAULT NULL COMMENT 'cover',
  `member_no` bigint(20) DEFAULT NULL COMMENT 'member_no',
  PRIMARY KEY (`book_no`),
  KEY `FK_Book_member_no_Member_member_no` (`member_no`),
  CONSTRAINT `FK_Book_member_no_Member_member_no` FOREIGN KEY (`member_no`) REFERENCES `member` (`member_no`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

insert into book(isbn, title) values('123', 'Java');
insert into book(isbn, title) values('456', 'Spring');
select * from book;


-- gucci.`member` definition
CREATE TABLE `member` (
  `member_no` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'member_no',
  `email` varchar(255) DEFAULT NULL COMMENT 'email',
  `password` varchar(255) DEFAULT NULL COMMENT 'password',
  `name` varchar(255) DEFAULT NULL COMMENT 'name',
  `phone_number` varchar(255) DEFAULT NULL COMMENT 'phone_number',
  `access_token` varchar(255) DEFAULT NULL COMMENT 'access_token',
  `oauth_id` varchar(255) DEFAULT NULL COMMENT 'oauth_id',
  `provider_name` varchar(255) DEFAULT NULL COMMENT 'provider_name',
  `role` varchar(255) DEFAULT NULL COMMENT 'role',
  PRIMARY KEY (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

insert into member(email, password, name, `role`) values('admin', 'admin', 'admin', 'admin');
insert into member(email, password, name) values('test', 'test', 'test');
select * from member;