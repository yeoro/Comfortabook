package com.gucci.cb.dto.book;

import lombok.Data;

@Data
public class BestSellerDTO {
	private Item[] items;
	
	@Data
	static class Item{
		public String title;
		public String author;
	}
}
