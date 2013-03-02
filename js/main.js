//global variables, everyone loves them
var pads = new Array(); //array of pads

$(document).ready(function() {
    main();
});

function main() {
    $('#storyButton').click(function() {
	if($('#form').is(':visible')) {
	    //the user has already dropped the form, don't drop another
	} else {
	    dropForm('story');
	}
    });

    $('#placeButton').click(function() {
	if($('#form').is(':visible')) {
	    //the user has already dropped the form, don't drop another
	} else {
	    dropForm('place');
	}
    });
}

//returns the pad taken from the form
function getFormPad(type) {
    function pad() {
	//pad's user chosen name
	this.name = $('input[name=padName]').val();
	//pad div's CSS id, which will hold the embedded iFrame
	this.id;
	//pad's type, story, place or character. Determines how it behaves
	this.type = type;
    }

    return new pad();
}

//loads the html necessary and drops the form
function dropForm(formToDrop) {
    $(document).load('../storyForm.html', function(res, status, req) {
	if (status != "error") {
	    $('#butWrap').after(res);
	    $('#form').effect('slide', {direction: "up"}, 500);
	} else {
	    alert("Well would you look at that.... AN ERROR OCCURRED! Accept my sincerest apologyies.");
	}

	$('#form input[name=padName]').focus();

	reflowPads();

	$('#form button').click(onClick);

	//set so enter clicks the button and the click event is triggered
	$('#form input[name=padName]').keydown(function(event) {
	    if(event.keyCode == 13) {
		onClick();
	    }
	});
	
	//set so when user clisk backspace the form disappears
	$('#form input[name=padName]').keydown(function(event) {
	    if(event.keyCode == 8) {
		if($('#form input[name=padName]').val() === '') {
		    $('#form').toggle('slide', {direction: "up"}, 500, function() { 
			$('#formWrap').remove();
		    });
		}
	    }
	});
    });
    
    function onClick() {
	if($('#form input[name=padName]').val() != '') {
	    $('#form').toggle('slide', {direction: "up"}, 500, function() { 
		reflowPads();
		spawnPad(getFormPad(formToDrop));
		$('#formWrap').remove();
	    });
	} else {
	    $('#form').effect('bounce', {distance: 10}, 'slow');
	}
    }
}

//spawn a pad based on the pad details
function spawnPad(padDetails) {
    var idNum = pads.length.toString();

    padDetails.id = "pad" + idNum;
    
    switch(padDetails.type) {
	case 'story':
	    $('#storyWrap').append('<div id="' + padDetails.id + '" + class="sPad"></div>');
	    break;
	case 'place':
	    $('#placeWrap').append('<div id="' + padDetails.id + '" + class="pPad"></div>');
	    break;
	case 'character':
	    $('#characterWrap').append('<div id="' + padDetails.id + '" + class="cPad"></div>');
	    break;
    }
   
    //this actually embeds the etherPad iFrame
    $('#' + padDetails.id).pad({
	'padId':padDetails.name,
    	'showChat':'true',
    	'showControls':'true',
	'width':$('#' + padDetails.id).width(),
    	'height':$('#' + padDetails.id).height()

    });

    pads.push(padDetails);
    
    reflowPads();

    $(window).resize(function() {
	//fitPad(padDetails);
	reflowPads();
    });
    
    $('#' + padDetails.id).effect('slide', {direction: "down"}, 500);
}

//reflows the pads apporpriately, based on type, number of pads on screen
function reflowPads() {
    var noStories = 0;
    var noPlaces = 0;
    var noCharacters = 0;

    //to set the dimensions after the widths and heights are worked out
    function setPadDimensions() {
	for(var i = 0; i < pads.length; i++) {
	    switch(pads[i].type) {
		case 'story':
		    $('#' + pads[i].id).css('width', sWidth);
		    $('#' + pads[i].id).css('height', sHeight);
		    $('#' + pads[i].id + ' iframe').css('width', sWidth);
		    $('#' + pads[i].id + ' iframe').css('height', sHeight);
		    break;
		case 'place':
		    $('#' + pads[i].id).css('width', pWidth);
		    $('#' + pads[i].id).css('height', pHeight);
		    $('#' + pads[i].id + ' iframe').css('width', pWidth);
		    $('#' + pads[i].id + ' iframe').css('height', pHeight);
		    break;
		case 'character':
		    $('#' + pads[i].id).css('width', cWidth);
		    $('#' + pads[i].id).css('height', cHeight);
		    $('#' + pads[i].id + ' iframe').css('width', cWidth);
		    $('#' + pads[i].id + ' iframe').css('height', cHeight);
		    break;
	    }
	}
    }

    //count
    for(var i = 0; i < pads.length; i++) {
	switch(pads[i].type) {
	    case 'story':
		noStories++;
		break;
	    case 'place':
		noPlaces++;
		break;
	    case 'character':
		noCharacters++;
		break;
	}
    }

    if(noPlaces === 0 && noCharacters === 0) {
	//then just fill the screen with story pad(s)
	
	$('#storyWrap').css('margin', '25px 0px');
	$('.sPad').css('margin', '0 auto');
	$('.sPad').css('margin-bottom', '25px');
	
	var sWidth = $('body').outerWidth(true) - 40;
	
	//25px is the gap between the pads
	var sHeight = (($('body').outerHeight(true) - $('#butWrap').outerHeight(true) - $('#formWrap').outerHeight(true) - (noStories + 1)  * 25) / noStories);

	setPadDimensions();
    }

    if(noStories >= 1 && noPlaces >= 1 && noCharacters === 0) {
	//then fill the right with places
	
	//set the appropriate new CSS properties
	$('#storyWrap').css('width', $('body').outerWidth(true) * 0.75);
	$('#storyWrap').css('float', 'left');

	$('#placeWrap').css('width', $('body').outerWidth(true) * 0.25);
	$('#placeWrap').css('float', 'right');
	
	$('.sPad').css('margin', '0 auto');
	$('.sPad').css('margin-bottom', '25px');

	$('.pPad').css('margin', '0 auto');
	$('.pPad').css('margin-bottom', '25px');
	
	//figure out the new dimensions
	var pWidth = 0.25 * ($('body').outerWidth(true) - 80);	
	var sWidth = $('body').outerWidth(true) - 80 - pWidth;

	var pHeight = ($('body').outerHeight(true) - $('#butWrap').outerHeight(true) - $('#formWrap').outerHeight(true) - (noPlaces + 1)  * 25) / noPlaces;
	var sHeight = ($('body').outerHeight(true) - $('#butWrap').outerHeight(true) - $('#formWrap').outerHeight(true) - (noStories + 1)  * 25) / noStories;


	setPadDimensions();	
    }
}

function loadCss(href) {
    $("<link/>", {
	rel: "stylesheet",
    	type: "text/css",
    	href: href
    }).appendTo("head");
}
