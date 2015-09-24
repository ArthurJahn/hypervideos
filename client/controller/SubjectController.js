function SubjectController() {}

Meteor.subscribe("subjects");

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
    addHypervideo: function (x,y) {
      var hypervideo = hypervideoController.createHypervideo(x,y);
      subject.addHypervideo(hypervideo._id);
      hypervideo.subjectId = Subject._id;
      return hypervideo;
    },
  };
})();

subjectController = new SubjectController();
