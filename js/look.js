$(function() {
	var contestantPhoto = getParametersOnUrl('contestantPhoto');
	var pngPath = getParametersOnUrl('pngPath');
	var mp3Path = getParametersOnUrl('mp3Path');
	$('#container .avator').attr('src',contestantPhoto);
	//$('audio').attr('src',mp3Path);
	//$('#container .score img').attr('src',pngPath);
	$('#playBtn').click(function() {
		if($(this).hasClass('switch')){
			$(this).removeClass('switch');
			$('#audio')[0].play();
			$(this).attr('src',contestantPhoto);
			console.log(audio.paused);
			console.log(audio.currentTime);
			console.log(audio.duration);
		}else{
			$(this).addClass('switch');
			$('#audio')[0].pause();
			$(this).attr('src',path+"/h5/share/img/pause.png");
		}
		
	})
	/*$('#audio')[0].durationchange();
	$('#audio')[0].ended(function(){
		$('#playBtn').addClass('switch');
		$('#playBtn').attr('src',path+"/h5/share/img/pause.png");
	});*/
	
	audio.addEventListener('ended',function(){
        alert("播放完成!");
    });
	
	/*if(audio.ended){
		$('#playBtn').addClass('switch');
		$('#playBtn').attr('src',path+"/h5/share/img/pause.png");
	}*/
})
