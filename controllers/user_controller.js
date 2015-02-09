var admin_users =  {admin: {id:1, username:"admin", password:"1234"}, 
                    admin2: {id:2, username:"admin2", password:"5678"}};


/*
 * Autenticar un usuario.
 *
 * Busca el usuario con el login dado en la base de datos y comprueba su password.
 * Si todo es correcto ejecuta callback(null,user).
 * Si la autenticación falla o hay errores se ejecuta callback(error).
 */
exports.autenticar = function(login, password, callback) {
    if(admin_users[login]){
        //login exists
        if(password===admin_users[login].password){
            callback(null,admin_users[login]);
        }
        else{
            callback(new Error('Password erróneo.'));
        }
    } else {
        callback(new Error('No existe el usuario.'));
    }
}; 