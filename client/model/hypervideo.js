Hypervideo = Astro.Class({
  name: 'Hypervideo', // Name model.
  collection: Hypervideos, // Associate collection with the model.
  transform: true, // Auto transform objects fetched from collection.
  fields: {
    name: 'string', // Define "title" field of String type.
    subjectId: 'string', //Define subject that contains this hypervideo
    subvideos: 'array', // Define "subvideos" of Array type.
    questions: 'array', // Define "questions" of Array type.
    connections: 'array',
    col: 'number',
    row: 'number'
  },
  methods: { // Define few methods.
    move: function(col,row) {
      this.col = col;
      this.row = row;
    },
    addSubvideo: function(subvideoId) {
      this.subvideos.push(subvideoId);
      this.save();
    },
    removeSubvideo: function(subvideoId) {
      this.removeConnections(subvideoId);
      var i = this.subvideos.indexOf(subvideoId);
      if(i) {
        this.subvideos.splice(i,1);
        this.save();
      }
    },
    addQuestion: function(questionId) {
      this.questions.push(questionId);
      this.save();
    },
    removeQuestion: function(questionId) {
      this.removeConnections(questionId);
      var i = this.questions.indexOf(questionId);
      if(i) {
        this.questions.splice(i,1);
        this.save();
      }
    },
    addConnection: function(conn) {
      if(this._hasConnection(conn)) {
        return false;
      }
      else {
        this.connections.push(conn);
        this.save();
        return true;
      }
    },
    removeConnections: function(subvideoId) {
      var newConnections = [];
      for (var i=0;i< this.connections.length; i++) {
        var compConn = this.connections[i];
        if (subvideoId !== compConn.first &&
            subvideoId !== compConn.second) {
          newConnections.push(compConn);
        }
      }
      this.connections = newConnections;
      this.save();
    },
    removeConnection: function(connection) {
      var connId = this.connections.indexOf(connection);
      if(connId) {
        this.connections.splice(connId,1);
        this.save();
      }
    },
    setName: function(newName){
      this.name = newName;
      this.save();
    },
    //private methods
    _hasConnection: function(conn) {
      for (var i=0;i< this.connections.length; i++) {
        var compConn = this.connections[i];
        if ((conn.first === compConn.first &&
            conn.second === compConn.second) ||
           (conn.second === compConn.first &&
             conn.first === compConn.second)) {
          return true;
        }
      }
      return false;
    },
  },
  behaviors: ['timestamp'] // Add "timestamp" behavior that adds "createdAt" and "updatedAt" fields.
});
