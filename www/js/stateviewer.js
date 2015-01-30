$(document).ready(function(){
	var webserviceFile="http://services.groupkt.com/country/get/all";
	var stateWebService="http://services.groupkt.com/state/search/IND?text="
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
		
		for(var j=0;j<15;j++){
			$("#countryList").append("<li id='"+j+"'><a href='#'>"+countryNames[j]+"</a></li>");
		}
		$("#countryList").listview("refresh");	
		
	}

			
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
    
    $.mobile.loading("hide");
    $(document).on("scrollstop", scrollChecker);
  }, 500);
  			
		}

			/**End of Country Listing Code**/

			/**State Search Methods**/
		$("#searchBox").on("input",function(){
			//Method to find what is being typed
			searchState($(this).val());			
		});
		function searchState(typed){
			//Method to access Webservice
			var stateNames=[];
			$.ajax({
		type:"GET",
		url:stateWebService+typed,
		dataType:"json",
		success:function(loadedStates){			
			var noStates=loadedStates.RestResponse.result.length;
			for(var i=0;i<noStates;i++){
				stateNames.push(loadedStates.RestResponse.result[i].name);
			} 
			printStates(stateNames);
			
		},
		error:function(){
			alert("Couldn't Read JSON File");
		}
	//End of AJAX Call
});	

		}

		function printStates(stateList){
			var printableStates='';
			for(var l=0;l<stateList.length;l++){
				printableStates+=stateList[l]+"<br/>";
			}
			$("#outputDiv").html(printableStates);
		}

		function clearContents(){
				//Method to clean Searched data				
				$("#outputDiv").html(" ");
				$("searchBox").val(" ");
			}

		/**End of StateSearch Methods**/
			

	/**Information Showing Methods**/
	function infoShow(){
			//Displays App Info
			alert("StateViewer"+"\n"+"Version-0.0.1"+"\n"+"Author-Dinesh Raja");
		}

	//Function Calls
	$("#clearbtn").tap(clearContents);		
	document.addEventListener("deviceready",function(){
		readCountries();
		setTimeout(function(){
			$(document).on("scrollstop", scrollChecker);
		},500);
	});
	
	$("#infopgbtn").tap(infoShow);
	//Loaded all the elements into DOM
});