
var api={
		"selectWorks":path1+'/h5/share/json/haixuan.json'
}

$(function() {
	var myscroll = new IScroll('.ulList',{
		scrollbars:false,
		mouseWheel:true,
		probeType: 3
	})
	
	
	/*sercice(sUrl.selectWorks,function(data){
		if(data.success){
			console.log(data.body.areas);
		}else{
			alert(data.msg);
			return;
		}
		
	/*sercice(sUrl.selectAreas,function(data){
		console.log(data.body.areas);
		for(var i = 0; i < data.body.areas.length; i ++) {
			var $option = $('<option data-id="'+ data.body.areas[i].id +'">'+ data.body.areas[i].areaName+'</option>')
			$('.city').append($option)
		}		
	},{
		"stageId":stageId
	})*/
	
	/*sercice(sUrl.selectAgeGroups,function(data){
		console.log(data.body.ageGroups);
		for(var i = 0; i < data.body.ageGroups.length; i ++) {
			var $option = $('<option data-id="'+ data.body.ageGroups[i].id +'">'+ data.body.ageGroups[i].groupName+'</option>')
			$('.group').append($option)
		}		
	},{
		"stageId":stageId
	})*/
	
	var stageId = getParametersOnUrl('id');
	var areaId = $('.city').val();
	var majorCode = $('.major').val();
	var ageGroupId = $('.group').val();
	var likeStr = $('#studentName').val();
	var total = $('.total').val();
	sercice(api.selectWorks,showAllInfo,{
		"stageId" : stageId,
		"areaId" : areaId,
		"majorCode" : majorCode,
		"ageGroupId" : ageGroupId,
		"likeStr" : likeStr,
		"pageNum" : 1,
		"pageSize":1000		
	})
	function showAllInfo(data){
		if(data.success){
			var $ul = $('.ulList ul');
			$ul.empty();
			var $lis = "";
			var contestantPosts = data.body.contestantPosts;
			for(var i=0;i<contestantPosts.length;i++){
				var thumb = contestantPosts[i].thumb ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + contestantPosts[i].thumb : path1 + "/h5/share/img/list.png";
				var contestantPhoto = contestantPosts[i].contestantPhoto ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + contestantPosts[i].contestantPhoto : path1 + "/h5/share/img/lufei.jpg";
				var ballot = contestantPosts[i].ballot;
				var paragraphName = contestantPosts[i].paragraphName;
				var contestantName = contestantPosts[i].contestantName;
				var areaName = contestantPosts[i].areaName;
				var majorName = contestantPosts[i].majorName;
				var groupName = contestantPosts[i].groupName;
				var total = contestantPosts[i].total;
				var contestantPostId = contestantPosts[i].contestantPostId;
				var isLive = contestantPosts[i].isLive;
				$lis += '<li>'
							+'<img src="'+thumb+'" alt="" />'
							+'<div class="bot">'
								+'<p class="one">'
									+'<span>'+areaName+'/'+ majorName +'/'+ groupName +'</span>'
									+'<span style="float: right;color:#f44933;">'+ballot+'票</span>'
								+'</p>'
								+'<p class="two">'
									+'<span style="vertical-align:middle;">'+ contestantName+'&nbsp;|'+ total +'人观看</span>'
									+'<span class="vote">投他一票</span>'
								+'</p>'
							+'</div>'							
						+'</li>'
			}
			$ul.append($lis);
			myscroll.refresh()
			$('.ulList ul').on('tap',function() {
				self.location = "/ArtAppWeb/rest/b/share/details?isLive="+isLive+"&contestantPostId="+ contestantPostId;
			})
		}else{
			alert(data.msg);
		}
	}
	//选择框
	$('.option>ul>li').click(function(){
		if ($(this).hasClass('aa')){
			$(this).removeClass('aa');
			$(this).addClass('selectLi');
			$(this).find('i').removeClass('icon-down');
			$(this).find('i').addClass('icon-icon19');
			var selecttype = $(this).attr('selecttype');
			if(selecttype == "city"){
				$('#cityInfos').show().siblings('.selectContent').hide();
			}else if(selecttype == "major"){
				$('#majorInfos').show().siblings('.selectContent').hide();
			}else if(selecttype == "group"){
				$('#groupInfos').show().siblings('.selectContent').hide();
			}else if(selecttype == "total"){
				$('#totalInfos').show().siblings('.selectContent').hide();
			}
		}else{
			$(this).addClass('aa');
			$(this).removeClass('selectLi');
			$(this).find('i').addClass('icon-down');
			$(this).find('i').removeClass('icon-icon19');
			$('.selectContent').css({"display":"none"})
		}
	})
	$('.selectContent ul li').click(function(){
		$(this).css({"background":"#ccc"}).siblings().css({"background":"#fff"});
		var id=$(this).data('id');
		var text = '';
		if($(this).text().length>4){
			text = $(this).text().slice(0,4)+'...';
		}else{
			text = $(this).text();
		}
		$('.option>ul>li.selectLi span').text(text);
		$('.option>ul>li.selectLi span').data('id',id);
		$(this).parent().parent().hide();
		$('.option>ul>li.selectLi').addClass('aa');
		$('.option>ul>li.selectLi').find('i').addClass('icon-down');
		$('.option>ul>li.selectLi').find('i').removeClass('icon-icon19');
		$('.option>ul>li.selectLi').removeClass('selectLi');
	})
})


