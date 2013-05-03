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
				{ string1: 'stringval1' },
				{ array: [ 'zero', 'one', 'two' ] },
				{ subobj: { foo: 'bar', baz: 'frort' } },
				{ emptyString: '' },
				{ nullval: null },
				{ undefval: undefined }
			]);
		};
	}
	if (!window.device) {
		$(function(event) {
			$(document).trigger('deviceready');
		});
	}
})(jQuery);
