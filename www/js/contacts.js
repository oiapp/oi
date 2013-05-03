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

function showContacts(list) {
	navigator.contacts.find(
		['*'],
		function(contacts) {
			// Success
			$(contacts).each(function(i, contact) {
				var item = $('<li>');
				item.addClass('contact').append(
					makeTuple('Contact', contact) || $()
				);
				list.append(item);
			});
			
		},
		function(error) {
			// Failure
			console.log('Contacts error' + error);
		},
		{}
	);
}
