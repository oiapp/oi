(function($) {
	if ("undefined" === typeof(navigator)) {
		navigator = {};
	}
	if ("undefined" === typeof(navigator.contacts)) {
		navigator.contacts = {};
	}
	if ("undefined" === typeof(navigator.contacts.find)) {
		navigator.contacts.find = function(fields, success, error, options) {
			success([
				{ string1: 'stringval1' },
				{ array: [ 'zero', 'one', 'two' ] },
				{ subobj: { foo: 'bar', baz: 'frort' } },
				{ emptyString: '' },
				{ nullval: null },
				{ undefval: undefined }
			]);
		};
	}
	if ("undefined" === typeof(navigator.geolocation)) {
		navigator.geolocation = {};
	}
	if ("undefined" === typeof(navigator.geolocation.watchPosition)) {
		navigator.geolocation.watchPosition = function(success, error, options) {
			setTimeout(function() {
				success({
					coords: {
						latitude: 120.1,
						longitude: 170.2,
						altitude: 20.3,
						accuracy: 2.4,
						altitudeAccuracy: 1.5,
						heading: 40.6,
						speed: 5.7
					},
					timestamp: new Date()
				});
			}, 0);
		};
	}
	if ("undefined" === typeof(navigator.camera)) {
		navigator.camera = {};
	}
	if ("undefined" === typeof(navigator.camera.getPicture)) {
		navigator.camera.getPicture = function() {
			// TODO: Return a data URI containing a test image
		};
	}
	if ("undefined" === typeof(Camera)) {
		Camera = {
			DestinationType: {
				FILE_URI: 1
			}
		};
	}
	if (!window.device) {
		window.device = {
			cordova: 'Emulated'
		};
		$(function(event) {
			$(document).trigger('deviceready');
		});
	}
})(jQuery);
