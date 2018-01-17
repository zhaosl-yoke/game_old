var api = {
	"selectContestMainDetail":'json/selectContestMainDetail.json',
	"selectStagesInfo":'json/selectStagesInfo.json'
};
$(function() {
	var myscroll = new IScroll('.introduce',{
		scrollbars:false,
		mouseWheel:true,
		probeType: 3
	})
	$('#container .top ul li').click(function() {
		$(this).addClass('active').siblings().removeClass();
	})
	$('.error').click(function() {
		$(this).parent().hide();
	})
	/*查看广告详情*/
	$('.details').click(function() {
		self.location = "favor.html"
	})
	var par = sessionStorage.getItem('par');
	if (par == 1) {
		$('#container .top ul li:nth-child(1)').click(function() {
			/*$('.introduce').show();
			$('.production').hide();
			$('.notice').hide();
			$('#footer').show();*/
			show_introduce();
			sessionStroage.clear();
			sessionStorage.setItem('par',1);
		})
	} else if (par == 2) {
		$('#container .top ul li:nth-child(2)').click(function() {
			/*$('.production').show();
			$('.introduce').hide();	
			$('.notice').hide();
			$('#footer').hide();
			var myscroll = new IScroll('.production',{
				scrollbars:false,
				mouseWheel:true,
				probeType: 3
			})*/
			show_production();
			sessionStorage.setItem('par',2);
		})	
	}
	$('#container .top ul li:nth-child(1)').click(function() {
		/*$('.introduce').show();
		$('.production').hide();
		$('.notice').hide();
		$('#footer').show();*/
		show_introduce();
		sessionStroage.clear();
		sessionStorage.setItem('par',1);
	})
	$('#container .top ul li:nth-child(2)').click(function() {
		/*$('.production').show();
		$('.introduce').hide();	
		$('.notice').hide();
		$('#footer').hide();
		var myscroll = new IScroll('.production',{
			scrollbars:false,
			mouseWheel:true,
			probeType: 3
		})*/
		show_production();
		sessionStorage.setItem('par',2);
	})	
	$('#container .top ul li:nth-child(3)').click(function() {
		/*$('.notice').show();
		$('.production').hide();
		$('.introduce').hide();
		$('#footer').hide();*/
		show_notice();
		sessionStorage.setItem('par',3);
	})	
	function show_introduce() {
		$('.introduce').show();
		$('.production').hide();
		$('.notice').hide();
		$('#footer').show();
	}
	function show_production() {
		$('.production').show();
		$('.introduce').hide();	
		$('.notice').hide();
		$('#footer').hide();
		var myscroll = new IScroll('.production',{
			scrollbars:false,
			mouseWheel:true,
			probeType: 3
		})
	}
	function show_notice() {
		$('.notice').show();
		$('.production').hide();
		$('.introduce').hide();
		$('#footer').hide();
	}
	$(".showCon").click(function() {
		if($(this).hasClass('aa')){
			$(this).removeClass('aa');
			$(this).next().hide();
			$(this).find('.show').text("展开");
		}else{
			$(this).addClass('aa');
			$(this).next().show();
			$(this).find('.show').text("收起");
		}
    });
    var mySwiper = new Swiper('#mys', {
		//autoplay: 3000,//可选选项，自动滑动
		//loop:true,
		pagination: '.swiper-pagination',
    })
	$('.icon-share1').click(function() {
		var ua = navigator.userAgent,
			isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua),
			isIpad = /(iPad).*OS\s([\d_]+)/.test(ua),
			isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua),
			isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua),
			isWechat = /micromessenger/i.test(ua);
		if (isAndroid) {
			alert("hello world")
			function callback(backdata) {
			   alert(backdata)
			}
			$.native({
				action: 'back',
				callback: callback,
			});
		} else {
			alert("hello world"); 
			self.location = "test.html"
		}
	})
	sercice('https://www.easy-mock.com/mock/5a5dc59cd467601e4b7f5731/game/selectContestMainDetail',function(data){
		console.log(data.body);
		$('.p1').text(data.body.contestMain.desc1);
		for (var i = 0; i < data.body.contestStages.length; i++) {
			var $li = $('<li style="margin-right:0.2rem;box-sizing:border-box;">'+
							'<h2>'+data.body.contestStages[i].codeName+'</h2>'+
							'<p>'+formatDate(data.body.contestStages[i].startTime)+'-'+formatDate(data.body.contestStages[i].endTime)+'</p>'+
							'<a href="haixuan.html">点击查看>></a>'+
						'</li>')
			$('.activity ul').append($li);
		}
		myscroll.refresh();
	})
	sercice('https://www.easy-mock.com/mock/5a5dc59cd467601e4b7f5731/game/selectStagesInfo',function(data){
		var stagesInfo = data.body.stagesInfo;
		//console.log(stagesInfo)
		var timestamp = new Date().getTime();
		//console.log(timestamp)
		for(var i = 0; i< stagesInfo.length; i++) {
			var $ul = $('<ul data-id="'+ stagesInfo[i].id +'" data-type="'+ stagesInfo[i].stageType +'">'+
							'<span style="display:'+ (stagesInfo[i].promotedNum?"block":"none")+'">'+ stagesInfo[i].promotedNum +'人晋级</span>'+
							'<li>'+
								'<h3>#'+ stagesInfo[i].codeName+'#</h3>'+
								'<p class="p2">截止时间:'+ formatDate(stagesInfo[i].endTime) +'</p>'+
								'<p class="p3">'+ stagesInfo[i].desc1 +'</p>'+
								'<img style="display:'+ (stagesInfo[i].endTime < timestamp?"block":"none") +'" src="img/over.png">'+
								'<span style="color:'+ ((stagesInfo[i].stageType == "online" || stagesInfo[i].stageType =="onlineLive")?"green":"red") +'">'+ ((stagesInfo[i].stageType == "online"||stagesInfo[i].stageType == "onlineLive")?"线上":"线下") +'</span>'+
							'</li>'+
						'</ul>')
			$('.production div').append($ul);
		}
		$('.production ul').on('tap',function() {
			if ($(this).data('type') == "online") {
				self.location = "haixuan.html?id="+ $(this).data('id');
			} else if ($(this).data('type') == "onlineLive") {
				self.location = "broadcast.html?id="+ $(this).data('id');
			}
			
		}) 
	},{})
})
//时间戳转换成时间
function formatDate(now){  
	var   time = new Date(now)
    var   year = time.getFullYear();     
    var   month = time.getMonth()+1;     
    var   date = time.getDate();     
    var   hour = time.getHours();     
    var   minute = time.getMinutes();     
    var   second = time.getSeconds(); 
    return  year+"年"+month+"月"+date+"日";     
} 


