Subject = Astro.Class({
  name: 'Subject', // Name model.
  collection: Subjects, // Associate collection with the model.
  transform: true, // Auto transform objects fetched from collection.
  fields: {
    name: 'string', // Define "name" field of String type.
    hypervideos: 'array', // Define "hypervideos" of Array type.
  },
  methods: { // Define few methods.

  },
  behaviors: ['timestamp'] // Add "timestamp" behavior that adds "createdAt" and "updatedAt" fields.
});
