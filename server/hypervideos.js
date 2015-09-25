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

  Meteor.publish('subjects', function () {
      return Subjects.find();
  });

  Subjects.allow({
    insert: function(){
      return true;
    },
    remove: function(){
      return true;
    },
    update: function(){
      return true;
    },
  });

  Meteor.publish('hypervideos', function () {
      return Hypervideos.find();
  });

  Hypervideos.allow({
    insert: function(){
      return true;
    },
    remove: function(){
      return true;
    },
    update: function(){
      return true;
    },
  });

  Meteor.publish('subvideos', function () {
      return Subvideos.find();
  });

  Subvideos.allow({
    insert: function(){
      return true;
    },
    remove: function(){
      return true;
    },
    update: function(){
      return true;
    },
  });

  Meteor.publish('questions', function () {
      return Questions.find();
  });

  Questions.allow({
    insert: function(){
      return true;
    },
    remove: function(){
      return true;
    },
    update: function(){
      return true;
    },
  });


  Meteor.publish('videos', function () {
      return Videos.find();
  });

  Videos.allow({
    insert: function(){
      return true;
    },
    remove: function(){
      return true;
    },
    update: function(){
      return true;
    },
  });
