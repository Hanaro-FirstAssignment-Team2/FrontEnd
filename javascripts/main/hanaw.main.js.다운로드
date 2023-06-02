/**
 * 메인 배너
 *
 */
var MainBanner = (function() {


	/**
	 * hanaw.com 데스크탑 메인 페이지 UI
	 *
	 * 오상원
	 */

	var mainBannerImgs = [];
	var mainBannerImgsTemp = [
		{
			imgSrc 		: "/templets/main/img/MAIN/main_banner_text_230424.png",
			bgUrl 		: "/templets/main/img/MAIN/main_banner_bg_230424.png",
			thumbUrl 	: "/templets/main/img/MAIN/main_banner_thumb_230424.png",
			linkUrl 	: "/corebbs5/eventIng/view/view.cmd?bbsSeq=465",
			imgAlt 		: "국내주식선물 거래 이벤트, 인체공학 버티컬 마우스 증정",
			target		: "_self",
			endDate		: "2023-10-31"
	  	},
		{
			imgSrc 		: "/templets/main/img/MAIN/main_banner_text_230413.png",
			bgUrl 		: "/templets/main/img/MAIN/main_banner_bg_230413.png",
			thumbUrl 	: "/templets/main/img/MAIN/main_banner_thumb_230413.png",
			linkUrl 	: "/corebbs5/eventIng/view/view.cmd?bbsSeq=462",
			imgAlt 		: "신용융자&middot;주식담보대출 이자율 할인 이벤트",
			target		: "_self",
			endDate		: "2023-06-30"
	  	},
		{
			imgSrc 		: "/templets/main/img/MAIN/main_banner_text_230224.png",
			bgUrl 		: "/templets/main/img/MAIN/main_banner_bg_230224.png",
			thumbUrl 	: "/templets/main/img/MAIN/main_banner_thumb_230224.png",
			linkUrl 	: "/corebbs5/eventIng/view/view.cmd?bbsSeq=458",
			imgAlt 		: "온라인 장외채권 매수 이벤트 온라인 장외채권 순매수 금액별, 국내주식매수쿠폰 지급",
			target		: "_self",
			endDate		: "2023-04-30"
	  	},
		{
			imgSrc 		: "/templets/main/img/MAIN/main_banner_text_220127.png?v=230201",
			bgUrl 		: "/templets/main/img/MAIN/main_banner_bg_220127.png?v=230201",
			thumbUrl 	: "/templets/main/img/MAIN/main_banner_thumb_220127.png?v=230201",
			linkUrl 	: "/corebbs5/eventIng/view/view.cmd?bbsSeq=402",
			imgAlt 		: "마이데이터로 MY 자산을 합! 자산 연결 시, 전원 랜덤 혜택",
			target		: "_self",
			endDate		: "2023-12-31"
	  	}
	];

	var today = new Date();	

	if(mainBannerImgsTemp.length <= 1) {
		mainBannerImgs.push(mainBannerImgsTemp[0]);
		
	} else {
		for(var i=0; i<mainBannerImgsTemp.length; i++) {
			var end = (mainBannerImgsTemp[i].endDate == '') ? '' : new Date(mainBannerImgsTemp[i].endDate + 'T23:59:59');

			if(end == '' || end.getTime() >= today.getTime()) {
				mainBannerImgs.push(mainBannerImgsTemp[i]);
			}
		}

		if(mainBannerImgs.length == 0) {
			mainBannerImgs = mainBannerImgsTemp;
		}
	}

	var self = {};

	var currentIdx = 0;
	var currentShowingIdx = null;
	var currentHidingIdx = null;

	var onoff = false; // false 정지, true 동작상태

	var delay = null;

	var ROLLING_DELAY = 6000;
	var SLOW_SPEED = 2000;
	var FAST_SPEED = 200;

	var mainBannerBackgroundMarkup = '<span class="main-banner-background"></span>';
	var mainBannerImgMarkup = '<div>' + '<div>' + '<a href="" class="main-banner-btn btn-banner">' + '<img class="main-banner-img" src="" alt="" />' + '</a>' + '</div>' + '</div>';
	var mainBannerImgMarkup_1 = '<div>' + '<div>' + '<img class="main-banner-img" src="" alt="" />' + '</div>' + '<div class="mainbtn">' + '<a href="" class="main-banner-btn btn btn-green sm arr"></a> <a href="" class="main-banner-btn_1 btn sm arr"></a>' + '</div>' + '</div>';
	var mainBannerIndiMarkup = '<li>' + '<button type="button" class="main-banner-indi"><span class="mask"></span><img src="" alt="" /></button>' + '</li>';
	var mainBannerWrap = null;
	var mainBannerImgWrap = null;
	var mainBannerControll = null;
	var onoffButton = null;

	var mainBannerImgMarkups = [];
	var mainBannerBackgroundMarkups = [];
	var mainBannerIndiMarkups = [];

	function collectMarkup() {
		mainBannerWrap = $('.main-banner-wrap');
		mainBannerImgWrap = mainBannerWrap.find('.main-banner-img-wrap');
		mainBannerControll = mainBannerWrap.find('.maincontrol > ul');
		onoffButton = mainBannerWrap.find('.main-banner-onoff');
	}

	function appendMarkup() {		
		if (!mainBannerImgs || mainBannerImgs.length == 0) {
			return;
		}

		for ( var i = 0, len = mainBannerImgs.length; i < len; i++) {

			var imgSource = mainBannerImgs[i];
			var bgObj = makeBackgroundObject(imgSource, i);
			var imageObj = makeImageObject(imgSource, i);

			mainBannerWrap.prepend(bgObj.markup);
			mainBannerImgWrap.append(imageObj.markup);
			$(appendMainBannerIndi(i)).insertBefore(onoffButton.parent('li'));
		}

	}

	function makeBackgroundObject(imgSource, idx) {

		var markup = $(mainBannerBackgroundMarkup);

		var markupObj = {};

		if (!imgSource.bgUrl || imgSource.bgUrl.length === 0) {
			if(imgSource.bgColor) {
				markup.css({
					'background-color' : imgSource.bgColor
				});
			}

			markup.css({
				'background-image' : 'none'
			});

		} else {

			markup.css({
				'background-image' : 'url(' + imgSource.bgUrl + ')',
				'background-repeat' : 'no-repeat',
				'background-position' : '50% 0'
			});
			if (imgSource.bgRepeat) markup.css ("background-repeat", imgSource.bgRepeat);
			if (imgSource.bgPosition) markup.css ("background-position", imgSource.bgPosition);
		}

		markupObj.markup = markup;

		mainBannerBackgroundMarkups.push(markupObj);

		return markupObj;

	}

	function makeImageObject(imgSource, idx) {

		var markup = $(mainBannerImgMarkup);
		var markup_1 = $(mainBannerImgMarkup_1);

		var markupObj = {};


		if(imgSource.linkUrl_1 != null){
			//두개
			var img = markup_1.find('.main-banner-img');

			img.attr('src', imgSource.imgSrc).attr('alt', imgSource.imgAlt);

			var btn = markup_1.find('.main-banner-btn');

			btn.attr({'href': imgSource.linkUrl, "target" : imgSource.target}).addClass(imgSource.btnColor).text(imgSource.btnTitle);

			var btn_1 = markup_1.find('.main-banner-btn_1');

			btn_1.attr({'href': imgSource.linkUrl_1, "target":imgSource.target_1}).addClass(imgSource.btnColor1).text(imgSource.btnTitle1);

			if(imgSource.click){
				btn.on('click',function(e){
					e.preventDefault();
					imgSource.click();
				});
				btn_1.on('click',function(e){
					e.preventDefault();
					imgSource.click();
				});
			}

			btn.on('click', function(e) {

			});

			btn_1.on('click', function(e) {

			});

			markup_1.css({
				'position' : 'absolute'
			});

			markupObj.markup = markup_1;
		}else{
			//한개
			var img = markup.find('.main-banner-img');

			img.attr('src', imgSource.imgSrc).attr('alt', imgSource.imgAlt);

			var btn = markup.find('.main-banner-btn');

			if (imgSource.linkUrl.length > 0) {
				btn.attr({'href': imgSource.linkUrl, "target": imgSource.target});

				if(imgSource.click){
					btn.on('click',function(e){
						e.preventDefault();
						imgSource.click();
					});
				}

				btn.on('click', function(e) {

				});

			} else if (imgSource.linkUrl.length == 0) markup.find(btn).remove(); // 버튼이 없을때

			markup.css({
				'position' : 'absolute'
			});

			markupObj.markup = markup;
		}

		if (imgSource.customMarkup != null) markup.append(imgSource.customMarkup);

		mainBannerImgMarkups.push(markupObj);

		return markupObj;
	}

	function appendMainBannerIndi(idx){

		var markup = $(mainBannerIndiMarkup);
		var button = markup.find('button');

		var img = markup.find('img');
		img.attr({'src' : mainBannerImgs[idx].thumbUrl, 'alt' : idx});

		if (idx === currentIdx) {
			button.addClass('active');
		}

		mainBannerIndiMarkups.push(button);

		return markup;
	}

	function attachEvents() {

		// on off 버튼
		onoffButton.on('click', function(e) {

			e.preventDefault();

			if (onoff) {
				stopRolling();
			} else {
				startRollong();
			}

		});

		for ( var i = 0, len = mainBannerImgMarkups.length; i < len; i++) {

			var mainBannerImgMarkup = mainBannerImgMarkups[i].markup;
			attachImgMarkupEvents(mainBannerImgMarkup, i);

		}

		for ( var i = 0, len = mainBannerIndiMarkups.length; i < len; i++) {

			var mainBannerIndiMarkup = mainBannerIndiMarkups[i];
			attachIndiEvents(mainBannerIndiMarkup, i);
		}
	}

	function attachImgMarkupEvents(markup, idx) {

		var tabbable = markup.find(':tabbable');

		// console.log(tabbable.get(0).outerHTML)

		tabbable.last().on('keydown', function(e) {

			var keyCode = e.keyCode || e.which;

			if (!e.shiftKey && keyCode == 9) {

				// console.log('tab');

				if (idx !== mainBannerIndiMarkups.length - 1) {

					var indi = mainBannerIndiMarkups[idx + 1];

					e.preventDefault();
					// console.log('focus next indi');

					indi.focus();
				} else {

					// console.log('focus default');
				}

			}
		});

		tabbable.first().on('keydown', function(e) {

			var keyCode = e.keyCode || e.which;

			if (e.shiftKey && keyCode == 9) {

				// console.log('shift tab');

				var indi = mainBannerIndiMarkups[idx];

				e.preventDefault();
				// console.log('focus now indi');

				indi.focus();
			}
		});

	}

	function attachIndiEvents(markup, idx) {

		markup.on('click', function(e) {
			e.preventDefault();
		});

		markup.on('mouseenter', function(e) {

			stopRolling();
			stopAnimating();
			fadeBanner(idx, currentIdx, FAST_SPEED);

		});

		markup.on('focusin', function(e) {

			stopRolling();
			showBanner(idx, currentIdx);

		});

		markup.on('mouseleave', function(e) {

			startRollong();
		});

		markup.on('keydown', function(e) {

			var keyCode = e.keyCode || e.which;

			if (keyCode == 9 && !e.shiftKey) {

				var mainBannerImgMarkup = mainBannerImgMarkups[idx].markup;
				var tabbable = mainBannerImgMarkup.find(':tabbable');

				if (tabbable.size() > 0) {
					e.preventDefault();
					tabbable.eq(0).focus();
				}

			} else if (e.shiftKey && keyCode == 9) {

				if (idx !== 0) {

					showBanner(idx - 1, idx);
					var mainBannerImgMarkup = mainBannerImgMarkups[idx - 1].markup;
					var tabbable = mainBannerImgMarkup.find(':tabbable');

					if (tabbable.size() > 0) {

						e.preventDefault();
						tabbable.last().focus();
					}
				}
			}
		});
	}

	function hideMarkups() {

		for ( var i = 0, len = mainBannerImgs.length; i < len; i++) {

			if (i !== 0) {
				mainBannerImgMarkups[i].markup.hide();
				mainBannerBackgroundMarkups[i].markup.hide();
			}
		}
	}

	function stopAnimating() {

		if (currentHidingIdx !== null) {
			mainBannerImgMarkups[currentHidingIdx].markup.stop(true, true);
			mainBannerBackgroundMarkups[currentHidingIdx].markup.stop(true, true);
		}

		if (currentShowingIdx !== null) {
			mainBannerImgMarkups[currentShowingIdx].markup.stop(true, true);
			mainBannerBackgroundMarkups[currentShowingIdx].markup.stop(true, true);
		}

	}
	;

	function showBanner(showingIdx, hidingIdx) {

		stopAnimating();

		currentIdx = showingIdx;

		if (showingIdx === hidingIdx) {
			return;
		}

		currentHidingIdx = hidingIdx;
		mainBannerIndiMarkups[hidingIdx].removeClass('active');
		mainBannerImgMarkups[hidingIdx].markup.hide();
		mainBannerBackgroundMarkups[hidingIdx].markup.hide();

		currentShowingIdx = showingIdx;
		mainBannerIndiMarkups[showingIdx].addClass('active');
		mainBannerImgMarkups[showingIdx].markup.show();
		mainBannerBackgroundMarkups[showingIdx].markup.show();
	}

	function fadeBanner(showingIdx, hidingIdx, speed) {

		currentIdx = showingIdx;

		if (showingIdx === hidingIdx) {
			return;
		}

		currentHidingIdx = hidingIdx;
		mainBannerIndiMarkups[hidingIdx].removeClass('active');
		mainBannerBackgroundMarkups[hidingIdx].markup.fadeOut(speed);
		mainBannerImgMarkups[hidingIdx].markup.fadeOut(speed);

		currentShowingIdx = showingIdx;
		mainBannerIndiMarkups[showingIdx].addClass('active');
		mainBannerImgMarkups[showingIdx].markup.fadeIn(speed);
		mainBannerBackgroundMarkups[showingIdx].markup.fadeIn(speed);
	}

	function roll(idx, firstRunning) {

		// console.log(currentIdx)

		var showingIdx = idx;
		var hidingIdx = idx - 1;
		var nextIdx = idx + 1;

		if (hidingIdx < 0) {
			hidingIdx = mainBannerImgMarkups.length - 1;
		}

		if (nextIdx === mainBannerImgMarkups.length) {
			nextIdx = 0;
		}

		if (firstRunning === true) {
			roll(nextIdx);
			return;
		}

		delay = setTimeout(function() {

			fadeBanner(showingIdx, hidingIdx, SLOW_SPEED);
			roll(nextIdx);

		}, ROLLING_DELAY);

	}

	function startRollong() {
		onoff = true;
		onoffButton.removeClass('off').attr('title', '배너 롤링 끄기');
		roll(currentIdx, true);
	}

	function stopRolling() {
		clearTimeout(delay);
		delay = null;
		onoffButton.addClass('off').attr('title', '배너 롤링 켜기');
		onoff = false;
	}

	self.init = function() {

		collectMarkup();
		appendMarkup();
		attachEvents();
		hideMarkups();
		startRollong();

	};

	self.stop = function() {
		stopRolling();
	};

	self.start = function() {
		startRollong();
	};

	return self;

})();



