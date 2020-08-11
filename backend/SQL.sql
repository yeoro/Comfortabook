-- 도서 테이블
CREATE TABLE `book` (
  `book_no` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'book_no',
  `isbn` varchar(255) DEFAULT NULL COMMENT 'isbn',
  `title` varchar(255) DEFAULT NULL COMMENT 'title',
  `category_name` varchar(255) DEFAULT NULL COMMENT 'CategoryName',
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
select * from book;

-- 유저 테이블
CREATE TABLE `user` (
  `user_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `phone_numer` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
select * from user;

-- 유저 권한 테이블
CREATE TABLE `user_roles` (
  `user_user_no` bigint(20) NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FKtds36jyyrx2r80sdn0v72uk18` (`user_user_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
select * from user_roles;