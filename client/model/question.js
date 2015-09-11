Question = Astro.Class({
  name: 'Question', // Name model.
  collection: Questions, // Associate collection with the model.
  transform: true, // Auto transform objects fetched from collection.
  fields: {
    name: 'string', // Define "title" field of String type.
    hypervideoId: 'string', // Define subject that contains this subvideo
    description: 'string',  // Define subvideo description
    answers: 'array',
    x: 'number',
    y: 'number'
  },
  methods: { // Define few methods.
    move: function(x,y) {
      this.x = x;
      this.y = y;
    }
  },
  behaviors: ['timestamp'] // Add "timestamp" behavior that adds "createdAt" and "updatedAt" fields.
});
