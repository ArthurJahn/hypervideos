VisitedHypervideos = new Mongo.Collection('visitednodes');

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
      validator: [
        Validators.required(),
        Validators.unique()
      ]
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

    // user question's answers collected from
    // specified hypervideo
    answers: {
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
      return evaluation.findOne({visitedHypervideoId: this._id});
    },

    addWatchedSubvideo: function (subvideoId) {
      this.pull('subvideos', subvideoId);
      this.push('subvideos', subvideoId);
    },

    addQuestion: function (questionId, answer) {
      var answers = this.answers;
      var i = this.questions.indexOf(questionId);
      this.pull('questions', questionId);
      this.push('questions', questionId);
      if (i !== -1) {
        answers.splice(i, 1);
      }
      answers.push(answer);
      this.set('answers', answers);
    }
  },
  behaviors: ['timestamp']
});
