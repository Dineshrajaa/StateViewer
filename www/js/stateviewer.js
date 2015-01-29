$(document).ready(function(){
	var webserviceFile="http://services.groupkt.com/country/get/all";
	var countryNames=[];
	function readCountries(){
		//Read the CountryNames from Webservice using AJAX Call			
		$.ajax({
		type:"GET",
		url:webserviceFile,
		dataType:"json",
		success:function(loadedData){
			/*$(loadedData.RestResponse.result).each(function(){
				alert($(this).name);
			});*/
			var noCountries=loadedData.RestResponse.result.length;
			for(var i=0;i<noCountries;i++){
				countryNames.push(loadedData.RestResponse.result[i].name);
			} 
			listCountries();
		},
		error:function(){
			alert("Couldn't Read JSON File");
		}
	//End of AJAX Call
});	

	}

	function listCountries(){
		//Lists the CountryNames from Webservice
		
		for(var j=0;j<countryNames.length;j++){
			$("#countryList").append("<li id='"+j+"'><a href='#'>"+countryNames[j]+"</a></li>")
		}
		$("#countryList").listview("refresh");
		
	}

	$("#searchpgbtn").tap();

	//Function Calls
	readCountries();
	//Loaded all the elements into DOM
});