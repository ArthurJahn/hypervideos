// A logged user is allowed to edit
// all objects that are owned by him.
var userPermissions = {
  insert: function(doc){
    if(doc.owner === this.userId)
      return true;
    else
      return false;
  },
  remove: function(doc){
    if(doc.owner === this.userId)
      return true;
    else
      return false;
  },
  update: function(doc){
    if(doc.owner === this.userId)
      return true;
    else
      return false;
  },
};

var mediaPermissions = {
  insert: function(doc){
    if(doc.owner === this.userId)
      return true;
    else
      return false;
  },
  remove: function(doc){
    if(doc.owner === this.userId)
      return true;
    else
      return false;
  },
  update: function(doc){
    if(doc.owner === this.userId)
      return true;
    else
      return false;
  },
  download: function(doc) {
    return true;
  }
};

Subjects.allow(userPermissions);
Hypervideos.allow(userPermissions);
Subvideos.allow(userPermissions);
Questions.allow(userPermissions);

Videos.allow(mediaPermissions);

LibrarySubjects.allow(userPermissions);
VisitedHypervideos.allow(userPermissions);
