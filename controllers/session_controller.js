
// Middleware: Se requiere hacer login.
//


// Formulario para hacer login
//
// Es la tipica ruta REST que devuelve un formulario para crear 
// un nuevo recurso.
// Paso como parametro el valor de redir (es una url a la que 
// redirigirme despues de hacer login) que me han puesto en la 
// query (si no existe uso /).
//
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/new', {errors: errors});
};


// Crear la sesion, es decir, hacer el login.
//
// El formulario mostrado por /login usa como action este metodo.
// Cojo los parametros que se han metido en el formulario y hago 
// login con ellos, es decir crea la sesion.
// Uso el metodo autenticar exportado por user_controller para 
// comprobar los datos introducidos.
// Si la autenticacion falla, me redirijo otra vez al formulario 
// de login.
// Notar que el valor de redir lo arrastro siempre. 
exports.create = function(req, res) {

    var login     = req.body.login;
    var password  = req.body.password;

    var uc = require('./user_controller');
    uc.autenticar(login, password, function(error, user) {

        if (error) {
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");        
            return;
        }

        // IMPORTANTE: creo req.session.user.
        // Solo guardo algunos campos del usuario en la sesion.
        // Esto es lo que uso para saber si he hecho login o no.
        req.session.user = {id:user.id, username:user.username};

        // Vuelvo al url indicado en redir
        res.redirect("/");
    });
}; 


// Logout
// 
// Para salir de la session simplemente destruyo req.session.user
//
exports.destroy = function(req, res) {

    delete req.session.user;
    res.redirect("/login");     
};
