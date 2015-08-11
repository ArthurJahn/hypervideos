Template.newSubjectPanel.helpers({
  saveSubject: function (subject) {
    return subjects.insert(subject);
  },
  show: function () {
    return Session.get('activePanel') === "3";
  },
  createHypervideo: function (subject_id){

  }
});

Template.newSubjectPanel.events({
});
