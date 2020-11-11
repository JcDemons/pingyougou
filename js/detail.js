// script文件放前面，页面还没构建好，无法获取到dom元素
// 若script文件放后面，需要考虑是否是要在页面加载前就执行的代码
window.onload = function() {
    // 实现choose_type下面的tab栏切换
    // 获取choose_type下所有的li
    var choose_type_lis = document.querySelector('.choose_commidity2').querySelector('.choose_type').querySelectorAll('li');
    // 获取div
    var choose_type_info_divs = document.querySelector('.choose_type_info').querySelectorAll('div');
    // 为每个li添加点击事件
    for (var i = 0; i < choose_type_lis.length; i++) {
        // 拿不到 循环遍历的 i 值，循环一开始就为li添加下标
        choose_type_lis[i].setAttribute('data-index', i);
        choose_type_lis[i].onclick = function() {
            // 排他思想
            for (var i = 0; i < choose_type_lis.length; i++) {
                // className为空
                choose_type_lis[i].className = '';
                // div隐藏
                choose_type_info_divs[i].style.display = 'none';
            }
            this.className = 'current';
            // 匹配相应的div内容，第一个li匹配第一个div，以此类推
            // div的显示隐藏
            // 拿不到 循环遍历的 i 值，循环一开始就为li添加下标
            var index = this.getAttribute('data-index');
            choose_type_info_divs[index].style.display = 'block';
        }
    }


};

// TODO
// 实现单选

// 获取class 为 choose的所有div元素
var dls = document.querySelectorAll('.choose');

// 进行遍历，获取各个div里面的所有a元素
for (var j = 0; j < dls.length; j++) {
    var a = dls[j].querySelectorAll('a');
    // 遍历，为所有的a元素添加事件
    for (var k = 0; k < a.length; k++) {
        a[k].setAttribute('data-index', k);
        var index = a[k].getAttribute('data-index');
        // console.log(index);

        a[k].onclick = function() {
            // 排他思想

            for (var i = 0; i < a.length; i++) {
                a[i].className = '';
            }
            this.className = 'current';
        }
    }
}

// 实现放大镜功能
var father = document.querySelector('.preview_wrap_img');
var mask = father.querySelector('.mask');
var big = father.querySelector('.big');
var img = big.querySelector('img');
father.addEventListener('mouseover', function() {
    mask.style.display = 'block';
    big.style.display = 'block';
    // father 的父级都没有定位，所以是offsetLeft以body为基准的

});
father.addEventListener('mouseout', function() {
    mask.style.display = 'none';
    big.style.display = 'none';
});
// 实现透明盒子随着盒子移动
father.addEventListener('mousemove', function(e) {
    // offsetLeft相对于有定位的父盒子进行定位
    // 此处建议使用pageX/Y, 不建议使用clientX/Y,因为以进入调试窗口，可视区窗口的大小就变小了，影响调试
    var x = e.pageX - this.offsetLeft,
        y = e.pageY - this.offsetTop;
    // 鼠标点居中 减去自身盒子宽/高度的一半
    var moveX = x - mask.offsetWidth / 2,
        moveY = y - mask.offsetHeight / 2;
    // 在大盒子区域内移动，界定范围
    var maxMaskX = father.offsetWidth - mask.offsetWidth,
        maxMaskY = father.offsetHeight - mask.offsetHeight;
    if (moveX <= 0) {
        moveX = 0;
    } else if (moveX > maxMaskX) {
        moveX = maxMaskX;
    }
    if (moveY <= 0) {
        moveY = 0;
    } else if (moveY >= maxMaskY) {
        moveY = maxMaskY;
    }
    mask.style.left = moveX + 'px';
    mask.style.top = moveY + 'px';

    // 实现小盒子移动，外面大盒子的图片也跟着移动
    // 原理，按照比例关系进行移动
    // 遮挡层移动距离/遮挡层最大移动距离 = 大图片移动距离/大图片最大移动距离
    var maxX = img.offsetWidth - big.offsetWidth,
        maxY = img.offsetHeight - big.offsetHeight;
    var imgMoveX = moveX * maxX / maxMaskX,
        imgMoveY = moveY * maxY / maxMaskY;
    // 小盒子往左边走，大图片往右边走
    img.style.left = -imgMoveX + 'px';
    img.style.top = -imgMoveY + 'px';
});

// 实现图片下小图片的点击换
var preview_list_item = document.querySelector('.preview_list_item');
for (var i = 0; i < preview_list_item.children.length; i++) {
    preview_list_item.children[i].addEventListener('click', function() {
        // 排他思想
        for (var i = 0; i < preview_list_item.children.length; i++) {
            preview_list_item.children[i].className = '';
        }
        this.className = 'current';
    })

}