/**
	스.마.트.한 자산관리 롤링

	오상원
*/
var SmartRolling = (function () {

	var self = {};

	var focusBanner = null;
	var focusBannerSlider = null;

	function collectMarkup () {
		smartBannerWrapper = $('#info-news-wrapper');
		smartBannerSlider = smartBannerWrapper.find('.info-news');
	}

	function applySlider () {
		var bxslider = smartBannerSlider.bxSlider({
			pager : false,
			auto: true,
			autoHover : true,
			autoControls: true,
			mode : 'vertical',
			speed : 500,
			pause : 6000
		});
		TabbableSlider(bxslider);
	}

	self.init = function () {

		collectMarkup();
		applySlider();
	};

	return self;

})();


/*
	연금 롤링 - 최희진
*/

var YeongumRoll = (function(){
	var self = {};

	function init(){
		addEvent();

		var yeongumLi = $(".info-m").find(".info-news");

		var bxslider = yeongumLi.bxSlider({
			pager : false,
			auto: true,
			autoHover : true,
			autoControls: true,
			mode : 'horizontal',
			speed : 400,
			pause : 6000
		});

		TabbableSlider(bxslider);


	}

	function addEvent(){
		$(".remoteBtn a").bind("click", function(event){
			event.preventDefault();
		});
	}

	self.init = function(){
		init();
	};

	return self;
})();

