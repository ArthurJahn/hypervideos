// counter starts at 0
Session.setDefault('counter', 0);

Template.content.helpers({
  counter: function () {
    return Session.get('counter');
  }
});

Template.content.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
