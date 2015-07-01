var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* Home. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

/* Autoload de comandos con :quizId -> autoload :quizId */
router.param('quizId', quizController.load);

/* Autoload :commentId */
router.param('commentId', commentController.load);

/* RUTAS DE SESIÓN */

/* Login */
router.get('/login',  sessionController.new);

/* Crear sesión */
router.post('/login', sessionController.create);

/* Destruir sesión */
router.get('/logout', sessionController.destroy);

/* RUTAS DE PREGUNTAS */

/* Lista de preguntas */
router.get('/quizes',
            sessionController.controlTiempoDeSesion,
            quizController.index);

/* Pregunta */
router.get('/quizes/:quizId(\\d+)',
            sessionController.controlTiempoDeSesion,
            quizController.show);

/* Respuesta */
router.get('/quizes/:quizId(\\d+)/answer',
            sessionController.controlTiempoDeSesion,
            quizController.answer);

/* Nueva pregunta */
router.get('/quizes/new',
            sessionController.controlTiempoDeSesion, sessionController.loginRequired,
            quizController.new);

/* Guardar nueva pregunta */
router.post('/quizes/create',
            sessionController.controlTiempoDeSesion, sessionController.loginRequired,
            quizController.create);

/* Editar pregunta */
router.get('/quizes/:quizId(\\d+)/edit',
            sessionController.controlTiempoDeSesion, sessionController.loginRequired,
            quizController.edit);

/* Guardar editar pregunta */
router.put('/quizes/:quizId(\\d+)',
            sessionController.controlTiempoDeSesion, sessionController.loginRequired,
            quizController.update);

/* Borrar pregunta */
router.delete('/quizes/:quizId(\\d+)',
              sessionController.controlTiempoDeSesion, sessionController.loginRequired,
              quizController.destroy);

/* RUTAS DE COMENTARIOS */

/* Nuevo comentario */
router.get('/quizes/:quizId(\\d+)/comments/new',
            sessionController.controlTiempoDeSesion,
            commentController.new);

/* Guardar nuevo comentario */
router.post('/quizes/:quizId(\\d+)/comments',
            sessionController.controlTiempoDeSesion,
            commentController.create);

/* Publicar comentario */
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
	          sessionController.controlTiempoDeSesion, sessionController.loginRequired,
            commentController.publish);

/* OTRAS RUTAS */

/* Créditos */
router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Jose Sánchez', foto: '/images/jose.png', errors: [] });
});

module.exports = router;
