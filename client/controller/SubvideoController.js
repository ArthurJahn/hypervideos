function SubvideoController() {}

SubvideoController.prototype = (function () {
  var subvideo = null;

  return {
    constructor:SubvideoController,

    createSubvideo: function( x, y, mediaId, name) {
      subvideo = new Subvideo();
      subvideo.name = name || Subvideos.defaultName;
      subvideo.x = x;
      subvideo.y = y;
      subvideo.videoId = mediaId;
      subvideo.save();
      return subvideo;
    },
    saveSubvideo: function(subvideoIn) {
      subvideo = subvideoIn;
      subvideo.save();
    },
    removeSubvideo: function(subvideoIn) {
      subvideo = subvideoIn;
      subvideo.remove();
    },
  };
})();

subvideoController = new SubvideoController();
