function clean_r_answer(str) {
	var dp =str.replace(/\\/g,"");
	return dp.substring(5,dp.length-2);
}