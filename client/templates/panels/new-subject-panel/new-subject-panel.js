Template.newSubjectPanel.helpers({
  show: function () {
    return Session.get('activePanel') === "3";
  }
});

Template.newSubjectPanel.events({

// ======================== Subject Controll Methods =========================//
  'subject-created subject-composer-area': function(e, template) {
    var subject = new Subject();
    subject.name = Subjects.defaultName;
    subject.hypervideos = [];
    subject.connections = [];
    subject.setEditing();
    subject.save();
    e.target.subject = subject;
  },
  'subject-changed subject-composer-area': function(e, template) {
    var subject = e.target.subject;
    subject.save();
  },
  'connection-removed connection-node': function(e, template) {
    var conn = e.target.connection;
    var subject = Subjects.findOne({_id : e.target.ownerId});
    subject.removeConnection(conn);
  },

// ======================= Hypervideo Controll Methods =======================//
    'hypervideo-created hypervideo-node': function(e, template) {
      var hypervideo = new Hypervideo();
      hypervideo.name = Hypervideos.defaultName;
      hypervideo.x = e.target._x;
      hypervideo.y = e.target._y;
      hypervideo.subjectId = e.target._subjectId;
      hypervideo.save();
      e.target._hypervideo = hypervideo;
    },
    'hypervideo-changed hypervideo-node': function(e, template) {
      var hypervideo = e.target._hypervideo;
      hypervideo.save();
    },
    'hypervideo-deleted hypervideo-node': function(e, template) {
      var hypervideo = e.target._hypervideo;
      var subject = Subjects.findOne({_id: hypervideo.subjectId});
      subject.removeHypervideo(hypervideo._id);
      hypervideo.remove();
    },
  'upload-videos hypervideo-composer-area': function(e, template) {
    var composer = e.target;
    FS.Utility.eachFile(e, function(file) {
      Videos.insert(file, function (err, fileObj) {
        if (err){
           console.log(fileObj);
        } else {
           // handle success depending what you need to do
           var list = composer.fileObjects.splice(0, composer.fileObjects.length);
           list.push(fileObj);
           composer.fileObjects = list;
           console.log(composer.fileObjects);
        }
      });
   });
 },

 // ======================== Subvideo Controll Methods =======================//

});
