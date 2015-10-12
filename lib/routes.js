Router.configure({
  layoutTemplate: 'mainMenu',
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'loadingPanel',
});

if (Meteor.isClient) {
  Router.onBeforeAction('loading');
}

Router.map(function() {

  this.route('subjectPanel', {
    path:"/subjectPanel/:_id",
    template: "newSubjectPanel",
    waitOn: function() {
      if (Meteor.user()) {
        if(this.params._id === 'new') {
          this.params._id = Random.id();
        }
        this.subscribe("fullSubject", this.params._id);
      }
    },
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        this.next();
      } else {
        this.render('login');
      }
    },
    action: function () {
      this.render();
    }
  });
  this.route('subjects', {
    template: "subjectsPanel",
    waitOn: function() {
      if (Meteor.user()) {
        if(this.params._id === 'new') {
          this.params._id = Random.id();
        }
        this.subscribe("userSubjects",Meteor.userId());
      }
    },
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        this.next();
      } else {
        this.render('login');
      }
    },
    action: function () {
      this.render();
    }
  });
  this.route('profile', {
    template: "profilePanel",
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        this.next();
      } else {
        this.render('login');
      }
    },
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
    waitOn: function() {
      if (Meteor.user()) {
        this.subscribe("fullSubject", this.params._id);
      }
    },
    onBeforeAction: function (pause) {
      if (Meteor.user()) {
        this.next();
      } else {
        this.render('login');
      }
    },
    action: function() {
      this.render();
    }
  });
});
