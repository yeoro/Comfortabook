package com.gucci.cb.service.book;

import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
import org.xml.sax.helpers.ParserAdapter;


class Item{
	public String title = "";
	public String author = "";
	public String publisher = "";
	public String description = "";
	public String cover = "";
}

public class AladdinOpenAPIHandler extends DefaultHandler{
	
	public List<Item> Items;
	private Item currentItem;
	private boolean inItemElement = false;
	private String tempValue;

	public AladdinOpenAPIHandler( ){
		Items = new ArrayList<Item>();
	}

	public void startElement(String namespace, String localName, String qName, Attributes atts) {
		if (localName.equals("item")) {
			currentItem = new Item();
			inItemElement = true;
		} else if (localName.equals("title")) {
			tempValue = "";
		} else if (localName.equals("author")) {
			tempValue = "";
		} else if (localName.equals("publisher")) {
			tempValue = "";
		} else if (localName.equals("description")) {
			tempValue = "";
		} else if (localName.equals("cover")) {
			tempValue = "";
		}
	}
	
	public void characters(char[] ch, int start, int length) throws SAXException{
		tempValue = tempValue + new String(ch,start,length);
	}

	public void endElement(String namespaceURI, String localName,String qName) {
		if(inItemElement){
			if (localName.equals("item")) {
				Items.add(currentItem);
				currentItem = null;
				inItemElement = false;
			} else if (localName.equals("title")) {
				currentItem.title = tempValue;
			} else if (localName.equals("author")) {
				currentItem.author = tempValue;
			} else if (localName.equals("publisher")) {
				currentItem.publisher = tempValue;
			} else if (localName.equals("description")) {
				currentItem.description = tempValue;
			} else if (localName.equals("cover")) {
				currentItem.cover = tempValue;
			}
		}
	}

	public void parseXml(String xmlUrl) throws Exception {
            SAXParserFactory spf = SAXParserFactory.newInstance();
            SAXParser sp = spf.newSAXParser();
            ParserAdapter pa = new ParserAdapter(sp.getParser());
            pa.setContentHandler(this);
			pa.parse(xmlUrl);
	}
	
}


