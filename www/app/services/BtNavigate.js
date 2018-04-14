betty2App.factory('BtNavigate', function(ENV, $state, $cordovaNativePageTransitions, BtLoading, $q) {
  var service = {
    stateChange : function(animClass, route, routeparams){
      $state.go(route, routeparams);
    },
    anim : function (direction) {
      var deffered = $q.defer();

      if (ENV == 'PROD') {
        BtLoading.endLoad();

        var options = {
          "direction"        : direction, // 'left|right|up|down', default 'left' (which is like 'next')
          "duration"         :  400, // in milliseconds (ms), default 400
          "slowdownfactor"   :    4, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
          "slidePixels"      :   null, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
          "iosdelay"         :  60, // ms to wait for the iOS webview to update before animation kicks in, default 60
          "androiddelay"     :  70, // same as above but for Android, default 70
          "fixedPixelsTop"   :    69, // the number of pixels of your fixed header, default 0 (iOS and Android)
          "fixedPixelsBottom":   69  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
        };

        $cordovaNativePageTransitions.slide(
            options,
            function (msg) {
                deffered.resolve();
            }, // called when the animation has finished
            function (msg) {
                deffered.resolve();
            } // called in case you pass in weird values
        );
      } else {
          deffered.resolve();
      }

      return deffered;
    }
  };
  return service;
})
