<%
%><%@include file="/libs/foundation/global.jsp"%>

<cq:includeClientLib categories="apps.interactive.video"/>

<%@ page import="com.day.cq.dam.api.Asset,
                   com.day.cq.wcm.api.WCMMode, 
                   com.day.cq.wcm.api.components.DropTarget,
                   com.day.cq.wcm.foundation.Placeholder,
				   org.apache.jackrabbit.commons.JcrUtils" %><%

    Asset asset = null;
    Resource assetRes = resourceResolver.getResource(properties.get("video", "abc"));
    if (assetRes != null) {
        asset = assetRes.adaptTo(Asset.class);
    }
    if (asset != null) {
        request.setAttribute("video_asset", asset.getPath());


	String videoPath = asset.getPath().toString();

	String timeline = "[";
    Node timeLineContentNode = currentNode.getNode("videocontent");    
    NodeIterator timeLineNodes = timeLineContentNode.getNodes();


	while (timeLineNodes.hasNext()) {
          Node item = timeLineNodes.nextNode();
          String timelinePoint = item.getProperty("timelinepoint").getString();
          timeline= timeline+timelinePoint;
            if(timeLineNodes.hasNext()){
              timeline= timeline+",";
            }
    }

	timeline=timeline+"]"; %>

      <div class="col-sm-12 col-xs-12">


<%
	NodeIterator timeLineNodes1 = timeLineContentNode.getNodes();
	while (timeLineNodes1.hasNext()) {
        Node item = timeLineNodes1.nextNode();
        String timelineContent = item.getProperty("timelinecontent").getString();
        String timelinePoint = item.getProperty("timelinepoint").getString();
%>



<%    
    }

%>

		<figure class="span4 scr-style">
			<video id="video" controls width="560" height="280" >
                <source src="<%= videoPath %>" type="video/mp4" />
				<source src="video/videogular.ogg" type="video/ogg" />
				<source src="video/videogular.webm" type="video/webm" />	
			</video>
        </figure>
      </div>

<div class="col-lg-12 col-sm-12" style="margin-left:15px;margin-top:10px">
        <h3><span>Recomended Videos</span></h3>
    </div>

<script>
	var video;
	$(document).ready(function () {
		video = $.media('video');

		var timelne = <%=timeline%>;

		$.each(timelne, function( index, value ) {
          $( " #Slide"+timelne[0]+" " ).hide();
        });

		Updatetimeline(timelne);

        function Updatetimeline(timelne) {

            //var newtime = timelne;
            video = $.media('video');        
            video.createTimeline('first', {
            enabled: true,
            points: [
                {
                	time: timelne[0],
					fn: function (point, timeline) {
						$("#contentDiv").fadeIn(10000);
						$("#contentDiv").load( " #Slide"+timelne[0]+" " );

					}
				},{
					time: timelne[1],
					fn: function () {
						$("#contentDiv").load( " #Slide"+timelne[1]+" " );
					}
				},{
					time: timelne[2],
					fn: function () {
						$("#contentDiv").load( " #Slide"+timelne[2]+" " );
					}
				},{
					time: timelne[3],
					fn: function () {
						$("#contentDiv").load( " #Slide"+timelne[3]+" " );
					},
					fn_out: function () {
						$("#contentDiv").load( " #Slide"+timelne[3]+" " );
					}
				}
			]
        }).play();       }


	});

</script>

<%
    }else{
%>
<div> Add video content </div>

<%
    }
%>


