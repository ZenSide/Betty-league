betty2App.controller('ChooseLigueCtrl', function (BtNavigate,$scope,BTleagues,$timeout,BtLoading) {

    //Public Leagues
    BtLoading.startLoad();
    BTleagues.query({private:false},function(publicLeagues){
        $scope.buttonsPublics = [];
        angular.forEach(publicLeagues,function(value,key){
            $scope.buttonsPublics.push(
                {
                    active:true,
                    ico : "ion-earth",
                    position: "content",
                    size: "indecent",
                    context:"normal",
                    label:value.name,
                    focus : false,
                    disabled: false,
                    action:function(){
                    }
                }
            )
        })
        BtLoading.endLoad();
    });

    //Private Leagues
    BtLoading.startLoad();
    BTleagues.query({private:true},function(privateLeagues){
        $scope.buttonPrivate =
            {
                active:true,
                ico : "ion-person-stalker",
                position: "content",
                size: "medium",
                context:"other",
                label:'CHOOSELEAGUE.PRIVATES',
                focus : false,
                disabled: privateLeagues.length ? false : true,
                action:function(){
                }
            }
        BtLoading.endLoad();
    });

    //Header buttons
    $scope.$parent.headerNavStatus = {
        leftBt : {
            active : true,
            ico : "ion-trophy",
            position: "left",
            size: "medium",
            context:"normal",
            focus : false,
            disabled: false,
            action:function(){
                BtNavigate.stateChange('goBottom','login')
            }
        },
        rightBt : {
            active : true,
            ico : "ion-person",
            position: "right",
            size: "medium",
            context:"normal",
            focus : false,
            disabled: false,
            action:function(){
                BtNavigate.stateChange('goBottom','signin')
            }
        }
    }

    $scope.$parent.footerStatus = {
        leftBt : {
            active : false
        },
        middleBt : {
            active : false
        },
        rightBt : {
            active : false
        }
    }

})