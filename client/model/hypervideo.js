Hypervideo = Astro.Class({
  name: 'Hypervideo',
  collection: Hypervideos,
  fields: {
    name:{
      type: 'string',
      default: 'Novo Hypervideo',
    },
    subjectId: 'string',
    subvideos: {
      type: 'array',
      default: function() {
        return [];
      }
    },
    questions: {
      type: 'array',
      default: function() {
        return [];
      }
    },
    connections: {
      type: 'array',
      default: function() {
        return [];
      }
    },
    col: 'number',
    row: 'number'
  },
  methods: {
    move: function(col,row) {
      this.col = col;
      this.row = row;
    },
    subvideos: function() {
      return Subvideo.find({hypervideoId: this._id}).fetch();
    },
    questions: function() {
      return Question.find({hypervideoId: this._id}).fetch();
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
  behaviors: ['timestamp']
});
