function locationErrorToString(errCode) {
	switch (errCode) {
	case PositionError.PERMISSION_DENIED:
		return "Permission denied";
	case PositionError.POSITION_UNAVAILABLE:
		return "Position unavailable";
	case PositionError.TIMEOUT:
		return "Timeout";
	}
	return "Error code " + errCode;
}

function showLocation(elt, position) {
	elt.text(
		'Latitude: '          + position.coords.latitude          + '\n' +
		'Longitude: '         + position.coords.longitude         + '\n' +
		'Altitude: '          + position.coords.altitude          + '\n' +
		'Accuracy: '          + position.coords.accuracy          + '\n' +
		'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
		'Heading: '           + position.coords.heading           + '\n' +
		'Speed: '             + position.coords.speed             + '\n' +
		'Timestamp: '         + position.timestamp                + '\n'
	);
}
