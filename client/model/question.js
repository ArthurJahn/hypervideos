Question = Astro.Class({
  name: 'Question',
  collection: Questions,
  fields: {
    name: {
      type: 'string',
      default: 'Novo subvideo',
    },
    hypervideoId: 'string',
    description: {
      type: 'string',
      default: 'Enunciado da questão',
    },
    answers: {
      type: 'array',
      default: function() {
        return [];
      },
    },
    x: 'number',
    y: 'number'
  },
  methods: {
    move: function(x,y) {
      this.x = x;
      this.y = y;
    }
  },
  behaviors: ['timestamp']
});
