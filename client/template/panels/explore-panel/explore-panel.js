Template.explorePanel.helpers({
  subjects: function () {
    var subjects = [];
    Subjects.find().fetch().forEach(function(subject){
      subjects.push(subject.get());
    });
    return JSON.stringify(subjects);
  }
});

Template.explorePanel.events({
  'get-hypervideos subject-box': function (e, template) {
    var subject = Subject.findOne({_id : e.target.subject._id});
    e.target.hypervideos = subject.hypervideos();
  },
  'watch-subject subject-box': function (e, template) {
    var subject = e.target.subject;
    Session.set("title", subject.name);
    Session.set("subjectId", subject._id);
    Router.go('watchSubject', {_id: subject._id});
  },
});
