Template.newSubjectPanel.helpers({
  show: function () {
    return Session.get('activePanel') === "3";
  }
});

Template.newSubjectPanel.events({

// ======================== Subject Controll Methods =========================//
  'subject-created subject-composer-area': function(e, template) {
    var subject = subjectController.createSubject();
    e.target.subject = subject;
  },
  'subject-changed subject-composer-area': function(e, template) {
    subjectController.saveSubject();
  },
  'connection-removed connection-node': function(e, template) {
    var conn = e.target.connection;
    subjectController.removeConnection(conn);
  },

// ======================= Hypervideo Controll Methods =======================//
  'hypervideo-created hypervideo-node': function(e, template) {
    var x = e.target._x, y = e.target._y, subjectId = e.target._subjectId;
    var hypervideo = hypervideoController.createHypervideo(subjectId,x,y);
    e.target.hypervideo = hypervideo;
  },
  'hypervideo-changed hypervideo-node': function(e, template) {
    var hypervideo = e.target.hypervideo;
    hypervideoController.saveHypervideo(hypervideo);
  },
  'hypervideo-deleted hypervideo-node': function(e, template) {
    var hypervideo = e.target.hypervideo;
    hypervideoController.removeHypervideo(hypervideo);
    subjectController.removeHypervideo(hypervideo._id);
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

});
