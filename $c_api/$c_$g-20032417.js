/**
 * 该类为$g引用全局方法引用
 * Created by cl on 2017/3/24.
 */
(function ($) {
    var ver = $.browser;

    /**
     * 传入参数为6.0，7.0，8.0直接返回真伪值，
     * 不传参数直接返回具体版本号
     * @param vs
     * @returns {*}
     */
    function $c_isIEVersion(vs) {
        if (!$.msie) {
            return undefined;
        }
        if (ver.version == vs) {
            return true
        }
        return ver.version;
    }
    /**结尾**/
    $c.$g_add_$c_function({
        $g_isIEVersion:$c_isIEVersion
    });
})(jQuery)