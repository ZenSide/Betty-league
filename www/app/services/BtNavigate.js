betty2App.factory('BtNavigate', function(ENV, $state, $cordovaNativePageTransitions, BtLoading, $q) {
  var service = {
    lockedAnim : false,
    stateChange : function(animClass, route, routeparams){
      if (!service.lockedAnim) {
        $state.go(route, routeparams);
      }
    },
    anim : function (direction) {
      if (!service.lockedAnim) {
        var deffered = $q.defer();
        if (direction && ENV === 'PROD') {
          //BtLoading.endLoad();
          service.lockedAnim = true;


          if (direction == 'fade') {
            var options = {
              "duration"       :  600, // in milliseconds (ms), default 400
              "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
              "androiddelay"   :  70,  // same as above but for Android, default 70
            };
            $cordovaNativePageTransitions.fade(
                options,
                function (msg) {
                  deffered.resolve();
                  service.lockedAnim = false;
                }, // called when the animation has finished
                function (msg) {
                  deffered.resolve();
                  service.lockedAnim = false;
                } // called in case you pass in weird values
            );
          } else {
            var fixedPixelsTop = 70;
            var fixedPixelsBottom = 70;

            if (direction.charAt(0) == 2) {
              direction = direction.substring(1);
              fixedPixelsTop = 146;
            } else if(direction.charAt(0) == 3) {
              direction = direction.substring(1);
              fixedPixelsTop = 196;
            }

            var options = {
              "direction"        : direction, // 'left|right|up|down', default 'left' (which is like 'next')
              "duration"         : 400, // in milliseconds (ms), default 400
              "slowdownfactor"   : 1, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
              "iosdelay"         : 60, // ms to wait for the iOS webview to update before animation kicks in, default 60
              "androiddelay"     : 70, // same as above but for Android, default 70
              "fixedPixelsTop"   : fixedPixelsTop, // the number of pixels of your fixed header, default 0 (iOS and Android)
              "fixedPixelsBottom": fixedPixelsBottom  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
            };
            $cordovaNativePageTransitions.slide(
                options,
                function (msg) {
                  service.lockedAnim = false;
                  deffered.resolve();
                }, // called when the animation has finished
                function (msg) {
                  service.lockedAnim = false;
                  deffered.resolve();
                } // called in case you pass in weird values
            );
          }
        } else {
          service.lockedAnim = false;
          deffered.resolve();
        }

        return deffered;
      }
    }
  };
  return service;
})
