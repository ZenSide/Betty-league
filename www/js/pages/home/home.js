betty2App.controller('HomeCtrl', ['animation', '$scope', 'UserApi', 'BtMessages', 'BtNavigate', 'BtLoading', 'BettyLeagueApi', 'ShowdownApi', function (animation, $scope, UserApi, BtMessages, BtNavigate, BtLoading, BettyLeagueApi, ShowdownApi) {
    BtLoading.endLoad();
    var homeCtrl = this;
    $scope.parentCtrl.activeHeaderBtns = [true, false, false, false, false];


    homeCtrl.user = UserApi.getUser();

    //parent config

    var footerStatus = {
        leftBt : {
            btShow : false,
        },
        middleBt : {
            btShow : false,
        },
        rightBt : {
            active : false
        }
    };
    animation.promise.then(function () {
        $scope.parentCtrl.withHeadLogo = true;
        $scope.parentCtrl.footerStatus = footerStatus;
    });


    homeCtrl.goPrivateLeagues = function () {
        BtLoading.startLoad();
        BtNavigate.stateChange('goTop' ,'privateleagues', {
            'animDirection' : 'fade'
        });
    };

    homeCtrl.goBettyWorld = function () {
        BtLoading.startLoad();
        BettyLeagueApi.getBettyWorld(function (bettyWorld) {
            //find worldbettyLeague
            //go to world bettyleague
            //go to the next unbet showdown
            ShowdownApi.getNextOpenShowDown(bettyWorld.id, function (showdown) {
                BtNavigate.stateChange('goTop' ,'bettyleague.showdown.step0', {
                    'bettyLeagueId' : bettyWorld.id,
                    'showdownId' : showdown.id,
                    'animDirection' : 'fade'
                });
            }, function (messages) {
                BtMessages.show(messages, null, function () {
                    BtLoading.endLoad();
                })
            });

        }, function (messages) {
            BtMessages.show(messages, null, function () {
                BtLoading.endLoad();
            })
        });
    };

}]);