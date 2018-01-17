//var path = document.getElementById('projectUrl').value+"/rest/b";
var path;
var path1="/ArtAppWeb";
var sUrl = {
	//"selectContestMainDetail":path+'selectContestMainDetail.json',
	//"test":path+'sign/test.json'
		"selectStagesInfo": path+"/bContestStage/selectStagesInfo",
		"selectAreas": path+"/bContestArea/selectAreas",
		"selectAgeGroups": path+"/bContestAgeGroup/selectAgeGroups",
		"selectWorks": path+"/bContestExerciseContestantPosts/selectWorks",
		"selectContestMainDetail": path+"/bContestMain/selectContestMainDetail",
		"selectRemarks": path+'/bContestContestantScoreList/selectRemarks',
		"selectVoters":path+"/bContestContestantScoreList/selectVoters",
		"selectTheWork":path+"/bContestExerciseContestantPosts/selectTheWork",
		"selectExcellentPostByContestId":path+"/bContestExerciseContestantPosts/selectExcellentPostByContestId",
		"selectTeacherRecommend":path+"/bContestContestantScoreList/selectTeacherRecommend",
		"selectContestRanking":path+"/bContestExerciseContestantPostsRecommend/selectContestRanking"
};

function sercice(sUrl, callback, strdat) {
	
    window.httpStatusCode = {
    	"Continue" : { status : 100, error  : "指示客户端可能继续其请求！" },
    	"OK" : { status : 200, error  : "请求成功！" },
    	"Redirect" : { status : 302, error  : "页面重定向异常！" },
    	"Unauthorized" : { status : 401, error  : "资源没有认证或会话超时，请认证资源或尝试退出重新登录！" },
    	"Forbidden" : { status : 403, error  : "该页面没有访问权限！" },
    	"Bad Request" : { status : 400, error  : "请求无效！" },
    	"Not Found" : { status : 404, error  : "页面没找到！" },
    	"Internal Server Error" : { status : 500, error  : "服务器内部错误!" }
    };
	
	return $.ajax({
		url : sUrl,
		cache : false,
		data : strdat,
		type : 'post',
		dataType : 'json',
		success : function(data) {
			if (data) {
				callback(data);
			}
		},
		error : function( jqXHR, textStatus ) {
			alert("114");
		}
	});

};

function getParametersOnUrl(parament) {
	var reg = new RegExp("(^|&)" + parament + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}

