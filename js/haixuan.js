var api={
		"selectWorks":path1+'/h5/share/json/haixuan.json'
}
var myscroll;
$(function() {
	 myscroll = new IScroll('.ulList',{
		scrollbars:false,
		mouseWheel:true,
		probeType: 3
	})
	searchBtn();
	
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

function searchBtn(){
	var stageId = getParametersOnUrl('id');
	var areaId = $('.city>span').data('id');
	var majorCode = $('.major>span').data('id');
	var ageGroupId = $('.group>span').data('id');
	var total = $('.total>span').data('id');
	var likeStr = $('#studentName').val();
	sercice('https://www.easy-mock.com/mock/5a5dc59cd467601e4b7f5731/game/haixuan',showAllInfo,{
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
				var thumb = contestantPosts[i].thumb ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + contestantPosts[i].thumb:'img/list.png';
				var contestantPhoto = contestantPosts[i].contestantPhoto ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + contestantPosts[i].contestantPhoto:'img/lufei.jpg';
				var ballot = contestantPosts[i].ballot;
				var paragraphName = contestantPosts[i].paragraphName;
				var contestantName = contestantPosts[i].contestantName;
				var contestantPostId = contestantPosts[i].contestantPostId;
				var isLive = contestantPosts[i].isLive;
				$lis += '<li data-id="'+contestantPostId+'" islive="'+isLive+'">'
							+'<img src="'+thumb+'" alt="" class="img"/>'
							+'<img src="img/pause.png" class="pause">'
							+'<p>'
								+'<span>'+paragraphName+'</span>'
								+'<span style="float: right;color:#f44933;">'+ballot+'票</span>'
							+'</p>'
							+'<p>'
								+'<span>'
								+'<img src="'+contestantPhoto+'" alt=""  style="width: 0.6rem;height: 0.6rem;border-radius: 50%;display:inline-block;vertical-align: middle;"/>'
								+ contestantName
								+'</span>'
								+'<span class="vote">投他一票</span>'
							+'</p>'
						+'</li>'
			}
			$ul.append($lis);
			myscroll.refresh()
			
			$('.ulList ul li').on('tap',function(e){
				var isLive = $(this).attr('islive');
				var contestantPostId = $(this).data('id');
				self.location = "/ArtAppWeb/rest/b/share/details?isLive="+isLive+"&contestantPostId="+ contestantPostId;
			})
		}else{
			alert(data.msg);
		}
	}
}

