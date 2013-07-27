/* SmallURL Javascript Core by Thomas Edwards
 * Copyright 2013 SmallURL
 * Do not attempt to exploit the SmallURL Service
*/
function call_shortener(do_custom) {
	var url = encodeURIComponent($('#long_url').val());
	if (!do_custom) {
		var api_url = "http://smallurl.in/api/api.php?url="+url;
	}
	else {
		var custom = $('#custom_url').val();
		var api_url = "http://smallurl.in/api/api.php?url="+url+"&custom="+custom;
	}
	$.getJSON(api_url,function (data) {
		if (data.res == true) {
			$('#alert').hide(); // Just incase someone got an error last time.
			do_visuals(data);
		}
		else {
			$('#alert_error').html(data.msg);
			$('#alert').show();
		}
	});
}
function do_visuals(url) {
	$('#short_url').val('http://'+document.domain+'/'+url.short)
	$('#form').hide();
	$('#shortened').show();
	$('#short_url').select();
}
function reset_form() {
	// Reset all fields.
	$('#short_url').val('');
	$('#long_url').val('');
	$('#custom_url').val('');
	$('#custom_btn').show();
	// Reset all forms.
	$('#alert').hide();
	$('#custom_form').hide();
	$('#shortened').hide();
	$('#form').show();
}
function show_custom() {
	$('#custom_url').val('');
	$('#custom_btn').hide();
	$('#custom_form').show();
}
function validateText(str) {
	var tarea = str;
	if (tarea.indexOf("http://")==0 && tarea.indexOf("https://")==0) {
		return true;
	}
	else {
		return false;
	}
}