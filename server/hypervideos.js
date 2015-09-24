Meteor.startup(function () {
  // FIX ME - only for tests
  // code to run on server at startup
  if (Subjects.find().count() !== 0) {
    Subjects.remove({});
    Hypervideos.remove({});
    Videos.remove({});
    Subvideos.remove({});
    Questions.remove({});
  }
});

  Videos.deny({
    update: function(){
      return true;
    },
    download: function(){
      return true;
    }
  });

  Videos.allow({
    insert: function(){
      return true;
    },
    remove: function(){
      return true;
    },
  });

  Meteor.publish('subjects', function () {
      return Subjects.find();
  });

  Meteor.publish('hypervideos', function () {
      return Subjects.find();
  });

  Meteor.publish('subvideos', function () {
      return Subjects.find();
  });

  Meteor.publish('questions', function () {
      return Subjects.find();
  });

  Meteor.publish('videos', function () {
      return Subjects.find();
  });
