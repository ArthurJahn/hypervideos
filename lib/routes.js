Router.configure({
  layoutTemplate: 'mainMenu',
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'loadingPanel',
  waitOn: function() {
    return [
      Meteor.subscribe("hypervideos"),
      Meteor.subscribe("videos"),
      Meteor.subscribe("questions"),
      Meteor.subscribe("subjects"),
      Meteor.subscribe("subvideos")
    ];
  }
});

if (Meteor.isClient) {
  Router.onBeforeAction('loading');
}

Router.map(function() {

  this.route('newSubject', {
    template: "newSubjectPanel",
    action: function () {
      this.render();
    }
  });
  this.route('subjects', {
    template: "subjectsPanel",
    action: function () {
      this.render();
    }
  });
  this.route('profile', {
    template: "profilePanel",
    action: function () {
      this.render();
    }
  });
  this.route('home', {
    path: "/",
    template: "explorePanel",
    action: function() {
      this.render();
    }
  });
  this.route('watchSubject', {
    path: '/subject/:_id',
    data: function() {
      Subjects.findOne(this.params._id);
    },
    action: function() {
      this.render();
    }
  });
});
