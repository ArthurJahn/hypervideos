Template.watchSubject.helpers({
  subject: function() {
    var id = Session.get('subjectId');
    var subject = Subject.findOne({_id: id});
    if(subject){
      return JSON.stringify(subject.get());
    }
    return null;
  }
});
Template.watchSubject.events({
  'get-hypervideos subject-player': function (e, template) {
    var subject = Subject.findOne({_id : e.target.subject._id});
    var hypervideos = [];
    subject.hypervideos().forEach(function(hypervideo){
      hypervideos.push(hypervideo.get());
    });
    e.target.hypervideos = hypervideos;
    //FIX_ME: calculate hypervideo to be seen at first
    e.target.hypervideo = hypervideos[0];
    Template.watchSubject.visitHypervideo(hypervideos[0]._id);
  },
  'get-subvideos hyper-player': function (e, template) {
    var hypervideo = Hypervideo.findOne({_id : e.target.hypervideo._id});
    e.target.subvideos = hypervideo.subvideos();
  },
  'get-questions hyper-player': function (e, template) {
    var hypervideo = Hypervideo.findOne({_id : e.target.hypervideo._id});
    e.target.questions = hypervideo.questions();
  },
  'get-source-subvideo hyper-player': function (e, template) {
    var hypervideo = Hypervideo.findOne({_id : e.target.hypervideo._id});
    //FIX-ME: calculate next subvideo to be played
    var subvideo = hypervideo.subvideos()[0];
    var sourceSubvideo = subvideo.get();
    sourceSubvideo.source = subvideo.media().url();
    e.target.subvideo = sourceSubvideo;
  },
  'hypervideo-visited hyper-player': function(e, template) {
    
    var hypervideo = Hypervideo.findOne({_id : e.target.hypervideo._id});

  },
});

Template.watchSubject.visitHypervideo = function(hypervideoId){
  var libSubject = LibrarySubject.findOne();
  var visitHypervideo = new VisitedHypervideo({
    librarySubjectId: libSubject._id,
    hypervideoId: hypervideoId
  });
  visitHypervideo.save();
};
