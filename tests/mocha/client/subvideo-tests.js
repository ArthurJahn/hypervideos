if(typeof MochaWeb !== 'undefined') {

  MochaWeb.testOnly(function(){

    describe("Subvideo", function(){

      beforeEach(function(done) {
        Subvideo.find().fetch().forEach(function(subvideo) {
          subvideo.remove();
        });
        done();
      });

      it("should create a subvideo", function() {
        var subvideo = new Subvideo({
          owner: '1',
          hypervideoId: '1',
          mediaId: '1',
          x: 1, y: 2
        });

        chai.assert.isTrue(subvideo._isNew);
        chai.assert.isTrue(subvideo.validate());

        subvideo.save();

        chai.assert.isFalse(subvideo._isNew);
      });

      it("should find no subvideos", function() {
        var length = Subvideo.find({owner:'1'}).fetch().length;
        chai.assert.equal(length, 0);
      });

      it("should move subvideo to new postition", function() {
        var subvideo = new Subvideo({
          owner: '1',
          hypervideoId: '1',
          mediaId: '1',
          x: 1, y: 2
        });

        subvideo.move(3,4);
        chai.assert.equal(subvideo.x, 3);
        chai.assert.equal(subvideo.y, 4);
      });

      it("should return subvideo media", function(){
        var media = {
          name: "video name",
          size: 14876423,
          type: "video/mp4"
        };
        var file = new FS.File();
        file.original = media;
        var id = Videos.insert(file);

        var subvideo = new Subvideo({
          owner: '1',
          hypervideoId: '1',
          mediaId: file._id,
          x: 1, y: 2
        });
        chai.assert.deepEqual(subvideo.media().original, media);
      });

    });
  });
};
