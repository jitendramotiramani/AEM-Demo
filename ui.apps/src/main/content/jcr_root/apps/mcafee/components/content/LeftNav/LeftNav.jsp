	<%@include file="/libs/foundation/global.jsp"%>
<%@page session="false" %>
<%@page import="com.day.text.Text,
    com.day.cq.wcm.foundation.Image,
com.day.cq.commons.Doctype,javax.jcr.Node,
javax.jcr.NodeIterator,
java.util.ArrayList,
javax.servlet.http.Cookie,
java.util.HashMap,
org.apache.commons.lang.StringUtils,
com.day.cq.wcm.api.Page,
com.day.cq.personalization.UserPropertiesUtil" %>
<%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %>

     <%@include file="/libs/foundation/global.jsp"%>
<html>
<head>
<link rel="stylesheet" href="style.css">
<title>Category menus</title>
</head>

<body>
    <div class="sidebar">
	 <%  
    //String path = properties.get("category",String.class);

	String path = currentStyle.get("category",String.class);

Session session = slingRequest.getResourceResolver().adaptTo(Session.class);
if(path!=null){
Node rootNode = session.getNode(path);
NodeIterator nodes = rootNode.getNodes();
	boolean rootHideInNav=false;
    Node jcrContentRoot = rootNode.getNode("jcr:content");
	rootHideInNav = jcrContentRoot.hasProperty("hideInNav");
    if(!rootHideInNav){
			while (nodes.hasNext()) {
				Node node = nodes.nextNode();
				String primaryType1 = node.getPrimaryNodeType().getName().toString();
						if(primaryType1.equals("cq:Page")){
								boolean hideinnav1=false;
								Node jcrContent1 = node.getNode("jcr:content");
								hideinnav1=jcrContent1.hasProperty("hideInNav");
									if(!hideinnav1)
									{
									String ctitle= jcrContent1.getProperty("jcr:title").getValue().getString();
%>
		<div class="substores">
			<ul class="tree">
				<li class="parent store"><a class="parent current active" data-layout=""><span class="arrow"> </span> <%=ctitle %></a>
					<ul>
					<%
					 NodeIterator ChildNodes = node.getNodes();

										while(ChildNodes.hasNext()){

										Node ItemNode = ChildNodes.nextNode();

											String primaryType = ItemNode.getPrimaryNodeType().getName().toString();

											if(primaryType.equals("cq:Page")){

												boolean hideinnav=false;

												Node jcrContent = ItemNode.getNode("jcr:content");
												 hideinnav=jcrContent.hasProperty("hideInNav");

												if(!hideinnav)
											{
													String title= jcrContent.getProperty("jcr:title").getValue().getString();

%>
					<li class="store"><a class="active" type="products" href="<%=ItemNode.getPath()%>.html" data-layout=""><%=title%></a> </li>
					<%

        }
 else{
     out.println("Please Configure Properly1");
break;
    }
   }
}

%>

</ul>
				</li>
			</ul>
		</div>
		<br/>	
 <%
}
    else{
out.println("Please Configure Properly");
        break;
   }
  }
 }
}else{
       out.println("Please Configure Properly");
    }
}
    %>	
	</div>		
</body>
</html>	  