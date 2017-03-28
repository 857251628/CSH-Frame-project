/*
 TRSFrame 1.0.0 (build 63049cb)
 Copyright 2014 TRS Inc. All rights reserved.
 */
(function TRS($) {

    var IE6 = (window.XMLHttpRequest == undefined) && (ActiveXObject != undefined);
    var IE7 = (typeof document.addEventListener != 'function' && window.XMLHttpRequest && typeof document.querySelector == "undefined") ? true : false;
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
        isIE6 = function () {
            return ve.msie && (ve.version === "6.0");
        },


        /**
         * 设置固定节点样式
         * @method to
         * @param $this{Object} 当前节点
         * @param val{String} 要记录的节点className.
         * @param fn{Function} 处理方法
         */
        access = function ($this, val, fn) {
            var name = "qd_fix_" + val;
            if (!$this.hasClass(name)) {
                $this.addClass(name);
                if (!!fn) {
                    fn(name);
                }
            }
        };


        styleHook = {
            "auto": "0px"
        };
        /**
         * 记录节点固定前的样式
         * @method to
         * @param $this{Object} 当前节点
         * @param name{String} 要记录的节点样式.
         *
         */
        oldStyle = {};
        oldStyleFn = function ($this, name) {
            var obj = oldStyle[$this], val = {}, tem = "";
            if (!obj) {
                obj = oldStyle[$this] = {};
            }
            tem = val[name] = $this.css(name);
            if (isIE6) {
                val[name] = styleHook[tem] || tem;
            }
            $.extend(obj, val);
        };

        /**
         * 根据固定位置设置处理方法
         * @method to
         * @param $this{Object} 当前节点
         * @param mar{String} 固定位置
         * @param px{Number} 固定位置像素
         */
        fixHook = {};
        typeName = ["top", "bottom", "left", "right", "center", "middle"];
        typeNameHook = {
            "top": "left",
            "bottom": "left",
            "left": "top",
            "right": "top",
            "center": "top",
            "middle": "left"
        };

    $.each(typeName, function (i, val) {
        fixHook[val] = val === "center" ? function ($this) {
            access($this, val, function () {
                oldStyleFn($this, "margin-left");
                $this.css("margin-left", "-" + $this.width() / 2 + "px");
            });
        } : val === "middle" ? function ($this) {
            access($this, val, function () {
                oldStyleFn($this, "margin-top");
                $this.css("margin-top", "-" + $this.height() / 2 + "px");
            });
        } : function ($this) {
                access($this, val);
        };
    });

    fixHook.abs = function ($this, mar, px) {
        oldStyleFn($this, mar);
        if (isIE6()) {
            if (mar === "top") {
                $this.attr("style", "top:expression((topwindowscroll=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop)+" + px + "+'px' )");
            } else {
                $this.get(0).style[mar] = px + "px";
            }
        } else {
            $this.get(0).style[mar] = px + "px";
        }
    };

    /**
     * 元素固定位置对外处理方法
     * @method to
     * @param id{String} 元素id
     * @param type{String} 固定位置
     * @param id{String} 元素固定完成后需要添加的className
     */
    var fix = function (id, type, clas) {
        var types = type.split(","), i = 0,
            $this = $("#" + id),
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
                if (isNaN(type)) {
                    continue;
                }
                mar = flag && types[0] || i && "top" || "left";
                mar = typeNameHook[mar];
                if (!!mar) {
                    fixHook.abs($this, mar, type);
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
    var fixRemove = function (id, type, clas) {
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


    /*   window.TRS = {
     fix 		: 	fix,
     fixRemove 	: 	fixRemove
     };*/

    $c.$g_add_$c_function({
        fix: fix,
        fixRemove: fixRemove
    })

    /*  window.TRS = {}
     window.TRS.a =22;

     var usedFounction = {
     fix 		: 	fix,
     fixRemove 	: 	fixRemove
     };

     for(var i in usedFounction){
     window.TRS[i] =usedFounction[i];
     }
     */


})($);