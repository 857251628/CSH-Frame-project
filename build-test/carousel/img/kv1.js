// JavaScript Document


jQuery(function(){
	
	var IE6 = (window.XMLHttpRequest == undefined) && (ActiveXObject != undefined);
	var IE7 = (typeof document.addEventListener != 'function' && window.XMLHttpRequest && typeof document.querySelector =="undefined") ? true : false;
	
	
	var Carousel = function (obj){
		var $root = obj.event;
		var $slides = $root.find('.window .slide');
		var $eventBtn = $root.find('.indicator');
		$eventBtn.delegate('li','click',function(){
			var $this = $(this);
			$slides.eq($this.index()).fadeIn().siblings().fadeOut();
			$this.addClass(obj.active).siblings().removeClass(obj.active);
		});
		$slides.eq(0).show().siblings().hide();
		$eventBtn.find('li').eq(0).addClass(obj.active).siblings().removeClass(obj.active);
		var next = function(){
			var $next = $eventBtn.find('li.'+obj.active).next();
			if ( $next.length ){
				$next.click();
			}else{
				$eventBtn.find('li').eq(0).click();
			}
		}
		if(obj.flag){
			var flag_hover = setInterval(next,obj.autoTime);
		}
		$root.hover(function(){
			if(obj.flag){
				clearInterval(flag_hover);
			}
		},function(){
			if(obj.flag){
				flag_hover = setInterval(next,obj.autoTime);
			}
		});
	}
	
	Carousel({
		event 	:	$('.js_pl_home_kv'),
		flag	:	true,	//自动播放
		active	:	'active',	//选中样式
		autoTime:	1000	//播放间隔
	});
})

