// REMOVE ME - only for tests
Meteor.startup(function () {
  if (Subject.find().count() !== 0) {
    Subject.remove({});
    Hypervideo.remove({});
    Subvideo.remove({});
    Question.remove({});

    Videos.remove({});

    LibrarySubject.remove({});
    VisitedHypervideo.remove({});
  }
});

// Get all Subject content: Hypervideo, subvideos, questions and videos
// Also get user library referece to this subject, if exists
// necessery when editing or watching a subject.
Meteor.publishComposite('fullSubject', function (subjectId) {
  var userId = this.userId;
  return {
    find: function () {
      return Subject.find({
        _id: subjectId
      }, {
        transform: null
      });
    },
    children: [{
      find: function (subject) {
        return Hypervideo.find({
          subjectId: subject._id
        }, {
          sort: {
            col: 1,
            row: 1
          },
          transform: null
        });
      },
      children: [{
        find: function (hypervideo, subject) {
          return Subvideo.find({
            hypervideoId: hypervideo._id
          }, {
            transform: null,
            sort: {
              x: 1,
              y: 1
            },
          });
        }
      }, {
        find: function (hypervideo, subject) {
          return Question.find({
            hypervideoId: hypervideo._id
          }, {
            transform: null,
            sort: {
              x: 1,
              y: 1
            },
          });
        }
      }, {
        find: function (hypervideo, subject) {
          return Videos.find({
            hypervideoId: hypervideo._id
          }, {
            transform: null
          });
        }
      }, ]
    }]
  };
});

// Get Subject content: Hypervideo, subvideos, questions and videos
// Also get user library referece to this subject
// necessery when watching a subject.
Meteor.publishComposite('watchSubject', function (subjectId, userId) {
  var userLevel = Meteor.users.findOne(userId).level || 1;
  return {
    find: function () {
      return Subject.find({
        _id: subjectId
      }, {
        transform: null
      });
    },
    children: [{
      find: function (subject) {
        return Hypervideo.find({
          subjectId: subject._id
        }, {
          transform: null
        });
      },
      children: [{
        find: function (hypervideo, subject) {
          return Subvideo.find({
            hypervideoId: hypervideo._id,
            visibility: userLevel
          }, {
            sort: {
              col: -1,
              row: -1
            },
            transform: null
          });
        }
      }, {
        find: function (hypervideo, subject) {
          return Question.find({
            hypervideoId: hypervideo._id,
            visibility: userLevel
          }, {
            transform: null,
            // when watching a subject, the right
            // answer must not be sent to user
            rightAnswer: -1
          });
        }
      }, {
        find: function (hypervideo, subject) {
          return Videos.find({
            hypervideoId: hypervideo._id
          }, {
            transform: null
          });
        }
      }, ]
    }, {
      find: function (subject) {
        return LibrarySubject.find({
          userId: userId,
          subjectId: subject._id
        }, {
          transform: null
        });
      },
      children: [{
        find: function (librarySubject) {
          return VisitedHypervideo.find({
            librarySubjectId: librarySubject._id
          }, {
            transform: null
          });
        }
      }]
    }]
  };
});

// Get all  logged user's subjects,
// Necessary when listing subjects preview
Meteor.publishComposite('userSubjects', function (userId) {
  return {
    find: function () {
      return Subject.find({
        owner: userId
      }, {
        transform: null
      });
    },
    children: [{
      find: function (subject) {
        return Hypervideo.find({
          subjectId: subject._id
        }, {
          transform: null
        });
      }
    }],
  };
});

// Get all logged user's librarySubject
// and vinculated subjects and hypervideos
// Necessary when showing user library
Meteor.publishComposite('userLibrary', function (userId) {
  return {
    find: function () {
      return LibrarySubject.find({
        userId: userId
      }, {
        transform: null
      });
    },
    children: [{
      find: function (librarySubject) {
        return VisitedHypervideo.find({
          librarySubjectId: librarySubject._id
        }, {
          transform: null
        });
      }
    }, {
      find: function (librarySubject) {
        return Subject.find({
          _id: librarySubject.subjectId
        }, {
          transform: null
        });
      }
    }, {
      find: function (librarySubject) {
        return Hypervideo.find({
          subjectId: librarySubject.subjectId
        }, {
          transform: null
        });
      }
    }]
  };
});

// Get all subjects, if user is logged, his subjects won't appear
// Necessary when listing explore subjects preview
Meteor.publishComposite('exploreSubjects', function (userId) {
  return {
    find: function () {
      return Subject.find({
        owner: {
          $nin: [userId]
        },
        editing: false
      }, {
        transform: null
      });
    },
    children: [{
      find: function (subject) {
        return Hypervideo.find({
          subjectId: subject._id
        }, {
          transform: null
        });
      }
    }, ]
  };
});

// Get a subject preview info
// necessary when watching a subject
Meteor.publishComposite('oneSubject', function (subjectId) {
  return {
    find: function () {
      return Subject.find({
        _id: subjectId
      }, {
        transform: null
      });
    },
    children: [{
      find: function (subject) {
        return Hypervideo.find({
          subjectId: subject._id
        }, {
          transform: null
        });
      }
    }]
  };
});
