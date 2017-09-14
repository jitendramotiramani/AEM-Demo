/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.models.content;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

/**
 * This model class will divide page into multiple columns.
 */
@Model(adaptables = Resource.class)
public class ColumnControl {

	@Inject @Optional
	private boolean enableGutters;

	@Inject @Optional
	private boolean enableMargin;

	@Inject @Optional
	private int[] columns;

	private List<String> classes;

	@PostConstruct
	protected void init() {
		if (null != columns && columns.length > 0) {
			classes = new ArrayList<String>();
			for (int i = 0; i < columns.length; i++) {
				classes.add("col-sm-" + columns[i] + " col-md-" + columns[i]);
			}
		}
	}

	public boolean isEnableGutters() {
		return this.enableGutters;
	}

	public boolean isEnableMargin() {
		return enableMargin;
	}

	public List<String> getClasses() {
		return this.classes;
	}
}
