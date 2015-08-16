Subject = Astro.Class({
  name: 'Subject', // Name model.
  collection: Subjects, // Associate collection with the model.
  transform: true, // Auto transform objects fetched from collection.
  fields: {
    name: 'string', // Define the subject's "name".
    hypervideos: 'array', // Define the array of "hypervideos" ids.
    connections: 'array',
    editing: 'boolean',   // Define boolean "editing" to identify if subject is still under edition.
  },
  methods: {
    addHypervideo: function(hypervideoId) {
      this.hypervideos.push(hypervideoId);
    },
    removeHypervideo: function(hypervideoId) {
      this.removeConnections(hypervideoId);
      var i = this.hypervideos.indexOf(hypervideoId);
      this.hypervideos.splice(i,1);
    },
    setEditing: function() {
      this.editing = true;
    },
    endEditing: function() {
      this.editing = false;
    },
    hasConnection: function(conn) {
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
    addConnection: function(conn) {
      if(this.hasConnection(conn)) {
        return false;
      }
      else {
        this.connections.push(conn);
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
    },
    setName: function(newName){
      this.name = newName;
    },
  },
  behaviors: ['timestamp'] // Add "timestamp" behavior that adds "createdAt" and "updatedAt" fields.
});
