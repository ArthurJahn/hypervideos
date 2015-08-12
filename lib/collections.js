Subjects = new Mongo.Collection('subjects');
// Calculate a default name for a subject in the form of 'Nome do Curso 1'
Subjects.defaultName = 'Novo Curso';

Hypervideos = new Mongo.Collection('hypervideos');
Hypervideos.defaultName = 'Novo Hypervideo';

Subvideos = new Mongo.Collection('subvideos');
Subvideos.defaultName = 'Nome do subvideo';
