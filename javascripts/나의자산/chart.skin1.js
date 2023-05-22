function getChartCodeUrl(f,codeType){
	var url = "";
	if(codeType=="upcode"){
		url = "&UpCd="+f.UpCd.value;
	}else if(codeType=="jangcode"){
		url = "&KfxTp="+f.KfxTp.value;
	}else {
		url = "&IsuCd="+f.IsuCd.value;
	}
	
	return url;
}

function getChartFormat(codeType){
	var yaxisformat = "priceDataFormat";
	
	if(codeType=="upcode"||codeType=="fjcode"||codeType=="opcode"||codeType=="focode"){
		yaxisformat = "priceDataFormatFix";
	}
	
	return yaxisformat;
}


(function($){
	/*
	 * 종합차트
	 */
	$.stockchart = function(selector, f, _option, mobile){
		function getWtsChartUrl(f){
			var url = "";
			var url2 = "";
			try{
				url = "chartGubun=total&codeType="+f.codeType.value+"&indx="+f.indx.value+"&igap="+f.igap.value+"&gday="+f.gday.value.replace(/[^0-9]/g,'');
				
				if(f.IsuCd!==undefined){
					url2 = "&IsuCd="+f.IsuCd.value;
				}else if(f.UpCd!==undefined){
					url2 = "&UpCd="+f.UpCd.value;
				}
				
				if(f.marketClose !== undefined){
					url2 += '&marketClose=' + f.marketClose.value;
				}
				
			}catch(e){}
			
			return url+url2;
		}
		var stockchart = {
				init: function(){
					this.chart = null;
					this.isIE = false; // true 로 변경하면 html5 차트 출력
					if('ontouchstart' in document.documentElement || this.isIE || mobile == "mobile" || _option.usemobiledevice == "minimum"){
						if(this.chart != null) return;
						var itemcount = 80, ylabelgap = 76, canvaspaddingleft = 20, ylabelpaddingright = 10;
						if(mobile){itemcount = 30, ylabelgap = 50, canvaspaddingleft = 8, ylabelpaddingright = 0; }
						
						var url2 = "";
						
						if(f.IsuCd!==undefined){
							url2 = "&IsuCd="+f.IsuCd.value;
						}else if(f.UpCd!==undefined){
							url2 = "&UpCd="+f.UpCd.value;
						}
						
						var yaxisformat = "priceDataFormat";
						var codeType = f.codeType.value; 
						if(codeType=="hjcode"){
							yaxisformat = "priceDataFormat";
						}else{
							yaxisformat = "priceDataFormatFix";
						}
						
						var dayTimeFormat = "dayDataFormat";
						var xaxis = "Date";
						if(f.indx.value === "4"||f.indx.value === "5"){
							dayTimeFormat = "timeDataFormat6to4";
							xaxis = "Time";
						}						
						
						var stockOptions = {
								"datatype":"json",
								"url": "/WEB-APP/wts/data/getChartData.cmd?"+getWtsChartUrl(f)+url2,
								"stockmenuurl": "/WEB-APP/webponent/chart/html5/ci.chart.personal.html",
								"stocksubyaxis": "Cprc", "stockvolumeyaxis": "TrdRat",
								"xaxisformat": dayTimeFormat,"yaxisformat":yaxisformat, "usestock": true, "usecrossline": true,
								"stockMenuWidth": 98,"usecanvasmoveall": true, "usemobiledevice": "pc", "itemcount": itemcount
						};
						var stockStyles = {
								"main":{
									"canvaspaddingbottom": 0, "canvaspaddingleft": canvaspaddingleft,
									"ylabelgap": ylabelgap, "ylabelalign": "left", "ylabelpaddingright": ylabelpaddingright, "ylabelpaddingleft": 10, "yaxisalign": "right",
									"xlabelfontcolor": "#666666", "ylabelfontcolor": "#666666", "xlabelgap": 20, "xlabelpaddingtop": 15,
									"graphstroketopcolor": "#cccccc", "graphstrokeleftcolor": "#cccccc", "graphstrokebottomcolor": "#cccccc", "graphstrokerightcolor": "#cccccc",
									"horizontalgridstrokecolor": "#cccccc","verticalgridstrokecolor": "#cccccc",
									"crosslinestyle": "solid", "crosslinecolor": "#000000", "legendimage": "/WEB-APP/webponent/chart/html5/legend.png",
									"candle": {
										"itemwidth": "80", "useaccessibility": true, "usemaxvalue": true, "useminvalue": true,
										"maxvaluearrowimage": { "url": "/WEB-APP/webponent/chart/html5/img/allow_max.gif", "top": 560, "left": 10, "width": 8, "height": 9 },
										"minvaluearrowimage": { "url": "/WEB-APP/webponent/chart/html5/img/allow_min.gif", "top": 580, "left": 10, "width": 8, "height": 9 },
										"upfillcolor": 		 [[0.2, "rgba(219,76,60,0.6)"],  [0.5, "rgba(234,102,87,0.6)"],  [0.8, "rgba(219,76,60,0.6)"]],
										"downfillcolor": 	 [[0.2, "rgba(123,190,246,0.6)"], [0.5, "rgba(145,200,248,0.6)"], [0.8, "rgba(123,190,246,0.6)"]],
										"overupfillcolor": {
											"src": "/WEB-APP/webponent/chart/html5/img/pattern_column_over.png",
											"fill": [[0.2, "rgba(219,76,60,1)"],    [0.5, "rgba(234,102,87,1)"],    [0.8, "rgba(219,76,60,1)"]]
										},
										"overdownfillcolor": {
											"src": "/WEB-APP/webponent/chart/html5/img/pattern_column_over.png",
											"fill": [[0.2, "rgba(123,190,246,1)"],   [0.5, "rgba(145,200,248,1)"],   [0.8, "rgba(123,190,246,1)"]]
										},
										"upstrokecolor": "#c42c1c", "downstrokecolor": "#5aa0da", "overupstrokecolor": "#c42c1c", "overdownstrokecolor": "#5aa0da",
										"maxvaluefontstyle": "11px 'dotum'", "minvaluefontstyle": "11px 'dotum'"
									},
									"line": {
										"useaccessibility": true, "usemaxvalue": true, "useminvalue": true,
										"maxvaluearrowimage": { "url": "/WEB-APP/webponent/chart/html5/img/allow_max.gif", "top": 560, "left": 10, "width": 8, "height": 9 },
										"minvaluearrowimage": { "url": "/WEB-APP/webponent/chart/html5/img/allow_min.gif", "top": 580, "left": 10, "width": 8, "height": 9 }
									},
									"hloc": {
										"useaccessibility": true, "usemaxvalue": true, "useminvalue": true,
										"maxvaluearrowimage": { "url": "/WEB-APP/webponent/chart/html5/img/allow_max.gif", "top": 560, "left": 10, "width": 8, "height": 9 },
										"minvaluearrowimage": { "url": "/WEB-APP/webponent/chart/html5/img/allow_min.gif", "top": 580, "left": 10, "width": 8, "height": 9 }
									}
								}
						};
						var stockSeries = {
								"main":{
									"candle": { "series": "candle","xaxis": "Date","open": "Mprc","high": "Hiprc","low": "Lprc","close": "Cprc","label": "종가","stockmain": true },
									"hloc":   { "visible": false, "series": "hloc", "xaxis": "Date", "open": "Mprc", "high": "Hiprc", "low": "Lprc", "close": "Cprc", "label": "종가", "stockmain": true },
									"line":   { "visible": false, "series": "line", "xaxis": "Date", "yaxis": "Cprc", "label": "종가", "stockmain": true }
								}
						};
						stockOptions = $.extend(true, stockOptions, _option);
						this.chart = selector.createChart(stockOptions, stockStyles, stockSeries);
					} else {
						// cmd=getChartData-flashvars에서 추가       &chartGubun=total- Flex 안에서 고정
						// 시장구분 codeType 주식-J, 업종-U, 선물옵션-F, 주식옵션-O
						// 종목코드 IsuCd
						// 주기 term(0-틱 1-분 2-일 3-주 4-월 5-년) - 분 일때 unit(3분간격일때 값은 3)
						// 조회일 date(값없으면 오늘 날짜-jsp안에서 오늘날짜 지정해줘야함)
						
						var str = '';
						
						var UDID = function(){
							return '_'+Math.random().toString(36).substr(2,9);
						};
						var uniqueID = 'Chart'+UDID();
						if(selector[0].attachEvent) { // IE11 미만버전

							var newDate = new Date();						
							str = '<object type="application/x-shockwave-flash" width="835" data="/WEB-APP/webponent/chart/flex/stock.swf?'+newDate.getTime()+'" height="500" id="'+uniqueID+'" name="'+uniqueID+'" align="middle" style="width: 835px;height:500px;">';
						 	str+= '<param name="allowScriptAccess" value="always" />';
					        str+= '<param name="flashvars" value="dataURL=/WEB-APP/wts/data.jspx&cmd=getChartData&'+getWtsChartUrl(f)+'&funcmoveall=callJsMouseInfo" />';
					        str+= '<param name="movie" value="/WEB-APP/webponent/chart/flex/stock.swf?'+newDate.getTime()+'" />';
					        str+= '<param name="quality" value="high" />';
					        str+= '<param name="wmode" value="transparent" />';
					        str+= '<param name="allowFullScreen" value="false" />';
					        str+= '<param name="width" value="835" />';
					        str+= '<param name="height" value="500" />';
					        str+= '</object>';
						} else {
							var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
							if(isIE11){ // IE11
								str = '<object name="chart3" id="chart3" type="application/x-shockwave-flash" data="/WEB-APP/webponent/chart/flex/stock.swf" width="835" height="500">'
									+'<param name="flashvars" value="dataURL=/WEB-APP/wts/data.jspx&cmd=getChartData&'+getWtsChartUrl(f)+'&funcmoveall=callJsMouseInfo" />'									
									+'<param name="allowScriptAccess" value="always" />'
									+'<param name="wmode" value="transparent" />'
									+'<param name="allowFullScreen" value="false" />'
									+'<embed name="chart4" id="chart4" src="/WEB-APP/webponent/chart/flex/stock.swf" width="100%" height="500"></embed>'
									+'<p>이 콘텐츠를 보려면 <a href="https://www.adobe.com/kr/products/flashplayer/">Flash Player</a>(무료)가 필요합니다.</p>'
									+'<div>증권차트 플래시 파일입니다. </div>'
									+'</object>';
							} else { // IE 제외 브라우저
								str = '<embed name="chart2" id="chart2"  '
										+'src="/WEB-APP/webponent/chart/flex/stock.swf" width="100%" height="500"'
										+'FlashVars="dataURL=/WEB-APP/wts/data.jspx&cmd=getChartData&'+getWtsChartUrl(f)+'&funcmoveall=callJsMouseInfo" ></embed>';
								
							}
							
						}
						this.chart = $(str);
						
						selector.addClass("pc");
						selector.append(this.chart);
					}
					return this.chart;
				}, 
				inquery: function(f,param){
					if('ontouchstart' in document.documentElement || this.isIE || mobile == "mobile" || _option.usemobiledevice == "minimum"){
						//var url = "/WEB-APP/wts/chart-data.jspx?cmd=process&Stype="+param.Stype+"&Scode="+param.Scode+"&Sbtngb="+param.Sbtngb+"&Sdate="+param.Sdate;//+"&Simgrgb="+Simgrgb+"&Sunit="+Sunit
						
						var url2 = "";
						
						if(f.IsuCd!==undefined){
							url2 = "&IsuCd="+f.IsuCd.value;
						}else if(f.UpCd!==undefined){
							url2 = "&UpCd="+f.UpCd.value;
						}
						
						var yaxisformat = "priceDataFormat";
						var codeType = f.codeType.value; 
						if(codeType=="hjcode"){
							yaxisformat = "priceDataFormat";
						}else{
							yaxisformat = "priceDataFormatFix";
						}
						
						var url ="/WEB-APP/wts/data/getChartData.cmd?"+getWtsChartUrl(f);
						var dayTimeFormat = "dayDataFormat";
						var xaxis = "Date", yaxis = "TrdRat", subyaxis = "TrdRat";
						var usetick = false;
						
						if(f.indx.value === "4"||f.indx.value === "5"){
							dayTimeFormat = "timeDataFormat6to4";
							xaxis = "Time";
							if(f.indx.value === '5'){
								yaxis = "Cprc", subyaxis = "TrdRat";
								usetick = true;
							}
						}
						
						var option = {
							"url": url,
							"xaxisformat": dayTimeFormat,
							"yaxisformat": yaxisformat, "usetick": usetick, "stockvolumeyaxis": subyaxis
						};
						var series = {
								"main": {
									"candle": { "visible": !usetick, "xaxis":xaxis },
									"hloc": { "xaxis":xaxis },
									"line": { "visible": usetick, "xaxis":xaxis, "yaxis": yaxis }
								}
						};
						
						if('research'===param.type){
							option = $.extend(true, option, param);
						}
						//option = $.extend(true, option, param);
						
						this.chart.chart.reDraw(option,{}, series);
					} else {
						var flash = _this.thisMovie($(this.chart, f));//document[$("#chart").get(0).name];
						flash.callData(param);
					}
				},
				thisMovie: function( movieObject ){
					var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
					if( navigator.appName.indexOf( 'Microsoft' ) != -1 || isIE11){
						return movieObject[0];
						//return window[ movieObject ];
					} else {
						return document[ movieObject.attr('name') ];
					}
				},
				changeSize: function(){
					this.chart.changeSize();
				}
		};
		var _this = stockchart;
		_this.init(selector, f, _option, mobile); 
        
        return {
        	inquery: function(f,param ){
        		return _this.inquery(f,param );
        	}, 
        	changeSize: function(){
        		return _this.changeSize();
        	}
        };
	};
	
	$.createChart = function(){
		var chart = {
			/*
			 * 호가 테이블 안에 들어가는 차트
			 * # useVolume 이 true 이면 거래량까지 출력
			 */
			miniCandle: {
				init: function(selector, f, _option, useVolume,_style){
					this.chart = null;
					var set = {};
					set.mainHeight = 100, set.subHeight = 0, set.subVisible = false, set.canvaspaddingbottom = 0;
					if(useVolume){ set.mainHeight = 60, set.subHeight = 40, set.subVisible = true, set.canvaspaddingbottom = 0; }
					var option = { "url": "", "usetip": false, "useselectitem": false , "charttype":"minicandle"};
					var styles = {
							"main" :{
								"usexlabel": false,"useylabel": false, "xlabelgap": 0, "ylabelgap": 0,
								"canvaspaddingtop": 0,"canvaspaddingbottom": set.canvaspaddingbottom,"canvaspaddingleft": 0,"canvaspaddingright": 0,
								"graphpaddingtop": 0,"graphpaddingbottom": 0,"graphpaddingleft": 0,"graphpaddingright": 0,
								"xlabelpaddingtop": 0,"ylabelpaddingright":0,"ylabelpaddingleft": 0,
								"usegraphstroketop": false,"usegraphstrokebottom": false,"usegraphstrokeleft": false,"usegraphstrokeright": false,
								"usehorizontalgridstroke": false, "useverticalgridstroke": false, "graphheight": set.mainHeight, "graphbackgroundcolor": "#fff",
								"series": {
									"itemwidth": 70, "useaccessibility": true,
									"upfillcolor": [[0.15, "#db4c3c"], [0.5, "#e96556"], [0.85, "#db4c3c"]], "upstrokecolor": "#c42c1c",
									"downfillcolor": [[0.15, "#54a8f6"], [0.5, "#6bb3f5"], [0.85, "#54a8f6"]], "downstrokecolor": "#2e80cc"
								},
								"series1": { "strokecolor": "#f23617" }
							},
							"sub": {
								"graphbackgroundcolor": "#EEE", "usexlabel": false,"useylabel": false, "xlabelgap": 0, "ylabelgap": 0,
								"canvaspaddingtop": 0,"canvaspaddingbottom": set.canvaspaddingbottom,"canvaspaddingleft": 0,"canvaspaddingright": 0,
								"graphpaddingtop": 0,"graphpaddingbottom": 0,"graphpaddingleft": 0,"graphpaddingright": 0,
								"xlabelpaddingtop": 0,"ylabelpaddingright":0,"ylabelpaddingleft": 0,
								"usegraphstroketop": false,"usegraphstrokebottom": false,"usegraphstrokeleft": false,"usegraphstrokeright": false,
								"usehorizontalgridstroke": false, "useverticalgridstroke": false, "graphheight": set.subHeight,
								"series3": { "itemwidth": 70 }
							}
					};
					var series = {
							"main":{
								"type": "main",
								"series": { "series": "candle", "xaxis": "Date", "open": "Mprc", "high": "Hiprc","low": "Lprc", "close": "Cprc", "label": "주식정보" }, 
								"series1": { "series": "line", "xaxis": "Date", "yaxis": "avg5", "label": "이동평균5일선" }
							},
							"sub": {
								"type": "sub",
								"series3": { "visible": set.subVisible, "series": "column", "xaxis": "date", "yaxis": "volume", "label": "거래량" }
							}
					};
					option = $.extend(true, option, _option);
					
					styles = $.extend(true, styles, _style);
					this.chart = selector.createChart(option, styles, series);
					
				},
				inquery: function(f,_option){
					var option = {
							"url": "/WEB-APP/webponent/chart/sample/data/chart02_2.txt"
					};
					option = $.extend(true, option, _option);
					if(this.chart.chart == null) return;
					this.chart.chart.reDraw(option);
				},
				realTime: function(_data){
					this.chart.chart.realTime(_data);
				}
			},
			columnChart: {
				init: function(selector, f, _option,_styles,_series){
					this.chart = null;
					var option = { "url": "/WEB-APP/webponent/chart/sample/data/chart03.txt", "datatype": "json" };
					var styles = {
							"main": {
								"canvaspaddingtop": 8,
								"graphstroketopcolor": "#cccccc","graphstrokeleftcolor": "#cccccc","graphstrokebottomcolor": "#cccccc","graphstrokerightcolor": "#cccccc",
								"horizontalgridstrokecolor": "#cccccc","useverticalgridstroke": false, "xlabelfontcolor": "#666666", "ylabelfontcolor": "#666666",
								"crosslinecolor": "#000000", "crosslinestyle": "solid",
								"baseatzero": true, "xlabelgap": 50, "xlabelvertical": true, 
								"ylabelpaddingright": 0, "ylabelgap": 40,"yaxisalign": "right", "ylabelalign": "left", "xlabelfontstyle": "12px dotum",
								"series": {
									"upfillcolor": [[0.15, "#db4c3c"], [0.5, "#e96556"], [0.85, "#db4c3c"]], "upstrokecolor": "#c42c1c",
									"downfillcolor": [[0.15, "#54a8f6"], [0.5, "#6bb3f5"], [0.85, "#54a8f6"]], "downstrokecolor": "#2e80cc",
									"overupfillcolor": {
										"src": "/WEB-APP/webponent/chart/html5/img/pattern_column_over.png",
										"fill": [[0.15, "#db4c3c"], [0.5, "#e96556"], [0.85, "#db4c3c"]]
									},
									"overdownfillcolor": {
										"src": "/WEB-APP/webponent/chart/html5/img/pattern_column_over.png",
										"fill": [[0.15, "#54a8f6"], [0.5, "#6bb3f5"], [0.85, "#54a8f6"]]
									}, "basestrokecolor":"#cccccc"
								}
							}
					};
					var series = {
							"main": {
								"series": { "series": "column", "form": "updown", "xaxis": "name", "yaxis": "rate" }
							}
					};
					option = $.extend(true, option, _option);
					styles = $.extend(true, styles, _styles);
					series = $.extend(true, series, _series);
					this.chart = selector.createChart(option, styles, series);
				},
				inquery: function(f,_option, _styles){
					var option = {
							"url": "/WEB-APP/webponent/chart/sample/data/chart03.txt"
					};
					
					option = $.extend(true, option, _option);
					if(this.chart.chart == null) return;
					this.chart.chart.reDraw(option, _styles);
				},
				realTime: function(_data){
					this.chart.chart.realTime(_data);
				}
			},
			
			doubleChart: {
				init: function(selector, f, _option,_styles,_series){
					this.chart = null;
					var option = { "url": "../../../chart/sample/data/chart14.txt", "datatype":"json", 
							"xaxisformat": "priceDataFormat","yaxisformat": "priceDataFormat", 
							"usecrossline": true, "usetip": true};
					var styles = {
							"main": {
								"graphpaddingleft":0,
								"graphpaddingright":-2,
								"canvaspaddingtop":5,
								"useyaxismaxvalue":true, "useyaxisminvalue":true,
								"ylabelgap":36, "ylabelpaddingright":1,	"ylabelfontcolor":"#666666", "ylabelalign":"right", 
								"xlabelfontcolor":"#666666", "xlabelgap":10, 
								"xaxisbetweenlabels":true,
								"verticalgridstrokecolor":"#cccccc", 
								"usetick":true, "tickcolor":"#cccccc",
								"series":{
									"strokecolor":"rgba(201,193,180,1)", "itemwidth": 50, 
									"fillcolor" : [[0.15, "#e3ddd1"],[0.5, "#ede8e1"],[0.85, "#e3ddd1"]],
									"overfillcolor": {
										"src": "/WEB-APP/webponent/chart/html5/img/pattern_column_over.png"
									},
									"overstrokecolor":"rgba(201,193,180,1)", "overstrokewidth":1
								},
								"series2":{
									"strokecolor":"rgba(196,44,28,1)", "itemwidth": 50, 
									"fillcolor" : [[0.15, "#db4c3c"],[0.5, "#ea6657"],[0.85, "#db4c3c"]], 
									"overfillcolor": {
										"src": "/WEB-APP/webponent/chart/html5/img/pattern_column_over.png", "fill":"red"
												
									},
									"overstrokecolor":"rgba(196,44,28,1)", "overstrokewidth":1
								}
							}
					};
					var series = {
							"main": {
								"series":{"series": "column", "xaxis": "name", "yaxis": "펀드"},
								"series2":{"series": "column", "xaxis": "name", "yaxis": "시장"}
							}
					};
					option = $.extend(true, option, _option);
					styles = $.extend(true, styles, _styles);
					series = $.extend(true, series, _series);
					this.chart = selector.createChart(option, styles, series);
				},
				inquery: function(f,_option, _styles){
					var option = {
							"url": "/WEB-APP/webponent/chart/sample/data/chart03.txt"
					};
					option = $.extend(true, option, _option);
					
					this.chart.chart.reDraw(option, _styles);
				},
				realTime: function(_data){
					this.chart.chart.realTime(_data);
				}
			},
			
			lineChart: {
				init: function(selector, f, _option, _styles, _series){
					this.chart = null;
					var option = { "url": "/WEB-APP/webponent/chart/sample/data/chart06.txt", "datatype": "json", "usecanvasmoveall": true, "funcmoveall": "callJsMouseInfo" };
					var styles = {
							"main": {
								"canvaspaddingtop": 8,
								"graphstroketopcolor": "#cccccc","graphstrokeleftcolor": "#cccccc","graphstrokebottomcolor": "#cccccc","graphstrokerightcolor": "#cccccc",
								"horizontalgridstrokecolor": "#cccccc","verticalgridstrokecolor": "#cccccc", "xlabelfontcolor": "#666666", "ylabelfontcolor": "#666666",
								"crosslinecolor": "#000000", "crosslinestyle": "solid",
								"xlabelgap": 12, 
								"ylabelpaddingright": 0, "ylabelgap": 65, "ylabelalign": "right", "xlabelfontstyle": "12px dotum",
								"series1": { "strokecolor" : "#be0001", "basestrokecolor": "#cccccc", "overfillcolor": "#be0001", "overstrokewidth": 0},
								"series2": { "strokecolor" : "#1a83d9", "basestrokecolor": "#cccccc", "overfillcolor": "#1a83d9", "overstrokewidth": 0},
								"series3": { "strokecolor" : "#82cd14", "basestrokecolor": "#cccccc", "overfillcolor": "#82cd14", "overstrokewidth": 0},
								"series4": { "strokecolor" : "#fcdd4c", "basestrokecolor": "#cccccc", "overfillcolor": "#fcdd4c", "overstrokewidth": 0}
							}
					};
					var series = {
							"main": {
								"series1": {"visible": false, "series": "line", "xaxis": "date", "yaxis": "rate1", "label": "개인" },
								"series2": {"visible": false, "series": "line", "xaxis": "date", "yaxis": "rate2", "label": "외국인" },
								"series3": {"visible": false, "series": "line", "xaxis": "date", "yaxis": "rate3", "label": "증권" },
								"series4": {"visible": false, "series": "line", "xaxis": "date", "yaxis": "rate4", "label": "투신" }
							}
					};
					option = $.extend(true, option, _option);
					styles = $.extend(true, styles, _styles);
					series = $.extend(true, series, _series);
					this.chart = selector.createChart(option, styles, series);
				},
				inquery: function(f, _option){
					var option = {};
					option = $.extend(true, option, _option);
					if(this.chart.chart == null) return;
					this.chart.chart.reDraw(option);
				},
				realTime: function(_data){
					this.chart.chart.realTime(_data);
				}
			},
			multiChart: {
				init: function(selector, f, _option, _styles, _series){
					this.chart = null;
					var option = { 
							"url": "",
							"xaxisformat": "dayDataFormat", "yaxisformat": "priceDataFormat", 
							"usecrossline": true, "usetip": true, "usemultiyaxis": true
					};
					var styles = {
							"main":{
								"canvaspaddingtop": 8,
								"graphstroketopcolor": "#cccccc","graphstrokeleftcolor": "#cccccc","graphstrokebottomcolor": "#cccccc","graphstrokerightcolor": "#cccccc",
								"horizontalgridstrokecolor": "#cccccc","verticalgridstrokecolor": "#cccccc", "xlabelfontcolor": "#666666", "ylabelfontcolor": "#666666",
								"crosslinecolor": "#000000", "crosslinestyle": "solid", "xlabelgap": 12,
								"series1":{
									"baseatzero": false, "itemwidth": 65,
									"yaxisalign": "right", "ylabelalign": "left", "ylabelgap": 40,
									"ylabelpaddingright": 10, "ylabelpaddingleft": 10, "basestrokecolor": "#cccccc"
								},
								"series2":{
									"baseatzero": false, "overstrokewidth":0,
									"yaxisalign": "left", "ylabelalign": "right", "ylabelgap": 35,
									"ylabelpaddingright": 10, "ylabelpaddingleft": 10, "strokecolor": "#1a83d9", "overfillcolor": "#1a83d9", "usedot":true
								}
							}
						};
					var series = {
							"main":{
								"series1":{
									"series": "column",
									"xaxis": "date",
									"yaxis": "volume",
									"yaxisid":"series1"
								},
								"series2":{
									"series": "line",
									"xaxis": "date",
									"yaxis": "high",
									"yaxisid":"series2"
								}
							}
						};
					option = $.extend(true, option, _option);
					styles = $.extend(true, styles, _styles);
					series = $.extend(true, series, _series);
					this.chart = selector.createChart(option, styles, series);
				},
				inquery: function(f, _option, _styles, _series){
					var option = {
							"url": ""
					};
					option = $.extend(true, option, _option);
					if(this.chart.chart == null) return;
					this.chart.chart.reDraw(option, _styles, _series);
				}, 
				visibleSeries: function(f, _option){ 
					/*
					 * 주식파생상품 > 주식주문/계좌 > 주식종합
					 * f1- 코스피,   f2 - 코스닥, f3 - 선물
					 */
					var f1 = f.jisu[0].checked, f2 = f.jisu[1].checked, f3 = f.jisu[2].checked;
					var option = {
							"url": ""
					};
					var styles = {"main":{
						"graphheight": (f3)? ((!f1 && !f2)? 0:48): 100,
			            "xlabelgap": (f3)? 0: 12,
			       		"xlabelpaddingtop": (f3)? 3.5: 10,
			            "usexlabel": (f3)? false: true,
	            		"useverticalgridstroke": (f3)? ((f1 || f2) ? true:false): true,
        				"usegraphstrokeleft": (f3)? ((f1 || f2) ? true:false): true,
			            "canvaspaddingbottom": (f3)? 0: 10,   
						"canvaspaddingright": (f1 && !f2 || f2 && !f1) ? 60 : 10,
						"ylabelgap":  (f2 && !f1) ? 70 : 10,
						"series1": {
							"useylabel": (f1 && !f2) ? false : true
						},
						"series2": {
							"useylabel": (f2 && !f1) ? false : true
			            }
					}, "sub": {
						"canvaspaddingtop": (f3 && !f1 && !f2)? 8: 0, 
						"graphheight": (f3)? ((!f1 && !f2)? 100:52): 0
					}};
				    var series = {"main":{
				        "series1": {"visible": (f1)? true: false},
				        "series2": {"visible": (f2)? true: false}
				    }, "sub":{
				        "type": "sub",
				        "series5": {"visible": (f3)? true: false}
				    }};
				    
				    var option = {
							"url": ""
					};
				    option = $.extend(true, option, _option);
				    this.chart.chart.reDraw(option, styles, series);
				},
				realTime: function(_data){
					this.chart.chart.realTime(_data);
				}
			},
			heatMap: {
				init: function(selector, f, _option, _styles){
					this.chart = null;
					var options = {
							"url": "/WEB-APP/webponent/chart/sample/data/heatmap_json.txt",
							"datatype":"json",
							"use": "gvol",
							"flag":"dftp",
							
//							"url": "/WEB-APP/webponent/chart/sample/data/heatmap.txt",
//							"datatype":"text",
//							"use": "volume",
//							"flag":"flag",
							
							"initcode": "086790",
							"mousemove": "heatmapMouseMove",
							"click": "heatmapMouseClick"
					};

					var styles = { 
							"fillstyle": ["#d4253a", "#eb7b72", "#efefef", "#0d74d4 ", "#70aaef", "#5097ec", "#196ad0"],
							"overstrokestyle": 	["rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)", "rgba(255,255,255,0.5)"],
							"usepattern": true,
							"patternurl": "/WEB-APP/webponent/chart/img/heatmap_", 
							"patternstyle": ["pattern01.png", "pattern02.png", "none", "none", "none", "none", "none"]
					};
					options = $.extend(true, options, _option);
					styles = $.extend(true, styles, _styles);
					this.chart = selector.createHeatMap(options, styles);
				},
				inquery: function(option, f){
					 this.chart.re(option);
				}
			},
			pie: {
				init: function(selector, f, _option, _styles){
					this.chart = null;
					var option = {
				            "url": "../../inc/data/01023.txt",
				            "datatype" : "text",
				            "use" : "pdata",
				            "paddingtop": -5, "paddingbottom": -5
				    };
				    
				    var styles = {
				    		'strokecolor' : ["rgba(0,0,0,0.2)","rgba(0,0,0,0.2)","rgba(0,0,0,0.2)","rgba(0,0,0,0.2)","rgba(0,0,0,0.1)","rgba(0,0,0,0.1)","rgba(0,0,0,0.1)","rgba(0,0,0,0.1)","rgba(0,0,0,0.1)","rgba(0,0,0,0.1)"],
				            'instrokecolor' : 'rgba(0,0,0,0.1)',
				            'fillstyle' : [["#f5603d ", "#f5603d"], ["#ffe521", "#ffe521"], ["#45b4a3", "#45b4a3"], ["#585858", "#585858"]],
				            'tiptargetbg' : "#2f3242",
				            'tipfontcolor' : "#ffffff",
				            'tipborder' : "1px solid #333333",
				            "fontheight": 11
				    };
				    
				    option = $.extend(true, option, _option);
					styles = $.extend(true, styles, _styles);
					this.chart = selector.createPie(option, styles);
				},
				inquery: function(f, _option, _styles){
					
				}
			},
			areaChart: {
				init: function(selector, f, _option, _styles, _series){
					this.chart = null;
					var option = { "url": "/WEB-APP/webponent/chart/sample/data/chart15.txt", "datatype": "json", "usecanvasmoveall": true, "usecrossline": true };
					var styles = {
							"main": {
								"canvaspaddingtop": 10, "canvaspaddingright": 10, "xlabelgap": 15,
								"graphstroketopcolor": "#cccccc","graphstrokeleftcolor": "#cccccc","graphstrokebottomcolor": "#cccccc","graphstrokerightcolor": "#cccccc",
								"crosslinecolor": "#000000", "crosslinestyle": "solid", "baseatstart": true,
								"ylabelpaddingright": 0, "ylabelgap": 65, "ylabelalign": "right", 
								"xlabelfontstyle": "11px 'dotum'", "ylabelfontstyle": "11px 'dotum'",
								"xlabelfontcolor": "#666666", "ylabelfontcolor": "#666666",
								"graphbackgroundcolor": "#ffffff",  
								"horizontalgridstrokecolor": "#f0f0f0", "verticalgridstrokecolor": "#f0f0f0",
								"baseatzero": true,
								"series1": { 
									"strokecolor" : "#e9542f", "overfillcolor": "#be0001", "overstrokewidth": 0,
									"fillcolor": "rgba(236,104,26,.15)"
								}
							}
					};
					var series = {
							"main": {
								"series1": {"series": "area", "xaxis": "date", "yaxis": "rate1", "label": "펀드규모" }
							}
					};
					option = $.extend(true, option, _option);
					styles = $.extend(true, styles, _styles);
					series = $.extend(true, series, _series);
					this.chart = selector.createChart(option, styles, series);
				},
				inquery: function(f, _option){
					var option = {};
					option = $.extend(true, option, _option);
					this.chart.chart.reDraw(option);
				}
			},
			barChart: {
				init: function(selector, f, _option, _styles, _series){
					this.chart = null;
					var option = { "url": "/WEB-APP/webponent/chart/sample/data/chart16.txt", "datatype": "json", "usecanvasmoveall": true, "usecrossline": true };
					var styles = {
							"main": {
								"xaxisbetweenlabels": true,
								"canvaspaddingtop": 10, "canvaspaddingright": 10, "xlabelgap": 15,
								"graphstroketopcolor": "#cccccc","graphstrokeleftcolor": "#cccccc","graphstrokebottomcolor": "#cccccc","graphstrokerightcolor": "#cccccc",
								"crosslinecolor": "#000000", "crosslinestyle": "solid", "baseatstart": true,
								"ylabelpaddingright": 0, "ylabelgap": 65, "ylabelalign": "right", 
								"xlabelfontstyle": "11px 'dotum'", "ylabelfontstyle": "11px 'dotum'",
								"xlabelfontcolor": "#666666", "ylabelfontcolor": "#666666",
								"graphbackgroundcolor": "#ffffff",  
								"horizontalgridstrokecolor": "#f0f0f0", "verticalgridstrokecolor": "#f0f0f0",
								"baseatzero": true, "usetick":true, "tickcolor":"#cccccc",
								"series1": { 
									"strokecolor" : "#c42c1c", "overfillcolor": "#c42c1c", "overstrokewidth": 0,
									"fillcolor": [[0.15, "#db4c3c"], [0.5, "#ea6657"], [0.85, "#db4c3c"]], "itemwidth": 40, "gradientdirection": "vertical",
									"overfillcolor": {
										"src": "/WEB-APP/webponent/chart/html5/img/pattern_column_over.png"
									}
								}
							}
					};
					var series = {
							"main": {
								"series1": { "series": "bar", "xaxis": "date", "yaxis": "rate1", "label": "펀드규모" }
							}
					};
					option = $.extend(true, option, _option);
					styles = $.extend(true, styles, _styles);
					series = $.extend(true, series, _series);
					
					this.chart = selector.createChart(option, styles, series);
				},
				inquery: function(f, _option){
					var option = {};
					option = $.extend(true, option, _option);
					this.chart.chart.reDraw(option);
				}
			}
		};
		var _this = chart;
		return {
			miniCandle: {
				init: function(selector, f, options, useVolume,styles){
					_this.miniCandle.init(selector, f, options, useVolume,styles);
					return this;
				}, 
				inquery: function(f,_option){
					_this.miniCandle.inquery(f,_option);
				},
				realTime: function(_data){
					_this.miniCandle.realTime(_data);
				}
			},
			columnChart: {
				init: function(selector, f, options,_styles,_series){
					_this.columnChart.init(selector, f, options,_styles,_series);
					return this;
				}, 
				inquery: function(f, options,_styles){
					_this.columnChart.inquery(f, options,_styles);
				},
				realTime: function(_data){
					_this.columnChart.realTime(_data);
				}
			},
			doubleChart: {
				init: function(selector, f, options,_styles,_series){
					_this.doubleChart.init(selector, f, options,_styles,_series);
					return this;
				}
			},
			lineChart: {
				init: function(selector, f, _option, _styles, _series){
					_this.lineChart.init(selector, f, _option, _styles, _series);
					return this;
				}, 
				inquery: function(f, _option){
					_this.lineChart.inquery(f, _option);
				},
				realTime: function(_data){
					_this.lineChart.realTime(_data);
				}
			},
			multiChart: {
				init: function(selector, f, _option, _styles, _series){
					_this.multiChart.init(selector, f, _option, _styles, _series);
					return this;
				}, 
				inquery: function(f, _option, _styles, _series){
					_this.multiChart.inquery(f, _option, _styles, _series);
				}, 
				visibleSeries: function(f, _option){
					_this.multiChart.visibleSeries(f, _option);
				},
				realTime: function(_data){
					_this.multiChart.realTime(_data);
				}
			},
			heatMap: {
				init: function(selector, f, _option, _styles){
					_this.heatMap.init(selector, f, _option, _styles);
					return this;
				},
				inquery: function(option, f){
					_this.heatMap.inquery(option, f);
				}
			},
			pie: {
				init: function(selector, f, _option, _styles){
					_this.pie.init(selector, f, _option, _styles);
					return this;
				},
				inquery: function(f, _option, _styles){
					_this.pie.inquery(f, _option, _styles);
				}
			},
			areaChart: {
				init: function(selector, f, _option, _styles, _series){
					_this.areaChart.init(selector, f, _option, _styles, _series);
					return this;
				}, 
				inquery: function(f, _option){
					_this.areaChart.inquery(f, _option);
				}
			},
			barChart: {
				init: function(selector, f, _option, _styles, _series){
					_this.barChart.init(selector, f, _option, _styles, _series);
					return this;
				}, 
				inquery: function(f, _option){
					_this.areaChart.inquery(f, _option);
				}
			}
		};
	};
	
})(jQuery);