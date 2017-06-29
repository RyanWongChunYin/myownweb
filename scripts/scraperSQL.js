
function getSQL(){

	var input = document.getElementById("sym").value;

	if(input.charAt(0)>='0'&&input.charAt(0)<='9'){
		if(input.length == 4){
			input = input.concat("");

		}else if (input.length == 3) {
			input = "0".toString().concat(input);
		}else if (input.length == 2) {
			input = "00".toString().concat(input);
		}else if (input.length == 1) {
			input = "000".toString().concat(input);
		}
	}
	/*
	var url = "https://www.google.com/finance/historical?q=HKG%3A2800&startdate=Jun+29%2C+2016&num=200&ei=KMZTWaHOGtyS0wTtwLK4BQ";
	*/
	
	var url = "https://www.google.com/finance/historical?q=HKG%3A2800&startdate=Jun+29%2C+2016&num=200&ei=KMZTWaHOGtyS0wTtwLK4BQ";
	var trtag = "tr";
	var thtag = "th";
	var result;
	var res;
	var text;
	var outputHTML = "";
	var tableName;
	if(document.getElementById("tablename").value == ""){
		tableName = "historical_price";
	}else{
		tableName = document.getElementById("tablename").value;
	}

	var yql ="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20htmlstring%20where%20url%3D%27https%3A%2F%2Fwww.google.com%2Ffinance%2Fhistorical%3Fq%3DHKG%253A"+input+"%26startdate%3DJun%2B29%252C%2B2016%26num%3D200%26ei%3DKMZTWaHOGtyS0wTtwLK4BQ%27%20and%20xpath%3D%27%2F%2F%20tr%27&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	var StockTickerXML = $.get(yql, function(xml) {
		result = $(xml).find("result").text();
		var div = document.createElement("div");
		div.innerHTML = result;
		text = div.textContent || div.innerText || "";
		res = text.split("\n");
		res = res.filter(function(n){
			return (n != "");
		});
		res = res.filter(function(str){
			return /\S/.test(str);
		});
		var len = res.length;
		res = res.slice(5,len);
		console.log(res);
		outputHTML = outputHTML +"<span>CREATE TABLE CUSTOMERS(STOCK INT NOT NULL,DATE DATE NOT NULL,OPEN DECIMAL (18, 2),HIGH DECIMAL (18, 2), LOW  DECIMAL (18, 2), CLOSE DECIMAL (18, 2), VOLUME DECIMAL INT, PRIMARY KEY (STOCK,DATE));</span><br><br>"
		for(i =6;i<res.length;i++){
			if(i%6 == 0){
				outputHTML = outputHTML + "<span>INSERT INTO "+tableName+" (STOCK,DATE,OPEN,HIGH,LOW,CLOSE,VOLUME) VALUES ("+input+","+res[i]+",";
			}else if(i%6 == 5){
				outputHTML = outputHTML + res[i]+");</span><br>";
			}else{
				outputHTML = outputHTML+res[i]+",";
			}
		}
		$("#displayer").html(outputHTML);
	});

	return false;
}
