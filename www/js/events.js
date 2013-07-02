function onDeviceReady(event) {
	var
		theLocation,
		watch = undefined,
		contactServerURL = 'http://www.supermatty.com/OIServer/oiserver.php',
		// contactServerURL = 'http://dev.funkyproductions.org.au/OIServer/oiserver.php',
		contactOutput = $('#contactOutput'),
		testContactData = {
			displayName: 'Test Display Name'
			,nickname: 'Test Nickname'
			// ,phoneNumbers: []
			// ,emails: []
		}
	;
	$('.cordovaVersion').text(device.cordova);
	$('.jQueryVersion').text($.fn.jquery);
   	$('.jQueryMobileVersion').text($.mobile.version);
	$('#takePicture').on('click', function() {
		var elem = $('#thePicture');
		takePicture(elem);
	});
	$('#showContacts').on('click', function() {
		var elem = $('#theContacts');
		showContacts(elem);
	});
	$('#getContact').on('click', function() {
		$.ajax({
			dataType: "json",
			url: contactServerURL,
			cache: false,
			contentType: 'application/json',
			data: {
				mode: 'get',
				contactID: 1
			},
			success: function(data, textStatus, jqXHR) {
				var contact;
				delete data['contactID']; // Avoid over-writing existing contacts
				contactOutput.text('Got contact: ' + JSON.stringify(data));
				contact = navigator.contacts.create(data);
				contact.save();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Contact get error: responseText=' + jqXHR.responseText + ', status=' + textStatus + ', errorThrown=' + errorThrown);
			}
		});
	});
	$('#putContact').on('click', function() {
		$.ajax({
			dataType: "json",
			url: contactServerURL,
			cache: false,
			contentType: 'application/json',
			data: {
				mode: 'put',
				contactID: 1,
				contactData: testContactData
			},
			success: function(data, textStatus, jqXHR) {
				contactOutput.text('Put response: ' + JSON.stringify(data));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Contact put error: responseText=' + jqXHR.responseText + ', status=' + textStatus + ', errorThrown=' + errorThrown);
			}
		});
	});
	theLocation = $('#theLocation');
	function stopWatchingPosition() {
		if (watch) {
			navigator.geolocation.clearWatch(watch);
			watch = undefined;
		}
	}
	function onLocationError(err) {
		console.log('Error obtaining location: ' + locationErrorToString(err.code) + ': ' + err.message);
		stopWatchingPosition(); // Cancel existing watch
		if (typeof(PositionError) === "undefined" || err.code === PositionError.PERMISSION_DENIED) {
			return; //  Fatal error; bail out
		}
		startWatchingPosition(); // Restart watch
	}
	function onLocationSuccess(position) {
		console.log("Location success");
		showLocation(theLocation, position);
	}
	function startWatchingPosition() {
		stopWatchingPosition();
		watch = navigator.geolocation.watchPosition(onLocationSuccess, onLocationError, {
			enableHighAccuracy: true,
			timeout: 1000
		});
	}
	startWatchingPosition();
}
$(document).on('deviceready', onDeviceReady);
