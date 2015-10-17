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
    console.log(subject.hypervideos());
  },

});
