/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.bean;

/**
 * This class will set/get value of touch ui demo multifield.
 */
public final class TouchUIDemoBean {

	private String href;

	private String text;

	private String description;

	/**
	 * Returns the link's source.
	 *
	 * @return the href
	 */
	public String getHref() {
		return href;
	}

	/**
	 * Sets the link's source
	 *
	 * @param href The source
	 */
	public void setHref(String href) {
		this.href = href;
	}

	/**
	 * @return Returns the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * Sets the text for the link.
	 *
	 * @param text Text
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * @return Returns the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets the description.
	 *
	 * @param description
	 */
	public void setDescription(String description) {
		this.description = description;
	}
}
