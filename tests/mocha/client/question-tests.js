if(typeof MochaWeb !== 'undefined') {

  MochaWeb.testOnly(function(){

    describe("question", function(){

      beforeEach(function(done) {
        Question.find().fetch().forEach(function(question) {
          question.remove();
        });
        done();
      });

      it("should create a question", function() {
        var question = new Question({
          owner: '1',
          hypervideoId: '1',
          mediaId: '1',
          x: 1, y: 2
        });

        chai.assert.isTrue(question._isNew);
        chai.assert.isTrue(question.validate());

        question.save();

        chai.assert.isFalse(question._isNew);
      });

      it("should find no questions", function() {
        var length = Question.find({owner:'1'}).fetch().length;
        chai.assert.equal(length, 0);
      });

      it("should move question to new postition", function() {
        var question = new Question({
          owner: '1',
          hypervideoId: '1',
          mediaId: '1',
          x: 1, y: 2
        });

        question.move(3,4);
        chai.assert.equal(question.x, 3);
        chai.assert.equal(question.y, 4);
      });

    });
  });
}
