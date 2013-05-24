function onDeviceReady(event) {
	var theLocation, watch = undefined;
	$('.jqueryOutput').text('Version ' + $.fn.jquery + ' initialised');
   	$('.jqueryMobileOutput').text('Version ' + $.mobile.version + ' initialised');
	$('#takePicture').on('click', function() {
		var elem = $('#thePicture');
		takePicture(elem);
	});
	$('#showContacts').on('click', function() {
		var elem = $('#theContacts');
		showContacts(elem);
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
