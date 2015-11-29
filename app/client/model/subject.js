//A subject is compound by an undirected graph of hypervideos. It has a name
// and a flag to indicate whether this subject is still under edition or ready
// to be published.

Subject = Astro.createClass({
  name: 'Subject',
  collection: Subjects,
  fields: {
    owner: {
      type: 'string',
      validator: Validators.required(),
    },
    name: {
      type: 'string',
      default: 'Novo Curso',
      validator: Validators.and([
        Validators.required('O nome não pode ser vazio'),
        Validators.string(),
        Validators.minLength(5, 'Nome muito curto')
      ])
    },
    connections: {
      type: 'array',
      default: function () {
        return [];
      }
    },
    editing: {
      type: 'boolean',
      default: true,
      validator: Validators.and([
        Validators.required(),
        Validators.boolean()
      ])
    },
  },
  events: {
    beforeremove: function () {
      var self = this;
      self.hypervideos().forEach(function (hypervideo) {
        self.removeConnections(hypervideo._id);
      });
    }
  },
  methods: {
    // returns the list of hypervideos
    //  that belongs to this subject
    hypervideos: function () {
      return Hypervideos.find({
        subjectId: this._id
      }).fetch();
    },
    // given a hypervideo _id, remove all of its connections
    // and then, remove the hypervideo
    removeHypervideo: function (hypervideoId) {
      this.removeConnections(hypervideoId);
      var hypervideo = Hypervideo.findOne({
        _id: hypervideoId
      });
      hypervideo.remove();
    },
    // when set as editing, a subject is not publishe yet,
    // so it cannot be found by general users, only its owner
    setEditing: function (editing) {
      this.set('editing', editing);
      if (this.validate()) {
        this.save();
      }
    },
    // Add a connection between two hypervideos
    addConnection: function (conn) {
      if (this._hasConnection(conn) > -1) {
        return false;
      } else {
        this.push('connections', conn);
        if (this.validate()) {
          this.save();
        }
        return true;
      }
    },
    // Remove a connection from subject
    removeConnection: function (connection) {
      var conns = this.connections;
      var i = this._hasConnection(connection);
      if (i !== -1) {
        conns.splice(i,1);
        this.set('connections', conns);
        this.save();
        return true;
      } else {
        return false;
      }
    },
    // Remove all connections with a specified
    // Hypervideo by passing its id
    removeConnections: function (hypervideoId) {
      var newConnections = [];
      for (var i = 0; i < this.connections.length; i++) {
        var compConn = this.connections[i];
        if (hypervideoId !== compConn.first &&
          hypervideoId !== compConn.second) {
          newConnections.push(compConn);
        }
      }
      this.set('connections', newConnections);
      this.save();
    },
    setName: function (newName) {
      this.set('name', newName);
      if (this.validate()) {
        this.save();
      }
    },
    //============================ PRIVATE METHODS ===========================//
    // verify existing connection in
    // subject connections list
    _hasConnection: function (conn) {
      for (var i = 0; i < this.connections.length; i++) {
        var compConn = this.connections[i];
        if ((conn.first === compConn.first &&
            conn.second === compConn.second) ||
          (conn.second === compConn.first &&
            conn.first === compConn.second)) {
          return i;
        }
      }
      return -1;
    },
  },
  // Add 'timestamp' behavior that adds 'createdAt' and 'updatedAt' fields.
  behaviors: ['timestamp']
});
