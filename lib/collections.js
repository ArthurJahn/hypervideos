Subjects = new Mongo.Collection('subjects');

Hypervideos = new Mongo.Collection('hypervideos');

Subvideos = new Mongo.Collection('subvideos');

Questions = new Mongo.Collection('questions');
Questions.defaultName = 'Nova Questão';

FS.config.uploadChunkSize = 100000; // 100 KB
Videos = new FS.Collection("videos", {
 stores: [new FS.Store.GridFS("videosfs")],
 filter: {
   maxSize: 100000000, // 100 MB
   onInvalid: function(msg) {
     console.log(msg);
   }
 }
});
