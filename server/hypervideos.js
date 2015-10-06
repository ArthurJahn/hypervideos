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
    var id = this.userId;
    return Subjects.find({owner:id});
  });

  Subjects.allow({
    insert: function(doc){
      if(doc.owner === this.userId)
        return true;
      else
        return false;
    },
    remove: function(doc){
      if(doc.owner === this.userId)
        return true;
      else
        return false;
    },
    update: function(doc){
      if(doc.owner === this.userId)
        return true;
      else
        return false;
    },
  });

  Meteor.publish('hypervideos', function () {
    var id = this.userId;
    return Hypervideos.find({owner:id});
  });

  Hypervideos.allow({
    insert: function(doc){
      if(doc.owner === this.userId)
        return true;
      else
        return false;
    },
    remove: function(doc){
      if(doc.owner === this.userId)
        return true;
      else
        return false;
    },
    update: function(doc){
      if(doc.owner === this.userId)
        return true;
      else
        return false;
    },
  });

  Meteor.publish('subvideos', function (hypervideoId) {
      return Subvideos.find({hypervideoId: hypervideoId});
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
      return Questions.find({hypervideoId: hypervideoId});
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
