function SubjectController() {}

SubjectController.prototype = (function () {
  var subject = null;

  return {
    constructor:SubjectController,

    createSubject: function() {
      subject = new Subject();
      subject.name = Subjects.defaultName;
      subject.hypervideos = [];
      subject.connections = [];
      subject.setEditing();
      subject.save();
      return subject;
    },
    saveSubject: function() {
      subject.save();
    },
    removeConnection: function(conn) {
      subject.removeConnection(conn);
    },
    removeHypervideo: function (hypervideo) {
      subject.removeHypervideo(hypervideo._id);
      hypervideoController.removeHypervideo(hypervideo);
    },
    addHypervideo: function(col,row) {
      var hypervideo = hypervideoController.createHypervideo(subject._id,col,row);
      subject.addHypervideo(hypervideo._id);
      return hypervideo;
    },
    subjects: function() {
      return JSON.stringify(Subjects.find().fetch());
    },
  };
})();

subjectController = new SubjectController();
