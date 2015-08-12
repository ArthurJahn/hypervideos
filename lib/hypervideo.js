Hypervideo = Astro.Class({
  name: 'Hypervideo', // Name model.
  collection: Hypervideos, // Associate collection with the model.
  transform: true, // Auto transform objects fetched from collection.
  fields: {
    name: 'string', // Define "title" field of String type.
    subvideos: 'array', // Define "subvideos" of Array type.
    connections: 'array',
    x: 'number',
    y: 'number'
  },
  methods: { // Define few methods.
    disconnect: function(hypervideoId) {
      var i = this.connections.indexOf(hypervideoId);
      this.connections.splice(i,1);
    },
    connect: function(hypervideoId) {
      this.connections.push(hypervideoId);
    },
    move: function(x,y) {
      this.x = x;
      this.y = y;
    }
  },
  behaviors: ['timestamp'] // Add "timestamp" behavior that adds "createdAt" and "updatedAt" fields.
});
