var models = require('../models/models.js');

// GET /quizes/statistics
exports.show = function(req, res) {
  models.Quiz.count().then(function(numeroPreguntas) {
    models.Comment.count().then(function(numeroComentarios) {
        models.Quiz.findAll({ include: [{ model: models.Comment }] }).then(function(quizes) {
          var preguntasConComentarios = 0;
          for (pregunta in quizes) {
            if (quizes[pregunta].Comments.length) {
              preguntasConComentarios++;
            }
          }

          res.render('quizes/statistics', {
              numeroPreguntas: numeroPreguntas,
              numeroComentarios: numeroComentarios,
              mediaComentarios: numeroComentarios / numeroPreguntas,
              preguntasSinComentarios: numeroPreguntas - preguntasConComentarios,
              preguntasConComentarios: preguntasConComentarios,
              errors: [] });
        })
    })
  });
};
