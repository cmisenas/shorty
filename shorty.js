;(function(exports) {
  function Shorty() {
  }

  Shorty.prototype.init = function() { 
    this.keys = [];
    this.mapping;
    var that = this;

    loadjQuery(function(){
      that.mapping = {
        72: getLocalLink('*=index', '*=home', '=\"\/\"'), //h key - home link
        65: getLocalLink('*=about'), //a key - about link
        70: getLocalLink('*=faq'), //f key - faq link
        67: getLocalLink('*=contact') //c key - contact link
      };

      $(document).on('keydown', function(e) {
        that.keys[e.keyCode] = true;
        if (e.keyCode in that.mapping) {
          console.log(that.mapping[e.keyCode]);
          that.mapping[e.keyCode].click();
        }
      });

      $(document).on('keyup', function(e) {
        delete that.keys[e.keyCode];
      });
    });
  };

  function getLocalLink() {
    var currentDomain = window.location.host,
        results;
    for (var i = 0; i < arguments.length; i++) {
      results = $('a[href' + arguments[i] + ']');
      for (var j = 0; j < results.length; j++) {
        if (results[j].hostname.replace('www.', '').replace('.com', '') === currentDomain.replace('www.', '').replace('.com', '')) {
          return results[j];
        }
      }
    }
    return false;
  }

  function loadjQuery(fn) {
    // the minimum version of jQuery
    var v = "1.10.2";

    // check if jQuery is loaded and if the right version
    if (!window.jQuery || !checkjQueryExists(window.jQuery.fn.jquery, v)) {
      var done = false;
      var script = document.createElement("script");
      script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
      script.onload = script.onreadystatechange = function(){
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
          done = true;
          fn();
        }
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    } else {
      fn();
    }

  }

  function greaterVersion(vStr1, vStr2) {
    var vArr1 = vStr1.split('.'),
        vArr2 = vStr2.split('.'),
        vNum1, vNum2;
    for (var i = 0; i < vArr1.length; i++) {
      vNum1 = parseInt(vArr1[i], 10);
      vNum2 = parseInt(vArr2[i], 10);
      if (vNum1 === vNum2) {
        continue;
      } else if (vNum1 < vNum2) {
        return 2;
      } else {
        return 1;
      }
    }
    return true;
  }
  
  function checkjQueryExists(ver1, ver2) {
    return window.jQuery === undefined || greaterVersion(ver1, ver2) === 2;
  }

  var shorty = new Shorty();
  shorty.init();

}(this));
