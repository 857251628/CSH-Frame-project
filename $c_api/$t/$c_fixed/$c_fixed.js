/**
 * 层定位工具类 该类依赖css文件，和Jquery
 * Created by cl on 2017/3/24.
 */
$c.$g_input_file($c.$g_getRootPath() + "$c_api/$t/$c_fixed/$c-fixed.css");
(function ($) {

    //预设样式属性
    var positionType = ["top", "bottom", "left", "right", "center", "middle"]

    //与CSS 前缀相同
    var preCSS = "c-fixed_";

    /**
     * 可以层叠2个样式
     * @param $target
     * @param argument1
     * @param argument2
     */
    function $c_fixed($target, argument1, argument2) {
        if (!$target.hasClass("c-fixed_fix")) {
            $target.addClass("c-fixed_fix");
        }

        if (!isNaN(parseInt(argument1)) && !isNaN(parseInt(argument2))) {
            //argument1 设置 left argument2 设置top
            $private_FixedNumber($target, argument1, argument2);
        }//通过默认样式来设置处理
        else {
            $private_FixedDefaultType($target, argument1, argument2);
        }
    }

    function $private_FixedDefaultType($target, argument1, argument2) {
        argument1 = preCSS + argument1;
        argument2 = preCSS + argument2;
        if (!$target.hasClass(argument1)) {
            $target.addClass(argument1);
        }
        if (!$target.hasClass(argument2)) {
            $target.addClass(argument2);
        }
        for (var i = 1; i < 3; i++) {
            var argument = arguments[i]
            if (argument == preCSS + "center") {
                $target.css("margin-left", "-" + $target.width() / 2 + "px");
            } else if (argument == preCSS + "middle") {
                $target.css("margin-top", "-" + $target.height() / 2 + "px");
            }
        }
    }

    /**
     *
     * @param $target
     * @param argument1 左边
     * @param argument2 上边
     */
    function $private_FixedNumber($target, argument1, argument2) {
        console.log($target.css("left"));
        var length = $target.css("left").indexOf("px");
        var temp1 = $target.css("left").substring(0, length);
        console.log(argument1);
        length = $target.css("top").indexOf("px");
        var temp2 = $target.css("top").substring(0, length);
        argument1 = (parseInt(argument1) + parseInt(temp1)) + "px";
        argument2 = (parseInt(argument2) + parseInt(temp2)) + "px";
        console.log(argument1);
        console.log(argument2);
        $target.css("left", argument1);
        $target.css("top", argument2);
    }

    /**
     * 回复原有样式，移除层定位
     */
    function $c_removeFixed() {

    }

    /**结束**/

    $c.$g_add_$c_function({
        $t_fixed: $c_fixed
    });
})(jQuery);
