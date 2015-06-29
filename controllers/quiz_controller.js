var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error); });
};

// GET /quizes
exports.index = function(req, res) {
  var search = req.query.search;
  if (search === '' || search === undefined) {
    //Si no viene concepto de búsqueda, sacamos todo
    search = '%';
    req.query.search = '';
  } else {
    //Si viene concepto de búsqueda, le ponemos un % delante y detrás
    search = '%' + search + '%';
    //Convertimos los espacios en blanco en %
    search = search.replace(/ /g, '%');
  }

  models.Quiz.findAll({where: ['pregunta like ? order by pregunta', search]}).then(
    function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes, search: req.query.search, errors: [] });
    }
  ).catch(function(error) { next(error); })
};

// GET /quizes/:quizId
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, errors: [] });
};

// GET /quizes/:quizId/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] });
};

// GET /quizes/new
exports.new = function(req, res) {
  //Creamos el objeto quiz
  var quiz = models.Quiz.build(
    {pregunta: "", respuesta: ""}
  );
  res.render('quizes/new', { quiz: quiz, errors: [] });
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
  var errores = quiz.validate();
  if (errores) {
    //se convierte en un array con la propiedad message
    var err = new Array();
    var i = 0;
    for (var prop in errores) {
      err[i] = { message: errores[prop] };
      i++;
    }
    res.render('quizes/new', { quiz: quiz, errors: err });
  } else {
    // save: guarda en DB campos pregunta y respuesta de quiz
    quiz
    .save({fields: ["pregunta", "respuesta"]})
    .then(function() {
        //res.redirect: Redirección HTTP a lista de preguntas
        res.redirect('/quizes');
      })
  }
};
