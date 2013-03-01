$(document).ready(function() {
    main();
});

function main() {
    $('#storyButton').click(function() {
	$(document).load('../storyForm.html', function(res, status, req) {
	    if (status != "error") {
		$('#butWrap').before(res);
		loadCss("../style/form.css");
		$('#form input[name=padName]').focus();
	    } else {
		alert("Well would you look at that.... AN ERROR OCCURRED! Accept my sincerest apologyies.");
	    }

	    //set so enter clicks the button and the click event is triggered
	    $('#form input[name=padName]').keydown(function(event) {
		if(event.keyCode == 13) {
		    onClick();
		}
	    });
	    $('#form input[name=submit]').click(onClick);
	});
    });

    function onClick() {
	if($('#form input[name=padName]').val() != '') {
	    $('#form').remove();
	    $('#butWrap').after('<div id="pad"></div>');
	    genPad(storyForm());
	} else {
	    //just do nothing, the user should get the idea.....
	    alert('das');
	}
    }
}

function storyForm() {
    function form() {
	this.name = $('input[name=padName]').val();
    }

    return new form();
}

function genPad(padDetails) {
    $('#pad').pad({
	'padId':padDetails.name,
    'showChat':'true',
    'showControls':'true',
    'height':$('#pad').css("height") //for some reason the pad doesn't pay attention to the wrapper's height, only its width 
    });
}

function loadCss(href) {
    $("<link/>", {
	rel: "stylesheet",
    type: "text/css",
    href: href
    }).appendTo("head");
}