/**
 * 매인 컨텐츠
 */

var MainContent = (function() {

	var self = {};

	var UP_ARRW = "<span>상승</span>";
	var DOWN_ARRW = "<span>하락</span>";

	function getArrw(prdayCmpTp){
		var intTp = parseInt(prdayCmpTp);
		var result = "";
		switch (intTp) {
		case 1:	//상한
			result = UP_ARRW;
			break;
		case 2:	//상승
			result = UP_ARRW;
			break;
		case 4:	//하한
			result = DOWN_ARRW;
			break;
		case 5:	//하락
			result = DOWN_ARRW;
			break;
		default:
			break;
		}
		return result;
	}

	function makeJisuObj(key){

	}

	function setJisu() {



		var jisu = hanaw.maindata.jisu;

		var kospi_nowPrc = $("#kospi_nowPrc");
		var kospi_prdayCmp = $("#kospi_prdayCmp");
		//var kospi_updnRat = $("#kospi_updnRat");

		var kosdaq_nowPrc = $("#kosdaq_nowPrc");
		var kosdaq_prdayCmp = $("#kosdaq_prdayCmp");
		//var kosdaq_updnRat = $("#kosdaq_updnRat");

		//var kospi200_nowPrc = $("#kospi200_nowPrc");
		//var kospi200_prdayCmp = $("#kospi200_prdayCmp");
		//var kospi200_updnRat = $("#kospi200_updnRat");

		var dow_nowPrc = $("#dow_nowPrc");
		var dow_prdayCmp = $("#dow_prdayCmp");
		//var dow_updnRat = $("#dow_updnRat");

		var nasdaq_nowPrc = $("#nasdaq_nowPrc");
		var nasdaq_prdayCmp = $("#nasdaq_prdayCmp");
		//var nasdaq_updnRat = $("#nasdaq_updnRat");

		kospi_nowPrc.text(jisu.KOSPI.Idx);
		kospi_prdayCmp.html(getArrw(jisu.KOSPI.PrdayCmpTp)+jisu.KOSPI.PrdayCmp);

		kosdaq_nowPrc.text(jisu.KOSDAQ.Idx);
		kosdaq_prdayCmp.html(getArrw(jisu.KOSDAQ.PrdayCmpTp)+jisu.KOSDAQ.PrdayCmp);

		dow_nowPrc.text(jisu.DOW.Idx);
		dow_prdayCmp.html(getArrw(jisu.DOW.PrdayCmpTp)+jisu.DOW.PrdayCmp);

		nasdaq_nowPrc.text(jisu.NASDAQ.Idx);
		nasdaq_prdayCmp.html(getArrw(jisu.NASDAQ.PrdayCmpTp)+jisu.NASDAQ.PrdayCmp);

	}

	function isNewArticle(date){

	}

	function setNotice(){

		var notice = hanaw.maindata.notice;

		var noticeArticles = $("#noticeArticles");	//공지사항 UL
		var notice_innerHtml ="";
		for(var i=0,ic=notice.length;i<ic;i++){
			var _title = notice[i].title;
			notice_innerHtml += "<li>";
			notice_innerHtml += "<a href='/corebbs5/notice/view/view.cmd?bbsSeq="+notice[i].bbsSeq+"' title='"+_title+"'>"+_title+"</a>";
			if(hanaw.util.isNew(notice[i].wrtrDd)){
				notice_innerHtml += "<div class='icon-new'><span>new</span></div>";	//새 글일 경우
			}
			notice_innerHtml += "<span class='date'>"+notice[i].wrtrDd+"</span>";
			notice_innerHtml += "</li>";
		}
		noticeArticles.html(notice_innerHtml);
	}

	function setEvent(){

		var event = hanaw.maindata.event;

		var eventArticles = $("#eventArticles");	//이벤트 UL
		var event_innerHtml ="";
		for(var i=0,ic=event.length;i<ic;i++){
			var _title = event[i].title;
			event_innerHtml += "<li>";
			event_innerHtml += "<a href='/corebbs5/eventIng/view/view.cmd?bbsSeq="+event[i].bbsSeq+"' title='"+_title+"'>"+_title+"</a>";
			if(hanaw.util.isNew(event[i].wrtrDd)){
				event_innerHtml += "<div class='icon-new'><span>new</span></div>";	//새 글일 경우
			}
			event_innerHtml += "<span class='date'>"+event[i].wrtrDd+"</span>";
			event_innerHtml += "</li>";
		}
		eventArticles.html(event_innerHtml);
	}

	self.init = function init() {
		if(!hanaw.maindata) {
			return;
		}
		setJisu();
		setNotice();
		setEvent();
	};

	return self;
})();


