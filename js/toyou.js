define([], function (){
	var URL='toyou/img/';
	
	/*获取保存相片信息的jason文件，data 里面保存的是jason数据*/
	var getPhotoData = function(){
		var data;
		$.ajaxSetup({ async :false});
		$.getJSON('toyou/data.txt').success(function(content){ 
			data = content;
		});
		return data;
	}

	/*解析相片信息*/
	var serialize = function(data){
		if(data==null)
			return;
		var urls=new Array()
		var len=data.length;
		for(var i=0;i<len;i++){
			urls[i] = URL + data[i].src;
		}
		return urls;
	}
	
	/*拼装html代码显示照片*/  // lazy-src
	var render = function(data){
		if(data==null)
			return;
		var liTmpl = "";
		for(var i=0,len=data.length;i<len;i++){
			liTmpl += '<li>\
							<div class="img-box">\
								<a class="img-bg" rel="example_group" href="'+data[i]+'"></a>\
								<img src="'+data[i]+'" alt="">\
							</div>\
						</li>';	
		}
		var ulTmpl = '<section class="archives album">\
					<ul class="img-box-ul">'+liTmpl+'</ul>\
					</section>';
		$(ulTmpl).appendTo($(".instagram"));
		changeSize();
	
		//$(".instagram").lazyload();
		$(".instagram").load();
		$("a[rel=example_group]").fancybox();
	}

	/*调整相片大小*/
	var changeSize = function(){	
		if($(document).width() <= 600){
			$(".img-box").css({"width":"auto", "height":"auto"});
		}else{
			var width = $(".img-box-ul").width();
			var size = Math.max(width*0.20, 105);   //var size = Math.max(width*0.26, 157);
			$(".img-box").width(size).height(16/9*size);
		}
		$('.instagram img').each(function() {
			
			/* 强制指定大小 */
			$(this).css("height", 16/9*size);
			$(this).css("width", size); 
			
			/* 等比例缩放*/
			/*
			var ratio = 0;  // 缩放比例
			var width = $(this).width();    // 图片实际宽度
			var height = $(this).height();  // 图片实际高度
			// 检查图片是否超宽
			if(width > size){
				ratio = size / width;   // 计算缩放比例
				$(this).css("width", size); // 设定实际显示宽度
				height = height * ratio;    // 计算等比例缩放后的高度 
				$(this).css("height", height);  // 设定等比例缩放后的高度
			}
			// 检查图片是否超高
			if(height > size){
				ratio = size / height; // 计算缩放比例
				$(this).css("height", size);   // 设定实际显示高度
				width = width * ratio;    // 计算等比例缩放后的高度
				$(this).css("width", width * ratio);    // 设定等比例缩放后的高度
			}
			*/
		})
	}
	
	var bind = function(){
		$(window).resize(function(){
			changeSize();
		});
	}
	function stop(){
		return false;
	}

	/*获取和显示相册*/
	var getAlbum = function(){
		var photoData = getPhotoData();
		var urls = serialize(photoData);
		render(urls);
	}
	return {
		init:function(){
			getAlbum();
			bind();
			//document.oncontextmenu = stop; //禁用鼠标右键
		}
	}
});

