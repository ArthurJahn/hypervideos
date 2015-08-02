Subjects = new Mongo.Collection('subjects');
// Calculate a default name for a subject in the form of 'Nome do Curso 1'
Subjects.defaultName = function() {
  var subjectName = 'Nome do Curso ' + Subjects.find().count();
  return subjectName;
};

Hypervideos = new Mongo.Collection('hypervideos');
// Calculate a default name for a subject in the form of 'Nome do Hypervideo 1'
Hypervideos.defaultName = function() {
  var hypervideoName = 'Nome do Hypervideo ' + Hypervideos.find().count();
  return hypervideoName;
};
