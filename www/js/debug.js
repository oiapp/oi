(function($) {
	if (typeof(navigator) === "undefined") {
		navigator = {};
	}
	if (typeof(navigator.contacts) === "undefined") {
		navigator.contacts = {};
	}
	if (typeof(navigator.contacts.find) === "undefined") {
		navigator.contacts.find = function(props, success) {
			success([
				{ foo: 'bar' },
				{ baz: 'frort' }
			]);
		};
	}
	if (!window.device) {
		$(function(event) {
			$(document).trigger('deviceready');
		});
	}
})(jQuery);
