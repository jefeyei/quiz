var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* Pregunta */
router.get('/quizes/question', quizController.question);

/* Respuesta */
router.get('/quizes/answer', quizController.answer);


/* GET home page. */
router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Jose Sánchez', foto: '/images/jose.png' });
});

module.exports = router;
