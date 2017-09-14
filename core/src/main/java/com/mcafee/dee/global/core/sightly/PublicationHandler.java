/*
 *  Copyright 2017 McAfee, LLC
 *
 *  
 */
package com.mcafee.dee.global.core.sightly;

import com.day.cq.wcm.foundation.Download;
import com.day.text.Text;
import com.mcafee.dee.global.core.bean.Link;
import com.mcafee.dee.global.core.bean.style.Margin;
import com.mcafee.dee.global.core.bean.style.Padding;
import com.mcafee.dee.global.core.bean.style.Unit;
import com.mcafee.dee.global.core.constants.ApplicationConstants;
import com.mcafee.dee.global.core.utils.BumperUtil;
import com.mcafee.dee.global.core.utils.ImageUtil;
import com.mcafee.dee.global.core.utils.LinkUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public final class PublicationHandler extends McAfeeUse {

	private static final Logger LOGGER = LoggerFactory.getLogger(PublicationHandler.class);

	private static final String IMAGE_POSITION = "imagePosition";

	private static final String PADDING_LEFT = "paddingLeft";

	private static final String PADDING_RIGHT = "paddingRight";

	private static final String PADDING_TOP = "paddingTop";

	private static final String PADDING_BOTTOM = "paddingBottom";

	private static final String PADDING_LEFT_IMAGE = "paddingLeftImage";

	private static final String PADDING_RIGHT_IMAGE = "paddingRightImage";

	private static final String PADDING_TOP_IMAGE = "paddingTopImage";

	private static final String PADDING_BOTTOM_IMAGE = "paddingBottomImage";

	private static final String IMAGE_SIZE = "imageSize";

	private static final String CREATE_THUMBNAIL = "createThumbnail";

	private static final String IMAGE_LINK = "imageLink";

	private static final String CAPTION_ALIGNMENT = "captionAlignment";

	private static final String CAPTION_CONSTANT = "caption";

	private static final String TEXT_ALIGN = "textAlign";

	private static final String TEXT_COLOR = "textColor";

	private static final String BACKGROUND_COLOR = "backgroundColor";

	private static final String BACKGROUND_COLOR_PREFIX = "background: #";

	private static final String ANCHOR_CONSTANT = "anchor";

	private static final String BORDER_SIZE = "borderSize";

	private static final String BORDER_COLOR = "borderColor";

	private static final String BORDER_TITLE_COLOR = "borderTitleColor";

	private static final String BORDER_TITLE_ALIGN = "borderTitleAlign";

	private static final String PARAGRAPH_TITLE = "paragraphTitle";

	private static final String TITLE_ALIGN = "titleAlign";

	private static final String TITLE_FONT_SIZE = "titleFontSize";

	private static final String SEPARATOR_COLOR = "separatorColor";

	private static final String TITLE_COLOR = "titleColor";

	private static final String TITLE_TYPE = "titleType";

	private static final String VERTICAL_PADDING = "verticalPadding";

	private static final String TEXT_CONSTANT = "text";

	private static final String EXTERNAL_IMAGE_PATH = "externalImagePath";

	private static final String IMAGE_ALT = "image/alt";

	private static final String FILE_NAME = "fileName";

	private static final String ENABLE_ZOOM = "enableZoom";

	private static final String CONSTANT_TEXTALIGN = "text-align: ";

	private static final String CONSTANT_COLOR = "color: #";
	
	private static final String ARIA_LABEL = "aria";

	private String cssClass = StringUtils.EMPTY;

	private boolean bottomShow = false;

	private String imageAlignment = StringUtils.EMPTY;

	private Padding padding;

	private Padding imagePadding;

	private Margin margin;

	private String imgWidth = "100";

	private boolean createThumbnail = false;

	private String imageLink = StringUtils.EMPTY;

	private String anchorClass = StringUtils.EMPTY;

	private String caption = StringUtils.EMPTY;

	private String captionAlignment = StringUtils.EMPTY;

	private String textAlign = StringUtils.EMPTY;

	private String textColor = StringUtils.EMPTY;

	private String backgroundStyle;

	private String anchor = StringUtils.EMPTY;

	private String border;

	private String borderColor = StringUtils.EMPTY;

	private String borderTitle = StringUtils.EMPTY;

	private String paragraphTitle = StringUtils.EMPTY;

	private String mainTitle = StringUtils.EMPTY; // To enter the title for the component

	private String titleAlign = StringUtils.EMPTY; // To select the alignment of title

	private String titleStyle = StringUtils.EMPTY;

	private String separatorColor = StringUtils.EMPTY;

	private String titleType = StringUtils.EMPTY;

	private String verticalPadding;

	private String width = "auto";

	private String imagePosition = StringUtils.EMPTY;

	private String externalImagePath = StringUtils.EMPTY;

	private String imagePath = StringUtils.EMPTY;

	private String imageAlt = StringUtils.EMPTY;

	private String text = StringUtils.EMPTY;

	private String fileReference = StringUtils.EMPTY;

	private String fileName = StringUtils.EMPTY;
	
	private String ariaLabel = StringUtils.EMPTY;

	private String imageHref = StringUtils.EMPTY;

	private boolean enableZoom;

	private Link ctaLink;

	@Override public void activate() throws Exception {
		LOGGER.debug("activate() method called");
		populateDialogProperties();
		populateColors();
		populateStyles();

		width = "auto";
		if (imageAlignment.toLowerCase().contains("left")) {
			imagePosition = "left";
		} else if (imageAlignment.toLowerCase().contains("right")) {
			imagePosition = "right";
		} else if (imageAlignment.toLowerCase().contains("top") || imageAlignment.toLowerCase()
				.contains("bottom")) {
			imagePosition = "center";
		}

		if (imageAlignment.contains("bottom")) {
			bottomShow = true;
		}
		if (StringUtils.isBlank(imagePath)) {
			if (StringUtils.EMPTY.equals(externalImagePath)) {
				imagePath = StringUtils.EMPTY;
				imgWidth = "overflow: hidden; width: " + imgWidth + ApplicationConstants.PERCENTAGE + ";";
			} else {
				imagePath = externalImagePath;
			}
		}

		Download dld = new Download(getResource());
		if (dld.hasContent()) {
			fileReference = Text.escape(dld.getHref(), ApplicationConstants.URL_PERCENTAGE, true);
			LOGGER.debug("Download Reference {}", fileReference);
		}

		imageHref = ImageUtil.getImagePath(getResource(), ApplicationConstants.RES_IMAGE);
	}

	/**
	 * Set the dialog properites value.
	 */
	public void populateDialogProperties() {
		LOGGER.debug("populateDialogProperties() method called");
		ValueMap properties = getProperties();
		imageAlignment = properties.get(IMAGE_POSITION, StringUtils.EMPTY); // To get the alignment of image
		imageLink = LinkUtil.getHref(properties.get(IMAGE_LINK, StringUtils.EMPTY));
		createThumbnail = properties.get(CREATE_THUMBNAIL, false);
		caption = properties.get(CAPTION_CONSTANT, String.class);
		anchor = properties.get(ANCHOR_CONSTANT, String.class);
		paragraphTitle = properties.get(PARAGRAPH_TITLE, String.class);
		mainTitle = properties.get(ApplicationConstants.PN_TITLE, String.class);
		separatorColor = properties.get(SEPARATOR_COLOR, String.class);
		titleType = properties.get(TITLE_TYPE, String.class);
		text = validateLinks(properties.get(TEXT_CONSTANT, String.class));
		externalImagePath = properties.get(EXTERNAL_IMAGE_PATH, String.class);
		imagePath = LinkUtil.getDownloadHref(getResource(), ApplicationConstants.RES_IMAGE);
		imageAlt = properties.get(IMAGE_ALT, String.class);
		fileName = properties.get(FILE_NAME, String.class);
		enableZoom = properties.get(ENABLE_ZOOM, false);

		BumperUtil bumperUtil = new BumperUtil(
				getSiteConfigResource(ApplicationConstants.RES_BUMPER));
		ctaLink = bumperUtil.getLink(properties.get("ctaLink", String.class), properties.get("cta", String.class),
				false);
		
		ariaLabel = properties.get(ARIA_LABEL, String.class);

		// Padding to be included in the component
		LOGGER.debug("populateDialogProperties(): Padding to be included in the component");

		this.padding = new Padding.PaddingBuilder(Unit.PIXELS).top(properties.get(PADDING_TOP, 0))
				.right(properties.get(PADDING_RIGHT, 0)).bottom(properties.get(PADDING_BOTTOM, 0))
				.left(properties.get(PADDING_LEFT, 0)).createPadding();

		this.imagePadding = new Padding.PaddingBuilder(Unit.PIXELS).top(properties.get(PADDING_TOP_IMAGE, 0))
				.right(properties.get(PADDING_RIGHT_IMAGE, 0)).bottom(properties.get(PADDING_BOTTOM_IMAGE, 0))
				.left(properties.get(PADDING_LEFT_IMAGE, 0)).createPadding();

		// Margin to be included in the component
		this.margin = new Margin.MarginBuilder(Unit.PIXELS)
				.top(properties.get(ApplicationConstants.PROPERTY_MARGIN_TOP, 0))
				.right(properties.get(ApplicationConstants.PROPERTY_MARGIN_RIGHT, 0))
				.bottom(properties.get(ApplicationConstants.PROPERTY_MARGIN_BOTTOM, 0))
				.left(properties.get(ApplicationConstants.PROPERTY_MARGIN_LEFT, 0)).createMargin();
	}

	private void populateStyles() {
		ValueMap properties = getProperties();
		imgWidth = properties.get(IMAGE_SIZE, "100");
		if (imgWidth != null) {
			imgWidth = "overflow: hidden; width: " + imgWidth + ApplicationConstants.PERCENTAGE + ";";
		}


		if (StringUtils.isNotBlank(properties.get(CAPTION_ALIGNMENT, String.class))) {
			captionAlignment = CONSTANT_TEXTALIGN + properties.get(CAPTION_ALIGNMENT, String.class) + ";";
		}

		if (StringUtils.isNotBlank(properties.get(TEXT_ALIGN, String.class))) {
			textAlign = CONSTANT_TEXTALIGN + properties.get(TEXT_ALIGN, String.class) +";";
		}

		if (StringUtils.isNotBlank(properties.get(BORDER_TITLE_ALIGN, String.class))) {
			borderTitle += CONSTANT_TEXTALIGN + properties.get(BORDER_TITLE_ALIGN, String.class) + ";";
		}

		if (StringUtils.isNotBlank(properties.get(TITLE_ALIGN, String.class))) {
			titleStyle += CONSTANT_TEXTALIGN + properties.get(TITLE_ALIGN, String.class)
					+ ";";// To select the alignment of title
		}

		if (StringUtils.isNotBlank(properties.get(TITLE_FONT_SIZE, String.class))) {
			titleStyle += "font-size: " + properties.get(TITLE_FONT_SIZE, String.class) + "px; line-height: "
					+ properties.get(TITLE_FONT_SIZE, String.class) + "px;";
		}

		verticalPadding = "height: " + properties.get(VERTICAL_PADDING, "2") + "px;";
	}

	private void populateColors() {
		ValueMap properties = getProperties();


		if (StringUtils.isNotBlank(properties.get(TEXT_COLOR, String.class))) {
			textColor = CONSTANT_COLOR + properties.get(TEXT_COLOR, String.class) + ";";
		}

		if (StringUtils.isNotBlank(properties.get(BACKGROUND_COLOR, String.class))) {
			this.backgroundStyle =
					BACKGROUND_COLOR_PREFIX + properties.get(BACKGROUND_COLOR, String.class) + ";";
		}

		borderColor = properties.get(BORDER_COLOR, String.class);

		if (StringUtils.isNotBlank(properties.get(BORDER_SIZE, String.class))) {
			border = properties.get(BORDER_SIZE, String.class) + "px solid #" + borderColor + ";";
		}

		if (StringUtils.isNotBlank(properties.get(BORDER_TITLE_COLOR, String.class))) {
			borderTitle += CONSTANT_COLOR + properties.get(BORDER_TITLE_COLOR, String.class) + ";";
		}

		if (StringUtils.isNotBlank(properties.get(TITLE_COLOR, String.class))) {
			titleStyle += CONSTANT_COLOR + properties.get(TITLE_COLOR, String.class) + ";";
		}
	}

	private String validateLinks(String text) {
		LOGGER.debug("validateLinks() method called");
		String finalText = text;
		if (StringUtils.isNotBlank(text)) {
			try {
				BumperUtil bumperUtil = new BumperUtil(
						getSiteConfigResource(ApplicationConstants.RES_BUMPER));
				int currentIndex = finalText.indexOf("href=");
				int endIndex;
				while (currentIndex != -1) {
					endIndex = finalText.indexOf('>', currentIndex);
					String link = finalText.substring(currentIndex + 6, endIndex - 1);

					finalText = !(link.startsWith("/content") || link.startsWith("mailto:")
							|| link.indexOf('#') == 0) ?
							getFinalText(finalText, endIndex, bumperUtil.getLink(link, null, false)) :
							text;
					currentIndex = finalText.indexOf("href=", endIndex);
				}
			} catch (Exception e) {
				LOGGER.error("Error in validating links " + e);
			}
		}
		return finalText;
	}

	private String getFinalText(String finalText, int endIndex, Link bumperLink) {
		LOGGER.debug("getFinalText(String finalText, int endIndex, Link bumperLink) method called");
		return StringUtils.isNotBlank(bumperLink.getLinkClass()) ?
				finalText.substring(0, endIndex) + " class=\"" + bumperLink.getLinkClass() + "\"" + finalText
						.substring(endIndex, finalText.length()) :
				finalText;
	}
	
	public String getAriaLabel() {
		return ariaLabel;
	}

	public String getCssClass() {
		return cssClass;
	}

	public boolean isBottomShow() {
		return bottomShow;
	}

	public String getImageAlignment() {
		return imageAlignment;
	}

	public Padding getPadding() {
		return padding;
	}

	public Padding getImagePadding() {
		return imagePadding;
	}

	public String getImgWidth() {
		return imgWidth;
	}

	public boolean isCreateThumbnail() {
		return createThumbnail;
	}

	public String getImageLink() {
		return imageLink;
	}

	public String getAnchorClass() {
		return anchorClass;
	}

	public String getCaptionAlignment() {
		return captionAlignment;
	}

	public String getTextAlign() {
		return textAlign;
	}

	public String getTextColor() {
		return textColor;
	}

	public String getBackgroundStyle() {
		return backgroundStyle;
	}

	public String getAnchor() {
		return anchor;
	}

	public String getBorder() {
		return border;
	}

	public String getBorderColor() {
		return borderColor;
	}

	public String getBorderTitle() {
		return borderTitle;
	}

	public String getParagraphTitle() {
		return paragraphTitle;
	}

	public String getMainTitle() {
		return mainTitle;
	}

	public String getTitleAlign() {
		return titleAlign;
	}

	public String getSeparatorColor() {
		return separatorColor;
	}

	public String getTitleStyle() {
		return titleStyle;
	}

	public String getTitleType() {
		return titleType;
	}

	public String getVerticalPadding() {
		return verticalPadding;
	}

	public String getWidth() {
		return width;
	}

	public String getImagePosition() {
		return imagePosition;
	}

	public String getExternalImagePath() {
		return externalImagePath;
	}

	public String getImagePath() {
		return imagePath;
	}

	public String getImageAlt() {
		return imageAlt;
	}

	public String getText() {
		return text;
	}

	public String getCaption() {
		return caption;
	}

	public String getFileReference() {
		return fileReference;
	}

	public String getFileName() {
		return fileName;
	}

	public String getImageHref() {
		return imageHref;
	}

	public boolean isEnableZoom() {
		return enableZoom;
	}

	public Link getCtaLink() {
		return ctaLink;
	}

	public Margin getMargin() {
		return margin;
	}
}
