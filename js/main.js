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
	    dropForm();
	}
    });

    $('#placeButton').click(function() {
	if($('#form').is(':visible')) {
	    //the user has already dropped the form, don't drop another
	} else {
	    dropForm();
	}
    });
}

function storyForm() {
    function form() {
	this.name = $('input[name=padName]').val();
	this.id;
    }

    return new form();
}

function dropForm() {
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
    });
    
    function onClick() {
	if($('#form input[name=padName]').val() != '') {
	    $('#form').toggle('slide', {direction: "up"}, 500, function() { 
		spawnPad(storyForm());
		$('#form').remove();
	    });
	} else {
	    $('#form').effect('bounce', {distance: 10}, 'slow');
	}
    }
}

function spawnPad(padDetails) {
    var idNum = pads.length.toString();

    padDetails.id = "pad" + idNum;
    
    $('#butWrap').after('<div id="' + padDetails.id + '" + class="pad"></div>');
   
    genPad(padDetails);
    
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

function genPad(padDetails) {
    $('#' + padDetails.id).pad({
	'padId':padDetails.name,
    	'showChat':'true',
    	'showControls':'true',
	'width':$('#' + padDetails.id).width(),
    	'height':$('#' + padDetails.id).height()

    });

    fitPad(padDetails);

    
    $(window).resize(function() {
	fitPad(padDetails);
    });

    pads.push(padDetails);
}

function loadCss(href) {
    $("<link/>", {
	rel: "stylesheet",
    	type: "text/css",
    	href: href
    }).appendTo("head");
}
