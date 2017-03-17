//获取编辑区域的内容
function handleSaveLayout() {
	var e = $(".demo").html();
	if(e != window.demoHtml) {
		window.demoHtml = e ;
	}
	
}
//拖到布局结束处理
function handleJsIds() { 
	handleModalIds();
	handleAccordionIds();
	handleCarouselIds();
	handleTabsIds() 
}
//绑定手风琴事件
function handleAccordionIds() {
	var e = $(".demo #myAccordion");
	var t = randomNumber();
	var n = "panel-" + t; var r;
	e.attr("id", n);
	e.find(".panel").each(function(e, t) {
		r = "panel-element-" + randomNumber();
		$(t).find(".panel-title").each(function(e, t) {
			$(t).attr("data-parent", "#" + n);
			$(t).attr("href", "#" + r);
		});
		$(t).find(".panel-collapse").each(function(e, t) {
			$(t).attr("id", r) 
		}) 
	}) 
}
//绑定幻灯片
function handleCarouselIds() {
	var e = $(".demo #myCarousel");
	var t = randomNumber(); var n = "carousel-" + t;
	e.attr("id", n);
	e.find(".carousel-indicators li").each(function(e, t) {
		$(t).attr("data-target", "#" + n) 
	});
	e.find(".left").attr("href", "#" + n);
	e.find(".right").attr("href", "#" + n) 
}
//绑定遮罩窗体事件
function handleModalIds() {
	var e = $(".demo #myModalLink");
	var t = randomNumber();
	var n = "modal-container-" + t; 
	var r = "modal-" + t;
	e.attr("id", r);
	e.attr("href", "#" + n);
	e.next().attr("id", n);
}

function handleTabsIds() { 
	var e = $(".demo #myTabs");
	var t = randomNumber();
	var n = "tabs-" + t;
	e.attr("id", n);
	e.find(".tab-pane").each(function(e, t) {
		var n = $(t).attr("id"); 
		var r = "panel-" + randomNumber();
		$(t).attr("id", r);
		$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r) 
	}) 
}
//获取随机数
function randomNumber() { 
	return randomFromInterval(1, 1e6);
}
//计算随机数
function randomFromInterval(e, t) {
	return Math.floor(Math.random() * (t - e + 1) + e) 
}
/**
 * 手动修改布局数字生成布局代码
 */
function gridSystemGenerator() { 
	$(".lyrow .preview input").bind("keyup", function() {
		var e = 0; var t = ""; 
		var n = false; 
		var r = $(this).val().split(" ", 12);
		$.each(r, function(r, i) { 
			if(!n) {
				if(parseInt(i) <= 0) n = true;
				e = e + parseInt(i);
				t += '<div class="col-md-' + i + ' column"></div>' 
			} 
		}); 
		if(e == 12 && !n) { 
			$(this).parent().next().children().html(t);
			$(this).parent().prev().show() 
		} else { 
			$(this).parent().prev().hide() 
		} 
	}) 
}
/**
 * 
 * 拖动元素配置
 * @param {Object} e
 * @param {Object} t
 */
