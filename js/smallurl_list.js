$(document).ready(function() {
	get_urls();
	check_logged_in();
});
$("#refresh").click(function() {
	reset_list();
	$('#loading').show();
	get_urls();
});
function get_urls() {
	$.getJSON("http://smallurl.in/api/extension/get_urls.php",function (data) {
		$('#loading').hide();
		$.each(data, function(key, val) {
			$('#urls').append('<tr id="url"><td>'+val.longurl+'</td><td><a href="'+val.safe+'">'+val.smallurl+'</a></td><td>'+val.date+'</td><td>'+val.uses+'</td></tr>');
		});
	});
}
function reset_list() {
	$("tr[id=url]").remove();
}
function check_logged_in() {
	$.getJSON("http://smallurl.in/api/extension/login_status.php",function (data) {
		if (data.res == true) {
			// Loggedin.
			$('#uname').html(data.uname)
			$('#loggedin').show();
			$('#login').hide();
		}
	});
}