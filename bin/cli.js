#!/usr/bin/env node

'use strict';

var notifier = require('node-notifier');

// get arguments.
var config = process.argv[2];
var message = process.argv[3];
if (!message) {
	message = config;
}

// create a interpreter.
var get = function(re, num){
	return function(config){
		var matched = re.exec(config);
		return matched ? matched[1] * num : 0;
	}
}
var sec = get(/([0-9]+)s/, 1000);
var min = get(/([0-9]+)m/, 1000 * 60);
var hour = get(/([0-9]+)h/, 1000 * 60 * 60);

// create a notify function.
var notify = notifier.notify.bind(notifier, {
  'title': 'Alarm',
  'message': message
});

try {
	// interpret a config.
	var ms = sec(config) + min(config) + hour(config);
	// set alarm.
	setTimeout(notify, ms);
}
catch(e) {
	console.log(e);
}

