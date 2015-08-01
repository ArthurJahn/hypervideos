// counter starts at 0
Session.setDefault('counter', 0);

Template.subjectsPanel.helpers({
  counter: function () {
    return Session.get('counter');
  },
  show: function () {
    return Session.get('activePanel') === "0";
  }
});

Template.subjectsPanel.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
