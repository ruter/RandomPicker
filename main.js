// 增加主题输入框
function add() {
	var newTheme = ['<div class="am-input-group">',
					'<span class="am-input-group-label"><i class="am-icon-paint-brush"></i></span>',
					'<input type="text" class="am-form-field" name="theme" id="theme" placeholder="在这里输入主题"></div> <br>'
					].join('');
	$("form").append(newTheme);
}
// 删除换行符及最后一个输入框
function del() {
	$("form").children().last().remove();
	$("form").children().last().remove();
}
// 随机获取指定数量的主题，返回一个数组
function randTheme() {
	var num = $("#themeNum").val();
	if (num == "") {
		num = 1;
	}
	var allThemes = $("form").serialize();
	var tempArr = new Array();
	allThemes = allThemes.split("&");
	for (var index in allThemes) {
		if (allThemes[index].slice(6) != "") {
			tempArr.push(allThemes[index].slice(6));
		}
	}
	// 主题全为空返回null
	if (tempArr.length < 1) {
		return null;
	}
	//取出的数值项,保存在此数组
    var themeArr = new Array();
	for (var i = 0; i < num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (tempArr.length > 0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random()*tempArr.length);
            //将此随机索引的对应的数组元素值复制出来
            themeArr[i] = tempArr[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            tempArr.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return themeArr;
}
// 设置弹窗内容
function setResult() {
	var allThemes = randTheme();
	if (allThemes == null) {
		$("#hint").text("｡ﾟ(ﾟ´ω`ﾟ)ﾟ｡出错了");
		$("#ctxBd").text("快检查一下哪里有问题٩(ŏ﹏ŏ、)۶");
	} else {
		$("#hint").text("(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧噔噔~");
		$("#ctxBd").text("以下是本月主题:");
		for (var i in allThemes) {
			$("#newTheme").append('<span class="am-badge am-badge-success am-text-default am-margin-horizontal-xs">'+decodeURI(allThemes[i])+'</span>');
		}
	}
	open();
}
// 关闭抽取动画弹窗
function close() {
	var $modal = $("#my-modal-loading");
	$modal.modal('close');
    console.log("done");
}
// 弹出结果窗口
function open() {
	var $modal = $("#doc-modal-1");
	$modal.modal('open');
	close();
}
// 提交
function submit() {
	// 延时1500ms执行
	setTimeout("setResult()", 1500);
	// 关闭结果窗口后清空添加的内容
	$("#doc-modal-1").on('closed.modal.amui', function() {
		$("#newTheme").empty();
	});
}