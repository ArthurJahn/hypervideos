LibrarySubjects = new Mongo.Collection('libsubjects');

LibrarySubject = Astro.Class({
  name: 'LibrarySubject',
  collection: LibrarySubjects,
  fields: {

    // related user id, not the
    // owner reference, only
    // the one that's watching
    // the related subject
    userId: {
      type: 'string',
      validator: Validators.required(),
    },

    // related subject id
    subjectId: {
      type: 'string',
      validator: Validators.required(),
    },

    // percentual of completion
    // of the related subject
    completed: {
      type: 'number',
      default: 0
    },

    // this class has a unique id
    // based on the concatenation
    // of the user and subject ids
    _id: {
      type: 'string',
      validator: Validators.unique(),
    }
  },
  methods: {

    // get all hypervideos that the
    // user has already visited
    visitedHypervideos: function () {
      return VisitedHypervideo.fund({
        librarySubjectId: this._id
      }).fetch();
    },

    // generate id based on the concatenation
    // of related user and subject ids
    generateId: function () {
      this._id = (Meteor.userId() + this.subjectId);
    },

    // brings the indicated hypervideos
    // based on QRN theory
    indicatedHypervideos: function () {
      // this method must use the 3 coeficients
      // needed to calculate the final distances
      // between hypervideos. The three closest to
      // current user's hypervideo are selected as
      // indicated nodes to be visited subsequently
    }
  },
  behaviors: ['timestamp']
});

// server side methods defined
// by user library subjects
Meteor.methods({

});
