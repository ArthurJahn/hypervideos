Subjects = new Mongo.Collection('subjects');

Hypervideos = new Mongo.Collection('hypervideos');

Subvideos = new Mongo.Collection('subvideos');

Questions = new Mongo.Collection('questions');

VidStore = new FS.Store.GridFS('medias', {
  path: '~/Documents/git/hypervideos/uploads/medias'
});
Videos = new FS.Collection('videos', {
  stores: [VidStore],
  filter: {
    maxSize: 100000000, // 100 MB
    onInvalid: function (msg) {
      document.querySelector('#notify').message = msg;
    }
  }
});
FS.config.uploadChunkSize = 100000; // 100 KB

LibrarySubjects = new Mongo.Collection('libsubjects');

VisitedHypervideos = new Mongo.Collection('visitednodes');

Evaluations = new Mongo.Collection('evaluations');
