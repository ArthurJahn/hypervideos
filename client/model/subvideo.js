Subvideo = Astro.Class({
  name: 'Subvideo',
  collection: Subvideos,
  fields: {
    name: 'string',
    hypervideoId: 'string',
    description: 'string',
    videoId: 'string',
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
