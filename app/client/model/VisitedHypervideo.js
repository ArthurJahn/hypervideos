VisitedHypervideo = Astro.Class({
  name: 'VisitedHypervideo',
  collection: VisitedHypervideos,
  fields: {

    // id that interconnects this visited hypervideo
    // with its subject and user that is watching
    // the subject
    librarySubjectId: {
      type: 'string',
      validator: Validators.required(),
    },

    // hypervideo that has been visited
    // by the user. This represents from witch
    // hypervideo subvideos and questions will
    // be collected to analise subject's completion
    hypervideoId: {
      type: 'string',
      validator: Validators.required(),
    },

    // if all subvideos were watched,
    // this hypervideo is set as completed
    completed: {
      type: 'boolean',
      default: false
    },

    // user watched subvideos collected from
    // specified hypervideo
    subvideos: {
      type: 'array',
      default: function () {
        return [];
      }
    },

    // user answered questions collected from
    // specified hypervideo
    questions: {
      type: 'array',
      default: function () {
        return [];
      }
    },

    // user notes about the content of the
    // watched hypervideo
    notes: {
      type: 'string',
    }
  },
  methods: {
    evaluation: function () {
      //fetch evaluation from database
    },

    addWatchedSubvideo: function (subvideoId) {
      if (this.subvideos.indexOf(subvideoId) !== -1) {
        this.push('subvideos', subvideoId);
        return true;
      }
      return false;
    },
    addAnsweredQuestion: function (questionAnswer) {
      if (questionAnswer.questionId && questionAnswer.answer) {
        if (this.questions.indexOf(questionAnswer) !== -1) {
          this.push('questions', questionAnswer);
          return true;
        }
      }
      return false;
    },
  },
  behaviors: ['timestamp']
});
