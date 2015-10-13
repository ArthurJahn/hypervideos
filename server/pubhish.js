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
                return Subvideos.find({ hypervideoId: hypervideo._id });
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
