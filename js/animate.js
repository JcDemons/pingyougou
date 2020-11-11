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