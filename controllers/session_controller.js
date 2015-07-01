var dosMinutos = 2 * 60 * 1000;

// MW de autorización de accesos HTTP restringidos
exports.controlTiempoDeSesion = function(req, res, next) {
  if (req.session.user) {
    //Si tiene sesión activa, controlamos el tiempo
    if ((req.session.momento - req.session.momentoAnterior) < dosMinutos) {
      next();
    } else {
      //Borramos los datos de sesión
      borrarDatosDeSesion(req);
      //Redirigimos al login
      res.redirect('/login');
    }
  } else {
    //Si no tiene sesión activa, que continúe
    next();
  }
};

// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Get /login - Formulario de login
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/new', { errors: errors });
};

// POST /login - Crear la sesion si usuario se autentica
exports.create = function(req, res) {
    var login     = req.body.login;
    var password  = req.body.password;

    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {
        if (error) {
          // si hay error retornamos mensajes de error de sesión
          req.session.errors = [{ "message": 'Se ha producido un error: ' + error }];
          res.redirect("/login");
          return;
        }

        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = { id: user.id, username: user.username};

        //Inicializamos los momentos de sesión
        req.session.momento = new Date().getTime();
        req.session.momentoAnterior = req.session.momento;

        // redirección a path anterior a login
        res.redirect(req.session.redir.toString());
    });
};

function borrarDatosDeSesion(req) {
  delete req.session.user;
  delete req.session.momento;
  delete req.session.momentoAnterior;
}

// DELETE /logout - Destruir sesion
exports.destroy = function(req, res) {
    //Borramos los datos de sesión
    borrarDatosDeSesion(req);

    // redirección a path anterior a login
    res.redirect(req.session.redir.toString());
};
