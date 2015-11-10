if (typeof MochaWeb !== 'undefined') {

  MochaWeb.testOnly(function () {

    describe('Subject', function () {

      beforeEach(function (done) {
        Subject.find().fetch().forEach(function (subject) {
          subject.remove();
        });
        done();
      });

      it('should create a subject', function () {
        var subject = new Subject({
          owner: '1'
        });
        chai.assert.isTrue(subject._isNew);
        chai.assert.isTrue(subject.validate());
        subject.save();
        chai.assert.isFalse(subject._isNew);
      });

      it('should find no subjects', function () {
        var length = Subject.find({
          owner: '1'
        }).fetch().length;
        chai.assert.equal(length, 0);
      });

      it('should set subject name', function () {
        var subject = new Subject({
          owner: '1'
        });
        subject.setName('new name');
        chai.assert.equal(subject.name, 'new name');
      });

      it('should be enabled subject editing mode', function () {
        var subject = new Subject({
          owner: '1'
        });
        chai.assert.isTrue(subject.editing);
      });

      it('should disable subject editing mode', function () {
        var subject = new Subject({
          owner: '1'
        });
        subject.setEditing(false);
        chai.assert.isFalse(subject.editing);
      });

      it('should add a connection to subject', function () {
        var subject = new Subject({
          owner: '1'
        });
        var conn = {
          first: '1',
          second: '2'
        };

        chai.assert.isTrue(subject.addConnection(conn));
      });

      it('should fail to add a connection to subject', function () {
        var subject = new Subject({
          owner: '1'
        });
        var conn = {
          first: '1',
          second: '2'
        };
        subject.addConnection(conn);
        chai.assert.isFalse(subject.addConnection(conn));
      });

      it('should remove a connection from subject', function () {
        var subject = new Subject({
          owner: '1'
        });
        var conn = {
          first: '1',
          second: '2'
        };
        subject.addConnection(conn);
        chai.assert.isTrue(subject.removeConnection(conn));
      });

      it('should fail to remove a connection from subject', function () {
        var subject = new Subject({
          owner: '1'
        });
        var conn = {
          first: '1',
          second: '2'
        };
        chai.assert.isFalse(subject.removeConnection(conn));
      });

      it('should remove all connections by hypervideo id', function () {
        var subject = new Subject({
          owner: '1'
        });

        var conn = {
          first: '1',
          second: '2'
        };
        var conn2 = {
          first: '1',
          second: '4'
        };
        var conn3 = {
          first: '2',
          second: '4'
        };

        subject.addConnection(conn);
        subject.addConnection(conn2);
        subject.addConnection(conn3);

        subject.removeConnections('1');

        chai.assert.deepEqual(subject.connections[0], conn3);
      });

      it('should return hypervideos list', function () {
        var subject = new Subject({
          owner: '1'
        });
        subject.save();
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: subject._id
        });
        hypervideo.save();

        chai.assert.deepEqual(subject.hypervideos()[0], hypervideo);
      });

      it('should remove hypervideo and its connections', function () {
        var subject = new Subject({
          owner: '1'
        });
        subject.save();
        var hypervideo = new Hypervideo({
          owner: '1',
          subjectId: subject._id
        });
        hypervideo.save();

        subject.addConnection({
          first: hypervideo._id,
          second: '2'
        });
        subject.removeHypervideo(hypervideo._id);

        chai.assert.equal(subject.hypervideos().length, 0);
        chai.assert.equal(subject.connections.length, 0);
      });

    });
  });
}
