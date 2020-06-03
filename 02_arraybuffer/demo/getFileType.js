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
        toHex(uint8Array[0]) === "ff" &&
        toHex(uint8Array[1]) === "d8" &&
        toHex(uint8Array[len - 2]) === "ff" &&
        toHex(uint8Array[len - 1]) === "d9"
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
      var magicNumber = ["89", "50", "4e", "47", "0d", "0a", "1a", "0a"];
      var len = magicNumber.length;
      var b = true;
      for (var i = 0; i < len; i++) {
        var hex = toHex(uint8Array[i], 2);
        if (hex !== magicNumber[i]) {
          b = false;
          break;
        }
      }
      if (b) {
        return "png";
      }
    },
  };

  function toHex(number, len) {
    var hex = number.toString(16);
    if (typeof len === "number") {
      if (hex.length < len) {
        hex = hex.padStart(len, "0");
      }
    }
    return hex;
  }

  function toChar(number) {
    return String.fromCharCode(number);
  }

  return getFileType;
})();
