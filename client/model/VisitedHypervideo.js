VisitedHypervideo = Astro.Class({
  name: 'VisitedHypervideo',
  collection: VisitedHypervideos,
  fields: {
    librarySubjectId: {
      type: 'string',
      validator: Validators.required(),
    },
    hypervideoId: {
      type: 'string',
      validator: Validators.required(),
    },
    completed: {
      type: 'boolean',
      default: false
    },
    subvideos: {
      type: 'array',
      default: function() {
        return [];
      }
    },
    questions: {
      type: 'array',
      default: function() {
        return [];
      }
    }
  },
  behaviors: ['timestamp']
});
