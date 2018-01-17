$(function() {
	var myscroll = new IScroll('.ulList',{
		scrollbars:false,
		mouseWheel:true,
		probeType: 3
	})
	var api = {
		"judge":path1+'/h5/share/json/judge.json'

	};
	
	sercice(api.judge,function(data){
		var teacherRecommend = data.body.teacherRecommend;
		console.log(teacherRecommend)
		var $ul = $('.ulList ul');
		$ul.empty();
		for (var i = 0; i < teacherRecommend.length; i ++) {			
			var thumb = teacherRecommend[i].thumb ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + teacherRecommend[i].thumb : path1 + "/h5/share/img/list.png";
			var userPhoto = teacherRecommend[i].userPhoto ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + teacherRecommend[i].userPhoto : path1 + "/h5/share/img/lufei.jpg";
			var userId = teacherRecommend[i].userId;
			var userName = teacherRecommend[i].userName;
			var count = teacherRecommend[i].count;
			var paragraphName = teacherRecommend[i].paragraphName;			
			var attachId = teacherRecommend[i].attachId;
			var url = teacherRecommend[i].url;
			var createTime = teacherRecommend[i].createTime;
			var $li = $('<li data-id="'+ userId +'">'+
						'<img src="'+ thumb +'" alt="" class="img"/>'+
						'<img src="/ArtAppWeb/h5/share/img/pause.png" alt="" class="pause"/>'+
						'<p>'+
							'<span>'+ teacherRecommend[i].pagragraphName +'</span>'+
							'<span style="float: right;color:#f44933;">'+ teacherRecommend[i].count +'票</span>'+
						'</p>'+
						'<p>'+	
							'<span>'+
							'<img src="'+ userPhoto +'" alt=""  style="width: 0.6rem;border-radius: 50%;display:inline-block;vertical-align: middle;"/>'+
							teacherRecommend[i].userName +
							'</span>'+								
							'<span class="vote">投他一票</span>'+
						'</p>'+
					'</li>')
			$ul.append($li);
		}
		myscroll.refresh();
		$('.ulList ul li').on('tap',function() {
			self.location = "/ArtAppWeb/rest/b/share/details?isLive=0&userId="+ userId;
		})
	},{
	})
	
	/*sercice(sUrl.selectTeacherRecommend,function(data){
		console.log(data.body);
	},{
		"contestId":2,
		"pageNum": 2,
		"pageSize": 10
	})*/
})
