Template.subjectsPanel.helpers({
  subjects: function () {
    var subjects = [];
    Subjects.find().fetch().forEach(function(subject){
      subjects.push(subject.get());
    });
    return JSON.stringify(subjects);
  }
});
Template.subjectsPanel.events({
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
