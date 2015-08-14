Template.newSubjectPanel.helpers({
  saveSubject: function (subject) {
    return subjects.insert(subject);
  },
  show: function () {
    return Session.get('activePanel') === "3";
  },
  createHypervideo: function (subject_id){

  }
});

Template.newSubjectPanel.events({
  'hypervideo-created hypervideo-node': function(e, template) {
    var hypervideo = new Hypervideo();
    hypervideo.name = Hypervideos.defaultName;
    hypervideo.x = e.target._x;
    hypervideo.y = e.target._y;
    hypervideo.subjectId = e.target._subjectId;
    hypervideo.save();
    e.target._hypervideo = hypervideo;
  },
  'hypervideo-changed hypervideo-node': function(e, template) {
    var hypervideo = e.target._hypervideo;
    hypervideo.save();
  },
  'subject-created subject-composer-area': function(e, template) {
    var subject = new Subject();
    subject.name = Subjects.defaultName;
    subject.hypervideos = [];
    subject.setEditing();
    subject.save();
    e.target._subject = subject;
  },
  'subject-changed subject-composer-area': function(e, template) {
    var subject = e.target._subject;
    subject.save();
  }
});
