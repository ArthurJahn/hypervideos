if (typeof MochaWeb !== 'undefined'){
  MochaWeb.testOnly(function(){
    describe("Server initialization", function(){
      it("should have no subjects after server start", function(){
        chai.assert(Subjects.find().count()===0);
      });
      it("should have no hypervideos after server start", function(){
        chai.assert(Hypervideos.find().count()===0);
      });
      it("should have no subvideos after server start", function(){
        chai.assert(Subvideos.find().count()===0);
      });
      it("should have no questions after server start", function(){
        chai.assert(Questions.find().count()===0);
      });
      it("should have no videos after server start", function(){
        chai.assert(Videos.find().count()===0);
      });
    });
  });
}
