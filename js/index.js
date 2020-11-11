window.addEventListener('load', function() {
    // 实现打广告下的轮播图
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('.focus_pic');
    var arrowLeft = focus.querySelector('.arrow-l');
    var arrowRight = focus.querySelector('.arrow-r');
    // 鼠标移动上去就显示左右箭头，移开隐藏
    focus.addEventListener('mouseenter', function() {
        arrowLeft.style.display = 'block';
        arrowRight.style.display = 'block';
    });
    focus.addEventListener('mouseleave', function() {
        arrowLeft.style.display = 'none';
        arrowRight.style.display = 'none';
    });

    var ol = document.querySelector('.focus_radius');
    // 动态生成小圆圈，方便后期维护添加或者删改
    for (var i = 0; i < ul.children.length; i++) {
        var lis = document.createElement('li');
        // 也可以在生成li的同时绑上事件
        // lis.addEventListener('click', function() {});
        ol.appendChild(lis);
    }
    ol.children[0].className = 'current';


    // 点击小圆圈，该小圆圈就变为红色，其它为白色
    // 图片宽度与盒子一样大，获取盒子的宽度，每次移动一张图片的就是一个盒子的宽度
    var offset = focus.offsetWidth;
    for (var j = 0; j < ol.children.length; j++) {
        // 排他思想，先清除其他人，在设置自己
        ol.children[j].setAttribute('data-index', j);
        ol.children[j].addEventListener('click', function(e) {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                // 点击轮播
            }
            this.className = 'current';
            // 点击小圆圈，轮播相应的图片
            var index = this.getAttribute('data-index');
            console.log(index);

            num = index;
            circle = index;
            animate(ul, -index * offset);
        });

    }

    // 实现图片轮播
    // 改变的是ul的offsetLeft
    // 点击右边箭头，实现轮播下一张图片 值为负
    // (num 、circle必须与上面所获得的索引值连接，即值一样，否则点击小圆圈后再来点击箭头就会出错)
    var num = 0;
    var circle = 0; //控制小圆圈滚动
    var li0 = ul.children[0].cloneNode(true);
    ul.appendChild(li0);
    var flag = true;
    arrowRight.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 判断是否到最后一张，是将left设为0,num也设置为0
            // 即到最后一张，马上就跳到第一张图片
            // 使用克隆结点，避免多了小圆点
            // 克隆小圆圈必须得在生成小圆圈后才能克隆
            if (num == ol.children.length) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            circle++;
            animate(ul, -num * offset, function() {
                flag = true;
            });
            // 实现点击箭头后，小圆点与图片对应
            // circle等于ol.children.length时， circle == 0
            // circle 是从0开始的，到最后那张复制的图片，没有小圆圈，所以的设置circle值
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 与下面的内容相同，可以写为一个函数来调用，减少代码冗杂度
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                // 点击轮播
            }
            ol.children[circle].className = 'current';
        }
    });


    // 点击左边箭头，实现轮播下一张图片 值为正

    arrowLeft.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 判断是否到最后一张，是将left设为0,num也设置为0
            // 即到最后一张，马上就跳到第一张图片
            // 使用克隆结点，避免多了小圆点
            // 克隆小圆圈必须得在生成小圆圈后才能克隆
            // var li0 = ul.children[0].cloneNode(true);
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * offset + 'px';
            }
            num--;
            circle--;
            animate(ul, -num * offset, function() {
                flag = true;
            });
            // 实现点击箭头后，小圆点与图片对应
            // circle等于ol.children.length时， circle == 0
            // circle 是从0开始的，到最后那张复制的图片，没有小圆圈，所以的设置circle值
            // circle < 0,则小圆圈要改为最后一个小圆圈
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                // 点击轮播
            }
            ol.children[circle].className = 'current';
        }

    });
    // 设置定时器，自动轮播
    var timer = setInterval(function() {
        // 手动调用点击事件
        arrowRight.click();
    }, 2000);


    focus.addEventListener('mouseover', function() {
        clearInterval(timer);
        timer = null; //清除定时器变量
    });
    focus.addEventListener('mouseout', function() {
        timer = setInterval(function() {
            // 手动调用点击事件
            arrowRight.click();
        }, 2000);
    });

    function aa() {
        //再写一边轮播图
        var w309 = document.querySelector('.w309');
        var w309_ul = w309.querySelector('.w309-pic');
        var w309_circle = w309.querySelector('.circle');
        var ul_offset = w309.offsetWidth;
        // console.log(w309.offsetWidth);

        // 点那个小点，改变背景颜色，类名circle-style
        // 根据图片张数生成相应的点
        for (var i = 0; i < w309_ul.children.length; i++) {
            var circle_li = document.createElement('li');
            // 创建结点同时，绑定点击事件
            // 实现点击那个小圆点，就到那张图片
            circle_li.setAttribute('data-index', i);
            circle_li.addEventListener('click', function() {
                for (var i = 0; i < w309_circle.children.length; i++) {
                    w309_circle.children[i].className = '';
                }
                this.className = 'circle-style';
                var index = this.getAttribute('data-index');
                console.log(index);
                num = index;
                circle = index;
                // w309_ul.style.left = -index * ul_offset + 'px';
                w309_ul.style.left = move(w309_ul, -index * ul_offset);

            });

            w309_circle.appendChild(circle_li);
            // 必须得创建好元素后才能给元素设置行内样式
            w309_circle.children[0].className = 'circle-style';
        }
        var timer = setInterval(function() {
            // circle_li.click();
        }, 2000);
        // 实现图片自动轮播以及小圆点的自动校对
        // 自动轮播或者点击左右箭头需要多一张图片，来实现无缝轮播
        var w309_ul_li0 = w309_ul.children[0].cloneNode(true);
        // console.log(w309_ul_li0);

        w309_ul.appendChild(w309_ul_li0);
        // 自动轮播选择一个方向就行了
        var num = 0;
        // 同步小圆点
        var circle = 0;
        var timers1 = setInterval(function() {
            if (num == w309_ul.children.length - 1) {
                // 到最后一张，立即跳转到第一张图片
                w309_ul.style.left = 0;
                num = 0;
            }
            num++;
            circle++;
            // 判定条件
            if (circle == w309_circle.children.length) {
                circle = 0;
            }
            for (var i = 0; i < w309_circle.children.length; i++) {
                w309_circle.children[i].className = '';
            }
            w309_circle.children[circle].className = 'circle-style';
            move(w309_ul, -num * ul_offset);
        }, 2000);
        w309_ul.addEventListener('mouseover', function() {
            clearInterval(timers1);
        });
        w309_ul.addEventListener('mouseout', function() {
            timers1 = setInterval(function() {
                if (num == w309_ul.children.length - 1) {
                    // 到最后一张，立即跳转到第一张图片
                    w309_ul.style.left = 0;
                    num = 0;
                }
                num++;
                circle++;
                // 判定条件
                if (circle == w309_circle.children.length) {
                    circle = 0;
                }
                for (var i = 0; i < w309_circle.children.length; i++) {
                    w309_circle.children[i].className = '';
                }
                w309_circle.children[circle].className = 'circle-style';
                move(w309_ul, -num * ul_offset);
            }, 2000);
        });

        // 移动函数
        /*
        obj 对象
        target 目标位置
        callback 回调函数 
         */
        function move(obj, target, callback) {
            clearInterval(obj.timer);
            // 让轮播图片有个缓慢的过程

            obj.timer = setInterval(function() {
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft != target) {
                    obj.style.left = obj.offsetLeft + step + 'px';
                } else {
                    clearInterval(obj.timer);
                    if (callback) {
                        callback();
                    }
                }
            }, 15);
        }

    }

    aa();



    // jQuery实现电梯导航栏
    //1、在哪里开始显示，点击那个就跳转到那个，索引值，以及eq()
    var top = $(".recommend").offset().top;
    var flag = true; //节流阀/互斥锁 控制
    // 解决刷新页面，电梯导航不见的bug
    // 页面加载就调用方法，滚动也调用方法
    load();

    function load() {
        if ($("body, html").scrollTop() >= top) {
            // $(".fixedtool").stop().slideIn();
            $(".fixedtool").stop().fadeIn();
            $(".goBack").stop().show();
        } else {
            $(".fixedtool").stop().fadeOut();
            $(".goBack").stop().hide();

        }
    }
    // 点击跳回顶部
    $(".goBack").click(function() {
        $("body, html").animate({
            scrollTop: 0
        })
    });

    // 滚动事件
    $(window).scroll(function() {
        load();
        if (flag) {
            changeColor();
        }
    });
    // 点击小 li 页面发生抖动，而且背景颜色不对，解决bug ----> 每次点击后会促发滚动事件，而滚动事件又设置了li背景颜色
    // 节流阀/互斥锁
    // 点击小li，此时不需要执行 页面滚动事件里面li 的背景颜色选择 添加类名

    // 点击跳转到相应的层上
    $(".fixedtool li").click(function() {
        flag = false;
        $(this).addClass("bg-red").siblings().removeClass();
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            // 点击后停止滚动事件里面的改变背景颜色，但要滚动时就没变了，解决此bug,回调函数 ---->事件执行完才执行里面的
            flag = true;
        });

        // 点击小li 后就不执行scroll滚动事件里面改变背景颜色的代码
    });


    // 电梯导航层滚动到那一块，左边电梯导航那个就显示背景颜色
    // 获取index值，eq()

    function changeColor() {
        // 遍历获取索引值
        $(".floor .w").each(function(index, domEle) {
            if ($("body, html").scrollTop() >= $(domEle).offset().top) {
                $(".fixedtool li").eq(index).addClass("bg-red").siblings().removeClass("bg-red");
            }
        });
    }
});