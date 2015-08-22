Subjects = new Mongo.Collection('subjects');
Subjects.defaultName = 'Novo Curso';

Hypervideos = new Mongo.Collection('hypervideos');
Hypervideos.defaultName = 'Novo Hypervideo';

Subvideos = new Mongo.Collection('subvideos');
Subvideos.defaultName = 'Nome do subvideo';

var videosStore = new FS.Store.GridFS("videos");
Videos = new FS.Collection("videos", {
 stores: [videosStore]
});
