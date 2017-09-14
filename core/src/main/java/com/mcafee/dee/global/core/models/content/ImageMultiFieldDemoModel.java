/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.models.content;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import javax.inject.Named;
import org.apache.sling.models.annotations.injectorspecific.Self;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.commons.json.JSONTokener;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

import com.mcafee.dee.global.core.bean.ImageMultiFieldBean;

/**
 * This model class will divide page into multiple columns.
 */
@Model(adaptables = Resource.class)
public class ImageMultiFieldDemoModel {

	private java.util.List<ImageMultiFieldBean> imageFieldValues;
	 
	@Inject @Named("products") @Optional
	private Resource linksResource;
 
	@PostConstruct
	protected void init() {
		imageFieldValues = new ArrayList<ImageMultiFieldBean>();
		if (linksResource != null) {
			populateModel(linksResource);
		}
	}
	public java.util.List<ImageMultiFieldBean> populateModel(Resource resource) {
		if (resource != null) {
			Iterator<Resource> linkResources = resource.listChildren();
			while (linkResources.hasNext()) {
				ValueMap valueMap = linkResources.next().adaptTo(ValueMap.class);
				if (valueMap != null) {
					ImageMultiFieldBean imageBean = new ImageMultiFieldBean();
					imageBean.setLanguage(valueMap.get("language", String.class));
					imageBean.setProductImageName(valueMap.get("productImageName", String.class));
					imageBean.setProductImageRef(valueMap.get("productImageRef", String.class));
					imageBean.setProductName(valueMap.get("productName", String.class));
					imageBean.setShow(valueMap.get("show", String.class));
					
					this.imageFieldValues.add(imageBean);
				}
			}
		}
		return imageFieldValues;
	}
 
	
	/**
	 * @return multifield values
	 */
	public List<ImageMultiFieldBean> getImageFieldValues() {
		return imageFieldValues;
	}
}
