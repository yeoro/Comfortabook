-- 유저 테이블
CREATE TABLE `user` (
  `user_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `phone_number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- 유저 권한 테이블
CREATE TABLE `user_roles` (
  `user_user_no` bigint(20) NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FKtds36jyyrx2r80sdn0v72uk18` (`user_user_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 유저 보유 도서 테이블
CREATE TABLE `user_books` (
  `seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `book_no` bigint(20) NOT NULL,
  `user_no` bigint(20) NOT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK_user` (`user_no`),
  KEY `FK_book` (`book_no`),
  CONSTRAINT `FK_book` FOREIGN KEY (`book_no`) REFERENCES `book` (`book_no`),
  CONSTRAINT `FK_user` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- 도서 테이블
CREATE TABLE `book` (
  `book_no` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'book_no',
  `isbn` varchar(255) DEFAULT NULL COMMENT 'isbn',
  `title` varchar(255) DEFAULT NULL COMMENT 'title',
  `category_name` varchar(255) DEFAULT NULL COMMENT 'CategoryName',
  `author` varchar(255) DEFAULT NULL COMMENT 'author',
  `publisher` varchar(255) DEFAULT NULL COMMENT 'publisher',
  `pubdate` date DEFAULT NULL COMMENT 'pubdate',
  `description` longtext DEFAULT NULL COMMENT 'description',
  `cover` varchar(255) DEFAULT NULL COMMENT 'cover',
  PRIMARY KEY (`book_no`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- 도서 페이지네이션 테이블
CREATE TABLE `book_contents` (
  `seq` bigint(20) NOT NULL AUTO_INCREMENT,
  `book_no` bigint(20) NOT NULL,
  `content` longtext DEFAULT NULL,
  `page_no` varchar(255) NOT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK_book_no` (`book_no`),
  CONSTRAINT `FK_book_no` FOREIGN KEY (`book_no`) REFERENCES `book` (`book_no`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- 알라딘 베스트 셀러 테이블
CREATE TABLE `best_seller` (
  `best_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`best_no`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;