Subjects = new Mongo.Collection('subjects');
// Calculate a default name for a subject in the form of 'Nome do Curso 1'
Subjects.defaultName = function() {
  var subjectName = 'Nome do Curso ' + Subjects.find().count();
  return subjectName;
};

Hypervideos = new Mongo.Collection('hypervideos');
Hypervideos.defaultName = function() {
  var hypervideoName = 'Nome do Hypervideo ' + Hypervideos.find().count();
  return hypervideoName;
};

Subvideos = new Mongo.Collection('subvideos');
Subvideos.defaultName = function() {
  var subvideoName = 'Nome do subvideo ' + Subvideos.find().count();
  return subvideoName;
};
