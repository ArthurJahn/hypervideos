Template.newSubjectPanel.helpers({
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
  readyToPublish: function () {
    var subject = Subject.findOne();
    var readyToPublish = false;
    if (subject) {
      readyToPublish = subject.ready();
    }
    return readyToPublish;
  }
});

Template.newSubjectPanel.events({

  // ======================== Subject Controll Events ========================//
  'subject-created subject-composer-area': function (e, template) {
    var name = e.target.name;
    var subject;
    if (name) {
      subject = new Subject({
        _id: Router.current().params._id,
        name: name
      });
    } else {
      subject = new Subject({
        _id: Router.current().params._id
      });
    }
    subject.owner = Meteor.userId();
    if (subject.validate()) {
      subject.save();
      e.target.subject = subject.get();
    }
    Template.mainMenu.showValidationErrors(subject);
  },
  'subject-changed subject-composer-area': function (e, template) {
    var id = e.target.subject._id;
    var subject = Subject.findOne({
      _id: id
    });
    subject.setName(e.target.subject.name);
    Template.mainMenu.showValidationErrors(subject);
  },
  'subject-deleted subject-composer-area': function (e, template) {
    var subject = Subject.findOne(e.target.subject._id);
    subject.remove();
    e.target.subject = null;
  },
  'subject-published subject-composer-area': function (e, template) {
    var subject = Subject.findOne(e.target.subject._id);
    subject.setEditing(false);
  },
  'get-hypervideos subject-composer-area': function (e, template) {
    var subject = Subject.findOne({
      _id: e.target.subject._id
    });
    e.target.hypervideos = subject.hypervideos();
  },
  'connection-created subject-composer-area': function (e, template) {
    var id = e.target.subject._id;
    var subject = Subject.findOne({
      _id: id
    });
    var conn = e.target._connection;
    var result = subject.addConnection(conn);
    if (!result) {
      e.target._connection = null;
    } else {
      e.target.subject.connections = subject.connections;
    }
  },
  'connection-removed subject-composer-area': function (e, template) {
    var id = e.target.subject._id;
    var subject = Subject.findOne({
      _id: id
    });
    subject.removeConnection(e.target._connection);
    e.target.subject.connections = subject.connections;
  },
  // ======================= Hypervideo Controll Events ======================//
  'hypervideo-created subject-composer-area': function (e, template) {
    var hypervideoNode = e.originalEvent.path[0];
    var col = hypervideoNode._col,
      row = hypervideoNode._row;
    var subjectId = hypervideoNode._subjectId;
    var hypervideo = new Hypervideo({
      col: col,
      row: row,
      subjectId: subjectId
    });
    hypervideo.owner = Meteor.userId();
    if (hypervideo.validate()) {
      hypervideo.save();
      hypervideoNode.hypervideo = hypervideo.get();
    }
    Template.mainMenu.showValidationErrors(hypervideo);
  },
  'hypervideo-changed subject-composer-area': function (e, template) {
    var hypervideoNode = e.originalEvent.path[0];
    var hypervideo = Hypervideo.findOne(hypervideoNode.hypervideo._id);
    hypervideo.set('name', hypervideoNode.hypervideo.name);
    hypervideo.set('col', hypervideoNode.hypervideo.col);
    hypervideo.set('row', hypervideoNode.hypervideo.row);
    hypervideo.save();
    Template.mainMenu.showValidationErrors(hypervideo);
  },
  'hypervideo-deleted subject-composer-area': function (e, template) {
    var hypervideoNode = e.originalEvent.path[0];
    var subject = Subject.findOne(hypervideoNode.hypervideo.subjectId);
    if (subject) {
      subject.removeHypervideo(hypervideoNode.hypervideo._id);
    }
  },
  'upload-videos subject-composer-area': function (e, template) {
    var composer = e.originalEvent.path[0];
    Array.from(composer.files).forEach(function (file) {
      var tmpfile = new FS.File(file);
      tmpfile.hypervideoId = composer.hypervideo._id;
      tmpfile.owner = Meteor.userId();
      Videos.insert(tmpfile, function (err, fileObj) {
        if (err) {
          // error handled in collection filters
        } else {
          var length = composer.fileObjects.length;
          var list = composer.fileObjects.splice(0, length);
          list.push(fileObj);
          composer.fileObjects = list;
        }
      });
    });
  },
  'video-connection-created subject-composer-area': function (e, template) {
    e.stopPropagation();
    var composer = e.originalEvent.path[0];
    var id = composer.hypervideo._id;
    var hypervideo = Hypervideo.findOne({
      _id: id
    });
    var conn = composer._connection;
    var result = hypervideo.addConnection(conn);
    if (!result) {
      composer._connection = null;
    }
  },
  'video-connection-removed subject-composer-area': function (e, template) {
    var composer = e.originalEvent.path[0];
    var id = composer.hypervideo._id;
    var hypervideo = Hypervideo.findOne({
      _id: id
    });
    hypervideo.removeConnection(composer._connection);
    e.stopPropagation();
  },

  // ======================== Subvideo Controll Events =======================//
  'subvideo-created subject-composer-area': function (e, template) {
    var node = e.originalEvent.path[0];
    var x = node._x;
    var y = node._y;
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
    subvideo.owner = Meteor.userId();
    subvideo.save();
    node.subvideo = subvideo.get();
    Template.mainMenu.showValidationErrors(subvideo);
  },
  'subvideo-changed subject-composer-area': function (e, template) {
    var node = e.originalEvent.path[0];
    if (node.subvideo) {
      var subvideo = Subvideo.findOne(node.subvideo._id);
      subvideo.set('name', node.subvideo.name);
      subvideo.set('description', node.subvideo.description);
      subvideo.set('visibility', node.subvideo.visibility);
      subvideo.save();
      Template.mainMenu.showValidationErrors(subvideo);
    }
  },

  'subvideo-deleted subject-composer-area': function (e, template) {
    var node = e.originalEvent.path[0];
    if (node.subvideo) {
      var subvideo = Subvideo.findOne(node.subvideo._id);
      subvideo.remove();
      node.subvideo = null;
    }
  },

  // ======================== Question Controll Events =======================//
  'question-created subject-composer-area': function (e, template) {
    var node = e.originalEvent.path[0];
    var x = node._x;
    var y = node._y;
    var name = node._name;
    var hypervideoId = node.hypervideoId;
    var question = new Question({
      name: name,
      hypervideoId: hypervideoId,
      x: x,
      y: y
    });
    question.owner = Meteor.userId();
    question.save();
    node.question = question.get();
    Template.mainMenu.showValidationErrors(question);
  },
  'question-changed subject-composer-area': function (e, template) {
    var node = e.originalEvent.path[0];
    if (node.question) {
      var question = Question.findOne(node.question._id);
      question.set('name', node.question.name);
      question.set('description', node.question.description);
      question.set('answers', node.question.answers);
      question.set('visibility', node.question.visibility);
      question.save();
      Template.mainMenu.showValidationErrors(question);
    }
  },

  'question-deleted subject-composer-area': function (e, template) {
    var node = e.originalEvent.path[0];
    if (node.question) {
      var question = Question.findOne(node.question._id);
      question.remove();
      node.question = null;
    }
  },
});

Template.newSubjectPanel.showValidationErrors = function (model) {
  document.querySelector('#notify').message = '';
  var errors = model.getValidationErrors();
  for (var key in errors) {
    document.querySelector('#notify').message = errors[key + ''];
  }
};
