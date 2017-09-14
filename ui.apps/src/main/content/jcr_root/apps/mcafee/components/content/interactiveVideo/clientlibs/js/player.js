
		
function playVideo(times) {
	var time = times;
	var video = $('#videos');
	var player = $('#videos').get(0);
	
		if(player){
		current_time=0;
		player.currentTime=current_time+times;
		player.play();
	}
		
	
	};