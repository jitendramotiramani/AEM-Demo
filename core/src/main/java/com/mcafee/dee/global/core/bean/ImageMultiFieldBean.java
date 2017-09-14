/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.bean;

/**
 * This class will set/get value of touch ui demo multifield.
 */
public final class ImageMultiFieldBean {

	private String language;

	private String productImageName;

	private String productImageRef;
	
	private String productName;
	
	private String show;

	/**
	 * Returns the language.
	 *
	 * @return the language
	 */
	public String getLanguage() {
		return language;
	}

	/**
	 * Sets the language
	 *
	 * @param language The source
	 */
	public void setLanguage(String language) {
		this.language = language;
	}

	/**
	 * @return Returns the productImageName
	 */
	public String getProductImageName() {
		return productImageName;
	}

	/**
	 * Sets the productImageName for the link.
	 *
	 * @param productImageName 
	 */
	public void setProductImageName(String productImageName) {
		this.productImageName = productImageName;
	}

	/**
	 * @return Returns the productImageRef
	 */
	public String getProductImageRef() {
		return productImageRef;
	}

	/**
	 * Sets the productImageRef.
	 *
	 * @param productImageRef
	 */
	public void setProductImageRef(String productImageRef) {
		this.productImageRef = productImageRef;
	}
	
	/**
	 * @return Returns the productName
	 */
	public String getProductName() {
		return productName;
	}

	/**
	 * Sets the productName.
	 *
	 * @param productName
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	/**
	 * @return Returns the show
	 */
	public String getShow() {
		return show;
	}

	/**
	 * Sets the show.
	 *
	 * @param show
	 */
	public void setShow(String show) {
		this.show = show;
	}
}
