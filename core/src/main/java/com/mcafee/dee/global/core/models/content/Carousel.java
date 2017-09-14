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

import com.mcafee.dee.global.core.bean.CarouselBean;

/**
 * This model class will iterate carousel data and put in setter/getter.
 */
@Model(adaptables = Resource.class)
public class Carousel {

	private java.util.List<CarouselBean> carouselFieldValues;
	 
	@Inject @Named("carousel") @Optional
	private Resource carouselResource;
 
	@PostConstruct
	protected void init() {
		carouselFieldValues = new ArrayList<CarouselBean>();
		if (carouselResource != null) {
			populateModel(carouselResource);
		}
	}
	public java.util.List<CarouselBean> populateModel(Resource resource) {
		if (resource != null) {
			Iterator<Resource> carouselResources = resource.listChildren();
			while (carouselResources.hasNext()) {
				ValueMap valueMap = carouselResources.next().adaptTo(ValueMap.class);
				if (valueMap != null) {
					CarouselBean carouselBean = new CarouselBean();
					carouselBean.setBackgroundImage(valueMap.get("backgroundImageRef", String.class));
					carouselBean.setOverlayImage(valueMap.get("overlayImage", String.class));
					carouselBean.setOverlayImageAlt(valueMap.get("overlayImageAlt", String.class));
					carouselBean.setHeading(valueMap.get("heading", String.class));
					carouselBean.setHeadingSize(valueMap.get("headingSize", String.class));
					carouselBean.setHeadingColor(valueMap.get("headingColor", String.class));
					carouselBean.setSubHeading(valueMap.get("subHeading", String.class));
					carouselBean.setSubHeadingSize(valueMap.get("subHeadingSize", String.class));
					carouselBean.setSubHeadingColor(valueMap.get("subHeadingColor", String.class));
					carouselBean.setButtonText(valueMap.get("buttonText", String.class));
					carouselBean.setButtonURL(valueMap.get("buttonColor", String.class));
					carouselBean.setButtonColor(valueMap.get("buttonURL", String.class));
					carouselBean.setTarget(valueMap.get("target", String.class));
					
					this.carouselFieldValues.add(carouselBean);
				}
			}
		}
		return carouselFieldValues;
	}
 
	
	/**
	 * @return multifield values
	 */
	public List<CarouselBean> getCarouselFieldValues() {
		return carouselFieldValues;
	}
}
