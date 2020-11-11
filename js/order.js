$(function() {
    // 1、实现全选，反选
    $(".checkAll").change(function() {
        //实现全选，全不选
        $(".checkbox, .checkAll").prop("checked", $(this).prop("checked"));
        // $(".goods-info").css("backgroundColor", "rgba(0,0,0,.1)");
        // 如果选中，改变背景颜色
        if ($(this).prop("checked")) {
            $(".goods-info").addClass("goods-info-bgc");
        } else {
            $(".goods-info").removeClass("goods-info-bgc");
        }
    });

    // 逐个选择，全部选到，全选勾选上，否则不勾选上
    $(".checkbox").change(function() {
        // 判断是否都都选上
        // console.log($(".checkbox:checked"));

        if ($(".checkbox:checked").length === $(".checkbox").length) {
            $(".checkAll").prop("checked", true);
        } else {
            $(".checkAll").prop("checked", false);
        }
        // $(".checkbox:checked").length === $(".checkbox").length ? $(".checkAll").prop("checked", true) : $(".checkAll").prop("checked", false);

        // 如果选中，改变背景颜色
        if ($(this).prop("checked")) {
            $(this).parents(".goods-info").addClass("goods-info-bgc");
        } else {
            $(this).parents(".goods-info").removeClass("goods-info-bgc");
        }

    });


    // 2、实现数量，总价的改变
    // 点击加减改变数量
    // 获取值，相对于原生js的innerText
    // 保留两位小数 toFixed(2)
    /* 
    num 数量
    single_price 单价
    prices 各种产品的总价
    */
    var num, single_price, prices;

    $(".add").click(function() {
        num = $(this).siblings(".num").val();
        single_price = $(this).parent().siblings(".p-price").find("i").text();
        prices = $(this).parent().siblings(".p-sum").find("i").text();
        num++;
        $(this).siblings(".num").val(num);
        prices = single_price * num;
        $(this).parent().siblings(".p-sum").find("i").text(prices.toFixed(2));

        // 计算总计的和
        getSum();
    });
    $(".sub").click(function() {
        num = $(this).siblings(".num").val();
        single_price = $(this).parent().siblings(".p-price").find("i").text();
        prices = $(this).parent().siblings(".p-sum").find("i").text();
        if (num == 1) {
            return false; //return后 后面的程序不再执行
        }
        num--;
        $(this).siblings(".num").val(num);
        prices = single_price * num;
        $(this).parent().siblings(".p-sum").find("i").text(prices.toFixed(2));

        // 计算总计的和
        getSum();
    });

    // 文本框内商品数量改变时，总价也发生改变
    $(".num").change(function() {
        if ($(this).val() <= 0) {
            $(this).val("1");
        }
        num = $(this).val();
        single_price = $(this).parent().siblings(".p-price").find("i").text();
        prices = $(this).parent().siblings(".p-sum").find("i").text();
        prices = single_price * num;
        $(this).parent().siblings(".p-sum").find("i").text(prices.toFixed(2));
        // 计算总计的和
        getSum();

    });


    // 实现计算总的前提条件是勾选了商品
    function getSum() {
        // 总数量
        var allNum = 0;
        $(".num").each(function(index, domEle) {
            // 表单取过来的值是字符型
            allNum += parseInt($(domEle).val());
        });
        $(".rightModule").find("i").text(allNum);

        // 计算总计的和
        var all_prices = 0;
        $(".prices i").each(function(index, domEle) {
            all_prices += parseFloat($(domEle).text());
        });
        $(".allPrice").text(all_prices.toFixed(2));
    }
    getSum();
    // 实现计算总的前提条件是勾选了商品
    // function getSum() {
    //     var allNum = 0,
    //         all_prices = 0;
    //     if ($(".checkbox").prop("checked")) {
    //         // 总数量
    //         allNum += parseInt($(this).parent().siblings(".p-number").find(".num").val());
    //         /* $(this).parent().siblings(".p-number").find(".num").each(function(index, domEle) {
    //             allNum += parseInt($(domEle).val());
    //         }); */
    //         $(".rightModule").find("i").text(allNum);
    //         // 总和
    //         all_prices += parseFloat($(this).parent().siblings(".p-sum").find(".prices i").text());
    //         /* $(this).parent().siblings(".p-sum").find(".prices i").each(function(index, domEle) {
    //             all_prices += parseFloat($(domEle).text());
    //         }); */
    //         $(".allPrice").text(all_prices.toFixed(2));
    //     }
    // }

    // 3、实现删除功能
    // 实现删除操作
    // 点击删除
    $(".p-operation a").click(function() {
        $(this).parents(".goods-info").remove();
        getSum();
    });
    // 删除勾选上的
    // console.log($(".checkbox:checkbox"));
    $(".goods a").click(function() {
        // 被选中的复选框 :checked
        $(".checkbox:checked").parents(".goods-info").remove();
        getSum();
    });
    // 清空购物车
    $(".clear").click(function() {
        $(".goods-info").remove();
        getSum();
    });
})