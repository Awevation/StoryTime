$(document).ready(function() {
    main();
});

function main() {
    $('#storyButton').click(function() {
	$(document).load('../storyForm.html', function(res, status, req) {
	    if (status != "error") {
		$('#pad').before(res);
	    } else {
		alert("Well would you look at that.... AN ERROR OCCURRED! Accept my sincerest apologyies.");
	    }

	    $('#submit').click(function() {
		genPad(storyForm());
		$('#form').remove();
	    });
	});
    });

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
