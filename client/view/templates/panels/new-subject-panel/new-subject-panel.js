Template.newSubjectPanel.helpers({
  show: function () {
    return Session.get('activePanel') === "3";
  }
});

Template.newSubjectPanel.events({

// ======================== Subject Controll Methods =========================//
  'subject-created subject-composer-area': function(e, template) {
    var subject = new Subject();
    subject.save();
    e.target.subject = subject.get();
  },
  'subject-changed subject-composer-area': function(e, template) {
    var id = e.target.subject._id;
    var subject = Subject.findOne({_id:id});
    subject.save();
  },
  'connection-removed connection-node': function(e, template) {
    var conn = e.target.connection;
  },

// ======================= Hypervideo Controll Methods =======================//
  'hypervideo-created hypervideo-node': function(e, template) {
    var col = e.target._col, row = e.target._row;
    var subjectId = e.target._subjectId;
    var hypervideo = hypervideoController.createHypervideo(subjectId,col,row);
    e.target.hypervideo = hypervideo;
  },
  'hypervideo-changed hypervideo-node': function(e, template) {
    var hypervideo = e.target.hypervideo;
    hypervideoController.saveHypervideo(hypervideo);
  },
  'hypervideo-deleted hypervideo-node': function(e, template) {
    var hypervideo = e.target.hypervideo;
    subjectController.removeHypervideo(hypervideo);
  },
  'upload-videos hypervideo-composer-area': function(e, template) {
    var composer = e.target;
    FS.Utility.eachFile(e, function(file) {
      Videos.insert(file, function (err, fileObj) {
        if (err){
           // handle error
        } else {
           // handle success depending what you need to do
           var list = composer.fileObjects.splice(0, composer.fileObjects.length);
           list.push(fileObj);
           composer.fileObjects = list;
        }
      });
   });
 },

 // ======================== Subvideo Controll Methods =======================//
 'subvideo-created subvideo-node': function(e, template) {
   var node = e.target;
   var x = node._x, y = node._y, mediaId = node.mediaId, name = node._name;
   var subvideo = hypervideoController.addSubvideo(x,y,mediaId, name);
   node.subvideo = subvideo;
 },
 'subvideo-changed subvideo-node': function(e, template) {
   var subvideo = e.target.subvideo;
   console.log(subvideo);
 },

 // ======================== Question Controll Methods =======================//
 'question-created question-node': function(e, template) {
   var node = e.target;
   var x = node._x, y = node._y, name = node._name;
   var question = hypervideoController.addQuestion(x,y,name);
   node.question = question;
 },
 'question-changed question-node': function(e, template) {
   var question = e.target.question;
   console.log(question);
 },
});
