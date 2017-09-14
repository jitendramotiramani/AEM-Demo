package com.mcafee.dee.global.core.models.content;

import com.day.cq.wcm.api.Page;
import com.mcafee.dee.global.core.models.NavigationItem;

public class NavigationItemImpl implements NavigationItem {
     
    private Page page;
    private boolean active;
    private boolean hierarchyActive;
    private String url;
    private String text;
     
    public NavigationItemImpl(Page page, boolean active, boolean hierarchyActive, String icon, String url) {
        this.page = page;
        this.active = active;
        this.hierarchyActive = hierarchyActive;
        this.url = url;
        this.text = text;
    }
 
    @Override
    public Page getPage() {
        return page;
    }
 
    @Override
    public boolean isActive() {
        return active;
    }
 
    @Override
    public boolean isHierarchyActive() {
        return hierarchyActive;
    }
 
    @Override
    public String getUrl() {
        return url;
    }
 
    @Override
    public String getText() {
        return text;
    }
 
}
