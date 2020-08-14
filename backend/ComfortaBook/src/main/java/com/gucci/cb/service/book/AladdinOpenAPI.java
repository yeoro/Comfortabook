package com.gucci.cb.service.book;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class AladdinOpenAPI {
	private static final String BASE_URL = "http://www.aladdin.co.kr/ttb/api/ItemList.aspx?";

	public static String GetUrl() throws Exception {
		Map<String,String> hm = new HashMap<String,String>();
		hm.put("ttbkey", "ttbee2e1738001");
		hm.put("QueryType", "BestSeller");
		hm.put("MaxResults", "6");
		hm.put("start", "1");
		hm.put("SearchTarget", "Book");
		hm.put("output", "xml");
		hm.put("Version", "20131101");

		StringBuffer sb = new StringBuffer();
		Iterator<String> iter = hm.keySet().iterator();
		while (iter.hasNext()) {
			String key = iter.next();
			String val  = hm.get(key);
			sb.append(key).append("=").append(val).append("&");
		}

		return BASE_URL + sb.toString();
	}
}
