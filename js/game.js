$(function() {
	var myscroll = new IScroll('.ulList',{
		scrollbars:false,
		mouseWheel:true,
		probeType: 3
	})
	var api = {
		"game":path1+'/h5/share/json/game.json'

	};
	/*sercice(sUrl.selectExcellentPostByContestId,function(data){
		console.log(data.body);
	},{
		"contestId":2,
		"pageNum": 2,
		"pageSize": 10
	})
	*/
	sercice(api.game,function(data){
		var posts = data.body.contest.posts;
		console.log(posts)
		var $ul = $('.ulList ul');
		$ul.empty();
		for (var i = 0; i < posts.length; i ++) {			
			var thumb = posts[i].thumb ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + posts[i].thumb : path1 + "/h5/share/img/list.png";
			var userPhoto = posts[i].userPhoto ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + posts[i].userPhoto : path1 + "/h5/share/img/lufei.jpg";
			var userId = posts[i].userId;
			var userName = posts[i].userName;
			var count = posts[i].count;
			var paragraphName = posts[i].paragraphName;			
			var attachId = posts[i].attachId;
			var url = posts[i].url;
			var createTime = posts[i].createTime;
			var $li = $('<li data-id="'+ userId +'">'+
						'<img src="'+ thumb +'" alt="" class="img"/>'+
						'<img src="/ArtAppWeb/h5/share/img/pause.png" alt="" class="pause"/>'+
						'<p>'+
							'<span>'+ posts[i].pagragraphName +'</span>'+
							'<span style="float: right;color:#f44933;">'+ posts[i].count +'票</span>'+
						'</p>'+
						'<p>'+	
							'<span>'+
							'<img src="'+ userPhoto +'" alt=""  style="width: 0.6rem;border-radius: 50%;display:inline-block;vertical-align: middle;"/>'+
							posts[i].userName +
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
	
})
