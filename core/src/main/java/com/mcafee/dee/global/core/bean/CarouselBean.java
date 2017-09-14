/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.bean;

/**
 * This class will set/get value of touch ui demo multifield.
 */
public final class CarouselBean {

	private String backgroundImage;

	private String overlayImage;

	private String overlayImageAlt;
	
	private String heading;
	
	private String headingSize;
	
	private String headingColor;
	
	private String subHeading;
	
	private String subHeadingSize;
	
	private String subHeadingColor;
	
	private String buttonText;
	
	private String buttonURL;
	
	private String buttonColor;
	
	private String target;

	/**
	 * Returns the background image to apply 
	 * on the carousel item.
	 *
	 * @return the backgroundImage
	 */
	public String getBackgroundImage() {
		return backgroundImage;
	}

	/**
	 * Sets the backgroundImage
	 *
	 * @param backgroundImage
	 */
	public void setBackgroundImage(String backgroundImage) {
		this.backgroundImage = backgroundImage;
	}

	/**
	 * Returns the overlay image to put on 
	 * top of carousel item.
	 *
	 * @return the overlayImage
	 */
	public String getOverlayImage() {
		return overlayImage;
	}

	/**
	 * Sets the overlayImage for the carousel item.
	 *
	 * @param overlayImage 
	 */
	public void setOverlayImage(String overlayImage) {
		this.overlayImage = overlayImage;
	}

	/**
	 * Returns the overlay image alt to put 
	 * for overlay image.
	 *
	 * @return the overlayImageAlt
	 */
	public String getOverlayImageAlt() {
		return overlayImageAlt;
	}

	/**
	 * Sets the overlayImageAlt.
	 *
	 * @param overlayImageAlt
	 */
	public void setOverlayImageAlt(String overlayImageAlt) {
		this.overlayImageAlt = overlayImageAlt;
	}
	
	/**
	 * Returns the heading to put on top 
	 * of carousel item.
	 *
	 * @return the heading
	 */
	public String getHeading() {
		return heading;
	}

	/**
	 * Sets the heading.
	 *
	 * @param heading
	 */
	public void setHeading(String heading) {
		this.heading = heading;
	}
	
	/**
	 * Returns the heading size to set for 
	 * heading appearing on top of carousel item
	 *
	 * @return the headingSize
	 */
	public String getHeadingSize() {
		return headingSize;
	}

	/**
	 * Sets the headingSize.
	 *
	 * @param headingSize
	 */
	public void setHeadingSize(String headingSize) {
		this.headingSize = headingSize;
	}
	
	/**
	 * Returns the heading color to set for 
	 * heading appearing on top of carousel item
	 *
	 * @return the headingColor
	 */
	public String getHeadingColor() {
		return headingColor;
	}

	/**
	 * Sets the headingColor.
	 *
	 * @param headingColor
	 */
	public void setHeadingColor(String headingColor) {
		this.headingColor = headingColor;
	}
	
	/**
	 * Returns the sub heading to put on top 
	 * of carousel item.
	 *
	 * @return the subHeading
	 */
	public String getSubHeading() {
		return subHeading;
	}

	/**
	 * Sets the subHeading.
	 *
	 * @param subHeading
	 */
	public void setSubHeading(String subHeading) {
		this.subHeading = subHeading;
	}
	
	/**
	 * Returns the sub heading size to set for 
	 * heading appearing on top of carousel item
	 *
	 * @return the subHeadingSize
	 */
	public String getSubHeadingSize() {
		return subHeadingSize;
	}

	/**
	 * Sets the subHeadingSize.
	 *
	 * @param subHeadingSize
	 */
	public void setSubHeadingSize(String subHeadingSize) {
		this.subHeadingSize = subHeadingSize;
	}
	
	/**
	 * Returns the sub heading color to set for 
	 * heading appearing on top of carousel item
	 *
	 * @return the subHeadingColor
	 */
	public String getSubHeadingColor() {
		return subHeadingColor;
	}

	/**
	 * Sets the subHeadingColor.
	 *
	 * @param subHeadingColor
	 */
	public void setSubHeadingColor(String subHeadingColor) {
		this.subHeadingColor = subHeadingColor;
	}
	
	/**
	 * Returns the button text to put 
	 * on top of carousel item.
	 *
	 * @return the buttonText
	 */
	public String getButtonText() {
		return buttonText;
	}

	/**
	 * Sets the buttonText.
	 *
	 * @param buttonText
	 */
	public void setButtonText(String buttonText) {
		this.buttonText = buttonText;
	}
	
	/**
	 * Returns the button url to set for button
	 * appearing on top of carousel item
	 *
	 * @return the buttonURL
	 */
	public String getButtonURL() {
		return buttonURL;
	}

	/**
	 * Sets the buttonURL.
	 *
	 * @param buttonURL
	 */
	public void setButtonURL(String buttonURL) {
		this.buttonURL = buttonURL;
	}
	
	/**
	 * Returns the button color to set for button
	 * appearing on top of carousel item
	 *
	 * @return the buttonColor
	 */
	public String getButtonColor() {
		return buttonColor;
	}

	/**
	 * Sets the buttonColor.
	 *
	 * @param buttonColor
	 */
	public void setButtonColor(String buttonColor) {
		this.buttonColor = buttonColor;
	}
	
	/**
	 * @return Returns the target
	 */
	public String getTarget() {
		return target;
	}

	/**
	 * Sets the button target.
	 *
	 * @param target
	 */
	public void setTarget(String target) {
		this.target = target;
	}
}