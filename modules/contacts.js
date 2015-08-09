var fs = require('fs');


function read_json_file() {
	var file = './data/contacts.json';
	return fs.readFileSync(file);	
}

/* Devuelve un array de json que va a contener todos los contactos */

exports.list = function () {
	return JSON.parse(read_json_file());
};

/* Devuelve el contacto con número number*/

exports.query = function(number) {
	var json = read_json_file();
	var json_result = JSON.parse(json);
	var result = json_result.result;
	
	for (var i=0; i< result.length; i++) {
		var contact = result[i];
		if (contact.primartycontactnumber === number) {
			return contact;
		}
	}
	return null;
};

/* Devuelve el primre contacto encontrado bajo un critero que coincida con valor == value*/

exports.query_by_arg = function(arg, value) {
	var json = read_json_file();
	var json_result = JSON.parse(json);
	var result = json_result.result;
	
	for (var i=0; i< result.length; i++) {
		var contact = result[i];
		if (contact[arg] === value) {
			return contact;
		}
	} 
	return null;
};

/* Devuelve una lista con todos los grupos contenidos en nuestros contactos */

exports.list_groups = function() {
	var json = read_json_file();
	var json_result = JSON.parse(json);
	var result = json_result.result;
	
	var resultArray = new Array();
	
	for (var i=0; i< result.length; i++) {
		
		var groups = result[i].groups;
			
		for (var index = 0; index < groups.lenght; index++) {
			if (resultArray.indexOf(groups[index]) === -1) {
				resultArray.push(groups[index]);
			}
		}
	}
	return resultArray;
};

/* Devuelve una lista con los miembros de un grupo */

exports.get_members = function (group_name) {
	var json = read_json_file();
	var json_result = JSON.parse(json);
	var result = json_result.result;
	
	var resultArray = new Array();
	
	for (var i=0; i< result.length; i++) {
		if (resultArray.indexOf(result[i]) === -1 ) {
			resultArray.push(result[i]);
		}
	}
	return resultArray;
};
