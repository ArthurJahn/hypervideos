// counter starts at 0
Session.setDefault('counter', 0);

Template.subjectsPanel.helpers({
  counter: function () {
    return Session.get('counter');
  },
  show: function () {
    return Session.get('activePanel') === "0";
  },
  subjects: function () {
    return subjectController.subjects();
  }
});

Template.subjectsPanel.events({
  'get-hypervideos subject-box': function (e, template) {
    var list = hypervideoController.getByIds(e.target.subject.hypervideos);
    e.target.hypervideos = list;
  }
});
