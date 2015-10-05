Subvideo = Astro.Class({
  name: 'Subvideo',
  collection: Subvideos,
  fields: {
    owner: {
      type: 'string',
    },
    name: 'string',
    hypervideoId: 'string',
    mediaId: 'string',
    description: 'string',
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
