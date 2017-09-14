
/* Virtual Assistant Collapse Minimise/Maximize event.*/
var messageError = "I couldn't understand, could you please try again?";

$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        $('.chat-popup .panel-footer').hide();
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
         $('.chat-popup .panel-footer').show();
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});

/* Handle Enter Key Event */
$(function() {
$('#btn-input').keypress(function(event) {
    if (event.keyCode == 13) {
       // alert("enter");
    $('#btn-chat').click();
    }
})
})
/* Submit button Event */
$(document).on('click', '#btn-chat', function (e) {
    var msg = $( "#btn-input" ).val();
    if(msg != ""){
   	 send();
     return;
    }    
});

$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( ".panel-footer input.chat_input" ).trigger( "focus" );
    $( "#chat_window_1" ).hide();
    if($('#minim_chat_window').hasClass('glyphicon-plus'))
    {
     $this= $('.panel-heading span.icon_minim');

     $this.parents('.panel').find('.panel-body').slideDown();
     $this.removeClass('panel-collapsed');
     $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
     $('.chat-popup .panel-footer').show();
    }    
    $( "#chatTogglerDiv" ).css({ opacity: 1 });

});

$(document).on('click', '#chatTogglerDiv', function (e) {
    $("#chat_window_1" ).show();
    $( "#chatTogglerDiv" ).css({ opacity: 0 })
    /*if ($('#minim_chat_window').hasClass('panel-collapsed')) {
       // $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    }*/
    //$( ".panel-heading span.icon_minim" ).trigger( "click" );
});



//var accessToken = "b75df45424b140cfa845e10376321a08";
//var apiUrl = "https://api.api.ai/v1/";
accessToken = "67869485c5794678a0a590b26dcb4cb5";
var apiUrl="https://api.api.ai/v1/query?v=20150910";
var $speechInput,
      $recBtn,
      recognition,
      messageRecording = "Recording...",
      messageCouldntHear = "I couldn't hear you, could you say that again?",
      messageInternalError = "Oh no, there has been an internal server error",
      messageSorry = "I'm sorry, I don't have the answer to that yet.";


$(document).ready(function() {
      $speechInput = $("#speech");
      $recBtn = $("#rec");

      $speechInput.keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          send();
        }
      });
      $recBtn.on("click", function(event) {
        switchRecognition();
      });
      $(".debug__btn").on("click", function() {
        $(this).next().toggleClass("is-active");
        return false;
      });
    });


function startRecognition() {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = function(event) {
        respond(messageRecording);
        updateRec();
      };
      recognition.onresult = function(event) {
        recognition.onend = null;
        
        var text = "";
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
          }
          setInput(text);
        stopRecognition();
      };
      recognition.onend = function() {
        respond(messageCouldntHear);
        stopRecognition();
      };
      recognition.lang = "en-US";
      recognition.start();
    }
  

function stopRecognition() {
      if (recognition) {
        recognition.stop();
        recognition = null;
      }
      updateRec();
    }


function switchRecognition() {
      if (recognition) {
             // alert("recognition");

        stopRecognition();
      } else {
        //  alert("StartRecognition");

        startRecognition();
      }
 }


function setInput(text) {
      $speechInput.val(text);
      send();
    }

function updateRec() {
      $recBtn.text(recognition ? "Stop" : "Speak");
    }


function send() {
var text = $speechInput.val();         
   //var text = $( "#btn-input" ).val();
//alert(apiUrl);
$.ajax({
        type: "POST",
        url: apiUrl + "query",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
       data: JSON.stringify({query: text, lang: "en", sessionId: "909009900"}),

        success: function(data) {

         chatBotAppend("bot response","user","text",text);
         $("#speech").val("");   
         prepareResponse(data);   

        },
        error: function() {
        //alert("error");

         respond(messageInternalError);
        },

      });
}


/* Prepare Response*/

function prepareResponse(val) {
   // alert(val);
      //var debugJSON = JSON.stringify(val, undefined, 2),
    var debugJSON = JSON.stringify(val),
      spokenResponse = val.result.fulfillment.speech;

      respond(spokenResponse);
       //alert(debugJSON);
     // debugRespond(debugJSON);

   if(val.result.fulfillment.messages[1].payload.template_type=="generic")
    {
       // val.result.fulfillment.messages[1].payload.element;
         chatBotAppend("bot response","bot","attachment-generic",val.result.fulfillment.messages[1].payload);
    }

    if(val.result.fulfillment.messages[1].payload.template_type=="buttons")
    {
        //alert("hi")
       // val.result.fulfillment.messages[1].payload.element;
         chatBotAppend("bot response","bot","attachment",val.result.fulfillment.messages[1].payload);
    }
  // $speechInput.val("");  
}

/* Check debug json response*/

function debugRespond(val) {
      $("#response").text(val);
    }

