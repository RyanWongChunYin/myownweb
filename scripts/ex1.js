function handleSubmit(){
	var input = document.getElementById("sym").value;

	
	if(input.charAt(0)>='0'&&input.charAt(0)<='9'){
		if(input.length == 4){
			input = input.concat(".HK");

		}else if (input.length == 3) {
			input = "0".toString().concat(input,".HK");
		}else if (input.length == 2) {
			input = "00".toString().concat(input,".HK");
		}else if (input.length == 1) {
			input = "000".toString().concat(input,".HK");
		}


		
	}
	StockPriceTick(input);

	document.getElementById("sym").value = "";
	
	return false;
}

function StockPriceTick(input) {
    var Symbol = "", CompName = "", Price = "", ChnageInPrice = "", PercentChnageInPrice = ""; 
    var CNames = input;
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
		if(StockTickerHTML==""||(CompName==""&&input.charAt(0)!='^')){
            StockTickerHTML = "<span style='color:Red;'>Please enter correct symbol! </span>"
        }
        $("#demo").html(StockTickerHTML);

    });
}
