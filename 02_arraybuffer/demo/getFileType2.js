var getFileType = (function () {
  function getFileType(arrayBuffer) {
    var uint8Array = new Uint8Array(arrayBuffer);
    var keys = Object.keys(fileType);
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      var func = fileType[key];
      var type = func(uint8Array);
      if (typeof type === "string") {
        return type;
      }
    }
  }

  var fileType = {
    jpeg: function (uint8Array) {
      var len = uint8Array.length;
      if (
        uint8Array[0] === 255 &&
        uint8Array[1] === 216 &&
        uint8Array[len - 2] === 255 &&
        uint8Array[len - 1] === 217
      ) {
        return "jpeg";
      }
    },
    gif: function (uint8Array) {
      var magicNumber = [71, 73, 70, 56, 57, 97];
      var magicNumber2 = [71, 73, 70, 56, 55, 97];
      var j = 0;
      var l = magicNumber.length;

      for (var i = 0, len = uint8Array.length; i < len; i++) {
        var number = uint8Array[i];
        if (number === magicNumber[j] || number === magicNumber2[j]) {
          j += 1;
        } else {
          j = 0;
        }

        if (j === l) {
          return "gif";
        }
      }
    },
    png: function (uint8Array) {
      var magicNumber = [137, 80, 78, 71, 13, 10, 26, 10];
      var len = magicNumber.length;
      var b = true;
      for (var i = 0; i < len; i++) {
        if (uint8Array[i] !== magicNumber[i]) {
          b = false;
          break;
        }
      }
      if (b) {
        return "png";
      }
    },
  };

  return getFileType;
})();