/* Set Response, donot display recording*/
function respond(val) {
      if (val == "") {
        val = messageSorry;
      }

      if (val !== messageRecording) {
        var msg = new SpeechSynthesisUtterance();
        msg.voiceURI = "native";
        msg.text = val;
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);
       // chatBotAppend("bot response","user","text",val);  
       // return;  
      }

     // $("#spokenResponse").addClass("is-active").find(".spoken-response__text").html(val);
        if(val!=messageRecording){
     	 chatBotAppend("bot response","bot","text",val);
        }
    }


 function chatBotAppend(text,user,type,message)
 {
      if(user=="user"){
        //  alert("text");
        $("#chat-msg-board").append("<div class='row msg_container base_sent'><div class='col-md-10 col-xs-10'><div class='messages msg_sent'><p>"+message+"</p></div></div><div class='col-md-2 col-xs-2 avatar'><img src='/apps/dxmgroup/components/content/chatBot/img/img.jpg' class='img-responsive '></div> </div>");

      }

      if(user=="bot" && type=="error"){
        $("#chat-msg-board").append("<div class='row msg_container base_receive'><div class='col-md-2 col-xs-2 avatar'><img src='/apps/dxmgroup/components/content/chatBot/img/dxm.png' class='img-responsive '></div><div class='col-md-10 col-xs-10'><div class='messages msg_receive'><p>"+message+"</p></div></div> </div>");
      }  

      if(user=="bot" && type=="text"){
        $("#chat-msg-board").append("<div class='row msg_container base_receive'><div class='col-md-2 col-xs-2 avatar'><img src='/apps/dxmgroup/components/content/chatBot/img/dxm.png' class='img-responsive '></div><div class='col-md-10 col-xs-10'><div class='messages msg_receive'><p>"+message+"</p></div></div> </div>");
      }


      if(user=="bot" && type=="attachment-generic"){
         // alert("hi");
          	/*	var elementsBody='';
       			 for (var i = 0; i < message.attachment.payload.elements.length; i++) {
                    elementsBody += "<div class='image-carousal'><img src="+message.attachment.payload.elements[i].image_url+">"+message.attachment.payload.elements[i].title+"<br/>"+message.attachment.payload.elements[i].subtitle+"<br/>";
                    for (var j = 0; j < message.attachment.payload.elements[i].buttons.length; j++) {
                    elementsBody += "<p class='text-center'><a href="+message.attachment.payload.elements[i].buttons[j].url+" target='_blank'><input type='button' class='btn btn-primary btn-sm' value="+message.attachment.payload.elements[i].buttons[j].title+"></a></p>";
					}
					elementsBody += "</div>";
                }*/
        // $("#chat-msg-board").append("<div class='row msg_container base_receive'><div class='col-md-2 col-xs-2 avatar'><img src='/apps/dxmgroup/components/content/chatBot/img/dxm.png' class='img-responsive '></div><div class='col-md-10 col-xs-10'><div class='messages msg_receive'>Here are suggestions for you</div></div> </div>");

          		 var k= 1 + Math.floor(Math.random() * 100000000);
                 var active='';
  				 var elementsBody="<div id='myCarousel"+k+"' class='carousel slide' data-ride='carousel'><div class='carousel-inner' role='listbox'>";
                 //alert(elementsBody);
                    for (var i = 0; i < message.elements.length; i++) {
                        //alert(i);
                        if(i==0){ 
                         	active=' active';
                         }
                         else{
                        	 active='';
                         } 
                        elementsBody += "<div class='item"+active+"'><img src="+message.elements[i].image_url+"><div class='carousel-title'><p><strong>"+message.elements[i].title+"</strong></p><p>"+message.elements[i].subtitle+"</p></div>";
                        for (var j = 0; j < message.elements[i].buttons.length; j++) {
                        elementsBody += "<hr class='small_gap'/><span class='btnInline'><a href="+message.elements[i].buttons[j].url+" target='_blank'><input type='button' class='btn btn-primary btn-sm' value="+message.elements[i].buttons[j].title+"></a></span>";
                        }
                        if(message.elements[i].hasOwnProperty('form') ){
						elementsBody +="<div class='text-center'>"+message.elements[i].form+"</div>";
                        }
                        elementsBody += "</div>";
                    }
   				 elementsBody +="</div><a class='left carousel-control' href='#myCarousel"+k+"' role='button' data-slide='prev'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span><span class='sr-only'>Previous</span></a><a class='right carousel-control' href='#myCarousel"+k+"' role='button' data-slide='next'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span><span class='sr-only'>Next</span></a>";



         $("#chat-msg-board").append(elementsBody);
        }  


      if(user=="bot" && type=="attachment"){
          		var btnBody='';
       			 for (var i = 0; i < message.elements.length; i++) {
                    btnBody += "<div class='text-center'><a href="+message.elements[i].url+" target='_blank'><input type='button' class='btn btn-primary btn-sm' value='Click here to view'></a></div>";
                }

         $("#chat-msg-board").append("<div class='row msg_container base_receive'><div class='col-md-2 col-xs-2 '></div><div class='col-md-10 col-xs-10'><div>"+btnBody+"</div></div> </div>");
        }  


   sessionStorage.setItem( 'chat-storage', $("#chat-msg-board").html()  );
  // alert(localStorage.getItem( 'chat-storage' ));  
   $('#chat-msg-board').animate({scrollTop: $('#chat-msg-board').prop("scrollHeight")}, 500);  


 //  localStorage.setItem( 'chat-discussion', JSON.stringify(car)  );
//console.log( car );
//console.log(JSON.parse(localStorage.getItem( 'car' )).doors );

     /*var chatMsg=$('#chat-msg-board').html();

     $.session.set('chat-session',chatMsg );
     alert(chatMsg);
      alert(session);
     alert($.session.get('chat-session'));*/

 }  