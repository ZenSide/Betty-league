betty2App.controller('ParentCtrl', function ($scope,$rootScope,$timeout,$state,$cordovaNetwork,BtLoading) {

        document.addEventListener("deviceready", function () {
            var isOnline = $cordovaNetwork.isOnline()
            var isOffline = $cordovaNetwork.isOffline()

            // listen for Online event
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
               var onlineState = networkState;
                BtMessages.show([{
                    context:"success",
                    content:"ONLINE : "+onlineState
                }]);
                BtLoading.endLoad(true);
            })

            // listen for Offline event
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                var offlineState = networkState;

                BtMessages.show([{
                    context:"alert",
                    content:"OFFLINE : "+offlineState
                }]);
                BtLoading.startLoad(true);
            })

        }, false);


    $rootScope.viewAnimClass = 'goTop';
    $rootScope.showMessages = false;
    $rootScope.messages = [];
    $rootScope.showFormMessages = false;
    $rootScope.activeinputs = "";

    $scope.headerNavStatus = {
        leftBt : {
            active : false,
            ico : "",
            position: "left",
            size: "tiny",
            context:"normal",
            focus : false,
            disabled: false,
            submitform:false,
            action:function(){
            }
        },
        rightBt : {
            active : false,
            ico : "",
            position: "right",
            size: "tiny",
            context:"normal",
            focus : false,
            disabled: false,
            submitform:false,
            action:function(){
            }
        }
    }

    $scope.footerStatus = {
        leftBt : {
            active : false,
            ico : "",
            position: "left",
            size: "tiny",
            label:"",
            context:"normal",
            focus : false,
            disabled: false,
            submitform:false,
            action:function(){
            }
        },
        middleBt : {
            active : false,
            ico : "",
            position: "middle",
            size: "tiny",
            label:"",
            context:"normal",
            focus : false,
            disabled: false,
            submitform:false,
            action:function(){
            }
        },
        rightBt : {
            active : false,
            ico : "",
            position: "right",
            size: "tiny",
            label:"",
            context:"normal",
            focus : false,
            disabled: false,
            submitform:false,
            action:function(){
            }
        }
    }


})