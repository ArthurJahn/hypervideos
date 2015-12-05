Template.subjectsPanel.helpers({
  userSubjects: function () {
    var subjects = [];
    Subjects.find({
      owner: Meteor.userId()
    }).fetch().forEach(function (subject) {
      subjects.push(subject.get());
    });
    return JSON.stringify(subjects);
  },
  librarySubjects: function () {
    var subjects = [];
    Subject.find({
      owner: {
        $ne: Meteor.userId()
      }
    }).fetch().forEach(function (subject) {
      subject.inLibrary = true;
      subjects.push(subject.get());
    });
    return JSON.stringify(subjects);
  },
});
Template.subjectsPanel.events({
  //====================== events for user Subjects ==========================//
  'get-hypervideos user-subject-box': function (e, template) {
    var subject = Subject.findOne({
      _id: e.target.subject._id
    });
    e.target.hypervideos = subject.hypervideos();
  },

  'watch-subject user-subject-box': function (e, template) {
    var subject = e.target.subject;
    var subjectId = e.target.subject._id;
    Session.set('title', subject.name);
    Session.set('subjectId', subjectId);
    Router.go('watchSubject', {
      _id: subjectId
    });
  },
  'edit-subject user-subject-box': function (e, template) {
    var subject = e.target.subject;
    Session.set('title', subject.name);
    Session.set('subjectId', subject._id);
    Router.go('subjectPanel', {
      _id: subject._id
    });
  },
  'subject-deleted user-subject-box': function (e, template) {
    var subject = Subject.findOne(e.target.subject._id);
    subject.remove();
  },

  //================== events for user library Subjects ======================//
  'get-hypervideos subject-box': function (e, template) {
    var subject = Subject.findOne({
      _id: e.target.subject._id
    });
    e.target.hypervideos = subject.hypervideos();
  },

  'watch-subject subject-box': function (e, template) {
    var subject = e.target.subject;
    var subjectId = e.target.subject._id;
    Session.set('title', subject.name);
    Session.set('subjectId', subjectId);
    Router.go('watchSubject', {
      _id: subjectId
    });
  },
  'remove-library-subject subject-box': function (e, template) {
    var librarySubject = LibrarySubject.findOne({
      userId: Meteor.userId(),
      subjectId: e.target.subject._id
    });
    librarySubject.remove();
  },

});
