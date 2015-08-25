Meteor.startup(function () {
  // FIX ME - only for tests
  // code to run on server at startup
  if (Subjects.find().count() !== 0) {
    Subjects.remove({});
    Hypervideos.remove({});
    Videos.remove({});
  }
  });
  Videos.deny({
    insert: function(){
      return false;
    },
    update: function(){
      return false;
    },
    remove: function(){
      return false;
    },
    download: function(){
      return false;
    }
  });

  Videos.allow({
    insert: function(){
      return true;
    },
    update: function(){
      return true;
    },
    remove: function(){
      return true;
    },
    download: function(){
      return true;
    }
  });
