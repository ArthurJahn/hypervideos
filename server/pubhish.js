// REMOVE ME - only for tests
Meteor.startup(function () {
  if (Subjects.find().count() !== 0) {
    Subjects.remove({});
    Hypervideos.remove({});
    Videos.remove({});
    Subvideos.remove({});
    Questions.remove({});
  }
});

// Get all Subject content: Hypervideos, subvideos, questions and videos
// necessery when editing a subject.
Meteor.publishComposite('fullSubject', function(subjectId) {
  return {
    find: function() {
      return Subjects.find({ _id: subjectId });
    },
    children: [
      {
        find: function(subject) {
          return Hypervideos.find({ subjectId: subject._id });
        },
        children: [
          {
            find: function(hypervideo, subject) {
              return Subvideos.find({ hypervideoId: hypervideo._id },{sort:{col: -1, row: -1 }});
            }
          },
          {
            find: function(hypervideo, subject) {
              return Questions.find({ hypervideoId: hypervideo._id });
            }
          },
          {
            find: function(hypervideo, subject) {
              return  Videos.find({ hypervideoId: hypervideo._id });
            }
          },
        ]
      }
    ]
  };
});

// Get all  logged user's subjects,
// Necessary when listing subjects preview
Meteor.publishComposite('userSubjects', function(userId) {
  return {
    find: function() {
      return Subjects.find({ owner: userId });
    },
    children: [
      {
        find: function(subject) {
          return Hypervideos.find({ subjectId: subject._id });
        }
      }
    ]
  };
});

// Get all hypervideo content: questions, subvideos and videos
// necessary when watching a hypervideo
Meteor.publishComposite('fullHypervideo', function(hypervideoId) {
  return {
    find: function() {
      return Hypervideos.find({ _id: hypervideoId });
    },
    children: [
      {
        find: function(hypervideo) {
          return Subvideos.find({ hypervideoId: hypervideo._id },{sort:{col: -1, row: -1 }});
        }
      },
      {
        find: function(hypervideo) {
          return Questions.find({ hypervideoId: hypervideo._id });
        }
      },
      {
        find: function(hypervideo) {
          return  Videos.find({ hypervideoId: hypervideo._id });
        }
      },
    ]
  };
});
