Hypervideo = Astro.class({
  name: 'Hypervideo', // Name model.
  collection: Hypervideos, // Associate collection with the model.
  transform: true, // Auto transform objects fetched from collection.
  fields: {
    title: 'string', // Define "title" field of String type.
    subvideos: 'array', // Define "subvideos" of Array type.
    connections: 'array'
  },
  methods: { // Define few methods.
    disconnect: function(hypervideoId) {
      var i = connections.indexOf(hypervideoId);
      connections.splice(i,1);
    },
    connect: function(hypervideoId) {
      connections.push(hypervideoId);
    }
  },
  behaviors: ['timestamp'] // Add "timestamp" behavior that adds "createdAt" and "updatedAt" fields.
});
