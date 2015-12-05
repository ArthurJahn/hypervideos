Hypervideos = new Mongo.Collection('hypervideos');

Hypervideo = Astro.Class({
  name: 'Hypervideo',
  collection: Hypervideos,
  fields: {
    owner: {
      type: 'string',
      validator: Validators.required(),
    },
    subjectId: {
      type: 'string',
      validator: Validators.required(),
    },
    name: {
      type: 'string',
      default: 'Novo Hypervideo',
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
    col: {
      type: 'number',
      validator: Validators.required(),
    },
    row: {
      type: 'number',
      validator: Validators.required(),
    },
  },
  events: {
    beforeremove: function () {
      this.subvideos().forEach(function (subvideo) {
        subvideo.remove();
      });
      this.questions().forEach(function (question) {
        question.remove();
      });
    }
  },
  methods: {
    // verify if the hypervideo
    // is ready to be published.
    ready: function () {
      return (this.subvideos().length > 0);
    },
    move: function (col, row) {
      this.col = col;
      this.row = row;
    },
    subvideos: function () {
      return Subvideo.find({
        hypervideoId: this._id
      }).fetch();
    },
    questions: function () {
      return Question.find({
        hypervideoId: this._id
      }).fetch();
    },
    addConnection: function (conn) {
      if (this._hasConnection(conn) > -1) {
        return false;
      } else {
        this.push('connections', conn);
        this.save();
        return true;
      }
    },
    // given a subvideo _id, remove all of its connections
    // and then, remove the subvideo
    removeSubvideo: function (subvideoId) {
      this.removeConnections(subvideoId);
      var subvideo = Subvideo.findOne({
        _id: subvideoId
      });
      subvideo.remove();
    },
    // given a subvideo _id, remove all of its
    // connections and then, remove the subvideo
    removeQuestion: function (questionId) {
      this.removeConnections(questionId);
      var question = Question.findOne({
        _id: questionId
      });
      question.remove();
    },
    // given a subvideo or question _id,
    // remove all of its connections.
    // Recieves as parameter a nodeId,
    // which represents a question or
    // subvideo _id.
    removeConnections: function (nodeId) {
      var newConnections = [];
      for (var i = 0; i < this.connections.length; i++) {
        var compConn = this.connections[i];
        if (nodeId !== compConn.first &&
          nodeId !== compConn.second) {
          newConnections.push(compConn);
        }
      }
      this.set('connections', newConnections);
      this.save();
    },
    removeConnection: function (connection) {
      var conns = this.connections;
      var i = this._hasConnection(connection);
      if (i !== -1) {
        conns.splice(i, 1);
        this.set('connections', conns);
        this.save();
        return true;
      } else {
        return false;
      }
    },
    setName: function (newName) {
      this.set('name', newName);
      this.save();
    },
    //private methods
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
  behaviors: ['timestamp']
});
