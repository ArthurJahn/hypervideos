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
      hypervideo.subvideos = [];
      hypervideo.connections = [];
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
    addSubvideo: function(x,y,mediaId,name) {
      var subvideo = subvideoController.createSubvideo(x, y, mediaId, name);
      subvideo.hypervideoId = hypervideo._id;
      hypervideo.addSubvideo(subvideo._id);
      return subvideo;
    },
    removeSubvideo: function (subvideo) {
      hypervideo.removeHypervideo(subvideo._id);
      subvideoController.removeSubvideo(subvideo);
    },
  };
})();

hypervideoController = new HypervideoController();
