$(function() {
	$('select').change(function() {
		var text = $(this).find("option:selected").text(); 
		$(this).prev('b').html(text);
		
	})
	$('.add').click(function() {
		mui('#sheet1').popover('toggle');
		$('body').css({"overflow":"hidden"})
	})
	/*var picker = new mui.PopPicker(); 
	picker.setData([
 		{
	 		value:'zz',
	 		text:'录制小视频'
 		},
 		{
	 		value:'zz',
	 		text:'从相册中选取视频'
 		},
 		{
	 		value:'zz',
	 		text:'取消'
 		},
	]);
	$('.add').click(function() {
		picker.show(function (selectItems) {
		    console.log(selectItems[0].text);//智子
		    console.log(selectItems[0].value);//zz 
		})
	})*/
	
	//点击上传时实时显示图片
    /*$(".myUpload").change(function(){
        var src=getObjectURL(this.files[0]);//获取上传文件的路径
        $(".close").removeClass('hide');
        $(".add").addClass('hide');
        $(".show").removeClass('hide');
        $(".show").attr('src',src);//把路径赋值给img标签
    });*/

    //点击关闭按钮时恢复初始状态
    $(".close").click(function(){
        $(".close").addClass('hide');
        $(".add").removeClass('hide');
        $(".show").addClass('hide');
    });

    //获取上传文件的url
    /*function getObjectURL(file){
        var url = null;
        if (window.createObjectURL != undefined){
            url = window.createObjectURL(file);
        } else if (window.URL != undefined){
            url = window.URL.createObjectURL(file);
        }else if (window.webkitURL != undefined){
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
	}*/
})
	
