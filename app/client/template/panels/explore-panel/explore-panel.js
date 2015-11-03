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
    Template.explorePanel.addLibrarySubject(subject._id);
    Router.go('watchSubject', {_id: subject._id});
  },
  'add-library-subject subject-box': function (e, template) {
    var subject = e.target.subject;
    Template.explorePanel.addLibrarySubject(subject._id);
  },
  'remove-library-subject subject-box': function (e, template) {
    var librarySubject = LibrarySubject.findOne({
      userId: Meteor.userId(),
      subjectId: e.target.subject._id
    });
    librarySubject.remove();
  }
});

Template.explorePanel.addLibrarySubject = function(subjectId) {
  var librarySubject = new LibrarySubject({
    subjectId: subjectId,
    userId: Meteor.userId(),
  });
  librarySubject.generateId();
  if(librarySubject.validate()) {
    librarySubject.save();
  }
};
