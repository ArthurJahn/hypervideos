function HypervideoController() {}

HypervideoController.prototype = (function () {
  var hypervideo = null;
  Meteor.methods({
    'createHypervideo': function(hypervideo) {
      if(hypervideo.validate()) {
        hypervideo.save();
      }
    }
  });
  return {
    constructor:HypervideoController,

    createHypervideo: function(subjectId, col, row) {
      hypervideo = new Hypervideo();
      hypervideo.name = Hypervideos.defaultName;
      hypervideo.col = col;
      hypervideo.row = row;
      hypervideo.subjectId = subjectId;
      hypervideo.subvideos = [];
      hypervideo.questions = [];
      hypervideo.connections = [];
      hypervideo.save();
      return hypervideo;
    },
    saveHypervideo: function(hypervideoIn) {
      hypervideo = hypervideoIn;
      hypervideo.save();
    },
    removeHypervideo: function(hypervideoIn) {
      hypervideo = hypervideoIn;
      hypervideo.remove();
    },
    removeConnection: function(conn) {
      hypervideo.removeConnection(conn);
    },
    addSubvideo: function(x,y,mediaId,name) {
      var subvideo = subvideoController.createSubvideo(x, y, mediaId, name);
      subvideo.hypervideoId = hypervideo._id;
      hypervideo.addSubvideo(subvideo._id);
      return subvideo;
    },
    removeSubvideo: function (subvideo) {
      hypervideo.removeHypervideo(subvideo._id);
      subvideoController.removeSubvideo(subvideo);
    },
    addQuestion: function(x,y,name) {
      var question = questionController.createQuestion(x, y, name);
      question.hypervideoId = hypervideo._id;
      hypervideo.addQuestion(question._id);
      return question;
    },
    removeQuestion: function (question) {
      hypervideo.removeHypervideo(question._id);
      questionController.removeQuestion(question);
    },
    getByIds: function(id) {
      return Hypervideos.find({subjectId : id}).fetch();
    },
  };
})();

hypervideoController = new HypervideoController();
