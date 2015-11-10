// REMOVE ME - only for tests
Meteor.startup(function () {
  if (Subjects.find().count() !== 0) {
    Subjects.remove({});
    Hypervideos.remove({});
    Subvideos.remove({});
    Questions.remove({});

    Videos.remove({});

    LibrarySubjects.remove({});
    VisitedHypervideos.remove({});
  }
});

// Get all Subject content: Hypervideos, subvideos, questions and videos
// Also get user library referece to this subject, if exists
// necessery when editing or watching a subject.
Meteor.publishComposite('fullSubject', function (subjectId) {
  var userId = this.userId;
  return {
    find: function () {
      return Subjects.find({
        _id: subjectId
      });
    },
    children: [{
      find: function (subject) {
        return Hypervideos.find({
          subjectId: subject._id
        });
      },
      children: [{
        find: function (hypervideo, subject) {
          return Subvideos.find({
            hypervideoId: hypervideo._id
          }, {
            sort: {
              col: -1,
              row: -1
            }
          });
        }
      }, {
        find: function (hypervideo, subject) {
          return Questions.find({
            hypervideoId: hypervideo._id
          });
        }
      }, {
        find: function (hypervideo, subject) {
          return Videos.find({
            hypervideoId: hypervideo._id
          });
        }
      }, ]
    }, {
      find: function (subject) {
        return LibrarySubjects.find({
          userId: userId,
          subjectId: subject._id
        });
      },
      children: [{
        find: function (librarySubject) {
          return VisitedHypervideos.find({
            librarySubjectId: librarySubject._id
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
      return Subjects.find({
        owner: userId
      });
    },
    children: [{
      find: function (subject) {
        return Hypervideos.find({
          subjectId: subject._id
        });
      }
    }],
  };
});

// Get all logged user's librarySubjects
// and vinculated subjects and hypervideos
// Necessary when showing user library
Meteor.publishComposite('userLibrary', function (userId) {
  return {
    find: function () {
      return LibrarySubjects.find({
        userId: userId
      });
    },
    children: [{
      find: function (librarySubject) {
        return VisitedHypervideos.find({
          librarySubjectId: librarySubject._id
        });
      }
    }, {
      find: function (librarySubject) {
        return Subjects.find({
          _id: librarySubject.subjectId
        });
      }
    }, {
      find: function (librarySubject) {
        return Hypervideos.find({
          subjectId: librarySubject.subjectId
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
      return Subjects.find({
        owner: {
          $nin: [userId]
        }
      });
    },
    children: [{
      find: function (subject) {
        return Hypervideos.find({
          subjectId: subject._id
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
      return Subjects.find({
        _id: subjectId
      });
    },
    children: [{
      find: function (subject) {
        return Hypervideos.find({
          subjectId: subject._id
        });
      }
    }]
  };
});
