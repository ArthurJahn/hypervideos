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

  Meteor.publish('questions', function (hypervideoId) {
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

  Meteor.publish('videos', function (hypervideoId) {
    return Videos.find({hypervideoId: hypervideoId});
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
