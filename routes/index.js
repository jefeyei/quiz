var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* Home. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* Autoload de comandos con :quizId -> autoload :quizId */
router.param('quizId', quizController.load);

/* Lista de preguntas */
router.get('/quizes', quizController.index);

/* Pregunta */
router.get('/quizes/:quizId(\\d+)', quizController.show);

/* Respuesta */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* Créditos */
router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Jose Sánchez', foto: '/images/jose.png' });
});

module.exports = router;