function configurationElm(e, t) {
	//显示配置项
	$(".demo").delegate(".configuration > a", "click", function(e) {
		e.preventDefault();
		
		var t = $(this).parent().next().next().children();
		$(this).toggleClass("active");
		t.toggleClass($(this).attr("rel")) 
	});
	//选择不同配置实现不同的效果
	$(".demo").delegate(".configuration .dropdown-menu a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().parent();
		var n = t.parent().parent().next().next().children();
		
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		
		var r = "";
		t.find("a").each(function() {
			r += $(this).attr("rel") + " " 
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel")) 
	}) 
}
/**
 * 删除布局
 */
function removeElm() {
	//添加事件处理
	$(".demo").delegate(".remove", "click", function(e) {
		e.preventDefault();
		$(this).parent().remove(); 
		
		//如果内容中没有布局结构，则清空内容
		if(!$(".demo .lyrow").length > 0) {
			clearDemo() 
		} 
	}) 
}
/**
 * 清空内容
 */
function clearDemo() {
	$(".demo").empty()
}

function removeMenuClasses() {
	$("#menu-layoutit li button").removeClass("active")
}

function changeStructure(e, t) {
	$("#download-layout ." + e).removeClass(e).addClass(t)
}

function cleanHtml(e) {
	$(e).parent().append($(e).children().html())
}

/**
 * 生成html代码，可以下载
 */
function downloadLayoutSrc() {
	var e = "";
	$("#download-layout").children().html($(".demo").html());
	var t = $("#download-layout").children();
	t.find(".preview, .configuration, .drag, .remove").remove();
	t.find(".lyrow").addClass("removeClean");
	t.find(".box-element").addClass("removeClean");
	
	t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function() { cleanHtml(this) });
	t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function() { cleanHtml(this) });
	t.find(".lyrow .lyrow .lyrow .removeClean").each(function() { cleanHtml(this) });
	t.find(".lyrow .lyrow .removeClean").each(function() { cleanHtml(this) });
	t.find(".lyrow .removeClean").each(function() { cleanHtml(this) });
	t.find(".removeClean").each(function() { cleanHtml(this) });
	
	t.find(".removeClean").remove();
	$("#download-layout .column").removeClass("ui-sortable");
	$("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
	
	if($("#download-layout .container").length > 0) {
		changeStructure("row-fluid", "row") 
	} 
	formatSrc = $.htmlClean($("#download-layout").html(), { format: true, allowedAttributes: [
			["id"],
			["class"],
			["data-toggle"],
			["data-target"],
			["data-parent"],
			["role"],
			["data-dismiss"],
			["aria-labelledby"],
			["aria-hidden"],
			["data-slide-to"],
			["data-slide"]
		] 
	});
	$("#download-layout").html(formatSrc);
	$("#downloadModal textarea").empty();
	$("#downloadModal textarea").val(formatSrc) 
}

/**
 * 
 */
function changeResize()
{
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160);
}

//var currentDocument = null;
var timerSave = 2e3;                //定时,2e3表示 2x10的3次方为2000
var demoHtml  = $(".demo").html();  //已有的内容

$(window).resize(function() {
	changeResize();
});

$(document).ready(function() {
	changeResize();
	
	//初始化，让被选元素通过鼠标拖拽进行排序
	$(".demo, .demo .column").sortable({ connectWith: ".column", opacity: .35, handle: ".drag" });
	
	//初始化，lyrow拖动只允许移动到container
	$(".sidebar-nav .lyrow").draggable({
		connectToSortable: ".demo",
		helper: "clone",
		handle: ".drag",
		drag: function(e, t) {
			t.helper.width(400) 
		}, 
		stop: function(e, t) {
			$(".demo .column").sortable({
				opacity: .35, 
				connectWith: ".column" 
			}) 
		} 
	});
	//初始化，box拖动只允许移动到container下的column元素下
	$(".sidebar-nav .box").draggable({
		connectToSortable: ".column",
		helper: "clone",
		handle: ".drag", 
		drag: function(e, t) {
			t.helper.width(400) 
		}, 
		stop: function() { 
			//拖动结束处理
			handleJsIds() 
		} 
	});
	//生成html代码
	$("[data-target=#downloadModal]").click(function(e) { 
		e.preventDefault();
		downloadLayoutSrc() 
	});
	//编辑
	$("#edit").click(function() {
		$("body").removeClass("devpreview sourcepreview");
		$("body").addClass("edit");
		removeMenuClasses();
		$(this).addClass("active");
		return false 
	});
	//清空
	$("#clear").click(function(e) {
		e.preventDefault();
		clearDemo() 
	});
	//开发
	$("#devpreview").click(function() { 
		$("body").removeClass("edit sourcepreview");
		$("body").addClass("devpreview");
		removeMenuClasses();
		$(this).addClass("active"); 
		return false 
	});
	//预览
	$("#sourcepreview").click(function() {
		$("body").removeClass("edit");
		$("body").addClass("devpreview sourcepreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false 
	});
	//左侧菜单切换
	$(".nav-header").click(function() { 
		$(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
		$(this).next().slideDown() 
	});
	//绑定删除布局事件
	removeElm();
	//绑定配置处理事件
	configurationElm();
	//手动修改布局数字预生成布局代码
	gridSystemGenerator();
	
	setInterval(function() {
		handleSaveLayout();
		console.log('over');
	}, timerSave) })