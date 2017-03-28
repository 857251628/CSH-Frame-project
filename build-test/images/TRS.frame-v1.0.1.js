/*
	TRSFrame 1.0.0 (build 63049cb)
	Copyright 2014 TRS Inc. All rights reserved.
*/

(function($){
	
	
	var IE6 = (window.XMLHttpRequest == undefined) && (ActiveXObject != undefined);
	var IE7 = (typeof document.addEventListener != 'function' && window.XMLHttpRequest && typeof document.querySelector =="undefined") ? true : false;
	
	
	
	/* ************* Name ***************
	// Readme: 左侧导航
	// Example usage:li.pengyang@trs.com.cn
	// Requires: jQuery 1.8.3+
	*******************************************/ 
	var sidebar = function(obj){
		var $slidebar = obj.event;
		var $slide = $slidebar.find(".slide");
		var $slideLen = $slide.length;
		$slide.each(function(index){
			$root =  $(this);
			var $slideUL = $root.find('ul');
			if($.trim($slideUL.html()) != ""){
				if($root.hasClass(obj.cur)){
					$root.find('.slide_lv2').slideDown();
				}
				$root.click(function(){
					$this = $(this);
					$slide_lv2 = $this.find('.slide_lv2');
					if($this.hasClass(obj.cur)){
						$slide_lv2.slideUp('fast',function(){
							$this.removeClass(obj.cur);
						});
					}else{
						$this.addClass(obj.cur).siblings().removeClass(obj.cur);
						$slide_lv2.hide();
						$slide_lv2.slideDown();
					}
				});
			}else{
				$root.addClass(obj.active);
			}
		});
	}
	/* ************* Name ***************
	// Readme: 滚动新闻
	// Example usage:li.pengyang@trs.com.cn
	// Requires: jQuery1.8.3+
	*******************************************/ 
	var newsScroll = function (obj){
		//obj.param传递 进来的ID;
		var $root = obj.param;
		var $this = this;

		var $scrolLi = $root.find('li');
		this.initRoll = function(){
			$root.find("ul:first").animate({
				//滚动新闻
				marginTop:"-" + obj.top + "px"
			},500,function(){
				//第一条数据累加到最后	
				$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
			});
		}
		//设置计时器 根据obj.time的值来相隔多长时间进行
		//initRoll()方法
		var setTimes = setInterval(function(){
			$this.initRoll();
		},obj.time);
		//鼠标在上面的时候不进行动画,移除定时器. 移出时重置定时器
		$scrolLi.hover(function(){
			clearInterval(setTimes);
		},function(){
			setTimes = setInterval(function(){
				$this.initRoll();
			},obj.time);
		});
		
	}
	
	
	/* ************* Name ***************
	// Readme: 星星评分效果
	// Example usage:li.pengyang@trs.com.cn
	// Requires: jQuery1.8.3+
	*******************************************/ 
	var starLevel = function(obj){
		var $starRoot = obj.param;
		var $dataStr = $starRoot.find('.dataStr');
		var $str = $starRoot.find('.str');
		var $star_num = $starRoot.find('.star_num');
		var $star_a = $star_num.find('a');
		
		$star_a.hover(function(){
			var $this = $(this);
			var pos = obj.starHeight * parseInt(this.id);
			$star_num.css('background-position','0 -' + pos + 'px')
		},function(){
			$star_a.each(function(){
				var $this  = $(this);
				if($this.hasClass('cur')){
					var pos = obj.starHeight * parseInt(this.id);
					$star_num.css('background-position','0 -' + pos + 'px');
					return false;
				}else{
					$star_num.css('background-position','0 0')
				}
			});
		});
		$star_a.click(function(){
			var $this = $(this);
			$this.addClass('cur').siblings().removeClass('cur');
			var str = $dataStr.attr("data-sr_t"+this.id);
			$str.attr("star_id",this.id).html(str);
			
		});
	}
	/* ************* Name ***************
	// Readme: 图片放大缩功能
	// Example usage:li.pengyang@trs.com.cn
	// Requires: jQuery1.8.3+
	*******************************************/ 
	
	var imgZoom = function(){
		jQuery('.js_pd_small_gallery').each(function(index, element) {
			var $root = jQuery(this);
			var $pic_mid = $root.find('.js_pic_mid');
			var $pic_mid_img = $root.find('.js_pic_mid_img');
			var $btn_show_gallery = $root.find('.js_show_gallery');
			var $scroll_products = $root.find('.js_scroll_products ul li a');
			var $gallery = jQuery('.js_pd_gallery');
			if(IE6){
				$pic_mid.hover(function(){
					$pic_mid.addClass('hover');
				},function(){
					$pic_mid.removeClass('hover');
				})
			}
			
			$scroll_products.click(function(){
				var $root = $(this);
				var $picURL = $root.attr("rel");
				$pic_mid_img.attr("src",$picURL);
			});
			
			$btn_show_gallery.on('click',function(){
				$gallery.fadeIn();
			});
			
			
		});
		
		
		
		Scroll($(".js_scroll_products"),1,3000,0,"js_scroll_prev","js_scroll_next",1,0)
		
		//init js_pd_gallery
		jQuery('.js_pd_gallery').each(function(index, element) {
		var $root = jQuery(this);
			var $stage = $root.find('.js_stage');
			var $stage_img = $stage.find('img');
			var $thumbs_ul = $root.find('.js_thumbs');
			var $thumbs = $thumbs_ul.find('li');
			var $btn_prev = $root.find('.js_prev');
			var $btn_next = $root.find('.js_next');
			var $btn_plus = $root.find('.js_plus');
			var $btn_minus = $root.find('.js_minus');
			var $btn_close = $root.find('.js_gallery_close');
			
			
			var $bar = $root.find('.js_bar');
			var $track = $root.find('.js_track');
			var $bar_dot = $root.find('.js_bar_dot');
			
			var stage_w = $stage.width();
			var stage_h = $stage.height();
			
			var $win = jQuery(window);
			
			var size_max = 2000;
			var size_min = 470;
			
			
			var thumbs_unit_width = 69;
			var thumbs_window_size = 8;
			var thumbs_count = $thumbs.length;
			var thumbs_window_max = thumbs_count - thumbs_window_size;
			
			
			if( thumbs_count <= thumbs_window_size ){
				$btn_prev.hide();
				$btn_next.hide();
			}else{
				var cur_window = 0;
				
				$btn_prev.on('click',function(){
					var next_window = cur_window - 1;
					if( next_window < 0 ) return;
					offset_x = next_window*thumbs_unit_width;
					$thumbs_ul.animate({'left':-offset_x});
					cur_window = next_window;
				})
				
				$btn_next.on('click',function(){
					var next_window = cur_window + 1;
					if( next_window > thumbs_window_max ) return;
					offset_x = next_window*thumbs_unit_width;
					$thumbs_ul.animate({'left':-offset_x});
					cur_window = next_window;
				})
			}
			
			
			var track_height = $track.height();
			
			var resize_to = function( pct,_x,_y ){
				var x = _x || stage_w/2;
				var y = _y || stage_h/2;
				var tar_size = parseInt( ( size_max - size_min ) * (pct/100) + size_min );
				var cur_img_w = $stage_img.width();
				var cur_img_h = $stage_img.height();
				var cur_img_offset = $stage_img.offset();
				var cur_stage_offset = $stage.offset();
				
				var img_2_stage_ox = cur_stage_offset.left - cur_img_offset.left;
				var img_2_stage_oy = cur_stage_offset.top - cur_img_offset.top;
				
				var a_2_img_ox = img_2_stage_ox + x;
				var a_2_img_oy = img_2_stage_oy + y;
				
				var a_2_img_oxp = a_2_img_ox/cur_img_w;
				var a_2_img_oyp = a_2_img_oy/cur_img_h;
				
				var tar_img_ox = tar_size * a_2_img_oxp;
				var tar_img_oy = tar_size * a_2_img_oyp;
				
				var tar_img_2_stage_ox = tar_img_ox - x;
				var tar_img_2_stage_oy = tar_img_oy - y;
				
				//var tar_img_x = cur_stage_offset.left - tar_img_2_stage_ox;
				//var tar_img_y = cur_stage_offset.top - tar_img_2_stage_oy;
				
				$stage_img.css({
					'width':tar_size,
					'height':tar_size,
					'left':-tar_img_2_stage_ox,
					'top':-tar_img_2_stage_oy
				});
				
			}
			
			var set_bar_to = function(pct){
				pct = parseInt(pct);
				pct = pct > 100 ? 100:pct;
				pct = pct < 0 ? 0 :pct;
				var apx = (100 - pct)*track_height/100;
				$bar_dot.css({
					'top':apx+'px'
				})
				$bar_dot.data('pct',pct);
			}
			
			var reset_img = function(){
				$stage_img.width(size_min).height(size_min);
				var left = ( stage_w - size_min ) / 2;
				var top = ( stage_h - size_min ) / 2;
				$stage_img.css({
					'left':left,
					'top':top
				})
				set_bar_to(0);
			}
			
			var init_stage = function($li_obj){
				var image_l_url = $li_obj.data('image_l');
				$stage_img.attr('src',image_l_url);
				reset_img();
			}
			
			
			var bar_dot_moy;
			var bar_dot_start_drag = false;
			$bar_dot.on('mousedown',function(e){
				var bar_dot_oy = $bar_dot.offset().top;
				var bar_dot_my = e.pageY;
				bar_dot_moy = bar_dot_my - bar_dot_oy;
				bar_dot_start_drag = true;
				e.preventDefault();
				return false;
			});

			$bar.on('mouseup mouseenter',function(e){
				bar_dot_start_drag = false;
			});
			
			$bar.on('mousemove',function(e){
				if( bar_dot_start_drag ){
					var track_oy = $track.offset().top;
					var my = e.pageY;
					var dot_tar_y = my + 0;
					
					var dot_tar_offset = parseInt(dot_tar_y) - parseInt(track_oy);
					
					if ( dot_tar_offset >=0 && dot_tar_offset<=track_height ){
						/*
						$bar_dot.css({
							'top':dot_tar_offset
						})
						*/
						var pct = parseInt( dot_tar_offset*100/track_height ) || 0;
						var apct = 100-pct;
						set_bar_to(apct);
						resize_to(apct);
					}
					e.preventDefault();
				}
			});


			var stage_start_move = false;
			var img_ox,img_oy; 
			$stage_img.on('mousedown',function(e) {
		  var img_offset = $stage_img.offset();
				img_ox = img_offset.left - e.pageX;
				img_oy = img_offset.top - e.pageY;
				stage_start_move = true;
				e.preventDefault();
		});
			
			$stage.on('mouseup mouseenter',function(){
				stage_start_move = false;
			})
			
			
			$stage.on('mousemove',function(e){
				if( stage_start_move ){
					var stage_offset = $stage.offset();
					
					var tar_img_x = e.pageX + img_ox - stage_offset.left;
					var tar_img_y = e.pageY + img_oy - stage_offset.top;
					
					$stage_img.css({
						'left':tar_img_x,
						'top':tar_img_y
					})
					e.preventDefault();
				}
			});
			
			$btn_plus.on('click',function(){
				var $this_btn = jQuery(this);
				var cur_pct = $bar_dot.data('pct');
				var next_pct = cur_pct+10;
				next_pct = next_pct >100 ?100 :next_pct;
				set_bar_to(next_pct);
				resize_to(next_pct);
			})
			
			$btn_minus.on('click',function(){
				var $this_btn = jQuery(this);
				var cur_pct = $bar_dot.data('pct');
				var next_pct = cur_pct-10;
				next_pct = next_pct < 0  ? 0 :next_pct;
				set_bar_to(next_pct);
				resize_to(next_pct);
			})		
			
			$btn_close.on('click',function(){
				$root.fadeOut();
			})

			// init slide
			$thumbs.click(function(){
				var $cur_thumb = jQuery(this);
				init_stage($cur_thumb);
				$cur_thumb.addClass('active').siblings().removeClass('active');
				return false;
			});
			
			// mouse wheel init
			
			$stage.on('mousewheel',function(e,d){
				var cur_pct = $bar_dot.data('pct');
				var next_pct = cur_pct+d*3;
				next_pct = next_pct >100 ?100 :next_pct;
				next_pct = next_pct <0 ?0 :next_pct;
				set_bar_to(next_pct);
				
				var stage_offset = $stage.offset();
				var mx = e.pageX - stage_offset.left;
				var my = e.pageY - stage_offset.top;
				resize_to(next_pct,mx,my);
				return false;
			})
			
			
		
			$thumbs.eq(0).click();
			
	  });
		
		
	}
	
	/* ************* Name ***************
	// Readme: 焦点图
	// Example usage:li.pengyang@trs.com.cn
	// Requires: jQuery1.8.3+
	*******************************************/ 
	var focusMap = function (obj){
		var $imgRoot = $('#js_focus_image');
		var $list = $imgRoot.find('.item');
		var $controler = $imgRoot.find('.controler b');
		var autoPlay = obj.autoPlay;
		var flag = obj.autoPlay;
		var index = 0;
		var autoTime = obj.autoTime;
		$list.eq(0).addClass(obj.cur);
		$controler.eq(0).addClass(obj.cur)
		var goTo = function (){
			var $next = $imgRoot.find('.controler b.cur').next();
			if($next.length){
				$next.click();
			}else{
				$controler.eq(0).click();
			}
		}
		
		$controler.click(function(){
			var $this = $(this);
			var index = $this.index();
			var item = $list.eq(index);
			var img = item.find('.poster');
			img.attr("src",img.attr('data-src'));
			item.fadeIn().addClass('cur').siblings().fadeOut().removeClass('cur');
			$this.addClass('cur').siblings().removeClass('cur');
		}).hover(function(){
			if(autoPlay){flag = false;}
		},function(){
			if(autoPlay){flag = true;}
		});
		$list.hover(function(){if(autoPlay){flag = false;}},function(){if(autoPlay){flag = true;}});
		window.setInterval(function(){
			if(flag){
				goTo()
			}
		},autoTime);
	}
	/* ************* jQuery Ext jQuery.fn. ***************
	// jQuery 
	// Readme:页面飘窗广告
	// Example usage:li.pengyang@trs.com.cn
	// Requires: jQuery
	// LastModify:yyyy-MM-dd
	*********************************************************** */ 
	
	var pluginName = 'floatingAd';
    var defaults = {
		step: 1,
		delay: 50, 
		isLinkClosed: false,
		onClose: function(elem){}
    };
    var ads = {
    	linkUrl: '#',
    	'z-index': '100',
    	'closed-icon': '',
    	imgHeight: '',
    	imgWidth: '',
    	title: '',
    	img: '#',
    	linkWindow: '_blank',
    	headFilter: 0.2
    };

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend(
        	{}, 
        	defaults, 
        	options, 
        	{
        		width: $(window).width(),
				height: $(window).height(),
        		xPos: this.getRandomNum(0, $(window).width() - $(element).innerWidth()), 
				yPos: this.getRandomNum(0, 300),
				yOn: this.getRandomNum(0, 1),
				xOn: this.getRandomNum(0, 1),
				yPath: this.getRandomNum(0, 1),
				xPath: this.getRandomNum(0, 1),
				hOffset: $(element).innerHeight(),
				wOffset: $(element).innerWidth(),
				fn: function(){},
				interval: 0
			}
        );
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype = {
    	init: function () {
    		var elem = $(this.element);
    		var defaults = this.options;
    		var p = this;
    		var xFlag = 0;
    		var yFlag = 0;
    		
    		elem.css({"left": defaults.xPos + p.scrollX(), "top": defaults.yPos + p.scrollY()});
    		defaults.fn = function(){
		    	defaults.width = $(window).width();
				defaults.height = $(window).height();
				
				if(xFlag == p.scrollX() && yFlag == p.scrollY()){
					elem.css({"left": defaults.xPos + p.scrollX(), "top": defaults.yPos + p.scrollY()});
					if (defaults.yOn)
						defaults.yPos = defaults.yPos + defaults.step;
					else
						defaults.yPos = defaults.yPos - defaults.step;
				
					if (defaults.yPos <= 0) {
						defaults.yOn = 1;
						defaults.yPos = 0;
					}
					if (defaults.yPos >= (defaults.height - defaults.hOffset)) {
						defaults.yOn = 0;
						defaults.yPos = (defaults.height - defaults.hOffset);
					}
					
					if (defaults.xOn) 
						defaults.xPos = defaults.xPos + defaults.step;
					else
						defaults.xPos = defaults.xPos - defaults.step;
		
					if (defaults.xPos <= 0) {
						defaults.xOn = 1;
						defaults.xPos = 0;
					}
					if (defaults.xPos >= (defaults.width - defaults.wOffset)) {
						defaults.xOn = 0;
						defaults.xPos = (defaults.width - defaults.wOffset);
					}
				}
				yFlag = $(window).scrollTop();
				xFlag = $(window).scrollLeft();
   			};
   			this.run(elem, defaults);
    	},
    	run: function(elem, defaults){
    		this.start(elem, defaults);
    		this.adEvent(elem,defaults);
    	},
    	start: function(elem, defaults){
    		elem.find('div.close').hide();
    		defaults.interval = window.setInterval(defaults.fn,  defaults.delay);
    		window.setTimeout(function(){elem.show();}, defaults.delay);
    	},
    	getRandomNum: function (Min, Max){  
			var Range = Max - Min;  
			var Rand = Math.random();  
			return(Min + Math.round(Rand * Range));  
		},
		getPath: function(on){
			return on ? 0 : 1;
		},
		clear: function(elem, defaults){
			elem.find('div.close').show();
			window.clearInterval(defaults.interval);
		},
		close: function(elem, defaults, isClose){
			elem.unbind('hover');
  			elem.hide();
  			if(isClose)
				defaults.onClose.call(elem);
		},
		adEvent: function(elem, defaults){
			var obj = {
				elem: this,
			  	fn_close: function() {
			   		this.elem.close(elem, defaults, true);
			  	},
			  	fn_clear: function() {
			  		if(this.elem.options.isLinkClosed)
			  			this.elem.close(elem, defaults, false);
			  	}
			};
			
    		elem.find('div.button').bind('click', jQuery.proxy(obj, "fn_close"));
    		
    		elem.find('a').bind('click', jQuery.proxy(obj, "fn_clear"));
    		
    		var stop = {
				elem: this,
			  	over: function(){
			    	this.elem.clear(elem, defaults);
			  	},
			  	out: function(){
					this.elem.start(elem, defaults);
			  	}
			};
    		
    		elem.hover(
			    jQuery.proxy(stop, "over"),
				jQuery.proxy(stop, "out")
			);
		},
		scrollX: function(){
			var de = document.documentElement;
			return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
		},
		scrollY: function(){
			var de = document.documentElement;
			return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
		}
	};
    $.fn.floatingAd = function(options) {
        return this.children("div").each(function (i, elem) {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
	$.floatingAd = function(options){
		
		if(options){
	    	if(options.ad){
	    		var adDiv = $('#' + pluginName);
	    		
	    		if(adDiv.length <= 0)
		    		adDiv = $('<div>', {
		    			'id': pluginName,
		    			'class': pluginName
		    		}).appendTo('body');
		    		
	    		for(var i in options.ad){
	    			
	    			var ad = options.ad[i];
	    			ad = $.extend({}, ads, ad);
	    			//漂浮层
	    			var div = $('<div>', {
	    				'class': 'ad'
	    			});
	    			
	    			div.css("z-index", ad['z-index']);
	    			
	    			//关闭层
	    			var closeDiv = $('<div>', {
	    				'class': 'open'
	    			});
	    			$('<div>', {
	    				'class': 'opacity',
	    				'style': 'opacity: ' + ad.headFilter + ';filter: alpha(opacity = ' + ad.headFilter*100 + ');'
	    			}).appendTo(closeDiv);
	    			
	    			$('<div>', {
	    				'class': 'text'
	    			}).append(
	    				$('<div>', {
	    					'class': 'title',
	    					'text': ad.title
	    				})
	    			).append(
	    				$('<div>', {
	    					'class': 'button',
	    					'style': ad['closed-icon'] ? 'background:url("' + ad['closed-icon'] + '") no-repeat;' : ''
	    				})
	    			).appendTo(closeDiv);
	    			
	    			closeDiv.appendTo(div);
	    			
	    			//内容层
					var picArr = ad.pic;
					for(var i = 0, l = picArr.length-1; i < l; i++){
						var content = '';
						if(i == 0){
							content = $('<div class="itemList no" >');
						}else{
							content = $('<div class="itemList" style="display:none;" >');
						}
						$('<a>', {
							href: ad.pic[i].linkUrl,
							target: ad.pic[i].linkWindow,
							title: ad.pic[i].title
						}).append(
							$('<img>', {
								'src': ad.pic[i].img,
								'style': (ad.pic[i].imgHeight ? 'height:' + ad.pic[0].imgHeight + 'px;' : '') + 
										 (ad.pic[i].imgWidth ? 'width:' + ad.pic[0].imgWidth + 'px;' : '')
							})
						).appendTo(content);
						content.appendTo(div);
	    			}
	    			content.appendTo(div);
	    			div.appendTo(adDiv);
	    		}
				
				var $imgItems = $(".itemList");
				var len = $imgItems.size();
				var curLen = 0;
				var $open = $(".open");
				var autoFlag = true;
				var imgItem = function(){
					var imgCur = $imgItems.eq(curLen);
					if(imgCur.hasClass('no')){
						curLen = imgCur.index()-1;
						curLen = curLen+1;
						imgCur.hide().removeClass('no');
						$imgItems.eq(curLen).show().addClass('no');
						if(curLen == (len)){
							curLen = 0;
							$imgItems.eq(0).show().addClass('no');
							$imgItems.eq(0).siblings().hide().removeClass('no')
							$open.show();
							
						};
					}
				}
				setInterval(function(){
					if(autoFlag == true){
						imgItem();
					}
				}, 1000);
				
				$imgItems.hover(function(){autoFlag = false;},function(){autoFlag = true;});
				delete options.ad;
	    		$('#' + pluginName).floatingAd(options);
	    	}
	    } 
		else
	      	$.error('漂浮广告错误!');
	};
	
	var floatingAd = function(obj){
		$.floatingAd(obj)
	}

/*
 method productScroll v1.0.0
 =================================

 Infomation
 ----------------------
 Author : renchengxiang
 E-Mail : ren.chengxiang@trs.com.cn
 Date : 2014-02-10
 Readme:scroll products

 Example
 ----------------------
 options:	//get configed parameters
 
 $("#productsdiv").productScroll({
	scrollnum:scrollnum,//scroll number per click
	timer:timer,//how time to scroll to the end
	hidebtn:hidebtn,//if hide button when no scroll products  1 is hide;0 is show
	prevclassname:prevclassname,//the classname of the left/top button
	nextclassname:nextclassname,//the classname of the right/down buttton
	scrolldirect:scrolldirect//scroll direction  0 is left right  1 is top down
});

 Supported in Internet Explorer, Mozilla Firefox,Chrome
 */

	$.fn.productScroll = function(options){
		//scrollnum 每次单击滚动个数 ; timer 鼠标左右指向移动多长时间滚动到尽头毫秒; hidebtn 没有滚动对象之后是否隐藏按钮 1 隐藏  0 不隐藏;prevclassname 单击向左的class名   nextclassname 单击向右的class名  scrolldirect:滚动方向  0 左右滚动  1 上下滚动 istoscroll:是否鼠标移向滚动 1 滚动  0不滚动 
		//scrollnum: scroll num per click    timer:how time to scroll to the end    hidebtn:if hide button when no scroll products  1 is hide;0 is show  prevclassname:the classname of the left/top button   nextclassname:the classname of the right buttton  scrolldirect：scroll direction  0 is left right  1 is top down  istoscroll：if scroll when mouse over 1 scroll 0 not scroll
		var defaults={scrollnum:1,timer:4000,hidebtn:1,prevclassname:"js_scroll_prev",nextclassname:"js_scroll_next",scrolldirect:0,istoscroll:1};
		$.extend(defaults,options);
		return this.each(function(){
			var $scrollRoot=$(this);//滚动div//scroll div
			var $scrollItem = $scrollRoot.find("ul");//滚动ul//scroll ul
			var $prev = $scrollRoot.parent().find("."+defaults.prevclassname);//左侧按钮prev //left button prev
			var $next = $scrollRoot.parent().find("."+defaults.nextclassname);//右侧按钮next //right button next
			var rootW = $scrollRoot.width();//滚动容器宽度 // the width of the scroll container
			if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
				rootW=$scrollRoot.height();//滚动容器高度// the height of the scroll container
			}
			var rootX = $scrollRoot.offset().left;
			if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
				rootX =$scrollRoot.offset().top;
			}
			var listLen = $scrollItem.find("li").size();//需要滚动li个数   //the length of the li
			var listW=$scrollItem.find("li").eq(0).outerWidth();// 一个滚动单位的宽度  //the width of one li
			if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
				listW=$scrollItem.find("li").eq(0).outerHeight();// 一个滚动单位的高度度  //the height of one li
			}
			var scrollwPerClick=listW*defaults.scrollnum;//每次单击滚动宽度  //scroll width per click button
			var slideW = listW*listLen - rootW;	
			var direction = 0;	// 0: 表示向左,  1: 表示向右   //0  is  to left   1 is to right
			
			if(defaults.istoscroll){//如果需要滚动
			$scrollRoot.on({
				'mouseenter': function(e){
					if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
						moveTo(e.pageY - rootX < (rootW / 2) ? 0 : 1);
					}else{// 左右滚动  left right scroll
						moveTo(e.pageX - rootX < (rootW / 2) ? 0 : 1);
					}
					moveTo(e.pageX - rootX < (rootW / 2) ? 0 : 1);
				},
				'mousemove' : function(e){
					if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
						if (e.pageY - rootX < (rootW / 2) && direction == 1){
							moveTo(0);
						}
						if (e.pageY - rootX > (rootW / 2) && direction == 0){
							moveTo(1);
						}
					}else{// 左右滚动  left right scroll
						if (e.pageX - rootX < (rootW / 2) && direction == 1){
							moveTo(0);
						}
						if (e.pageX - rootX > (rootW / 2) && direction == 0){
							moveTo(1);
						}
					}
				},
				'mouseleave': function(e){
					if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
						var x = parseFloat($scrollItem.css('top')),
						i = Math[direction ? 'floor' : 'ceil'](x / listW);
						$scrollItem.stop(true, false).animate({ 'top': listW * i }, {
						'duration': 'fast',
						'step': hideButton,
						'complete': hideButton
						});
					}else{// 左右滚动  left right scroll
						var x = parseFloat($scrollItem.css('left')),
						i = Math[direction ? 'floor' : 'ceil'](x / listW);
						$scrollItem.stop(true, false).animate({ 'left': listW * i }, {
						'duration': 'fast',
						'step': hideButton,
						'complete': hideButton
						});
					}
				}
			});
			}
			
			$prev.click(function(){
				if ($scrollItem.filter(':animated').length) return;

				var $this = $(this);
				var curLeft = parseFloat($scrollItem.css("left"));
				if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
					curLeft = parseFloat($scrollItem.css("top"));
				}
				var posX = curLeft+scrollwPerClick;
				$next.show();//可能设置的被隐藏了，因此需要显示 // it may be hide so should be show
				if(curLeft <= "-" + scrollwPerClick){
					if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
						$scrollItem.animate({
							"top": posX
						},300);
					}else{// 左右滚动  left right scroll
						$scrollItem.animate({
							"left": posX
						},300);
					}
				}else{
					if(defaults.hidebtn){//隐藏按钮 //hide the button
						$this.hide();
					}
					if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
						$scrollItem.animate({
							"top": 0
						},300);
					}else{// 左右滚动  left right scroll
						$scrollItem.animate({
							"left": 0
						},300);
					}
				}
			});
			
			$next.click(function(){
				if ($scrollItem.filter(':animated').length) return;
				
				var $this = $(this);
				var curLeft = parseFloat($scrollItem.css("left"));
				if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
					curLeft = parseFloat($scrollItem.css("top"));
				}
				isNaN(curLeft) && (curLeft = 0);
				var posX = curLeft -scrollwPerClick;

				$prev.show();//可能设置的被隐藏了，因此需要显示 // it may be hide so should be show
				if((listW*listLen + curLeft) >= (rootW + 1 + scrollwPerClick)){
					if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
						$scrollItem.animate({
							"top": posX
						},300);
					}else{// 左右滚动  left right scroll
						$scrollItem.animate({
							"left": posX
						},300);
					}
				}else{
					if(defaults.hidebtn){//隐藏按钮 //hide the button
						$this.hide();
					}
					if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
						$scrollItem.animate({
							"top": "-" + slideW
						},300);
					}else{// 左右滚动  left right scroll
						$scrollItem.animate({
							"left": "-" + slideW
						},300);
					}
				}
			});
			
			function moveTo(dir){
				if(slideW<0){//没有填充满容器
					return;
				}
				direction = dir;//设置转换方向  //set scroll direction
				if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
					$scrollItem.stop(true, false).animate({ 'top': dir ? -slideW : 0 }, {
						'duration': defaults.timer,//鼠标滑动时间控制  //mouse scroll of control timer
						'step': hideButton,
						'complete': hideButton
					});
				}else{
					$scrollItem.stop(true, false).animate({ 'left': dir ? -slideW : 0 }, {
						'duration': defaults.timer,//鼠标滑动时间控制  //mouse scroll of control timer
						'step': hideButton,
						'complete': hideButton
					});

				}
			}
			//鼠标事件进行按钮的隐藏操作 //hide the left/right button if set hide
			function hideButton(){
				var x = $scrollItem.css('left');		
				if(defaults.scrolldirect){//如果 上下滚动 // if scroll top down
					x = $scrollItem.css('top');
				}
				x == 'auto' && (x = 0);
				x = parseFloat(x);
				$prev.show();
				$next.show();

				if (x >= 0&&defaults.hidebtn){
					$prev.hide();
				}
				if (x <= -slideW&&defaults.hidebtn) {
					$next.hide();
				}
			}
			hideButton();
		});
	};

	/*
	 TRS.Page v1.0.0
	 =================================

	 Infomation
	 ----------------------
	 Author : lipengyang
	 E-Mail : lipengyang@trs.com.cn
	 Date : 2014-01-24
	 Readme:分页效果

	 Example
	 ----------------------
	 pram1:	//分页数据URL
	 pram2:	//分页输入选择器
	 pram3:	//数据输入选择器
	 insertItem: //定义分页数据样式

	 TRS.Page('data/data[n].xml','#page','#data');
	 function insertItem(data) {
	 return "<li><a href=\""+$(data).attr('url')+"\" title=\""+$(data).attr('title')+"\" target=\"_blank\">"+$(data).text()+"</a></li>";
	 }

	 Supported in Internet Explorer, Mozilla Firefox
	 */
	 var xmlData = null;	
	var pageIndexTpl  = 1;
	var Page = function(){
		var $this = this;
		this._start = 1;
		this._end = 1;
		this._pageIncludeTpl = 5; //页码数量
		
		/**
		 * 在显示之前计算各种页码变量的值
		 */
		this._makeUrl = function(obj) {
			var _dataUrl = obj.dataUrl;
			var _pageIndex = obj.pageIndex-1;
			if( _pageIndex >0){
				_dataUrl = _dataUrl.replace(".xml", '_' + _pageIndex + '.xml');
				_dataUrl = _dataUrl.replace(_dataUrl.substring(_dataUrl.indexOf("_")), '_' + _pageIndex + '.xml');
				return _dataUrl;
			}else{
				return _dataUrl;
			}
			return obj.dataUrl.replace(dataUrl.substring(dataUrl.indexOf("_")), (obj.pageIndex-1) > 0 ? '_' + (obj.pageIndex-1) + '.xml' : '.xml'); 
		}
		
		this._showData = function (obj){
			$(obj.pageData).html("")
			for(var i = 0 ;i < xmlData.length ;i++){
				var strHTML = obj.ajaxData(xmlData[i]);
				$(obj.pageData).append(strHTML);
			}		
			if(obj.expand == undefined){
				$this._render(obj);
			}else{
				obj.expand(obj);
			}
		}
		
		this._getData = function(obj) {
			obj.dataUrl = $this._makeUrl(obj);
			$.ajax({
				type: "get",
				dataType: "xml",
				url: obj.dataUrl,
				cache: false,
				async: false,
				success: function (xml){
					xmlData = $(xml).find("item");
					obj.pageCount = $(xml).find("pageCount").text();
					$this._showData(obj);
				},
				error: function (xml) {
					xmlData = null;
				}
			});
		}
		this._calculate = function(obj){
			if(obj.pageCount<5){
				this._pageIncludeTpl=obj.pageCount;
			}
			obj.pageIndex = parseInt(obj.pageIndex);
			if(obj.pageIndex>obj.pageCount){
				obj.pageIndex = obj.pageCount;
			}
			if(obj.pageIndex<1){
				obj.pageIndex = 1;
			}
			$this._start = Math.max(1, obj.pageIndex - parseInt(this._pageIncludeTpl/2));//
			$this._end = Math.min(obj.pageCount, $this._start + this._pageIncludeTpl - 1);//最后一个页码按钮的页码数
			$this._start = Math.max(1, $this._end - this._pageIncludeTpl + 1);//第一个页码按钮的页码数
		}
		this._render = function(obj){
			$this._calculate(obj);
			var htmlStr = "";
			var currpage = parseInt(obj.pageIndex);
			htmlStr += '<span class="paginations">';
			if(1!=currpage){
				htmlStr += '<span class="n"><a href="javascript:;" page='+(currpage-1)+' class="hi_bl"><b>上一页</b></a></span>';
			}
			htmlStr += '<span class="p"> ';
			if(1!=currpage){
				htmlStr+= '<a href="javascript:;" page="1">1</a>';
			}
			var temp1=4;
			if(obj.pageCount<6){
				temp1=5;
			}
			if(currpage>temp1){
				htmlStr+= '<a href="javascript:;">...</a>';
			}
			for(var i=$this._start;i<=$this._end;i++){
				if(i==currpage){
					htmlStr+= "<em>"+i+"</em>";			
				}else{
					if(i!=1 && i!=obj.pageCount){
						htmlStr+= '<a href="javascript:;" page="'+i+'">'+i+'</a>';
					}
				}
			}
			var temp=3;
			if(obj.pageCount<6){
				temp=5;
			}
			if (currpage + temp < obj.pageCount) {
				htmlStr+= '<a href="javascript:;">...</a>';
			}
			if (currpage != obj.pageCount) {
				htmlStr+= '<a href="javascript:;" page="'+obj.pageCount+'">'+obj.pageCount+'</a>';
			}
			htmlStr += "</span>";
			if(obj.pageCount!=currpage){
				htmlStr += '<span class="n"><a href="javascript:;" page='+(currpage+1)+' class="hi_br"><b>下一页</b></a></span>';
			}
			
			htmlStr += '</span>';
			$(obj.pageId).html(htmlStr);
			var a_list = $(obj.pageId).find("a");
			for(var i=0;i<a_list.length;i++){
				a_list[i].onclick = function(){
					var index = this.getAttribute("page");
					if(index != undefined && index != ''){
						obj.pageIndex = index;
						if(obj.pageType == "WCM"){
							$this._getData(obj);
						}else if(obj.pageType == "APP"){
							var results = {"pageIndex":obj.pageIndex,"pageCount":obj.pageCount};
							obj.ajaxData(results);
							if(obj.expand == undefined){
								$this._render(obj);
							}else{
								obj.expand(obj);
							}
						}
						
					}
				}
			}
		}
	}
	var getPage = function (param){
		var obj = {
			"pageType":param.pageType,
			"ajaxData":param.ajaxData,
			"pageId":param.pageId,
			"pageData":param.pageData,
			"dataUrl":param.dataUrl,
			"pageIndex":1,
			"pageCount":0,
			"expand":param.expand
		} 
		if(obj.pageType == "WCM"){
			new Page()._getData(obj);
		}else if(obj.pageType == "APP"){
			var results = obj.ajaxData();
			if(results != null){
				obj.pageCount = results.pageCount;
				if(obj.expand == undefined){
					new Page()._render(obj);
				}else{
					obj.expand(obj);
				}
			}
		}
		
	}

	/*
	 getValue v1.0.0
	 =================================

	 Infomation
	 ----------------------
	 Author : lipengyang
	 E-Mail : lipengyang@trs.com.cn
	 Date : 2004-01-24
	 Readme:获取URL参数

	 Example
	 ----------------------
	 pram1:	//获取参数名

	 Supported in Internet Explorer, Mozilla Firefox
	 */
	var getValue = function(pram1) {
		var str = window.location.search;
		if (str.indexOf(pram1) != -1) {
			var pos_start = str.indexOf(pram1) + pram1.length + 1;
			var pos_end = str.indexOf("&", pos_start);
			if (pos_end == -1) {
				return str.substring(pos_start);
			} else {
				return str.substring(pos_start, pos_end);
			}
		} else {
			return "";
		}
	};

	/*
	 ChangeTab v1.0.0
	 =================================

	 Infomation
	 ----------------------
	 Author : lipengyang
	 E-Mail : lipengyang@trs.com.cn
	 Date : 2004-01-24
	 Readme:tab切换效果

	 Example
	 ----------------------
	 pram1:	//定义标题切换选择器
	 pram2:	//定义内容切换选择器
	 pram3:	//切换定义class
	 pram4:	//是否异步请求tab
	 Supported in Internet Explorer, Mozilla Firefox
	 */
	var ChangeTab = function(pram1, pram2, pram3, pram4) {
		pram1.each(function(index) {
			var $this = $(this);
			if (index == 0) {
				$this.addClass(pram3);
				pram2.eq(index).show();
			}
			$this.click(function() {
				if (pram4) {
					var $parent = $this.parent();
					var curIdx = $parent.index();
					var relURL = $this.attr("rel");
					$.ajax({
						type : "get",
						dataType : "html",
						url : relURL,
						cache : false,
						async : false,
						success : function(data) {
							$this.addClass(pram3);
							$parent.siblings().find("a").removeClass(pram3);
							pram2.html(data);
						},
						error : function(xml) {
							//xmlData = null;
						}
					});
				} else {
					var $parent = $this.parent();
					var curIdx = $parent.index();
					$this.addClass(pram3);
					$parent.siblings().find("a").removeClass(pram3);
					pram2.eq(curIdx).show().siblings().hide();
				}
			});
		});
	};

	/*
	TRS.Slide v1.0.0
	=================================

	Infomation
	----------------------
	Author : lipengyang
	E-Mail : lipengyang@trs.com.cn
	Date : 2004-01-24

	Example
	----------------------
	event 	:	$('.js_pl_home_kv'),	//选择器
	flag	:	true,	//自动播放
	active	:	'active',	//按钮选中class
	autoTime:	1000	//播放间隔
	Supported in Internet Explorer, Mozilla Firefox
	*/
	//BEGIN
	var Slide = function (obj){
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
	//END

/*
 method fix v1.0.0
 =================================

 Infomation
 ----------------------
 Author : liuqiwen
 E-Mail : liu.qiwen@trs.com.cn
 Date : 2014-02-20
 Readme:固定元素位置

 Example
 ----------------------

 Supported in Internet Explorer, Mozilla Firefox
 */
	/*****************************************模块固定start*****************************************/
	var ve = $.browser,
	isIE6 = function() {
		return ve.msie && (ve.version === "6.0");
	}, 
	/**
	 * 设置固定节点样式
	 * @method to
	 * @param $this{Object} 当前节点
	 * @param val{String} 要记录的节点className.
	 * @param fn{Function} 处理方法
	 */
	access = function($this, val, fn) {
		var name = "qd_fix_" + val;
		if (!$this.hasClass(name)) {
			$this.addClass(name);
			if (!!fn) {
				fn(name);
			}
		}
	}, styleHook = {
		"auto" : "0px"
	},
	/**
	 * 记录节点固定前的样式
	 * @method to
	 * @param $this{Object} 当前节点
	 * @param name{String} 要记录的节点样式.
	 * 
	 */
	oldStyle = {}, 
	oldStyleFn = function($this, name) {
		var obj = oldStyle[$this], val = {}, tem = "";
		if (!obj) {
			obj = oldStyle[$this] = {};
		}
		tem = val[name] = $this.css(name);
		if (isIE6) {
			val[name] = styleHook[tem] || tem;
		}
		$.extend(obj, val);
	},
	/**
	 * 根据固定位置设置处理方法
	 * @method to
	 * @param $this{Object} 当前节点
	 * @param mar{String} 固定位置
	 * @param px{Number} 固定位置像素
	 */
	fixHook = {}, 
	typeName = ["top", "bottom", "left", "right", "center", "middle"],
	typeNameHook = {"top":"left", "bottom":"left", "left":"top", "right":"top","center":"top","middle":"left"};
	$.each(typeName, function(i, val) {
		fixHook[val] = val === "center" ? function($this) {
			access($this, val, function() {
				oldStyleFn($this, "margin-left");
				$this.css("margin-left", "-" + $this.width() / 2 + "px");
			});
		} : val === "middle" ? function($this) {
			access($this, val, function() {
				oldStyleFn($this, "margin-top");
				$this.css("margin-top", "-" + $this.height() / 2 + "px");
			});
		} : function($this) {
			access($this, val);
		};
	});
	fixHook.abs = function($this , mar , px){
		oldStyleFn($this, mar);
		if(isIE6()){
           if(mar==="top"){
		     $this.attr("style" , "top:expression((topwindowscroll=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop)+"+px+"+'px' )"); 
		   }else{
		      $this.get(0).style[mar]=px+"px";
		   }
		}else{
		   $this.get(0).style[mar]=px+"px";  
		}
	};
	/**
	 * 元素固定位置对外处理方法
	 * @method to
	 * @param id{String} 元素id
	 * @param type{String} 固定位置
	 * @param id{String} 元素固定完成后需要添加的className
	 */
	var fix = function(id, type, clas) {
		var types = type.split(","), i = 0,
            $this = $("#" + id) ,
			mar = "",
			flag = false;
			fn = null;
		if (!$this.hasClass("qd_fix")) {
			$this.addClass("qd_fix");
		}
		try {
			for (; i < 2; i++) {
				type = types[i];
				fn = fixHook[type];
				if (!!type && !!fn) {
                    fn($this);
                    flag = true;
                    continue;
                }
				type = parseInt(type);
				if(isNaN(type)){
				   continue;
				}
				mar = flag&&types[0] || i&&"top" || "left";
				mar = typeNameHook[mar];
				if(!!mar){
				   fixHook.abs($this , mar , type);
				}
				
			}
		} catch (e) {
			throw new Error(e);
		}
		if (!!clas) {
			$this.addClass(clas);
		}
	};
	/**
	 * 移除元素固定位置对外处理方法
	 * @method to
	 * @param id{String} 元素id
	 * @param type{String} 移除位置
	 * @param id{String} 元素固定移除后需要移除的className
	 */
	var fixRemove = function(id, type, clas) {
		var types = type && type.split(",") || typeName, 
			i = 0, l = types.length, 
			$this = $("#" + id), 
			css = oldStyle[$this];
		$this.removeClass("qd_fix");
		for (; i < l; i++) {
			type = types[i];
			if (!!type) {
				$this.removeClass("qd_fix_" + type);
			}
		}
		if (!!clas) {
			$this.removeClass(clas);
		}
		$this.css(css);
		delete oldStyle[$this];
	};
	/*****************************************模块固定end*****************************************/

	/******************************页面滚动start****************************************************/
	/**
	*Scroll products.
	*@method Scroll
	*@param idobj:滚动对象容器
	*@param scrollnum表示一次滚动的数目  default value 1
	*@param timer表示鼠标以上多长时间滚动到尽头，单位为毫秒 default value 4000
	*@param hidebtn表示是否隐藏左右/上下滚动按钮0表示不隐藏，1表示隐藏 default value 1
	*@param prevclassname表示左/上按钮的类名，便于前端开发人员自由传递定义的自己的类名 default value "js_scroll_prev"
	*@param nextclassname表示右/下按钮的类名，便于前端开发人员自由传递定义的自己的类名 default value "js_scroll_next"
	*@param scrolldirect表示滚动方向，0表示左右滚动 1表示上下滚动 当然左右滚动还是上下滚动前端通过样式控制  default value 0
	*@param istoscroll表示鼠标移向是否滚动，1表示滚动 0表示不滚动   default value 1
	*/
	var Scroll=function(idobj,scrollnum,timer,hidebtn,prevclassname,nextclassname,scrolldirect,istoscroll){
		if(!idobj){
			alert("idobj is null");
			return false;
		}
		idobj.productScroll({
			scrollnum:scrollnum,
			timer:timer,
			hidebtn:hidebtn,
			prevclassname:prevclassname,
			nextclassname:nextclassname,
			scrolldirect:scrolldirect,
			istoscroll:istoscroll
		});
	};
	/***********************************页面滚动end***********************************************/
	
	window.TRS = {
		Page 		: 	getPage,
		getValue 	: 	getValue,
		ChangeTab 	: 	ChangeTab,
		Slide 		: 	Slide,
		fix 		: 	fix,
		fixRemove 	: 	fixRemove,
		floatingAd:	floatingAd, 	//飘窗广告
		Scroll 		: 	Scroll, //页面滚动
		imgZoom		:	imgZoom,//图片放大缩小
		starLevel	:	starLevel,//星星评分效果
		newsScroll	:	newsScroll,//滚动新闻
		sidebar		:	sidebar,//左侧导航
		focusMap	:focusMap	//焦点图

	};

})(jQuery);
