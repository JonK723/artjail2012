/* Author: Jonathan Kelly
		   http://www.jonkkelly.com
*/

var projClient = "";
var projAgency = "";
var projImage = "";
var projVideo = "";
var extraContent = "";


function loadProjects(xmlFile)
{	
	//alert("inside function");
	baseURL = "./"; // the location of the background of the image sequence in the images folder
	
	$.ajax({
        type: "GET",
		url: xmlFile,
		dataType: "xml",
		success: function(xml) {
	 		

			MAX_IMAGES = Number($(xml).find('count').text());
			
			loadImageSeq(MAX_IMAGES);


			$(xml).find('section').each(function() {
				if($(this).attr('section') == "Projects") {
					
					
					$(this).find('project').each( function() {						
						var id = "data-id='" + $(this).attr('id') + "'";
						var info = $(this).attr('info');						
						var client = "data-client='" + $(this).attr('client') + "'";
						var agency = "data-agency='" + $(this).attr('agency') + "'";
						var image = "data-image='" + $(this).attr('image') + "'";
						var video = "data-video='" + $(this).attr('video') + "'";
						var extra = "data-extra='" + $(this).attr('extra') + "'";
												 						
						$('#projectList').append("<div id='projItem' class='listText' " + id + client + agency + image + video + extra + "><a id='test' onclick=retrieveContent(this);>" + info +"</a></div>");
						myLoader.addFiles($(this).attr('image'));
								
						id = info = client = agency = image = video = null;
					});			
				}
			});
			
			
			var title1 = $(xml).find('title').text();
			var name1 = $(xml).find('name').text();
			var email1 = $(xml).find('email').text();
			var address = $(xml).find('address').text();
			var phone = $(xml).find('phone').text();
			var fax = $(xml).find('fax').text();
			var name2 = $(xml).find('name2').text();
			var title2 = $(xml).find('title2').text();
			var email2 = $(xml).find('email2').text();
			var aboutTXT = $(xml).find('about').text();
			
			$("#name1").text(name1);
			$("#title1").text(title1);
			$("#email").html("<a href='mailto:" + email1 + "'>" + email1 + "</a>");
			$("#address").text(address);
			$("#phone").text(phone);
		    $("#fax").text(fax);
			$("#name2").text(name2);
			$("#title2").text(title2);
			$("#email2").html("<a href='mailto:" + email2 + "'>" + email2 + "</a>");
			$("#abtTxt").html(aboutTXT);
			
			document.getElementById('loading').style.display = "none";
			
			isFinishedLoading = true;
		}
	});
}

/*
Function to fill in the page content when the menu item is clicked
*/
function retrieveContent(v) {
	
	lastSelectedProj = $(v).parent().prev('#projItem'); // get the link before the one that was pressed if there is one
	nextSelectedProj = $(v).parent().next('#projItem'); // get the link after this one if the is one


	projClient = $(v).parent().attr('data-client');
	projAgency = $(v).parent().attr('data-agency');
	projImage = "'" + $(v).parent().attr('data-image') + "'";
	projVideo = $(v).parent().attr('data-video');
	extraContent = $(v).parent().attr('data-extra');
	
	if($('source')) {
		$('source').remove();
	}
	
	$("#links").hide();
	
	$("#spotControls").show();
	
	if(extraContent == 'undefined')
	{
		$("#extraStuff").html(" ");	
	}
	else
	{
		$("#extraStuff").html(extraContent);	
	}
	
	$('#fullDetails').show();
	$('#contentBox').show();
	$('#contentBox').css("background-image", 'url(' + projImage + ')');
	$('#contentBox').addClass("halfCover");
	
	var pURL = "http://player.vimeo.com/video/" + projVideo + "?api=1;byline=0&amp;portrait=0;";
		
	$("#projVideo").attr("src", pURL);
	
	url = $('iframe').attr('src').split('?')[0];
			

	$("#projVideo").hide();
	
	$("#videoBox").hide();		
}


function loadImageSeq(num_images)
{	
	baseURL = "./images/img_seq/"; // the location of the background of the image sequence in the images folder
		
	for(n = 0; n < num_images; n++)
	{
		imgSeq[n] = baseURL + String(n+1) + ".jpg"; 
		myLoader.addFiles(imgSeq[n]);
	}
	
	$("html").css("background-image", 'url(' + imgSeq[0] + ')');
	$("html").addClass("fullCover");
}


function scaleRange(num, oldMin, oldMax, newMin, newMax)
{
	var denom = newMax-newMin;
	var numer = oldMax-oldMin;
	
	return (num / (numer / denom)) + newMin;
}
