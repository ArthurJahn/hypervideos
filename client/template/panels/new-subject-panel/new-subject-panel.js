Template.newSubjectPanel.events({

// ======================== Subject Controll Methods =========================//
  'subject-created subject-composer-area': function(e, template) {
    var name = e.target.name;
    var subject;
    if(name)
      subject = new Subject({name: name});
    else {
      subject = new Subject();
    }
    subject.owner = Meteor.userId();
    if(subject.validate()){
      subject.save();
      e.target.subject = subject.get();
    }
    else {
      var errors = subject.getValidationErrors();
      console.log(errors);
    }
  },
  'subject-changed subject-composer-area': function(e, template) {
    var id = e.target.subject._id;
    var subject = Subject.findOne({_id:id});
    subject.setName(e.target.subject.name);
  },
  'connection-created subject-composer-area': function(e, template) {
    var id = e.target.subject._id;
    var subject = Subject.findOne({_id:id});
    var conn = e.target._connection;
    var result = subject.addConnection(conn);
    if (!result) {
      e.target._connection = null;
    }
  },
  'connection-removed subject-composer-area': function(e, template) {
    var id = e.target.subject._id;
    var subject = Subject.findOne({_id:id});
    subject.removeConnection(e.target._connection);
  },

// ======================= Hypervideo Controll Methods =======================//
  'hypervideo-created hypervideo-node': function(e, template) {
    var col = e.target._col, row = e.target._row;
    var subjectId = e.target._subjectId;
    var hypervideo = new Hypervideo({col: col, row: row, subjectId: subjectId});
    hypervideo.owner = Meteor.userId();
    hypervideo.save();
    e.target.hypervideo = hypervideo.get();
  },
  'hypervideo-changed hypervideo-node': function(e, template) {
    var hypervideo = Hypervideo.findOne(e.target.hypervideo._id);
    hypervideo.set('name',e.target.hypervideo.name);
    hypervideo.set('col', e.target.hypervideo.col);
    hypervideo.set('row', e.target.hypervideo.row);
    hypervideo.save();
  },
  'hypervideo-deleted hypervideo-node': function(e, template) {
    var hypervideo = Hypervideo.findOne(e.target.hypervideo._id);
    hypervideo.remove();
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
 'connection-created hypervideo-composer-area': function(e, template) {
   e.stopPropagation();
   var id = e.target.hypervideoId;
   var hypervideo = Hypervideo.findOne({_id:id});
   var conn = e.target._connection;
   var result = hypervideo.addConnection(conn);
   if (!result) {
     e.target._connection = null;
   }
 },
 'connection-removed hypervideo-composer-area': function(e, template) {
   var id = e.target.hypervideoId;
   var hypervideo = Hypervideo.findOne({_id:id});
   hypervideo.removeConnection(e.target._connection);
   e.stopPropagation();
 },
 // ======================== Subvideo Controll Methods =======================//
 'subvideo-created subvideo-node': function(e, template) {
   var node = e.target;
   var x = node._x, y = node._y;
   var mediaId = node.mediaId;
   var name = node._name;
   var hypervideoId = node.hypervideoId;
   var subvideo = new Subvideo({
     name: name,
     hypervideoId: hypervideoId,
     mediaId: mediaId,
     x: x,
     y: y
   });
   subvideo.owner = Meteor.user()._id;
   subvideo.save();
   node.subvideo = subvideo.get();
 },
 'subvideo-changed subvideo-node': function(e, template) {
   var subvideo = Subvideo.findOne(e.target.subvideo._id);
   subvideo.save();
 },

 // ======================== Question Controll Methods =======================//
 'question-created question-node': function(e, template) {
   var node = e.target;
   var x = node._x, y = node._y;
   var name = node._name;
   var hypervideoId = node.hypervideoId;
   var question = new Question({
     name: name,
     hypervideoId: hypervideoId,
     x: x,
     y: y
   });
   question.owner = Meteor.user()._id;
   question.save();
   node.question = question.get();
 },
 'question-changed question-node': function(e, template) {
   var question = Question.findOne(e.target.question._id);
   question.save();
 },
});
