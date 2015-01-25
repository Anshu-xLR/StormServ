var webApp = (function() {
	var globals = {
		timer	:	null,
		menu : {
			timer		:	null,
			width		:	0,
			dom		:	null,
			ul			:	null,
			extra	:	null,
			mobile	:	false
		}
	};
	var external = {};
	function resolutionHandle() {
		if(globals.menu.timer) {
			clearTimeout(globals.menu.timer);
			globals.menu.timer = null;
		}
		globals.menu.timer = setTimeout(menuHandle, 0);
		if(globals.timer) {
			clearTimeout(globals.timer);
			globals.timer = null;
		}
		globals.timer = setTimeout(resolutionHandle, 0);
	}
	function menuHandle() {
		if($(window).width() < globals.menu.width && !globals.menu.mobile) {
			globals.menu.ul.hide();
			globals.menu.extra.show();
			globals.menu.dom.each(function(index) {
				$(this).addClass("mobile");
				$(this).children("a").eq(0).removeClass("desktop");
				$(this).children("a").eq(0).addClass("mobile");
			});
			globals.menu.mobile = true;
		}
		if($(window).width() > globals.menu.width && globals.menu.mobile) {
			globals.menu.extra.hide();
			globals.menu.ul.show();
			globals.menu.dom.each(function(index) {
				$(this).removeClass("mobile");
				$(this).children("a").eq(0).removeClass("mobile");
				$(this).children("a").eq(0).addClass("desktop");
			});
			globals.menu.mobile = false;
		}
	}
	external.init = function() {
		globals.menu.dom = $("#menu").find("li");
		globals.menu.ul = $("#menu").children("ul").eq(0);
		globals.menu.extra = $("#menu").children("a").eq(0);
		for(var i = 0; i < globals.menu.dom.length; i++) {
			globals.menu.width += globals.menu.dom.eq(i).width();
		}
		
		globals.menu.extra.on('click touchstart', function() {
			globals.menu.ul.toggle();
		});
		
		resolutionHandle();
	}
	return external;
})();