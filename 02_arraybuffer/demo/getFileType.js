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
        uint8Array[0] === 0xff &&
        uint8Array[1] === 0xd8 &&
        uint8Array[len - 2] === 0xff &&
        uint8Array[len - 1] === 0xd9
      ) {
        return "jpeg";
      }
    },
    gif: function (uint8Array) {
      var magicNumber = ["G", "I", "F", "8", "9", "a"];
      var magicNumber2 = ["G", "I", "F", "8", "7", "a"];
      var j = 0;
      var l = magicNumber.length;

      for (var i = 0, len = uint8Array.length; i < len; i++) {
        var number = uint8Array[i];
        var char = toChar(number);
        if (char === magicNumber[j] || char === magicNumber2[j]) {
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
      var magicNumber = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
      var len = magicNumber.length;
      var b = true;
      for (var i = 0; i < len; i++) {
        var number = uint8Array[i];
        if (number !== magicNumber[i]) {
          b = false;
          break;
        }
      }
      if (b) {
        return "png";
      }
    },
  };

  function toChar(number) {
    return String.fromCharCode(number);
  }

  return getFileType;
})();
