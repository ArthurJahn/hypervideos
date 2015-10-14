User = Astro.Class({
  name: 'User',
  collection: Meteor.users,
  fields: {
    username: {
      type: 'string',
    },
    emails: {
      type: 'array',
    }
  },
  behaviors: ['timestamp']
});
