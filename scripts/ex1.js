function handleSubmit(){
	var input = document.getElementById("sym").value;
	document.getElementById('demo').innerHTML = input;
	document.getElementById("sym").value = "";
	return false;
}
