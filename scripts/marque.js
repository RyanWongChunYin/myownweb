		(function($) {
			$.fn.jStockTicker = function(options) {
				if (typeof (options) == 'undefined') {
					options = {};
				}
				var settings = $.extend( {}, $.fn.jStockTicker.defaults, options);
				var $ticker = $(this);
				var $wrap = null;
				settings.tickerID = $ticker[0].id;
				$.fn.jStockTicker.settings[settings.tickerID] = {};

				if ($ticker.parent().get(0).className != 'wrap') {
					$wrap = $ticker.wrap("<div class='wrap'></div>");
				}

				var $tickerContainer = null;
				if ($ticker.parent().parent().get(0).className != 'container') {
					$tickerContainer = $ticker.parent().wrap(
							"<div class='container'></div>");
				}
				
				var node = $ticker[0].firstChild;
				var next;
				while(node) {
					next = node.nextSibling;
					if(node.nodeType == 3) {
						$ticker[0].removeChild(node);
					}
					node = next;
				}
				
				var shiftLeftAt = $ticker.children().get(0).offsetWidth;
				$.fn.jStockTicker.settings[settings.tickerID].shiftLeftAt = shiftLeftAt;
				$.fn.jStockTicker.settings[settings.tickerID].left = 0;
				$.fn.jStockTicker.settings[settings.tickerID].runid = null;
				$ticker.width(2 * screen.availWidth);
				
				function startTicker() {
					stopTicker();
					
					var params = $.fn.jStockTicker.settings[settings.tickerID]; 
					params.left -= settings.speed;
					if(params.left <= params.shiftLeftAt * -1) {
						params.left = 0;
						$ticker.append($ticker.children().get(0));
						params.shiftLeftAt = $ticker.children().get(0).offsetWidth;
					}
					
					$ticker.css('left', params.left + 'px');
					params.runId = setTimeout(arguments.callee, settings.interval);
					
					$.fn.jStockTicker.settings[settings.tickerID] = params;
				}
				
				function stopTicker() {
					var params = $.fn.jStockTicker.settings[settings.tickerID];
					if (params.runId)
						clearTimeout(params.runId);
					
					params.runId = null;
					$.fn.jStockTicker.settings[settings.tickerID] = params;
				}
				
				function updateTicker() {			
					stopTicker();
					startTicker();
				}
				
				$ticker.hover(stopTicker,startTicker);		
				startTicker();
			};

			$.fn.jStockTicker.settings = {};
			$.fn.jStockTicker.defaults = {
				tickerID :null,
				url :null,
				speed :1,
				interval :20
			};
		})(jQuery);

$(window).load(function () {
            StockPriceTicker();
            setInterval(function() {StockPriceTicker();} , 60000);
        });

        function StockPriceTicker() {
            var Symbol = "", CompName = "", Price = "", ChnageInPrice = "", PercentChnageInPrice = ""; 
            var CNames = "^FTSE,HSBA.L,SL.L,BATS.L,BLND.L,FLG.L,RBS.L,RMG.L,VOD.L";
            var CNames = "^HSI,0001.HK,0002.HK,0003.HK,0004.HK,0005.HK,0006.HK,0011.HK,0012.HK,0016.HK,0017.HK,0019.HK,0023.HK,0027.HK,0066.HK,0083.HK,0101.HK,0135.HK,0144.HK,0151.HK,0175.HK,0267.HK,0293.HK,0386.HK,0388.HK,0688.HK,0700.HK,0762.HK,0823.HK,0836.HK,0857.HK,0883.HK,0939.HK,0941.HK,0992.HK,1038.HK,1044.HK,1088.HK,1109.HK,1113.HK,1299.HK,1398.HK,1880.HK,1928.HK,2018.HK,2318.HK,2319.HK,2388.HK,2628.HK,3328.HK,3988.HK";
            var flickerAPI = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + CNames + "%22)&env=store://datatables.org/alltableswithkeys";
            var StockTickerHTML = "";
            
            var StockTickerXML = $.get(flickerAPI, function(xml) {
                $(xml).find("quote").each(function () {
                    Symbol = $(this).attr("symbol");
                    $(this).find("Name").each(function () {
                        CompName = $(this).text();
                    });
                    $(this).find("LastTradePriceOnly").each(function () {
                        Price = $(this).text();
                    });
                    $(this).find("Change").each(function () {
                        ChnageInPrice = $(this).text();
                    });
                    $(this).find("PercentChange").each(function () {
                        PercentChnageInPrice = $(this).text();
                    });
                    
                    var PriceClass = "GreenText", PriceIcon="up_green";
                    if(parseFloat(ChnageInPrice) < 0) { PriceClass = "RedText"; PriceIcon="down_red"; }
                    StockTickerHTML = StockTickerHTML + "<span class='" + PriceClass + "'>";
                    StockTickerHTML = StockTickerHTML + "<span class='quote'>" + CompName + " (" + Symbol + ")</span> ";
                    
                    StockTickerHTML = StockTickerHTML + parseFloat(Price).toFixed(2) + " ";
                    StockTickerHTML = StockTickerHTML + "<span class='" + PriceIcon + "'></span>" + parseFloat(Math.abs(ChnageInPrice)).toFixed(2) + " (";
                    StockTickerHTML = StockTickerHTML + parseFloat( Math.abs(PercentChnageInPrice.split('%')[0])).toFixed(2) + "%)</span>";
                	
                });
				
                $("#dvStockTicker").html(StockTickerHTML);
                $("#dvStockTicker").jStockTicker({interval: 30, speed: 1.8});
            });
        }