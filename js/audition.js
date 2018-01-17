$(function() {			
    var mySwiper = new Swiper('.swiper-container', {
		autoplay: 3000,//可选选项，自动滑动
		loop:true,
		pagination: '.swiper-pagination',
    })
    $('.list ul li').click(function() {
    	self.location = "/ArtAppWeb/rest/b/share/details"
    })
})


