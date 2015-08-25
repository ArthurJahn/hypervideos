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
    removeHypervideo: function (hypervideoId) {
      subject.removeHypervideo(hypervideoId);
    },

  };
})();

subjectController = new SubjectController();
