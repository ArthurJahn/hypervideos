Template.watchSubject.helpers({
  subject: function () {
    var id = Session.get('subjectId');
    var subject = Subject.findOne({
      _id: id
    });
    if (subject) {
      return JSON.stringify(subject.get());
    }
    return null;
  },
  librarySubject: function () {
    var id = Session.get('subjectId');
    var librarySubject = librarySubject.findOne({
      subjectId: id
    });
    if (librarySubject) {
      return JSON.stringify(librarySubject.get());
    }
    return null;
  },
});
Template.watchSubject.events({
  'get-hypervideos subject-player': function (e, template) {
    var subject = Subject.findOne({
      _id: e.target.subject._id
    });
    var hypervideos = [];
    subject.hypervideos().forEach(function (hypervideo) {
      hypervideos.push(hypervideo.get());
    });
    e.target.hypervideos = hypervideos;

    e.target.hypervideo = hypervideos[0];
    Template.watchSubject.visitHypervideo(hypervideos[0]._id);
  },

  'answer-submited subject-player': function(e, template) {
    var hypervideo = Hypervideo.findOne({
      _id: e.target.hypervideo._id
    });
    var questionId = e.original.detail.questionId;
    var answer = e.original.detail.answer;
    Template.watchSubject.addQuestion(hypervideo._id, questionId, answer);
  },

  'get-subvideos hyper-player': function (e, template) {
    var hypervideo = Hypervideo.findOne({
      _id: e.target.hypervideo._id
    });
    e.target.subvideos = hypervideo.subvideos();
  },
  'get-questions hyper-player': function (e, template) {
    var hypervideo = Hypervideo.findOne({
      _id: e.target.hypervideo._id
    });
    e.target.questions = hypervideo.questions();
  },
  'get-source-subvideo hyper-player': function (e, template) {
    var hypervideo = Hypervideo.findOne({
      _id: e.target.hypervideo._id
    });

    var subvideo = hypervideo.subvideos()[0];
    e.target.url = subvideo.media().url();
    e.target.subvideo = subvideo.get();
    Template.watchSubject.visitSubvideo(hypervideo._id, subvideo._id);
  },

  'visit-subvideo hyper-player': function (e, template) {
    var hypervideo = Hypervideo.findOne({
      _id: e.target.hypervideo._id
    });
    Template.watchSubject.visitSubvideo(hypervideo._id, e.target.subvideo._id);
  },

  'get-url subvideo-preview': function (e, template) {
    var subvideo = Subvideo.findOne({_id:e.target.subvideo._id});
    e.target.url = subvideo.media().url();
  },
});

Template.watchSubject.visitHypervideo = function (hypervideoId) {
  var libSubject = LibrarySubject.findOne();
  var visitHypervideo = new VisitedHypervideo({
    librarySubjectId: libSubject._id,
    hypervideoId: hypervideoId
  });
  visitHypervideo.save();
  Template.mainMenu.showValidationErrors(visitHypervideo);
};

Template.watchSubject.visitSubvideo = function (hypervideoId, subvideoId) {
  var visitedHypervideo = VisitedHypervideo.findOne({
    hypervideoId: hypervideoId
  });
  if (!visitedHypervideo) {
    var libSubject = LibrarySubject.findOne();
    visitedHypervideo = new VisitedHypervideo({
      librarySubjectId: libSubject._id,
      hypervideoId: hypervideoId
    });
  }
  visitedHypervideo.addWatchedSubvideo(subvideoId);
  visitedHypervideo.save();
  Template.mainMenu.showValidationErrors(visitedHypervideo);
};

Template.watchSubject.answerQuestion = function (hypervideoId, questionId, answer) {
  var visitedHypervideo = VisitedHypervideo.findOne({
    hypervideoId: hypervideoId
  });
  visitedHypervideo.addQuestion(questionId, answer)
  visitedHypervideo.save();
  Template.mainMenu.showValidationErrors(visitedHypervideo);
};
