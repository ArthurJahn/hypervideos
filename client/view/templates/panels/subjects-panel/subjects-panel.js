Template.subjectsPanel.helpers({
  subjects: function () {
    return subjectController.subjects();
  }
});

Template.subjectsPanel.events({
  'get-hypervideos subject-box': function (e, template) {
    var subject = e.target.subject;
    console.log(subject);
    var list = hypervideoController.getByIds(subject._id);
    e.target.hypervideos = list;
  },
  'watch-subject subject-box': function (e, template) {
    var subject = e.target.subject;
    Session.set("title", subject.name);
    Router.go('watchSubject', subject);
  }
});
