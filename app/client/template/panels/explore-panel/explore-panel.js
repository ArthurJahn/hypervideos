var options = {
  keepHistory: 0,
  localSearch: false
};
var fields = ['name'];

SubjectsSearch = new SearchSource('subjects', fields, options);

Template.explorePanel.helpers({
  subjects: function () {
    var subjects =  SubjectsSearch.getData({
      sort: {
        name: -1
      }
    });
    return JSON.stringify(subjects);
  },
  isLoading: function () {
    var loading = SubjectsSearch.getStatus().loading || false;
    return loading;
  }
});

Template.explorePanel.events({
  'get-hypervideos subject-box': function (e, template) {
    var subject = Subject.findOne({
      _id: e.target.subject._id
    });
    e.target.hypervideos = subject.hypervideos();
  },
  'watch-subject subject-box': function (e, template) {
    var subject = e.target.subject;
    Session.set('title', subject.name);
    Session.set('subjectId', subject._id);
    Template.explorePanel.addLibrarySubject(subject._id);
    Router.go('watchSubject', {
      _id: subject._id
    });
  },
  'add-library-subject subject-box': function (e, template) {
    var subject = e.target.subject;
    Template.explorePanel.addLibrarySubject(subject._id);
  },
  'remove-library-subject subject-box': function (e, template) {
    var librarySubject = LibrarySubject.findOne({
      userId: Meteor.userId(),
      subjectId: e.target.subject._id
    });
    librarySubject.remove();
  },
  'search-subjects hyper-search': function (e) {
    var text = e.originalEvent.detail.query;
    SubjectsSearch.search(text);
  }
});

Template.explorePanel.addLibrarySubject = function (subjectId) {
  var librarySubject = LibrarySubject.findOne({subjectId: subjectId});
  if (!librarySubject) {
    librarySubject = new LibrarySubject({
      subjectId: subjectId,
      userId: Meteor.userId(),
    });
    librarySubject.generateId();
    if (librarySubject.validate()) {
      librarySubject.save();
    }
  }
};
