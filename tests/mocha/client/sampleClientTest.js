if(typeof MochaWeb !== 'undefined') {
  MochaWeb.testOnly(function(){
    describe("Subject", function(){
      it("should create a subject", function(){
        var subject = new Subject({owner: '1'});
        chai.assert.isTrue(subject._isNew);
      });
    });
  });
}
