$(document).ready(function(){
	var webserviceFile="http://services.groupkt.com/country/get/all";
	var countryNames=[];

			/*Country Listing Methods*/
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
		
		for(var j=0;j<countryNames.length-234;j++){
			$("#countryList").append("<li id='"+j+"'><a href='#'>"+countryNames[j]+"</a></li>");
		}
		$("#countryList").listview("refresh");
		
		
	}

			/**Testing Methods**/
		function scrollChecker(){
			
			var currentPage=$(':mobile-pagecontainer').pagecontainer('getActivePage')[0];			
			var pageHeight=$(window).height();
			var contentHeight =$(".ui-content",currentPage).outerHeight();
			var headerSize=$(".ui-header", currentPage).outerHeight()-1;
			var footerSize=$(".ui-footer", currentPage).outerHeight()-1;
			var scrolled = $(window).scrollTop();
			var scrollEnd = contentHeight-pageHeight+headerSize+footerSize;
			
			if (currentPage.id=="home-page"&&scrolled >= scrollEnd) {
				addListItems(currentPage);
			}
		}

		/*function continueListing(listLength,newListLength){
			for (var k = listLength; k < newListLength; k++) {    	
      $("#countryList").append("<li id='"+k+"'><a href='#'>"+countryNames[k]+"</a></li>");   
             }
   $("#countryList").listview("refresh");
    $.mobile.loading("hide");
    $(document).on("scrollstop", scrollChecker);
  
		} */
		function addListItems(presentPage){
			var newListLength,listLength;
			var limit=249;
			$(document).off("scrollstop");
			$.mobile.loading("show", {
    		text: "Loading..",
   			textVisible: true
  			}); 			
   			setTimeout(function(){ 			
    		listLength=$("li",presentPage).length;
    		newListLength=listLength+5;  
    		if (listLength<=limit) {
    			//alert("Loading");
    			for (var k = listLength; k < newListLength; k++) {    	
      $("#countryList").append("<li id='"+k+"'><a href='#'>"+countryNames[k]+"</a></li>");   
             }
   $("#countryList").listview("refresh");
    		}
    		else {
    			$("#countryList").find("li:contains('undefined')").remove();
    			$("#countryList").listview("refresh");
    			alert("Loaded Fully");
    	}
    /*for (var k = listLength; k < newListLength; k++) {    	
      $("#countryList").append("<li id='"+k+"'><a href='#'>"+countryNames[k]+"</a></li>");   
             }
   $("#countryList").listview("refresh");*/
    $.mobile.loading("hide");
    $(document).on("scrollstop", scrollChecker);
  }, 500);
  			
		}

		
			/**End of Testing Methods**/

	

	//Function Calls
	//readCountries();
	
	document.addEventListener("deviceready",function(){
		readCountries();
		setTimeout(function(){
			$(document).on("scrollstop", scrollChecker);
		},500);
	});
	
	//Loaded all the elements into DOM
});