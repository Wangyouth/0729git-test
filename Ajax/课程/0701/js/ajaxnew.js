// method :get/post,
// url : 文件地址,
// fn 每次执行的函数
// ajax('get','data/aa.txt',true),fn
function ajax(ops,url,fn){
	if(window.XMLHttpRequest){
		var oajax=new XMLHttpRequest();
	}else{
		var oajax=new ActiveXObject("Microsoft.XMLHTT")
	}
	oajax.open(ops,url,true);
	oajax.send();
	oajax.onreadystatechange=function(){
		switch(oajax.readyState){
			case 4:
			if(oajax.status==200){
				fn(oajax.responseText)
			}
			break;
		}
	}
}