/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.models.page;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.commons.WCMUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Source;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.Optional;

@Model(adaptables = Resource.class)
public class PageConfig {

	@Self
	private Resource resource;

	@Inject	@Named("jcr:title")
	private String title;

	// Inject a fields whose property name DOES match the model field name
	@Inject	@Optional
	private String pageTitle;

	// Mark as Optional
	@Inject	@Optional
	private String navTitle;

	// Provide a default value if the property name does not exist
	@Inject @Named("jcr:description") @Default(values = "")
	private String description;

	@Inject	@Source("sling-object")
	private ResourceResolver resourceResolver;

	private Page page;
	private String keywords = "";

	@PostConstruct
    protected void init() {
    	/*
    	 * @return tags in comma separated list associated with the page.
    	 */
    	page = resourceResolver.adaptTo(PageManager.class).getContainingPage(resource);
    	keywords = WCMUtils.getKeywords(page);
    }

	/**
	 * @return The Page Title if exists, with fallback to the jcr:title
	 */
	public String getTitle() {
		return StringUtils.defaultIfEmpty(pageTitle, title);
	}

	/**
	 * @return the description.
	 */
	public String getDescription() {
		return this.description;
	}

	/**
	 * @return the keywords.
	 */
	public String getKeywords() {
		return this.keywords;
	}
}
