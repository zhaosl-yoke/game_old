$(function() {
	var api = {
		"ranking":path1+'/h5/share/json/ranking.json'
	};
	sercice(api.ranking,function(data){
		var myPhoto = data.body.myPhoto ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + data.body.myPhoto : path1 + "/h5/share/img/lufei.jpg";
		var myRank = data.body.myRank;
		$('.p1 img').attr("src",myPhoto);
		$('.p2 i').html(myRank)
		var contestRanking = data.body.contestRanking;
		console.log(contestRanking)
		var $rankLists = $('.rankLists');
		$rankLists.empty();
		for (var i = 0; i < contestRanking.length; i ++) {			
			var userPhoto = contestRanking[i].userPhoto ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + contestRanking[i].userPhoto : path1 + "/h5/share/img/photo.png";
			var userId = contestRanking[i].userId;
			var userName = contestRanking[i].userName;
			var count = contestRanking[i].count;
			var userRank = contestRanking[i].userRank;
			var $rankList = $('<div class="rankList">'+
								'<div class="left">'+
									'<span>'+ userRank +'</span>'+
									'<img src="'+ userPhoto +'"/>'+
									'<span>'+ userName +'</span>'+
								'</div>'+
								'<div class="right">'+
									'<span>总票数：'+ count +'</span>'+
									//'<span>投票</span>'+
								'</div>'+
							'</div>')
		   $rankLists.append($rankList);
		}
	},{
	})
	/*sercice(sUrl.selectContestRanking,function(data){
		console.log(data.body);
	},{
		"contestId":2,
		"pageNum": 2,
		"pageSize": 10,
		"userId": 12
	})*/
})