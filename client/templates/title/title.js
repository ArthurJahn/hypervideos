// counter starts at 0
Session.setDefault('counter', 0);

Template.title.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.title.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
