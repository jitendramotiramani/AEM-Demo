<%--

  richText component.

  richText

--%><%
%><%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" %><%
%><%
    String title=properties.get("title","");
	String description=properties.get("description","");
%>

<div class="col-lg-12 col-sm-12 thisone">
            		<span class="title"><%=title%></span>
            	</div>



	            <div class="col-lg-12 col-sm-12 hero-feature">
<%=description%>

	            </div>
<div class="col-lg-12 col-sm-12 hero-feature">
    <cq:include path="par" resourceType="foundation/components/parsys"/>

	            </div>

