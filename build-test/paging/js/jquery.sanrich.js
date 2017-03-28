/**
* @version 
* @author 
*
*/
(function($){
//分页效果
	
	var xmlData = null;	
	var pageIndexTpl  = 1;
	var Page = function(){
		var $this = this;
		this._start = 1;
		this._end = 1;		this._pageIncludeTpl = 5; //页码数量
		
		/**
		 * 在显示之前计算各种页码变量的值
		 */
		this._makeUrl = function(obj) {
			var _dataUrl = obj.dataUrl;
			var _pageIndex = obj.pageIndex-1;
			if( _pageIndex >0){
				_dataUrl = _dataUrl.replace(".xml", '_' + _pageIndex + '.xml');
				_dataUrl = _dataUrl.replace(_dataUrl.substring(_dataUrl.indexOf("_")), '_' + _pageIndex + '.xml');				return _dataUrl;
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
			}					if(obj.expand == undefined){
				$this._render(obj);			}else{				obj.expand(obj);			}
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
							obj.ajaxData(results);							if(obj.expand == undefined){
								$this._render(obj);							}else{								obj.expand(obj);							}
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
			"pageCount":0,			"expand":param.expand
		} 
		if(obj.pageType == "WCM"){
			new Page()._getData(obj);
		}else if(obj.pageType == "APP"){
			var results = obj.ajaxData();
			if(results != null){				obj.pageCount = results.pageCount;				if(obj.expand == undefined){
					new Page()._render(obj);				}else{					obj.expand(obj);				}
			}
		}
		
	}
	//获取URL参数	
	var getValue = function (name){
		var str = window.location.search;
		if (str.indexOf(name)!=-1){
			var pos_start=str.indexOf(name)+name.length+1;
			var pos_end=str.indexOf("&",pos_start);
			if (pos_end==-1){
				return str.substring(pos_start);
			}else{
				return str.substring(pos_start,pos_end)
			}
		}else{
			return "";
		}
	}
	

	
	sanrich = {
		getPage:getPage,
		getValue:getValue
	}
	
})(jQuery);

