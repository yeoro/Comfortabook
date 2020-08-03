package com.ssafy.jpa.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.jpa.model.BoardEntity;

public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

}
