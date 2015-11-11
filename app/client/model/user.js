User = Astro.Class({
  name: 'User',
  collection: Meteor.users,
  fields: {
    username: {
      type: 'string',
    },
    emails: {
      type: 'array',
    },
    level: {
      type: 'number',
      default: 1,
      validator: Validators.choice([1, 2, 3, 4, 5])
    },
  },
  methods: {
    library: function () {
      LibrarySubject.find({
        userId: this._id
      }).fetch();
    }
  },
  behaviors: ['timestamp']
});
