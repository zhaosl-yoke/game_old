var api = {
		"selectRemarks":path1+'/h5/share/json/details.json',
		"selectTheWork":path1+'/h5/share/json/select.json',
		"note" : path1+"/h5/share/json/note.json"
}
$(function() {
	var myscroll = new IScroll('#container',{
		scrollbars:false,
		mouseWheel:true,
		probeType: 3
	},100)
	
	
	var isLive = getParametersOnUrl('isLive');
	var contestantPostId = getParametersOnUrl('contestantPostId');


    $('.icon-dian').click(function(){
		self.location = "/ArtAppWeb/rest/b/note?contestantPostId="+contestantPostId;
	})
	//选手信息
	sercice(api.selectTheWork,showUserInfo,{
		"contestantPostId" : contestantPostId
	})
	
	function showUserInfo(data){
		if(data.success){
			var work = data.body.work;
			var contestantPhoto = work.contestantPhoto ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + work.contestantPhoto : path1 + "/h5/share/img/lufei.jpg";
			var createTime = new Date(work.createTime).getTime()/1000/3600;
			var now = new Date().getTime()/1000/3600;
			var difference = now-createTime;
			var time = '';
			if(difference<24){
				time = difference + '小时前';
			}else{
				time = parseInt(difference/24) + '天前';
			}
			var thumb = work.thumb ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + work.thumb : path1 + "/h5/share/img/banner.png";
			$('#avator img').attr('src',contestantPhoto);
			$('#avator .title_con span:first-child').text(work.contestantName);
			$('#avator .title_con span:nth-child(2)').text(time);
			$('#video p').text("#"+work.trackName+"#");
			$('#video img').attr('src',thumb);
		}
	}
	
	//票数
	sercice(api.note,showVoteNum,{
		"contestantPostId":contestantPostId
	})
	function showVoteNum(data){
		if(data.success){
			var $ul = $('.noteList ul');
			$ul.empty();
			var $lis = "";
			var voterInfos = data.body.voterInfos;
			$('.noteList>span').text(voterInfos.length+"票");
			for(var i=0;i<3;i++){
				var voterName = voterInfos[i].voterName;
				var voterPath = voterInfos[i].voterPath ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + voterInfos[i].voterPath : path1 + "/h5/share/img/lufei.jpg";
				var isVip = voterInfos[i].isVip;
				var vipImg ="";
				if(isVip){
					vipImg = '<img src="'+path1+'/h5/share/img/VIP.png" class="vip"/>'
				}
				$lis += '<li>'
							+'<img src="'+voterPath+'" class="pic">'
							//+'<span class="name">'+voterName+'</span>'
							+vipImg
						+'</li>';
			}
				
			$ul.append($lis);
		}
	}
	
	//专家点评
	sercice(api.selectRemarks,callBack,{
		"isLive" : isLive,
		"contestantPostId" : contestantPostId
	})
	function callBack(data){
		if(data.success){
			var scoreLists = data.body.scoreLists;
			console.log(scoreLists);
			var $expertInfos = $('#expertInfos');
			$expertInfos.empty();
			var expertInfo = '';
			for(var i=0;i<scoreLists.length;i++){
				var raterPhoto = scoreLists[i].raterPhoto ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + scoreLists[i].raterPhoto : path1 + "/h5/share/img/lufei.jpg";
				var raterName = scoreLists[i].raterName;
				var createTime = new Date(scoreLists[i].createTime).getTime()/1000/3600;
				var now = new Date().getTime()/1000/3600;
				var difference = now-createTime;
				var time = '';
				if(difference<24){
					time = difference + '小时前';
				}else{
					time = parseInt(difference/24) + '天前';
				}
				
				var remark = scoreLists[i].remark;
				var score = scoreLists[i].score;
				var scoreImg = "";
				
				for(var k=0;k<score;k++){
					scoreImg += '<img src="'+path1+'/h5/share/img/star.png"/>';
				}
				var raterAttachs = scoreLists[i].raterAttachs;
				var pngPath = "";
				var mp3Path = "";
				for(var j=0;j<raterAttachs.length;j++){
					if(raterAttachs[j].extension.indexOf('png')!=-1){
						pngPath = raterAttachs[j].catalog+raterAttachs[j].filename+'.'+raterAttachs[j].extension;
					}else if(raterAttachs[j].extension.indexOf('mp3')!=-1){
						mp3Path = raterAttachs[j].catalog+raterAttachs[j].filename+'.'+raterAttachs[j].extension;
					}
				}
				expertInfo += '<div class="expertInfo"><div class="title">'
								+'<img src="'+raterPhoto+'"/>'
								+'<div class="title_con">'
									+'<span>'+raterName+'</span>'
									//+'<span>武汉音乐学家</span>'
								+'</div>'
								+'<span class="time">'+time+'</span>'
							+'</div>'
							+'<p style="margin-left:0.84rem" class="score">评分：'+scoreImg+'<span data-png="'+pngPath+'" data-mp3="'+mp3Path+'" class="look">查看批注</span></p>'
							+'<p style="margin-left:0.84rem">打分理由：'+remark+'</p></div>'
			}
			$expertInfos.append(expertInfo);
			
			if(!isLive){
				$('.look').hide();
			}else{
				$('.look').show();
			}
			$('.look').click(function() {
				var contestantPhoto = $('#avator img').attr('src');
				var pngPath = $(this).data('png');
				var mp3Path = $(this).data('mp3');
				self.location = "/ArtAppWeb/rest/b/share/look?pngPath="+pngPath+"&mp3Path="+mp3Path+"&contestantPhoto="+contestantPhoto;
			})
		}
		myscroll.refresh();
	}
})
