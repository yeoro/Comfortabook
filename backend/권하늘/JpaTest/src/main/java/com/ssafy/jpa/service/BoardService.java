package com.ssafy.jpa.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ssafy.jpa.model.BoardEntity;
import com.ssafy.jpa.repo.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	
	
	private final BoardRepository boardRepository;
	
	public Optional<BoardEntity> getBoard(Long boardId) {
		return boardRepository.findById(boardId);
	}

}
