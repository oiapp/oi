function makeOrderedList(arr) {
	var list;
	if (arr.length) {
		list = $('<ol>');
		$(arr).each(function(i, elem) {
			var item = $('<li>'), tuple = makeTuple('', elem);
			if (tuple) {
				item.append(tuple);
			}
			list.append(item);
		});
	} else {
		list = undefined; // Omit empty lists
	}
	return list;
}

function makeUnorderedList(obj) {
	var list = undefined, prop, item, tuple;
	for (prop in obj) {
		if (null !== obj[prop] && undefined !== obj[prop] && typeof(obj[prop]) !== 'null' && typeof(obj[prop]) !== 'undefined' && typeof(obj[prop]) !== 'function') {
			list = obj[prop];
			break;
		}
	}
	if (typeof(list) === 'undefined') {
		return; // Omit empty objects and objects consisting only of non-displayable properties
	}
	list = $('<ul>');
	for (prop in obj) {
		if (null === obj[prop] || undefined === obj[prop] || typeof(obj[prop]) === 'null' || typeof(obj[prop]) === 'undefined' || typeof(obj[prop]) === 'function' || '' === obj[prop]) {
			continue; // Omit non-displayable or empty-string properties
		}
		item = $('<li>');
		tuple = makeTuple(prop, obj[prop]);
		if (tuple) {
			item.append(tuple)
		}
		list.append(item);
	}
	return list;
}

function makeTuple(name, val) {
	var ret, nameHtml, valHtml = undefined;
	if (null === val || undefined === val || typeof(val) === 'null' || typeof(val) === 'undefined' || typeof(val) === 'function' || '' === val) {
		return;
	}
	if (typeof(val) === 'array' || val instanceof Array) {
		valHtml = makeOrderedList(val);
	} else if (typeof(val) === 'object') {
		valHtml = makeUnorderedList(val);
	} else {
		valHtml = $('<span>');
		valHtml.text('' + val);
		// valHtml.after('<br>');
	}
	if (!valHtml) {
		return;
	}
	nameHtml = $('<span>');
	nameHtml.addClass('name');
	nameHtml.text(name);
	valHtml.addClass('value');
	ret = $('<span>');
	ret.append(nameHtml).append('<span>: </span>').append(valHtml);
	return ret;
}

function contactErrorToString(errCode) {
	if (typeof(ContactError) === "undefined") {
		return "Error " + errorCode + " (details from ContactError unavailable)";
	}
	switch (errCode) {
	case ContactError.UNKNOWN_ERROR:
		return "Unknown error";
	case ContactError.INVALID_ARGUMENT_ERROR:
		return "Invalid argument";
	case ContactError.TIMEOUT_ERROR:
		return "Timeout";
	case ContactError.PENDING_OPERATION_ERROR:
		return "Pending operation";
	case ContactError.IO_ERROR:
		return "Input/output error";
	case ContactError.NOT_SUPPORTED_ERROR:
		return "Not supported";
	case ContactError.PERMISSION_DENIED_ERROR:
		return "Permission denied";
	}
	return "Error code " + errCode;
}

function onContactsSuccess(list, contacts) {
	list.empty();
	// To display as JSON:
	// list.text(JSON.stringify(contacts));
	$(contacts).each(function(i, contact) {
		var item = $('<li>');
		item.addClass('contact').append(
			makeTuple('Contact', contact) || $()
		);
		list.append(item);
	});
}

function showContacts(list) {
	navigator.contacts.find(
		['*'],
		function(contacts) {
			// FIXME: This setTimeout is an attempt to prevent the app crashing on one iOS device with >1500 contacts
			setTimeout(function() {
				onContactsSuccess(list, contacts);
			}, 0);
		},
		function(error) {
			// Failure
			console.log('Error retrieving contacts: ' + contactErrorToString(error.code));
		},
        {
            multiple: true
        }
	);
}
