$(document).ready(function() {
    main();
});

function main() {
    $('#storyButton').click(function() {
	$('#pad').pad({
	    'padId':'storytime',
	    'showChat':'true',
	    'showControls':'true',
	    'height':$('#pad').css("height") //for some reason the pad doesn't pay attention to the wrapper's height, only its width 
	});
    });
}
