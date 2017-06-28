function getCSV(){

	var input = document.getElementById("sym").value;

	var url = "https://www.google.com/finance/historical?q=HKG%3A2800&startdate=Jun+29%2C+2016&num=200&ei=KMZTWaHOGtyS0wTtwLK4BQ";
	url = "www.google.com";
	//https://www.google.com/finance/historical?q=HKG%3A2800&startdate=Jun+29%2C+2016&num=200&ei=KMZTWaHOGtyS0wTtwLK4BQ
	//https://stackoverflow.com/questions/11708387/get-contents-of-link-tag-with-javascript-not-css/18447625#18447625
	//https://github.com/padolsey-archive/jquery.fn/blob/master/cross-domain-ajax/jquery.xdomainajax.js
	//https://stackoverflow.com/questions/5289027/how-to-get-html-source-code-from-external-url
	$.get(url, function(data){

		console.log(data);
	});

}
