LibrarySubject = Astro.Class({
  name: 'LibrarySubject',
  collection: LibrarySubjects,
  fields: {
    userId: {
      type: 'string',
      validator: Validators.required(),
    },
    subjectId: {
      type: 'string',
      validator: Validators.required(),
    },
    completed: {
      type: 'number',
      default: 0
    },
    _id: {
      type: 'string',
      validator: Validators.unique(),
    }
  },
  methods: {
    watchedHypervideos: function() {
      return VisitedHypervideo.fund({librarySubjectId: this._id}).fetch();
    },
  },
  behaviors: ['timestamp']
});
