package com.mcafee.dee.global.core.models;

import java.util.Collection;
import com.day.cq.wcm.api.Page;
 
public interface Header {
     
    String PN_ROOT_PATH = "rootPath";
     
   /**
     * Name of the node relative to the header component that stores the pages and icon items.
     */
    String PAGES_NODE = "navigation";
     
    /**
     * Name of path property
     */
    String PN_PATH = "linkPath";
     
    /**
     * Name of the text property. Will be left blank to use Page's title or navigation title
     */
    String PN_TEXT = "linkTitle";
     
    /**
     * Name of policy property that determines the relative location of the header component
     */
    String PN_POLICY_REL_PATH = "relPath";
 
    /**
     * Creates collection of pages(from site hierarchy of current page) for Global Navigation
     * Navigation Pages will be made up of direct children of navigation root specified by startLevel property
     * @return {@link Collection} of navigation items
     */
    Collection<NavigationItem> getItems();
     
    /**
     * Returns the navigation root (from site hierarchy of current page) based on Start Level
     * 
     * @return {@link Page} Navigation Root
     */
    String getNavigationRoot();
 
}
