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
import org.apache.sling.models.annotations.injectorspecific.Self;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.apache.sling.commons.json.JSONTokener;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

import javax.jcr.Value;
import javax.jcr.PropertyIterator;
import javax.jcr.Property;
import javax.jcr.Node;

import com.mcafee.dee.global.core.bean.TouchUIDemoBean;

/**
 * This model class will divide page into multiple columns.
 */
@Model(adaptables = Resource.class)
public class MultiFieldDemoModel {

	private java.util.List<TouchUIDemoBean> multiValues;
	
	@Self
	private Resource resource;
	
	@PostConstruct
	protected void init() {
		try {
			Value[] values = new Value[]{};
			PropertyIterator propItr = resource.adaptTo(Node.class).getProperties("definitions");
			if (propItr.hasNext()) {
				Property prop = propItr.nextProperty();
				if (prop.isMultiple()) {
					values = prop.getValues();
				} else {
					values = (new Value[]{prop.getValue()});
				}
			}
			
			multiValues = new ArrayList<TouchUIDemoBean>();
			if (values != null) {
				populateModel(values);
			}
		}
		catch (Exception ex) {}
		
	}
	/**
     * Retrieves and populates the model values
     * 
     * @param values
     */
	public java.util.List<TouchUIDemoBean> populateModel(Value[] values){
		try {
			if (values != null) {
				for (Value value : values) {
					JSONObject jsonObj = new JSONObject(new JSONTokener(value.getString()));
					TouchUIDemoBean touchUIDemoBean = new TouchUIDemoBean();
					touchUIDemoBean.setText(jsonObj.getString("term"));
					touchUIDemoBean.setDescription(jsonObj.getString("definition"));
					touchUIDemoBean.setHref(jsonObj.getString("ctaLink")+".html");
					
					this.multiValues.add(touchUIDemoBean);
				}
			}
		}
		catch (Exception ex) {}
		return this.multiValues;
	}
	
	/**
	 * @return multifield values
	 */
	public List<TouchUIDemoBean> getMultiValues() {
		return multiValues;
	}
}
