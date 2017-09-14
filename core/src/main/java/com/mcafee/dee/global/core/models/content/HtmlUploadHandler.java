/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.models.content;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import com.day.cq.wcm.foundation.Download;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.sling.api.resource.Resource;


import org.apache.commons.io.IOUtils;
import java.io.IOException;
import java.io.InputStream;

import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.injectorspecific.Self;


@Model(adaptables = Resource.class)
public class HtmlUploadHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(HtmlUploadHandler.class);
	
	@Inject @Named("source") @Default(values = "")
	private String source;
	
	@Self
	private Resource resource;

	@PostConstruct
    protected void init() throws IOException {
		try {
			getUploadedContents();
		} catch (IOException ioe) {
			logger.error("IO Exception reading uploaded file's in init.", ioe);
		} catch (Exception e) {
			logger.error("Unable to read file's content in init", e);
		}
    }
  
	/**
	 * Returns the HTML source of the component.
	 *
	 * @return
	 */
	public String getSource() {
		return this.source;
	}

	/**
	 * Get the source from the HTML file uploaded through the component.
	 *
	 * @throws IOException
	 */
	private void getUploadedContents() throws IOException {

		Download uploadedFile = new Download(this.resource);
		InputStream inputStream = null;

		// check if the uploaded file has content.
		if (uploadedFile.hasContent()) {
			try {
				inputStream = uploadedFile.getData().getBinary().getStream();

				if (null != inputStream) {
					// read the stream as String.
					this.source = IOUtils.toString(inputStream, "UTF-8");
				}
			} catch (IOException ioe) {
				this.logger.error("IO Exception reading uploaded file's content.", ioe);
			} catch (Exception e) {
				this.logger.error("Unable to read file's content", e);
			} finally {
				try {
					if (null != inputStream) {
						inputStream.close();
					}
				} catch (IOException ioException) {
					this.logger.error("Error closing Input Stream.", ioException);
				}
			}
		}
	}
}
