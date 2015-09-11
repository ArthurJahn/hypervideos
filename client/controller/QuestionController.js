function QuestionController() {}

QuestionController.prototype = (function () {
  var question = null;

  return {
    constructor:QuestionController,

    createQuestion: function( x, y, name) {
      question = new Question();
      question.name = name || Question.defaultName;
      question.x = x;
      question.y = y;
      question.save();
      return question;
    },
    saveQuestion: function(questionIn) {
      question = questionIn;
      question.save();
    },
    removeQuestion: function(questionIn) {
      question = questionIn;
      question.remove();
    },
  };
})();

questionController = new QuestionController();
