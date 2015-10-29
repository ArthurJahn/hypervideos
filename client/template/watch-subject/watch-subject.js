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
    e.target.hypervideos = subject.hypervideos();
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
    var subvideo = hypervideo.subvideos()[0];
    var sourceSubvideo = subvideo.get();
    sourceSubvideo.source = subvideo.media().url();
    e.target.subvideo = sourceSubvideo;
  },
  'hypervideo-visited hyper-player': function(e, template) {
    var hypervideo = Hypervideo.findOne({_id : e.target.hypervideo._id});
  },
});
