Hypervideo = Astro.Class({
  name: 'Hypervideo',
  collection: Hypervideos,
  fields: {
    owner: {
      type: 'string',
    },
    subjectId: 'string',
    name:{
      type: 'string',
      default: 'Novo Hypervideo',
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
        this.push('connections',conn);
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
      this.set('connections', newConnections);
      this.save();
    },
    removeConnection: function(connection) {
      var compConn = this.pop('connections',1);
      if(compConn !== connection) {
        this.push('connections',compConn);
      }
      this.save();
      return true;
    },
    setName: function(newName) {
      this.set('name', newName);
      this.save();
    },
    //private methods
    _hasConnection: function(conn) {
      for (var i=0;i< this.connections.length; i++) {
        var compConn = this.connections[i];
        console.log(compConn);
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
