function makeTuple(name, val) {
	console.log(name, val);
	var ret, prop, tuple;
	if (typeof(val) === 'null' || typeof(val) === 'undefined' || typeof(val) === 'function' || !val) {
		return;
	}
	if (typeof(val) === 'array' || val instanceof Array) {
		if (!val.length) {
			return; // Omit empty lists
		}
		ret = $('<ol>');
		$(val).each(function(i, elem) {
			tuple = makeTuple('', elem);
			if (tuple) {
				ret.append($('<li>').append(tuple));
			}
		});
	} else if (typeof(val) === 'object') {
		ret = undefined;
		for (prop in val) {
			if (typeof(val[prop]) !== 'null' && typeof(val[prop]) !== 'undefined' && typeof(val[prop]) !== 'function') {
				ret = val[prop];
				break;
			}
		}
		if (typeof(ret) === 'undefined') {
			return; // Omit empty objects and objects consisting only of non-displayable properties
		}
		ret = $('<ul>');
		for (prop in val) {
			tuple = makeTuple(prop, val[prop]);
			if (tuple) {
				ret.append($('<li>').append(tuple));
			}
		}
	} else {
		ret = $('<span>');
		ret.addClass('value');
		ret.text('' + val);
		ret.after('<br>');
	}
	var ret2 = $('<span>');
	ret2.addClass('name');
	ret2.text(name ? name + ':' : name);
	ret2.after(ret);
	console.log(ret2);
	return ret2;
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
