<%@include file="/libs/foundation/global.jsp" %>
<%@page import="java.util.*,
				java.text.SimpleDateFormat,
				java.text.DateFormat,
				java.text.ParseException,
				java.text.SimpleDateFormat,
				java.util.Calendar,
				java.util.Date"  %>

<%@page import="java.text.SimpleDateFormat"  %>

<cq:includeClientLib categories="dxm.featuredSliderWidget"/>
<script src="/apps/dxmgroup/components/content/featuredSlider/featureSliderClientLib/thumbnail-slider.js"></script>
<link href="/apps/dxmgroup/components/content/featuredSlider/featureSliderClientLib/thumbnail-slider.css" rel="stylesheet">
<link href="/apps/dxmgroup/components/content/featuredSlider/featureSliderClientLib/thumbs2.css" rel="stylesheet">

<style>
    /*  body {font: normal 0.9em Arial;color: #222;} 
    header {display:block; font-size:1.2em; margin-bottom:100px;} */
    /* header a, header span {
            display: inline-block;
            padding: 4px 8px;
            margin-right: 10px;
            border: 2px solid #000;
            background: #DDD;
            color: #000;
            text-decoration: none;
            text-align: center;
            height: 20px;
}*/

         #thumbnail-slider{
            margin-bottom : 30px;
        }



    header span {background:white;}
        a {color: #1155CC;}
		.titles{

margin-top: 10px;
height: 60px;
width: 100%;
font-size:14px;
color:#000;
		}
		.titles .price{
		color:#219FD1;
		}
    .titles .product-name{

                color:#ff0066;
            }


    </style>
<script>
      $(document).ready(function(){

   var text = $(this).html();
          /*  $(".featuredSlider.section").html(text.replace('Thumbnail Slider trial version', 'I love this text')); */ 

});

</script>

<!-- <body> -->



    <div class="col-lg-12 col-sm-12 no-padding">
	    <span class="title1">Featured Products</span>
	</div>


<div class="my_custom" style="float:left;color:#fff">
<div id="thumbnail-slider">
                <div class="inner">
                    <ul>

<%

String  [] slider = properties.get("featuredSlider", String[].class);


int partitionPosition = 0;
String Title = null;
String Price = null;
String ImagePath = null;
 String sliderString = null;
 String [] subSliderString = null;
 String linkTo = null;

if(slider !=null){

	for(int i=0;i<slider.length;i++){
        sliderString = slider[i];

     subSliderString = sliderString.split("\\|");

    Title = subSliderString[0];
    Price = subSliderString[1];
    ImagePath = subSliderString[2];
    linkTo = subSliderString[3];

        %>
                            <li>
                                <a href="<%=linkTo%>.html"> <img class="thumb" src="<%=ImagePath%>" /> </a> 

                                    <!-- <a href="<%=linkTo%>.html"><img src="<%=ImagePath%>" class="thumb" alt="a"></a> -->


                                 <div class="titles">

                                     <div class="product-name"><%=Title%></div>
                                   <div class="price"><%=Price%></div>
								<!--<div class="rating"> S S S S S</div>	-->	

                                     <div class="rating hidden-sm col-md-12">
                                            <i class="price-text-color fa fa-star"></i><i class="price-text-color fa fa-star">
                                            </i><i class="price-text-color fa fa-star"></i><i class="price-text-color fa fa-star">
                                            </i><i class="fa fa-star"></i>
                                        </div>

							</div> 


                                 </li>




       <%                 


    }



}

%>

                </ul>
                </div>
            </div>
       </div>

<!-- </body> -->
<style>
    .featuredSlider{color:#fff;} 
</style>