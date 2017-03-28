/**
 * Created by Administrator on 2017/3/26 0026.
 */

(function ($) {
    //li的上下滚动

    function newScroll(obj) {
        //obj.param传递 进来的ID;
        var $root = obj.id;
        var context = obj.context;
        var $this = this;
        var $sliding_time = obj.sliding_time;
        var $scrollLi = $root.find('li');
        var $direction = obj.direction;
        var $distance = obj.distance;
        //设置计时器 根据obj.time的值来相隔多长时间进行
        //initRoll()方法
        var setTimes = setInterval(function () {
            getInitRoll($direction, $root, $distance, $sliding_time);
            //   $direction=="top"? initRollTop($root,$distance,$sliding_time):initRollLeft($root,distance,$sliding_time);
        }, obj.time);
        //鼠标在上面的时候不进行动画,移除定时器. 移出时重置定时器
        $scrollLi.hover(function () {
            clearInterval(setTimes);
        }, function () {
            setTimes = setInterval(function () {
                getInitRoll($direction, $root, $distance, $sliding_time);
                // direction=="top"? initRollTop($root,distance,$sliding_time):initRollLeft($root,distance,$sliding_time);
            }, obj.time);
        });
    }

    function setHtml(context) {

    }

    //根据$direction判断是什么类型.
    function getInitRoll($direction, $root, $distance, $sliding_time) {
        return $direction == "top" ?
            initRollTop($root, $distance, $sliding_time) :
            initRollLeft($root, $distance, $sliding_time);
    }
    //向上移动
    function initRollTop($root, distance, $sliding_time) {
        //  distance = (!distance ? first.innerHeight : distance);
        var first = $root.find("ul:first");
        first.animate({
            //滚动新闻 "-" + obj.top + "px"
            marginTop: "-" + distance + "px"
        }, $sliding_time, function () {
            //第一条数据累加到最后
            $(this).css({marginTop: "0px"}).find("li:first").appendTo(this);
        });
    }
    //向左移动
    function initRollLeft($root, distance, $sliding_time) {
        //   distance = !distance ? first.innerWidth : distance;
        var first = $root.find("ul:first");
        $root.find("ul").css("width", "1000%").find("li").css("float", "left");
        first.animate({
            marginLeft: "-" + distance + "px"
        }, $sliding_time, function () {
            //第一条数据累加到最后
            $(this).css({marginLeft: "0px"}).find("li:first").appendTo(this);
        });
    }

    $c.$g_add_$c_function({
        $ui_newScroll: newScroll
    });

})(jQuery);