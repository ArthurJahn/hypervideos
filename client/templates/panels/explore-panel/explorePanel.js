Template.explorePanel.helpers({
  counter: function () {
    return Session.get('counter');
  },
  show: function () {
    return Session.get('activePanel') === "2";
  }
});

Template.explorePanel.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});
