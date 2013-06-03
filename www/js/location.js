function locationErrorToString(errCode) {
	if (typeof(PositionError) === "undefined") {
		return "Location error " + errCode + " (details from PositionError unavailable)";
	}
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
    elt.empty();
	$([
		'Latitude: '          + position.coords.latitude,
		'Longitude: '         + position.coords.longitude,
		'Altitude: '          + position.coords.altitude,
        /*
		'Accuracy: '          + position.coords.accuracy,
		'Altitude Accuracy: ' + position.coords.altitudeAccuracy,
        */
		'Heading: '           + position.coords.heading,
		'Speed: '             + position.coords.speed,
		'Timestamp: '         + new Date(position.timestamp).toString()
    ]).each(function(i, str) {
            var line = $('<span>');
            line.text(str).append($('<br>'));
            elt.append(line);
    });
}
