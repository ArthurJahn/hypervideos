function HypervideoController() {}

HypervideoController.prototype = (function () {
  var hypervideo = null;

  return {
    constructor:HypervideoController,

    createHypervideo: function(subjectId, x, y) {
      hypervideo = new Hypervideo();
      hypervideo.name = Hypervideos.defaultName;
      hypervideo.x = x;
      hypervideo.y = y;
      hypervideo.subjectId = subjectId;
      hypervideo.save();
      return hypervideo;
    },
    saveHypervideo: function(hypervideoIn) {
      hypervideo = hypervideoIn;
      hypervideo.save();
    },
    removeHypervideo: function(hypervideoIn) {
      hypervideo = hypervideoIn;
      hypervideo.remove();
    },
    removeConnection: function(conn) {
      hypervideo.removeConnection(conn);
    },
  };
})();

hypervideoController = new HypervideoController();
