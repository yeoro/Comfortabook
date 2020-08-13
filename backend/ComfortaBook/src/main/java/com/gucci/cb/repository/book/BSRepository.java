package com.gucci.cb.repository.book;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.book.BestSeller;

public interface BSRepository extends JpaRepository<BestSeller, Long>{

}
