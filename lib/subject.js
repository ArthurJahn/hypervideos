//A subject is compound by an undirected graph of hypervideos. It has a name
// and a flag to indicate whether this subject is still under edition or ready
// to be published.

Subject = Astro.Class({
  name: 'Subject',        // Name model.
  collection: Subjects,   // Associate collection with the model.
  transform: true,        // Auto transform objects fetched from collection.
  fields: {
    name: 'string',       // Define the subject's "name".
    hypervideos: 'array', // Define the array of "hypervideos" ids.
    connections: 'array', // Define the connections between hypervideos.
    editing: 'boolean',   // To identify if the subject is still under edition.
  },
  methods: {
    addHypervideo: function(hypervideoId) {
      this.hypervideos.push(hypervideoId);
      this.save();
    },
    removeHypervideo: function(hypervideoId) {
      this.removeConnections(hypervideoId);
      var i = this.hypervideos.indexOf(hypervideoId);
      if(i) {
        this.hypervideos.splice(i,1);
        this.save();
      }
    },
    setEditing: function() {
      this.editing = true;
      this.save();
    },
    endEditing: function() {
      this.editing = false;
      this.save();
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
    removeConnections: function(hypervideoId) {
      var newConnections = [];
      for (var i=0;i< this.connections.length; i++) {
        var compConn = this.connections[i];
        if (hypervideoId !== compConn.first &&
            hypervideoId !== compConn.second) {
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
  // Add "timestamp" behavior that adds "createdAt" and "updatedAt" fields.
  behaviors: ['timestamp']
});
