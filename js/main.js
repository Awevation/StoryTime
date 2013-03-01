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

}

function storyForm() {
    function form() {
	this.name = $('input[name=padName]').val();
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
		$('#form').remove();
		$(document).load('../pad.html', function(res, status, req) {
		    if(status != "error") {
			$('#butWrap').after(res);
			genPad(storyForm());
			$('#pad').effect('slide', {direction: "down"}, 500);
		    } else {
			alert("Well would you look at that.... AN ERROR OCCURRED! Accept my sincerest apologyies.");
		    }
		});
	    });
	} else {
	    $('#form').effect('bounce', {distance: 10}, 'slow');
	}
    }
}

function genPad(padDetails) {
    //set the pad's size, these numbers seem to work ish?
    $('#pad').css("width", $('body').outerWidth(true) - 40);
    $('#pad').css("height", ($('body').outerHeight(true) - $('#butWrap').outerHeight(true)) - 40);

    var width = $('#pad').outerWidth(true) - 46;
    var height = $('#pad').outerHeight(true) - 30;

    console.log(height);

    $('#pad').pad({
	'padId':padDetails.name,
    	'showChat':'true',
    	'showControls':'true',
	'width':width,
    	'height':height
    });
}

function loadCss(href) {
    $("<link/>", {
	rel: "stylesheet",
    	type: "text/css",
    	href: href
    }).appendTo("head");
}
