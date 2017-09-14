/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.models.content;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Default;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

/**
 * This model class will put background color or image for specific blade.
 */
@Model(adaptables = Resource.class)
public class BladeContainer {

	@Inject @Optional @Default(values = "")
	private String backgroundImage;

	@Inject @Optional @Default(values = "")
	private String backgroundColor;

	
	@PostConstruct
	protected void init() {
		if(!"".equals(backgroundImage.trim())){
			backgroundImage = "background-image: url('"+backgroundImage+"');background-size: cover;background-position: top center; background-repeat: no-repeat;";
	    }
		if(!"".equals(backgroundColor.trim())){
			backgroundColor = "background-color:" + backgroundColor+";";
	    } 
	}

	public String getBackgroundImage() {
		return this.backgroundImage;
	}

	public String getBackgroundColor() {
		return this.backgroundColor;
	}
}
