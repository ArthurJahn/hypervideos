Template.subjectsPanel.helpers({
  subjects: function () {
    return JSON.stringify(Subjects.find().fetch());
  }
});
Template.subjectsPanel.events({
  'get-subjects subjects-list': function(e,template) {
    var subjects = [];
    Subject.find().fetch().forEach(function(subject){
      subjects.push(subject.get());
    });
    e.target.subjects = subjects;
  },
  'get-hypervideos subject-box': function (e, template) {
    var subject = Subject.findOne({_id : e.target.subject._id});
    e.target.hypervideos = subject.hypervideos();
  },
  'watch-subject subject-box': function (e, template) {
    var subject = e.target.subject;
    Session.set("title", subject.name);
    Router.go('watchSubject', subject);
  },
  'edit-subject subject-box': function (e, template) {
    var subject = e.target.subject;
    Session.set("title", subject.name);
    Session.set("subjectId", subject._id);
    Router.go('subjectPanel', {_id: subject._id});
  },
  'subject-deleted subject-box': function(e, template) {
    var subject = Subject.findOne(e.target.subject._id);
    subject.remove();
  },
});
