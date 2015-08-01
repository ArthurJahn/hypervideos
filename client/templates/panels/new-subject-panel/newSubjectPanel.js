Template.newSubjectPanel.helpers({
  counter: function () {
    return Session.get('counter');
  },
  show: function () {
    return Session.get('activePanel') === "3";
  }
});

Template.newSubjectPanel.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
