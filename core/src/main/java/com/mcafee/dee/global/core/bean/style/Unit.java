/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.bean.style;

/**
 * This class will handle elements padding & margin unit in publication component.
 */
public enum Unit {
	PIXELS("px"),
	PERCENTILES("%"),
	EMS("em");

	private final String unitValue;

	Unit(String unitValue) {
		this.unitValue = unitValue;
	}

	String getValue() {
		return unitValue;
	}
}
