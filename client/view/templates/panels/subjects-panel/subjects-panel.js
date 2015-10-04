Template.subjectsPanel.helpers({
  subjects: function () {
    return JSON.stringify(Subjects.find().fetch());
  }
});

Template.subjectsPanel.events({
  'get-hypervideos subject-box': function (e, template) {
    var subject = Subject.findOne({_id : e.target.subject._id});
    console.log(subject);
    e.target.hypervideos = subject.hypervideos();
  },
  'watch-subject subject-box': function (e, template) {
    var subject = e.target.subject;
    Session.set("title", subject.name);
    Router.go('watchSubject', subject);
  }
});
