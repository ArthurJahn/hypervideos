//A subject is compound by an undirected graph of hypervideos. It has a name
// and a flag to indicate whether this subject is still under edition or ready
// to be published.

Subject = Astro.createClass({
  name: 'Subject',
  collection: Subjects,
  fields: {
    name: {
      type: 'string',
      default: 'Novo Curso',
    },
    connections: {
      type: 'array',
      default: [],
    },
    editing: {
      type: 'boolean',
      default: true,
    },
  },
  methods: {
    removeHypervideo: function(hypervideoId) {
      this.removeConnections(hypervideoId);
      var hypervideo = Hypervideos.findOne({_id: hypervideoId});
      hypervideo.autoRemove();
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
    hypervideos: function() {
      return Hypervideos.find({subjectId: this._id}).fetch();
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
