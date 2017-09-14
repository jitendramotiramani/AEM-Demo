
/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.models.content;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import com.mcafee.dee.global.core.bean.Link;
import com.mcafee.dee.global.core.utils.LinkUtil;

/**
 * This model class will divide page into multiple columns.
 */
@Model(adaptables = Resource.class)
public class TopNavigationModel {

	private List<Link> topNavValues;

	@Inject
	@Named("navigationtype")
	@Optional
	private String navigationType;
	
	@Inject @Named("pathfield") @Optional
	private String pathfield;
	
	@Inject
	@Named("navigation")
	@Optional
	private Resource linksResource;
	
	@Inject
	@Named("pathfield")
	@Optional
	private Resource linksResourceCustom;

	@PostConstruct
	protected void init() {
		topNavValues = new ArrayList<Link>();
		
		if(navigationType != null && navigationType.equalsIgnoreCase("static")) {
			if (linksResource != null) {
				populateModel(linksResource);
			}
		}else {
			populateCustom(pathfield);
		}
		
	}

	private void populateCustom(String pathfield) {
		ResourceResolver resolver = linksResourceCustom.getResourceResolver();
		Resource path = resolver.getResource(pathfield);
		Node node = path.adaptTo(Node.class);

		try {
			NodeIterator nodes = node.getNodes();

			while (nodes.hasNext()) {
				Node childNode = nodes.nextNode();
				NodeIterator childNodeItr = childNode.getNodes();

				while (childNodeItr.hasNext()) {
					Node child = childNodeItr.nextNode();
					if (child.getName().equals("jcr:content") &&
							child.hasProperty("jcr:title")) {
							Link link = new Link();
							link.setHref(LinkUtil.getHref(child.getPath().replace("/jcr:content","")));
							link.setText(child.getProperty("jcr:title").getString());
							link.setTarget("");
							this.topNavValues.add(link);
					}
				}
			}
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	public List<Link> populateModel(Resource resource) {
		if (resource != null) {
			Iterator<Resource> linkResources = resource.listChildren();
			
			while (linkResources.hasNext()) {
				ValueMap valueMap = linkResources.next().adaptTo(ValueMap.class);
				if (valueMap != null) {
					Link link = new Link();
					link.setHref(LinkUtil.getHref(valueMap.get("linkpath", String.class)));
					link.setText(valueMap.get("linkname", String.class));
					link.setTarget(valueMap.get("opennewwindow", String.class));
					this.topNavValues.add(link);
				}
			}

		}
		return topNavValues;
	}

	public List<Link> getTopNavValues() {
		return topNavValues;
	}
}
