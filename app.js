
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var url = require ('url'); /* Para función parse */

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
/* Estilos y css por defecto. No las vamos a usar en este ejemplo
 * app.set('views', __dirname + '/views');
 * app.set('view engine', 'jade');
*/
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

/* URIs por defecto de expres. No las vamos a usar 
 * app.get('/', routes.index);
 * app.get('/users', user.list);
 */

/* Hola mundo */ 


app.get('/hola1', function(request, response) {
	response.send('Hola Mundo');
});


/* Hola nomobre pasado en la URI http://localhost:3000/hola/nombre */

app.get('/hola2/:nombre', function(request, response) {
	response.send('Hola ' + request.params.nombre);
});

/* hola?nombre=Pedro */

app.get('/hola3', function(request, response) {
	var get_params = url.parse(request.url, true).query;
	
	/* url.parse devuelve objeto asociativo, así que usamos Object.keys 
	 * para transformar keys en un array y comprobar su tamaño */
	
	if (Object.keys(get_params).length === 0 ) {
		response.end('Hola mundo');
	} else {
		if (get_params.nombre) {
			response.end('Hola ' + get_params.nombre);	
		} else {
			response.end('Err: nombre no definido');
		}
		
	}
	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
