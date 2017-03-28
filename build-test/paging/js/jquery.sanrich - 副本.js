/**
* @version 
* @author 
*
*/
(function($){
//分页效果
	var xmlData = null;	
	var dataUrl = null;
	var dataUrlTpl = null;
	var pageCountTpl = 0;
	var pageIdTpl = null;
	var pageDataTpl = null;
	var pageIncludeTpl = 0;
	var pageIndexTpl = 0;
	var makeUrl = function() {dataUrl = dataUrlTpl.replace("[n]", (pageIndexTpl-1) > 0 ? '_' + (pageIndexTpl-1) : ''); }
	var showData = function (){
		$(pageDataTpl).html("")
		for(var i = 0 ;i < xmlData.length ;i++){
			$(pageDataTpl).append(insertItem(xmlData[i]))
		}
		new Pager().render();
	}
	var getPage = function() {
		makeUrl();
		$.ajax({
			type: "get",
			dataType: "xml",
			url: dataUrl,
			cache: false,
			async: false,
			success: function (xml){
			xmlData = $(xml).find("item");
			pageCountTpl = $(xml).find("page").text();
			showData();
			},
			error: function (xml) {
				xmlData = null;
			}
		});
	}
	
	var Pager = function(){
		var $this = this;
		this._start = 1;
		this._end = 1;
		/**
		 * 在显示之前计算各种页码变量的值
		 */
		this._calculate = function(){
			
			if(pageCountTpl<5){
				pageIncludeTpl=pageCountTpl;
			}
			pageIndexTpl = parseInt(pageIndexTpl);
			if(pageIndexTpl>pageCountTpl){
				pageIndexTpl = pageCountTpl;
			}
			if(pageIndexTpl<1){
				pageIndexTpl = 1;
			}
			$this._start = Math.max(1, pageIndexTpl - parseInt(pageIncludeTpl/2));//
			$this._end = Math.min(pageCountTpl, $this._start + pageIncludeTpl - 1);//最后一个页码按钮的页码数
			$this._start = Math.max(1, $this._end - pageIncludeTpl + 1);//第一个页码按钮的页码数
		}
		
		this.render = function(){
			$this._calculate();
			var htmlStr = "";
			var currpage = pageIndexTpl;
			htmlStr += '<span class="paginations">';
			if(1!=currpage){
				htmlStr += '<span class="n"><a href="javascript:;" page='+(currpage-1)+' class="hi_bl"><b>上一页</b></a></span>';
			}
			htmlStr += '<span class="p"> ';
			if(1!=currpage){
				htmlStr+= '<a href="javascript:;" page="1">1</a>';
			}
			var temp1=4;
			if(pageCountTpl<6){
				temp1=5;
			}
			if(currpage>temp1){
				htmlStr+= '<a href="javascript:;">...</a>';
			}
			for(var i=$this._start;i<=$this._end;i++){
				if(i==currpage){
					htmlStr+= "<em>"+i+"</em>";			
				}else{
					if(i!=1 && i!=pageCountTpl){
						htmlStr+= '<a href="javascript:;" page="'+i+'">'+i+'</a>';
					}
				}
			}
			var temp=3;
			if(pageCountTpl<6){
				temp=5;
			}
			if (currpage + temp < pageCountTpl) htmlStr+= '<a href="javascript:;">...</a>';
			if (currpage != pageCountTpl) htmlStr+= '<a href="javascript:;" page="'+pageCountTpl+'">'+pageCountTpl+'</a>';
			
			htmlStr += "</span>";
			if(pageCountTpl!=currpage){
				htmlStr += '<span class="n"><a href="javascript:;" page='+(currpage+1)+' class="hi_br"><b>下一页</b></a></span>';
			}
			
			htmlStr += '</span>';
			$(pageIdTpl).html(htmlStr);
			var a_list = $(pageIdTpl).find("a");
			for(var i=0;i<a_list.length;i++){
				a_list[i].onclick = function(){
					var index = this.getAttribute("page");
					if(index != undefined && index != ''){
						pageIndexTpl = index;
						getPage();
					}
				}
			}
		}
	}
	var init = function (pageInclude,url,pageId,pageData){
		pageIncludeTpl = pageInclude;
		dataUrlTpl = url;
		pageIdTpl = pageId;
		pageDataTpl = pageData;
		xmlData = null;	
		dataUrl = null;
		pageCountTpl = 0;
		pageIndexTpl = 0;
		getPage();
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
		init:init,
		getValue:getValue
	}
	
})(jQuery);