/**
	지수가 커졌다 작아졌다 한다.

	오상원
*/
var JisuRolling = (function () {
	var self = {};

	var jisuList = null;
	var jisu = null;
	var jisuCount = null;
	var jisuTimer = null;

	function collectMarkup () {
		jisuList = $('#jisuInfo');
		jisu = jisuList.find('li');
		jisuCount = jisu.length;
	}

	function startRolling (seq) {
		jisu.filter('.active').removeClass('active');
		jisu.eq(seq%jisuCount).addClass('active');

		jisuTimer = setTimeout(function () {
			startRolling(++seq);
		}, 5000);
	}

	function setController() {
		jisuList.find('.btn-next').click(function() {
			clearTimeout(jisuTimer);
			startRolling (jisuList.find('.active').index(jisu.index(jisuList.find('li.active')))+1);
		});

		jisuList.find('.btn-prev').click(function() {
			clearTimeout(jisuTimer);
			startRolling (jisuList.find('.active').index(jisu.index(jisuList.find('li.active')))-1);
		});
	}

	self.init = function () {
		collectMarkup();
		setController();
		startRolling(0);
	};


	return self;
})();

/**
	스.마.트.한 자산관리 롤링

	오상원
*/
var SmartRolling = (function () {

	var self = {};

	var focusBanner = null;
	var focusBannerSlider = null;

	function collectMarkup () {
		smartBannerWrapper = $('#info-news-wrapper');
		smartBannerSlider = smartBannerWrapper.find('.info-news');
	}

	function applySlider () {
		var bxslider = smartBannerSlider.bxSlider({
			pager : false,
			auto: true,
			autoHover : true,
			autoControls: true,
			mode : 'vertical',
			speed : 500,
			pause : 6000
		});
		TabbableSlider(bxslider);
	}

	self.init = function () {

		collectMarkup();
		applySlider();
	};

	return self;

})();

