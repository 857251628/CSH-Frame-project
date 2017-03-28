/**
 * 全局控制类，用来引入各种JS文件（插件，工具，UI等）
 * Created by cl on 2017/3/23.
 */
(function () {
    //初始化$c对象
    window.$c = {$g_add_$c_function: $c_add_$c_function};

    /**
     * 给$c添加全局方法，添加的时候可以重复添加，不会覆盖，
     * @param usedFunction  必须是Object对象
     * @returns {undefined}
     */
    function $c_add_$c_function(usedFunction) {
        if (typeof usedFunction != "object") {
            return undefined;
        }
        for (var i in usedFunction) {
            /* 对多次调用该方法 的情况，添加了相同方法名的抛异常*/
            for(var j in window.$c){
                if(i==j){
                    throw new Error("方法名相同，请查找错误");
                }
            }
            window.$c[i] = usedFunction[i];
        }
    };

    /**
     * 导入文件，应许导入js,css.
     * 推荐使用绝对定位来定位文件，因为这些文件都是根据html的具体位置来处理的
     * @param file
     */
    function $c_input_file(file)
    {
        if ( file.match(/\.js$/i))
            document.write('<script type=\"text/javascript\" src=\"' + file + '\"></sc' + 'ript>');
        else
            document.write('<link   href=\"' + file + '\" rel="stylesheet" />');
    };

    /**
     * 给$c.取多个不同的名字
     * @param strings 给windows取不同的函数名
     */
    function $c_multipleName(){
        for(var i = 0;i<arguments.length;i++){
            window[arguments[i]]= $c ;
        }
    }
    var gRealPath ="";
    /**
     * 获取到根目录，此路径为绝对路径
     */
    function $c_getAbsolutePath(){
        if(gRealPath!=""){
            return gRealPath;
        }
        //获取当前网址，如： http://localhost:8083/myproj/view/my.jsp
        var curWwwPath=window.document.location.href;
        //获取主机地址之后的目录，如： myproj/view/my.jsp
        var pathName=window.document.location.pathname;
        var pos=curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht=curWwwPath.substring(0,pos);
        //获取带"/"的项目名，如：/myproj
        var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
         //得到了 http://localhost:8083/myproj
        var realPath=localhostPaht+projectName;
        gRealPath = realPath+"/";
        return gRealPath;
    }

    //添加window方法控制器
    $c.$g_add_$c_function({
        $g_input_file:$c_input_file,
        $g_multipleName:$c_multipleName,
        $g_getRootPath:$c_getAbsolutePath
    });
    /**    结尾    **/

    //导入Jquery
    $c.$g_input_file("https://code.jquery.com/jquery-3.2.0.min.js");
    //导入$g方法 全局方法
    $c.$g_input_file($c.$g_getRootPath()+"$c_api/$c_$g-20032417.js");
    //导入$t方法 工具方法
    $c.$g_input_file($c.$g_getRootPath()+"$c_api/$c_$t-20032417.js");
    //导入$ui方法 常见UI方法
    $c.$g_input_file($c.$g_getRootPath()+"$c_api/$c_$ui-20032417.js");
    // 给window全局变量取一个别名。
    $c.$g_multipleName("TRS");

})();


