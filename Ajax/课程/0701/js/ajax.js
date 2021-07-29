// method :get/post,
// url : 文件地址,
// async: 传输方式 true/false
// fn 每次执行的函数
// ajax('get','data/aa.txt',true),fn
function ajax(method,url,async,fn){
	if(window.XMLHttpRequest){
		var oajax=new XMLHttpRequest();
	}else{
		var oajax=new ActiveXObject('Microsoft.XMLHTT');
	}
	oajax.open(method,url,async);
	oajax.send();
	oajax.onreadystatechange=function(){
		switch(oajax.readyState){
			case 4:
			if(oajax.status==200){
				fn(oajax.responseText);
			}
			break;
		}
	};
}