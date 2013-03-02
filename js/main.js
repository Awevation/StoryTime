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
		$('#form').toggle('slide', {direction: "up"}, 500, function() { 
		    $('#formWrap').remove();
		});
	    }
	});
    });
    
    function onClick() {
	if($('#form input[name=padName]').val() != '') {
	    $('#form').toggle('slide', {direction: "up"}, 500, function() { 
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
    
    $('#butWrap').after('<div id="' + padDetails.id + '" + class="pad"></div>');
   
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

    //fitPad(padDetails);
    
    $(window).resize(function() {
	//fitPad(padDetails);
	reflowPads();
    });
    
    $('#' + padDetails.id).effect('slide', {direction: "down"}, 500);
}

//fits the pad to the screen, resizing the container div and actual iframe
function fitPad(padDetails) {
    var width = $('#' + padDetails.id).width();
    var height = $('#' + padDetails.id).height();

    $('#' + padDetails.id).css("width", $('body').outerWidth(true) - 40);
    $('#' + padDetails.id).css("height", ($('body').outerHeight(true) - $('#butWrap').outerHeight(true)) - 20);
    $('#' + padDetails.id + ' iframe').css('width', width);
    $('#' + padDetails.id + ' iframe').css('height', height);
}

//reflows the pads apporpriately, based on type, number of pads on screen
function reflowPads() {
    var noStories = 0;
    var noPlaces = 0;
    var noCharacters = 0;

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

    console.log(noCharacters);

    if(noPlaces === 0 && noCharacters === 0) {
	//then just fill the screen with story pad(s)
	var width = ($('body').outerWidth(true) - 40);
	
	//25px is the gap between the pads
	var height = (($('body').outerHeight(true) - $('#butWrap').outerHeight(true)  - 25 - noStories  * 25) / noStories); 

	for(var i = 0; i < pads.length; i++) {
	    $('#' + pads[i].id).css('width', width);
	    $('#' + pads[i].id).css('height', height);
	    $('#' + pads[i].id + ' iframe').css('width', width);
	    $('#' + pads[i].id + ' iframe').css('height', height);
	}
    }
}

function loadCss(href) {
    $("<link/>", {
	rel: "stylesheet",
    	type: "text/css",
    	href: href
    }).appendTo("head");
}
