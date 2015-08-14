Subject = Astro.Class({
  name: 'Subject', // Name model.
  collection: Subjects, // Associate collection with the model.
  transform: true, // Auto transform objects fetched from collection.
  fields: {
    name: 'string', // Define the subject's "name".
    hypervideos: 'array', // Define the array of "hypervideos" ids.
    editing: 'boolean',   // Define boolean "editing" to identify if subject is still under edition.
  },
  methods: {
    removeHypervideo: function(hypervideoId) {
      var i = this.hypervideos.indexOf(hypervideoId);
      this.hypervideos.splice(i,1);
      this.save();
    },
    setEditing: function() {
      this.editing = true;
    },
    endEditing: function() {
      this.editing = false;
    }
  },
  behaviors: ['timestamp'] // Add "timestamp" behavior that adds "createdAt" and "updatedAt" fields.
});
