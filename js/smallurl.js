/* SmallURL Javascript Core by Thomas Edwards
 * Copyright 2013 SmallURL
 * Do not attempt to exploit the SmallURL Service
*/
function call_shortener() {
	var url = encodeURIComponent($('#long_url').val());
	if ($('#custom_url').val() == "") {
		var api_url = "http://"+document.domain+"/api/api.php?url="+url;
	}
	else {
		var custom = $('#custom_url').val();
		var api_url = "http://"+document.domain+"/api/api.php?url="+url+"&custom="+custom;
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
	refresh_stats();
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
function refresh_stats() {
	$.getJSON('api/json_stats.php',function (data) {
		$('#stats_total').html(data.total);
		$('#stats_random').html(data.random);
		$('#stats_custom').html(data.custom);
	});
	return true;
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
function show_screenshot() {
	$(this).hide();
	$('#screenie').show();
}
// Key Stuff for the user accounts
function add_key() {
	var keyname = $('#keyname').val();
	var keydomain = $('#keydomain').val();
	$.post("api/add_key.php",{name:keyname,domain:keydomain},function (data) {
		var mydata = $.parseJSON(data);
		if (mydata.res == true) {
			// Worked
			key_form();
		}
		else {
			alert(mydata.msg);
		}
	});
}
function del_key(keyid) {
	$.post("api/del_key.php",{id:keyid},function (data) {
		var mydata = $.parseJSON(data);
		if (mydata.res == true) {
			// Worked
			key_form();
		}
		else {
			alert(mydata.msg);
		}
	});
}
function key_form() {
	$.get('api/key_form.php',function (data) {
		$('#key_form').html(data);
	});
}