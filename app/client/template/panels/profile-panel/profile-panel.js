Template.profilePanel.helpers({
  counter: function () {
    return Session.get('counter');
  },
  show: function () {
    return Session.get('activePanel') === '1';
  }
});

Template.profilePanel.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
