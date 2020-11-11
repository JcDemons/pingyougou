/*
// 原生js实现轮播图
outBox 轮播图的最外层父盒子（必须是有定位的）
firstUl 轮播图内图片li的父盒子 （必须有定位）
secondUl 轮播图内小圆圈li的父盒子 （必须有定位）
arrow_l 轮播图内 左点击箭头
arrow_r 轮播图内 右点击箭头
 */
function rotation(outBox, firstUl, secondUl, arrow_l, arrow_r) {
    window.addEventListener('load', function() {
        var outBoxWidth = outBox.offSetWidth;
        // 鼠标移动上去就显示左右箭头，移开隐藏
        outBox.addEventListener('mouseenter', function() {
            arrow_l.style.display = 'block';
            arrow_r.style.display = 'block';
        });
        outBox.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
        });
        // 动态生成小圆圈,根据firstUl内图片的张数
        for (var i = 0; i < firstUl.children.length; i++) {
            var li = document.createElement('li');
            // 同时点击那个小圆点就显示那张图片
            // 设置索引值
            li.setAttribute('data-index', i);
            // 点击该改变背景颜色
            li.addEventListener('click', function() {
                for (var i = 0; i < firstUl.children.length; i++) {
                    firstUl.children[i].style.backgroundColor = 'white';
                }
                this.style.backgroundColor = 'red';
                // 获取索引值
                var index = this.getAttribute('data-index');
                num = circle = index;
                animate(firstUl, -index * outBoxWidth);
            });
            secondUl.appendChild(li);
        }
        // 此处设置第一个小圆点的样式，得先插入完才能拿到dom设置
        secondUl.children[0].style.backgroundColor = 'red';
        // 4、实现图片无缝轮播
        // 原理：复制第一张图片到最后一张，到最后一张立即显示第一张
        // (num 、circle必须与上面所获得的索引值连接，即值一样，否则点击小圆圈后再来点击箭头就会出错)
        var num = 0; //控制索引值
        var circle = 0; //控制小圆圈滚动
        // 复制图片+内容(必须在生成后再克隆)
        var cloneLi = firstUl.children[0].cloneNode(true);
        firstUl.appendChild(cloneLi);
        // 点击右箭头
        arrow_r.addEventListener('click', function() {
            // 判断是否到最后一张，是将left设为0,num也设置为0
            // 即到最后一张，马上就跳到第一张图片
            // 使用克隆结点，避免多了小圆点
            // 克隆小圆圈必须得在生成小圆圈后才能克隆
            if (num == firstUl.children.length) {
                firstUl.style.left = 0;
                num = 0;
            }
            num++;
            circle++;
            animate(firstUl, -num * outBoxWidth);
            // 实现点击箭头后，小圆点与图片对应
            // circle等于ol.children.length时， circle == 0
            // circle 是从0开始的，到最后那张复制的图片，没有小圆圈，所以的设置circle值
            if (circle == secondUl.children.length) {
                circle = 0;
            }
            // 与下面的内容相同，可以写为一个函数来调用，减少代码冗杂度
            for (var i = 0; i < secondUl.children.length; i++) {
                secondUl.children[i].style.backgroundColor = 'white';
            }
            secondUl.children[circle].style.backgroundColor = 'red';
        });
        // 左边箭头
        arrow_l.addEventListener('click', function() {
            // 判断是否到最后一张，是将left设为0,num也设置为0
            // 即到最后一张，马上就跳到第一张图片
            // 使用克隆结点，避免多了小圆点
            // 克隆小圆圈必须得在生成小圆圈后才能克隆
            if (num == 0) {
                num = ul.children.length - 1;
                firstUl.style.left = -num * outBoxWidth + 'px';
            }
            num--;
            circle--;
            animate(firstUl, -num * outBoxWidth);
            // 实现点击箭头后，小圆点与图片对应
            // circle等于ol.children.length时， circle == 0
            // circle 是从0开始的，到最后那张复制的图片，没有小圆圈，所以的设置circle值
            if (circle == 0) {
                circle = secondUl.children.length - 1;
            }
            // 与下面的内容相同，可以写为一个函数来调用，减少代码冗杂度
            for (var i = 0; i < secondUl.children.length; i++) {
                secondUl.children[i].style.backgroundColor = 'white';
            }
            secondUl.children[circle].style.backgroundColor = 'red';
        });
        // 设置定时器，自动轮播
        var timer = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);


        outBox.addEventListener('mouseover', function() {
            clearInterval(timer);
            timer = null; //清除定时器变量
        });
        outBox.addEventListener('mouseout', function() {
            timer = setInterval(function() {
                // 手动调用点击事件
                arrowRight.click();
            }, 2000);
        });
    });


    // 运动函数
    function animate(obj, target, callback) {
        //一开始就清除定时器，避免多次点击定时器叠加
        clearInterval(obj.timer);
        // 使用对象属性，避免每调用一次函数就开辟一个空间
        // 而且不同对象，相同的定时器变量名容易引起歧义
        obj.timer = setInterval(function() {
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            // 正数向上取整，负数向下取整
            var step = (target - obj.offsetLeft) / 10; //速度
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (target != obj.offsetLeft) {
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