/**
	하나금융투자 EVENT 롤링

	오상원
*/
var EventRolling = (function () {

	var self = {};

	var focusBanner = null;
	var focusBannerSlider = null;

	function collectMarkup () {

		focusBanner = $('#maincon-board');
		focusBannerSlider = focusBanner.find('.list-event');
	}

	function applySlider () {

		var bxslider = focusBannerSlider.bxSlider({
			controls : false,
			auto: true,
			autoHover : true,
			autoControls: true,
			mode : 'horizontal',
			speed : 500,
			pause : 7000
		});

		TabbableSlider(bxslider);

	}
	self.init = function () {

		collectMarkup();
		applySlider();
	};

	return self;

})();

var mainRcToggle = function() {
	var box = $('div#maincon-rc');

	var open = box.find('div.mp-p').hide();
	var span = open.find("span");
	var hide = box.find('div.mp-m');
	var ul = box.find('ul');

	hide.off('click').on('click', function(e) {
		e.preventDefault();
		ul.show();
		var _this = $(this);
		if (_this.hasClass("mp-p")) {
			_this.removeClass("mp-p").addClass("mp-m");
			span.text("펼치기");
			ul.show();
		} else {
			_this.removeClass("mp-m").addClass("mp-p");
			span.text("접기");
			ul.hide();
		}
	});
};

