Question = Astro.Class({
  name: 'Question',
  collection: Questions,
  fields: {
    name: 'string',
    hypervideoId: 'string',
    description: 'string',
    answers: 'array',
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
