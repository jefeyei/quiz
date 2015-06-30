var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

/* Home. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

/* Autoload de comandos con :quizId -> autoload :quizId */
router.param('quizId', quizController.load);

/* Lista de preguntas */
router.get('/quizes', quizController.index);

/* Pregunta */
router.get('/quizes/:quizId(\\d+)', quizController.show);

/* Respuesta */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* Nueva pregunta */
router.get('/quizes/new', quizController.new);

/* Guardar nueva pregunta */
router.post('/quizes/create', quizController.create);

/* Editar pregunta */
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

/* Guardar editar pregunta */
router.put('/quizes/:quizId(\\d+)', quizController.update);

/* Borrar pregunta */
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

/* Nuevo comentario */
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);

/* Guardar nuevo comentario */
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

/* Créditos */
router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Jose Sánchez', foto: '/images/jose.png', errors: [] });
});

module.exports = router;