var ResearchOpener = (function () {

	var self = {};

	var reasearchOpener = null;
	var reasearchArea = null;

	function collectMarkup () {
		reasearchOpener = $('#research-opener-btn');
		reasearchArea = $('#research-area');
	}

	function bindEvents () {
		reasearchOpener.on('click', function (e) {
			e.preventDefault();
			if (reasearchArea.hasClass('hide')) {
				reasearchArea.removeClass('hide');
				reasearchOpener.parent().removeClass("mp-p").addClass("mp-m").find('span').text('접기');
			} else {
				reasearchArea.addClass('hide');
				reasearchOpener.parent().removeClass("mp-m").addClass("mp-p").find('span').text('펼치기');
			}

		});
	}

	self.init = function () {
		collectMarkup();
		bindEvents();
	};


	return self;
})();

var FirstVisit = (function () {

	var self = {};

	function bindEvents () {
		var parent = $('.first-visit');

		parent.find('.list-step').on('mouseenter', 'a', function() {
			parent.attr('class', 'first-visit step-'+$(this).data('idx'));
		});

		parent.on('mouseleave', function() {
			parent.attr('class', 'first-visit');
		});
	}

	self.init = function () {
		bindEvents();
	};

	return self;
})();

var MainTab = (function () {

	var self = {};

	function bindEvents () {
		var parent = $('#maincon-info');

		parent.on('click', '.btn-tab', function() {
			parent.find('.info-wrap').removeClass('active');
			$(this).closest('.info-wrap').addClass('active');
			parent.find('.bg-tab').attr('class', 'bg-tab active-' + $(this).data('name'));
			return false;
		});
	}

	self.init = function () {
		bindEvents();
	};

	return self;
})();
