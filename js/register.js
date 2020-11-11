window.onload = function() {
    // 正则验证表单
    var regTel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var regMsg = /^\d{6}$/;
    var regPwd = /^[a-zA-Z0-9]{6,16}$/;
    var tel = document.querySelector('#tel');
    var msg = document.querySelector('#yanzhengma');
    var pwd = document.querySelector('#pwd');
    var confirm = document.querySelector('#confirm');
    regExp(tel, regTel);
    regExp(msg, regMsg);
    regExp(pwd, regPwd);

    function regExp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                // console.log('true');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 符合要求';

            } else {
                // console.log('false');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请从新输入';
            }
        }
    }
    //判断密码强度后期学了再写,后面学了分组等正则高级再回来写

    // 确认密码
    confirm.onblur = function() {
        if (confirm.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>';

        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 密码不一致，请从新输入';
        }
    }

}