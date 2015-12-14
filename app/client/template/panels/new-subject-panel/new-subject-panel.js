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
  'hypervideo-created hypervideo-node': function (e, template) {
    var col = e.target._col,
      row = e.target._row;
    var subjectId = e.target._subjectId;
    var hypervideo = new Hypervideo({
      col: col,
      row: row,
      subjectId: subjectId
    });
    hypervideo.owner = Meteor.userId();
    if (hypervideo.validate()) {
      hypervideo.save();
      e.target.hypervideo = hypervideo.get();
    }
    Template.mainMenu.showValidationErrors(hypervideo);
  },
  'hypervideo-changed hypervideo-node': function (e, template) {
    var hypervideo = Hypervideo.findOne(e.target.hypervideo._id);
    hypervideo.set('name', e.target.hypervideo.name);
    hypervideo.set('col', e.target.hypervideo.col);
    hypervideo.set('row', e.target.hypervideo.row);
    hypervideo.save();
    Template.mainMenu.showValidationErrors(hypervideo);
  },
  'hypervideo-deleted hypervideo-node': function (e, template) {
    var subject = Subject.findOne(e.target.hypervideo.subjectId);
    if (subject) {
      subject.removeHypervideo(e.target.hypervideo._id);
    }
  },
  'upload-videos hypervideo-composer-area': function (e, template) {
    var composer = e.target;
    FS.Utility.eachFile(e, function (file) {
      var tmpfile = new FS.File(file);
      tmpfile.hypervideoId = e.target.hypervideo._id;
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
  'connection-created hypervideo-composer-area': function (e, template) {
    e.stopPropagation();
    var id = e.target.hypervideo._id;
    var hypervideo = Hypervideo.findOne({
      _id: id
    });
    var conn = e.target._connection;
    var result = hypervideo.addConnection(conn);
    if (!result) {
      e.target._connection = null;
    }
  },
  'connection-removed hypervideo-composer-area': function (e, template) {
    var id = e.target.hypervideo._id;
    var hypervideo = Hypervideo.findOne({
      _id: id
    });
    hypervideo.removeConnection(e.target._connection);
    e.stopPropagation();
  },

  // ======================== Subvideo Controll Events =======================//
  'subvideo-created subvideo-node': function (e, template) {
    var node = e.target;
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
  'subvideo-changed subvideo-composer': function (e, template) {
    if (e.target.subvideo) {
      var subvideo = Subvideo.findOne(e.target.subvideo._id);
      subvideo.set('name', e.target.subvideo.name);
      subvideo.set('description', e.target.subvideo.description);
      subvideo.set('visibility', e.target.subvideo.visibility);
      subvideo.save();
      Template.mainMenu.showValidationErrors(subvideo);
    }
  },

  'subvideo-deleted subvideo-composer': function (e, template) {
    if (e.target.subvideo) {
      var subvideo = Subvideo.findOne(e.target.subvideo._id);
      subvideo.remove();
      e.target.subvideo = null;
    }
  },

  // ======================== Question Controll Events =======================//
  'question-created question-node': function (e, template) {
    var node = e.target;
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
  'question-changed question-composer': function (e, template) {
    if (e.target.question) {
      var question = Question.findOne(e.target.question._id);
      question.set('name', e.target.question.name);
      question.set('description', e.target.question.description);
      question.set('answers', e.target.question.answers);
      question.set('visibility', e.target.question.visibility);
      question.save();
      Template.mainMenu.showValidationErrors(question);
    }
  },

  'question-deleted question-composer': function (e, template) {
    if (e.target.question) {
      var question = Question.findOne(e.target.question._id);
      question.remove();
      e.target.question = null;
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
