/*
	TRSFrame 1.0.0 (build 63049cb)
	Copyright 2014 TRS Inc. All rights reserved.
*/

(function($){
	
	
	var IE6 = (window.XMLHttpRequest == undefined) && (ActiveXObject != undefined);
	var IE7 = (typeof document.addEventListener != 'function' && window.XMLHttpRequest && typeof document.querySelector =="undefined") ? true : false;
	
	/* ************* Name ***************
	// Readme: 轮播图(Plugin carousel)
	// Example usage:li.pengyang@trs.com.cn
	// Requires: jQuery 1.8.3+
	// event 	:	$('.js_pl_home_kv'),	//选择器
	// flag	:	true,	//自动播放
	// active	:	'active',	//按钮选中class
	// autoTime:	1000	//播放间隔
	Supported in Internet Explorer, Mozilla Firefox
	*******************************************/ 
	var Carousel = function (obj){
		obj.event.each(function(index, element) {
			var $root = jQuery(this);
			var $slides = $root.find('.window .slide');
			var $indicator = $root.find('.indicator');
			var $nextBtn = $root.find('.js_scroll_next');
			var $prevBtn = $root.find('.js_scroll_prev');
				
			$indicator.find('li').click(function(){
				var $root = $(this);
				var index = $root.index();
				$slides.eq(index).fadeIn(obj.animate).siblings().fadeOut(obj.animate);
				$(this).addClass('active').siblings().removeClass('active');
			});
			
			
			$slides.eq(0).show().siblings().hide();
			$indicator.find('li').eq(0).addClass('active').siblings().removeClass('active');
			
			var next = function(){
				var $next = $indicator.find('li.active').next();
				if ( $next.length ){
					$next.click();
				}else{
					if(obj.autoLoop){
						$indicator.find('li').eq(0).click();
					}
				}
			};
			
			var prev = function(){
				var $prev = $indicator.find('li.active').prev();
				if ( $prev.length ){
					$prev.click();
				}else{
					if(obj.autoLoop){
						$indicator.find('li').eq($indicator.find('li').length-1).click();
					}
				}
			};
			
			if(obj.directionNav){
				$nextBtn.click(function(){
					next();
				});
				$prevBtn.click(function(){
					prev();
				});
			}else{
				$nextBtn.hide();
				$prevBtn.hide();
			}
			
			
			if(obj.flag){
				var flag_hover = false;
				$root.hover(function(){
					flag_hover = true;
				},function(){
					flag_hover = false;
				});
				
				window.setInterval(function(){
					if( !flag_hover ){
						next();
					}
				},obj.autoTime);
			}
		});
	};
	
	
	
	/* ************* Name ***************
	// Readme: 左侧导航
	// Example usage:li.pengyang@trs.com.cn
	// Requires: jQuery 1.8.3+
	*******************************************/ 
	var sidebar = function(obj){
		var $slidebar = obj.event;
		var $slide = $slidebar.find(".slide");
		var $slideLen = $slide.length;
		var $item = $slide.find('span');
		$item.each(function(index){
			var $root =  $(this);
			var $parent = $root.parent();
			var $slideUL = $parent.find('ul');
			if($.trim($slideUL.html()) != ""){
				var $slideLv2 = $parent.find('.slide_lv2');
				if($parent.hasClass(obj.cur)){
					//slideDown 将对象这个动画效果只调整元素的高度，
					// 可以使匹配的元素以“滑动”的方式显示出来
					$slideLv2.slideDown();
				}
				$root.click(function(){
					var $this = $(this);
					var $thisParent = $this.parent();
					$slide_lv2 = $thisParent.find('.slide_lv2');
					if($thisParent.hasClass(obj.cur)){
						$slide_lv2.slideUp('fast',function(){
							$thisParent.removeClass(obj.cur);
						});
					}else{
						$thisParent.addClass(obj.cur).siblings().removeClass(obj.cur);
						$slide_lv2.hide();
						$slide_lv2.slideDown();
					}
				});
				var item_a = $slideLv2.find('a');
				item_a.click(function(){
					var $this = $(this);
					$this.parent().parent().parent().siblings().find('.slide_lv2').find('a').removeClass(obj.cur);
					$this.addClass(obj.cur).parent().siblings().find('a').removeClass(obj.cur);
					
				});
				
				
			}else{
				$parent.addClass(obj.active);
			}
		});
	}
	/* ************* Name ***************
	// Readme: 滚动新闻
	// Example usage:li.pengyang@trs.com.cn
	// Requires: jQuery1.8.3+
	*******************************************/ 
	var newsScroll = function (obj){
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
		var setTimes = setInterval(function(){
			$this.initRoll();
		},obj.time);
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
		$list.eq(0).addClass(obj.currentClass);
		$controler.eq(0).addClass(obj.currentClass)
		var goTo = function (){
			var $next = $imgRoot.find('.controler b.'+obj.currentClass).next();
			if($next.length){
				$next.click();
			}else{
				$controler.eq(0).click();
			}
		}
		
		$controler[obj.trigger](function(){
			var $this = $(this);
			var index = $this.index();
			var item = $list.eq(index);
			var img = item.find('.poster');
			img.attr("src",img.attr('data-src'));
			item.fadeIn().addClass(obj.currentClass).siblings().fadeOut().removeClass(obj.currentClass);
			$this.addClass(obj.currentClass).siblings().removeClass(obj.currentClass);
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
	var getPage = function(obj){
		var $this = this;
		this._createPage = function (obj){
			var total_page = parseInt( obj.pageCount );	//总页数
			var current_page = parseInt( obj.pageIndex );	//当前页数
			var pager_length = obj.pageLength;    //不包next 和 prev 必须为奇数
			var pager = new Array( pager_length );
			var header_length = obj.headerKeep; 		//头部预留页码
			var tailer_length = obj.footerKeep;		//尾部预留页码
			//header_length + tailer_length 必须为偶数
			var main_length = pager_length - header_length - tailer_length; //必须为奇数
			var tagStr = obj.tagStr;		
			var classStr = obj.classStr;
			var idStr = obj.idStr;
			var nameStr = obj.nameStr;
			var disable_class = obj.disable;
			var select_class = obj.active;
			var i;
			var code = '';
			var numRel = '';
			
			if( total_page < current_page ){
				alert('总页数不能小于当前页数');
				return false;    
			}   
			//判断总页数是不是小于 分页的长度，若小于则直接显示
			if( total_page < pager_length ){
				for(i = 0; i < total_page; i++){
					code += (i+1 != current_page) ? $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:i+1}) : $this.createTag({tagStr:tagStr,classStr:select_class,idStr:idStr,nameStr:nameStr,a_html:i+1});
				}
			}else{//如果总页数大于分页长度，则为一下函数
				//先计算中心偏移量
				var offset = ( pager_length - 1) / 2;
				//分三种情况，第一种左边没有...
				if( current_page <= offset + 1){
					var tailer = '';
					//前header_length + main_length 个直接输出之后加一个...然后输出倒数的    tailer_length 个
					for( i = 0; i < header_length + main_length; i ++){
						code += (i+1 != current_page) ? $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:i+1}) : $this.createTag({tagStr:tagStr,classStr:select_class,idStr:idStr,nameStr:nameStr,a_html:i+1});
					}
					code += $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:'...'});
					for(i = total_page; i > total_page - tailer_length; i --){
						tailer = $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:i}) + tailer;
					}
					code += tailer;
				} else if( current_page >= total_page - offset ){//第二种情况是右边没有...
					var header = '';
					//后tailer_length + main_length 个直接输出之前加一个...然后拼接 最前面的 header_length 个
					for( i = total_page; i >= total_page-main_length - 1; i --){
						code = (( current_page != i ) ? $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:i}) : $this.createTag({tagStr:tagStr,classStr:select_class,idStr:idStr,nameStr:nameStr,a_html:i})) + code;
					}
					code = $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:'...'}) + code;
					for( i = 0; i < header_length ; i++){
						header += $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:i+1});
					}
					code = header + code;
				}else{ //最后一种情况，两边都有...
					var header = '';
					var tailer = '';
					//首先处理头部
					for( i = 0; i < header_length; i ++){
						header += $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:i+1});
					}
					header += $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:'...'});
					//处理尾巴
					for(i = total_page; i > total_page - tailer_length; i --){
						tailer = $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:i}) + tailer;
					}
					tailer = $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:'...'}) + tailer;
					//处理中间
					//计算main的中心点
					var offset_m = ( main_length - 1 ) / 2;
					var partA = '';
					var partB = '';
					var j;
					var counter = (parseInt(current_page) + parseInt(offset_m));
					for(i = j = current_page ; i <= counter; i ++, j --){
						partA = (( i == j ) ? '' : $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:j})) + partA;
						partB += ( i == j ) ? $this.createTag({tagStr:tagStr,classStr:select_class,idStr:idStr,nameStr:nameStr,a_html:i}) : $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:i});
					}
					//拼接
					code = header + partA + partB + tailer; 
				}
			}
			
			var prev = ( current_page == 1 ) ? $this.createTag({tagStr:tagStr,classStr:disable_class,idStr:idStr,nameStr:nameStr,a_html:obj.prevName,classPage:obj.classPage}) : $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:obj.prevName,classPage:obj.classPage});
			if(1 != current_page){
				prev = ( current_page == 1 ) ? $this.createTag({tagStr:tagStr,classStr:disable_class,idStr:idStr,nameStr:nameStr,a_html:obj.prevName,pageIndex:current_page,classPage:obj.classPage}) : $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:obj.prevName,pageIndex:(current_page - 1),classPage:obj.classPage});
			}
			var next = ( current_page == total_page ) ? $this.createTag({tagStr:tagStr,classStr:disable_class,idStr:idStr,nameStr:nameStr,a_html:obj.nextName,classPage:obj.classPage}) : $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:obj.nextName,classPage:obj.classPage});
			if(obj.pageCount != current_page){
				next = ( current_page == total_page ) ? $this.createTag({tagStr:tagStr,classStr:disable_class,idStr:idStr,nameStr:nameStr,a_html:obj.nextName,pageIndex:current_page,classPage:obj.classPage}) : $this.createTag({tagStr:tagStr,classStr:classStr,idStr:idStr,nameStr:nameStr,a_html:obj.nextName,pageIndex:(current_page + 1),classPage:obj.classPage});
			}
			code = prev + code + next;
			return code;
			
		}
		/**
		 * 计算分页URL值
		 */
		this._makeUrl = function(obj) {
			var _dataUrl = obj.dataUrl;
			var _pageIndex = obj.pageIndex-1;
			_dataUrl = _dataUrl.replace(".xml", '_' + _pageIndex + '.xml');
			if( _pageIndex >0){
				_dataUrl = _dataUrl.replace(_dataUrl.substring(_dataUrl.lastIndexOf("_")), '_' + _pageIndex + '.xml');
			}else{
				_dataUrl = _dataUrl.replace(_dataUrl.substring(_dataUrl.lastIndexOf("_")),'.xml');
			}
			return _dataUrl;
		}
		/**
		* 	数据的填充
		*/
		this._showData = function (obj){
			var $pageData = $(obj.pageData);
			$pageData.html("")
			for(var i = 0 ;i < xmlData.length ;i++){
				var strHTML = obj.ajaxData(xmlData[i]);
				$pageData.append(strHTML);
			}
		}
		/**
		*	请求数据
		*/
		this._getData = function(obj) {
			$.ajax({
				type: obj.ajaxType,
				dataType: obj.ajaxDataType,
				url: $this._makeUrl(obj),
				cache: false,
				async: false,
				success: function (xml){
					xmlData = $(xml).find("item");
					obj.pageIndex = $(xml).find("pageIndex").text();
					obj.pageCount = $(xml).find("pageCount").text();
					$this._showData(obj);
				},
				error: function (xml) {
					xmlData = null;
				}
			});
		}
		//创建标签
		this.createTag = function(obj){
			classStr = (obj.classStr == '') ? '' : ' class="' + obj.classStr + '"';
			idStr = (obj.idStr == '') ? '' : ' id="' + obj.idStr + '"';
			nameStr = (obj.nameStr == '') ? '' : ' name="' + obj.nameStr + '"';
			if(!isNaN(obj.a_html)){
				numRel = 'page="'+ obj.a_html +'"';
			}else{
				numRel = '';
			}
			var code = '';
			//判断是否上一页下一页
			if( obj.pageIndex != undefined){ 	
				numRel = 'page="'+ obj.pageIndex +'"';
				var classPage = ' class="'+ obj.classPage +'"';
				if(obj.tagStr == 'a'){
					code = '<' + obj.tagStr + classPage + idStr + numRel + nameStr+' href="javascript:;">' + obj.a_html + '</' + obj.tagStr + '>';
				}else{
					code = '<' + obj.tagStr + classPage + idStr + numRel + nameStr + ' >' + obj.a_html + '</' + obj.tagStr + '>';
				}
			}else{
				if(obj.tagStr == 'a'){
					code = '<' + obj.tagStr + classStr + idStr + numRel + nameStr+' href="javascript:;">' + obj.a_html + '</' + obj.tagStr + '>';
				}else{
					code = '<' + obj.tagStr + classStr + idStr + numRel + nameStr + ' >' + obj.a_html + '</' + obj.tagStr + '>';
				}
			}
			return code;
		}
		if(obj.pageType == "WCM"){
			$this._getData(obj);
		}else{
			var results = obj.ajaxData();
			if(results != null){
				obj.pageIndex = results.pageIndex;
				obj.pageCount = results.pageCount;
			}
		}
		var pageStr = $this._createPage(obj);
		if(pageStr){
			var $page = $(obj.pageId);
			$page.html(pageStr);
			//绑定点击事件
			$page.delegate(obj.tagStr,'click',function(){
				var $then = $(this);
				var page = $then.attr("page");
				if(page != undefined && !$then.hasClass(obj.active)){
					obj.pageIndex = page;
					pageStr = $this._createPage(obj);
					if(pageStr){
						$page.html(pageStr);
					}
					if(obj.pageType == "WCM"){
						$this._getData(obj);
					}else{
						var results = {"pageIndex":obj.pageIndex,"pageCount":obj.pageCount};
						obj.ajaxData(results);
					}
				}
			});
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
	 Trim v1.0.0
	 =================================

	 Infomation
	 ----------------------
	 Author : lipengyang
	 E-Mail : lipengyang@trs.com.cn
	 Date : 2014-10-24
	 Readme:去字符串空格

	 Example
	 ----------------------
	 pram1:	//传入字符串
	 pram2:	//去掉字符串中所有空格(包括中间空格,需要设置第2个参数为:g)
	 Supported in Internet Explorer, Mozilla Firefox
	 */
	
	var Trim = function(obj){
		var result;
		var result = obj.str.replace(/(^\s+)|(\s+$)/g,"");
		if(obj.is_global.toLowerCase()=="g"){
			result = result.replace(/\s/g,"");
		}
		return result;
	}
	/*
	 delHTML v1.0.0
	 =================================

	 Infomation
	 ----------------------
	 Author : lipengyang
	 E-Mail : lipengyang@trs.com.cn
	 Date : 2014-10-24
	 Readme:去除HTML标签

	 Example
	 ----------------------
	 pram1:	//传入字符串
	 Supported in Internet Explorer, Mozilla Firefox
	 */
	function delHTML(str){
		var words = '';
		words = str.replace(/<[^>]+>/g,"");
		return words;
	}

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
	tabCurrentClass:	//切换定义class
	async:	//是否异步请求tab
	accessibility:	//是否无障碍tab
	trigger://事件
	Supported in Internet Explorer, Mozilla Firefox
	*/
	var ChangeTab = function(obj) {
		obj.pram1.each(function(index) {
			var $this = $(this);
			if (index == 0) {
				$this.addClass(obj.tabCurrentClass);
				obj.pram2.eq(index).show();
			}
			$this[obj.trigger](function(){
				if (obj.async) {//异步请求tab数据
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
							$this.addClass(obj.tabCurrentClass);
							$parent.siblings().find("a").removeClass(obj.tabCurrentClass);
							obj.pram2.html(data);
						},
						error : function(xml) {
							//xmlData = null;
						}
					});
				} else {
					var $parent = $this.parent();
					var curIdx = $parent.index();
					$this.addClass(obj.tabCurrentClass);
					$parent.siblings().find("a").removeClass(obj.tabCurrentClass);
					if(obj.accessibility){//判断无障碍
						curIdx = $this.attr('rel');
						obj.pram2.hide();
						obj.pram2.eq(curIdx).show();
					}else{
						obj.pram2.eq(curIdx).show().siblings().hide();
					}
					
				}
			});
		});
	};
	/*
	Select v1.0.0
	=================================

	Infomation
	----------------------
	Author : lipengyang
	E-Mail : lipengyang@trs.com.cn
	Date : 2004-01-24
	Readme:select 重写效果

	Example
	----------------------
	param:$(".select1"),		//选择器
	classHover:'open_hover',	//选项选中状态效果
	classOpen:'tag_select_open',//选项打开状态效果
	classSelect:'tag_select',	//选项框class样式
	classOption:'tag_options'	//选项框class样式
	Supported in Internet Explorer, Mozilla Firefox
	*/
	var Select = function(obj){
		var $root = obj.param;
		$root.hide().each(function(){
			var $root = $(this);
			//判断是否有回调函数
			obj.onComplete = obj.onComplete || false;
			//创建选项插件
			var $divSelect = $('<div></div>').insertAfter($root).addClass(obj.classSelect);
			var $options = $('<ul></ul>').insertAfter($divSelect).addClass(obj.classOption).hide();
			var optionArr = [];
			var items = $root.find('option');
			//创建选项
			for(var i = 0, l = items.length; i < l; i++){
				var item = $(items[i]);
				//默认选中项
				if(item.attr("selected")){$divSelect.html(item.text());}
				optionArr.push('<li>' + item.text() + '</li>');
			}
			//注册选件打开关闭事件
			$divSelect.on('click',function(){
				var $this = $(this);
				//判断选项是否打开
				if($this.hasClass(obj.classOpen)){
					$this.removeClass(obj.classOpen);
					$options.hide();
				}else{
					$this.addClass(obj.classOpen);
					$options.show();
				}
			}).hover(function(){
				$(this).addClass('tag_select_hover');
			},function(){
				$(this).removeClass('tag_select_hover');
			});
			$options.html(optionArr.join(""))
					.hover(function(){//选中选项状态
						$(this).addClass('item_hover');
					},function(){
						$(this).removeClass('item_hover');
					})
					.find('li')
					.hover(function(){
						$(this).addClass(obj.classHover);
					},function(){
						$(this).removeClass(obj.classHover);
					}).on('click',function(){//点击选择选项
						var $this = $(this);
						$root.find('option').eq($this.index()).attr("selected","selected").siblings().attr("selected",false);
						$divSelect.removeClass(obj.classOpen);
						$divSelect.html($this.text());
						$options.hide();
						//回调函数
						if(obj.onComplete){obj.onComplete($this)}
					});
			//注册Esec关闭选项事件
			$(document).on('keyup',function(e){
				var myEvent = e || window.event;
				var keyCode = myEvent.keyCode;
				if (keyCode == 27){
					$options.hide();
					$divSelect.removeClass(obj.classOpen);
				}
			});	
			//注册点击文档框关闭选项事件
			$(document).on('click',function(){
				if(!$options.hasClass('item_hover') && !$divSelect.hasClass('tag_select_hover')){
					$divSelect.removeClass(obj.classOpen);
					$options.hide();
				}
			});
		});
	}
	/*
	Radio v1.0.0
	=================================

	Infomation
	----------------------
	Author : lipengyang
	E-Mail : lipengyang@trs.com.cn
	Date : 2004-01-24
	Readme:radio 重写效果

	Example
	----------------------
	param:$('.js_radio'),		//选择器
	classWrap:'radioWrapper',	//外层样式
	classRadio:'radio',			//按钮样式
	classChecked:'radioChecked' //按钮选中样式
	onComplete					//回调函数，点击按钮后执行
	Supported in Internet Explorer, Mozilla Firefox
	*/
	var Radio = function(obj){
		var $root = obj.param;
		$root.each(function(){
			var root = $(this);
			var $input = root.find('input:radio');
			//判断回调函数
			obj.onComplete = obj.onComplete || false;
			for(var i = 0, l = $input.length; i < l; i++){
				var input = $($input[i]);
				var checked = input.attr("checked");
				//创建radio按钮
				var $radioWrap = $('<span></span>');
				var $radioLink = $('<a href="javascript:;"></a>');
				if(checked){$radioLink.addClass(obj.classChecked)}
				$radioLink
					.addClass(obj.classRadio)
					.insertAfter(input.wrap($radioWrap.addClass(obj.classWrap)))
					.on('click',function(){
						var $this = $(this);
						//取消其它按钮选中效果
						root.find('.' + obj.classChecked).removeClass(obj.classChecked).siblings().attr("checked",false);
						//增加当前按钮选中效果
						$this.addClass(obj.classChecked).siblings().attr("checked","checked");
						//回调函数
						if(obj.onComplete){obj.onComplete($this)}
					});
			}
		});
	}
	/*
	Checkbox v1.0.0
	=================================

	Infomation
	----------------------
	Author : lipengyang
	E-Mail : lipengyang@trs.com.cn
	Date : 2004-01-24
	Readme:Checkbox 重写效果

	Example
	----------------------
	param:$('.js_checkbox'),				//选择器
	classWrap:'jqTransformCheckboxWrapper',	//外层样式
	classCheckbox:'jqTransformCheckbox',	//按钮样式
	classChecked:'jqTransformChecked',	//按钮选中样式
	classCheckboxAll:'checkboxAll',		//全选按钮
	classCheckboxNay:'checkboxNay',		//反选按钮
	onComplete	:function(){			//回调函数
	Supported in Internet Explorer, Mozilla Firefox
	*/
	var Checkbox = function(obj){
		var $root = obj.param;
		$root.each(function(){
			var root = $(this);
			var $inputs = root.find('input:checkbox'); //所有checkbox
			var $allInput = root.find('input:checkbox[class!='+obj.classCheckboxAll+'][class!='+obj.classCheckboxNay+']'); //去除全选、反选checkbox
			var $allBtn = root.find('.' + obj.classCheckboxAll);//全选按钮
			var $nayBtn = root.find('.' + obj.classCheckboxNay);//反选按钮
			//判断回调函数
			obj.onComplete = obj.onComplete || false;
			for(var i = 0, l = $inputs.length; i < l; i++){ //根据checkbox创建模拟checkbox
				var input = $($inputs[i]);
				var checked = input.attr("checked");
				//创建模拟checkbox按钮
				var $checkboxWrap = $('<span></span>');
				var $checkboxLink = $('<a href="javascript:;"></a>');
				//设置默认选项
				if(checked){$checkboxLink.addClass(obj.classChecked)}
				$checkboxLink
					.addClass(obj.classCheckbox)
					.insertAfter(input.wrap($checkboxWrap.addClass(obj.classWrap)))
					.on('click',function(){
						var $this = $(this);
						var $tempCheckbox = root.find('.' + obj.classCheckbox);//所有模拟checkbox
						var $thisCheckbox = $this.siblings(); //当前checkbox
						var $allCheckbox = root.find('.' + obj.classCheckboxAll);//全选checkbox
						var $allTempCheckbox = $allCheckbox.siblings();//全选模拟checkbox
						var $nayCheckbox = root.find('.' + obj.classCheckboxNay);//反选checkbox
						var $nayTempCheckbox = $nayCheckbox.siblings();//反选模拟checkbox
						//控制当前按钮选中效果
						if($this.hasClass(obj.classChecked)){
							$this.removeClass(obj.classChecked);
							$thisCheckbox.attr("checked",false);
						}else{
							$this.addClass(obj.classChecked);
							$thisCheckbox.attr("checked","checked");
						}
						//清空反选/全选按钮
						if(!$thisCheckbox.hasClass(obj.classCheckboxNay) && !$thisCheckbox.hasClass(obj.classCheckboxAll)){
							$nayTempCheckbox.removeClass(obj.classChecked)
							$nayCheckbox.removeClass(obj.classChecked).attr("checked",false);
							$allTempCheckbox.removeClass(obj.classChecked);
							$allCheckbox.removeClass(obj.classChecked).attr("checked",false);
							//判断是否所有按钮都选中，选中后全选按钮选中
							if(root.find('.'+obj.classChecked).size() == $allInput.size()){
								$allTempCheckbox.addClass(obj.classChecked);
								$allCheckbox.addClass(obj.classChecked).attr("checked",true);
							}
						}
						
						//全选
						if($thisCheckbox.hasClass(obj.classCheckboxAll)){
							if($this.hasClass(obj.classChecked)){
								//全选
								$tempCheckbox.addClass(obj.classChecked)
								$inputs.attr("checked","checked");
							}else{
								//取消全选
								$tempCheckbox.removeClass(obj.classChecked)
								$inputs.attr("checked",false);
							}
							//清空反选按钮
							$nayTempCheckbox.removeClass(obj.classChecked)
							$nayCheckbox.attr("checked",false);
						}
						//反选
						if($thisCheckbox.hasClass(obj.classCheckboxNay)){
							$tempCheckbox.each(function(){
								var $nayThis = $(this); 
								var $nayCheckbox = $nayThis.siblings();//获取checkbox按钮
								if($nayThis.hasClass(obj.classChecked) && !$nayCheckbox.hasClass(obj.classCheckboxNay)){
									$nayThis.removeClass(obj.classChecked);
									$nayCheckbox.attr("checked",false)
								}else if(!$nayCheckbox.hasClass(obj.classCheckboxNay)){
									$nayThis.addClass(obj.classChecked);
									$nayCheckbox.attr("checked",true)
								}
								if($nayCheckbox.hasClass(obj.classCheckboxAll)){
									$nayThis.removeClass(obj.classChecked);
									$nayCheckbox.attr("checked",false)
								}
							});
						}
						//回调函数
						if(obj.onComplete){obj.onComplete($this)}
					});
			}
			//判断是否为checkbox
			if($allBtn.attr("type") != 'checkbox'){
				//绑定全选点击事件
				var $nayTempCheckbox = $inputs.siblings();
				$allBtn.on("click",function(){
					var $thisBtn = $(this);
					//清空反选按钮
					$nayBtn.removeClass(obj.classChecked);
					if($thisBtn.hasClass(obj.classChecked)){
						//取消全选
						$thisBtn.removeClass(obj.classChecked);
						$inputs.attr("checked",false);
						$nayTempCheckbox.removeClass(obj.classChecked);
					}else{
						//全选
						$thisBtn.addClass(obj.classChecked);
						$inputs.attr("checked","checked");
						$nayTempCheckbox.addClass(obj.classChecked);
					}
					//回调函数
					if(obj.onComplete){obj.onComplete($this)}
				});
			}
			if($nayBtn.attr("type") != 'checkbox'){
				//绑定反选点击事件
				$nayBtn.on("click",function(){
					var $thisBtn = $(this);
					$thisBtn.addClass(obj.classChecked);
					//清空全选按钮
					$allBtn.removeClass(obj.classChecked);
					$nayTempCheckbox.each(function(){
						var $nayThis = $(this); 
						var $nayCheckbox = $nayThis.siblings();//获取checkbox按钮
						if($nayThis.hasClass(obj.classChecked) && !$nayCheckbox.hasClass(obj.classCheckboxNay)){
							$nayThis.removeClass(obj.classChecked);
							$nayCheckbox.attr("checked",false)
						}else if(!$nayCheckbox.hasClass(obj.classCheckboxNay)){
							$nayThis.addClass(obj.classChecked);
							$nayCheckbox.attr("checked",true)
						}
					});
					//回调函数
					if(obj.onComplete){obj.onComplete($this)}
				});
			}
		});
	}
	
	window.TRS = {
		Page 		: 	getPage,	//获取分页
		Select		:	Select,		//select重写效果
		Radio		:	Radio,		//Radio重写效果
		Checkbox	:	Checkbox,	//Checkbox 重写效果
		delHTML		:	delHTML,	//去除HTML标签
		Trim		:	Trim,		//去除字符串空格
		getValue 	: 	getValue,	//获取URL参数
		ChangeTab 	: 	ChangeTab,	//tab切换
		Carousel	:	Carousel,	//轮播图
		floatingAd	:	floatingAd, //飘窗广告
		Scroll 		: 	Scroll, 	//滚动轮播图
		imgZoom		:	imgZoom,	//图片放大缩小
		starLevel	:	starLevel,	//星星评分效果
		newsScroll	:	newsScroll,	//滚动新闻
		sidebar		:	sidebar,	//左侧导航
		focusMap	:	focusMap		//焦点图

	};

})(jQuery);
