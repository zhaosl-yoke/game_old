var api={
		"note" : path1+"/h5/share/json/note.json"
}
$(function(){
	var contestantPostId = getParametersOnUrl('contestantPostId');
	sercice(api.note,callBack,{
		"contestantPostId":contestantPostId
	})
	function callBack(data){
		if(data.success){
			var $ul = $('#container ul');
			var $lis = "";
			var voterInfos = data.body.voterInfos;
			$.each(voterInfos,function(index,item){
				var voterName = item.voterName;
				var voterPath = item.voterPath ? "http://artapp-dev-bucket.oss-cn-beijing.aliyuncs.com/" + item.voterPath : path1 + "/h5/share/img/lufei.jpg";
				var isVip = item.isVip;
				var vipImg ="";
				if(isVip){
					vipImg = '<img src="'+path1+'/h5/share/img/VIP.png" class="vip"/>'
				}
				$lis += '<li>'
							+'<img src="'+voterPath+'" class="pic">'
							+'<span class="name">'+voterName+'</span>'
							+vipImg
						+'</li>';
			})
			$ul.append($lis);
		}
	}
})