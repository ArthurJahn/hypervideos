Evaluations = new Mongo.Collection('evaluations');

Evaluation = Astro.Class({
  name: 'Evaluation',
  collection: Evaluations,
  fields: {

    // id that interconnects the visited hypervideo
    // with its evaluation for each user
    visitedHypervideoId: {
      type: 'string',
      validator: Validators.required(),
    },

    // value of the direct score obtained by the user
    directScore: {
      type: 'number',
      default: '10',
      validator: Validators.and([
        Validators.minLength(0),
        Validators.maxLength(10)
      ])
    },

    // value of the direct reliability obtained by the user
    directReliability: {
      type: 'number',
      default: '7',
      validator: Validators.and([
        Validators.minLength(0),
        Validators.maxLength(10)
      ])
    },

    // value of the indirect score calculated by the QRN
    indirectScore: {
      type: 'number',
      default: '10',
      validator: Validators.and([
        Validators.minLength(0),
        Validators.maxLength(10)
      ])
    },

    // value of the indirect reliability calculated by the QRN
    indirectReliability: {
      type: 'number',
      default: '10',
      validator: Validators.and([
        Validators.minLength(0),
        Validators.maxLength(10)
      ])
    }
  },

  methods: {
    calculateScore: function () {
      //calculate direct and indirect scores
    },
    calculateReliability: function () {
      //calculate direct and indirect reliabilitys
    },
  },
  behaviors: ['timestamp']
});

// server side methods defined
// for the evaluation class
Meteor.methods({

  // calculate direct and
  // indirect user score
  calculateScore: function (doc) {
    // calculus of QRN scores must be defined here...
    doc.directScore = 7;
    doc.indirectScore = 8;
  },
  calculateReliability: function (doc) {
    // calculus of QRN reliability must be defined here...
    doc.directReliability = 7;
    doc.indirectReliability = 4;
  }

});
