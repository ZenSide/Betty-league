betty2App.factory('BtMessages', function($rootScope,$timeout) {
    var service = {
        show : function(messages,duration,callback){
            if (!duration) duration = messages.length * 900;
            $rootScope.messages = messages;
            $rootScope.showMessages = true;
            if (callback) callback();
            $timeout(function(){
                $rootScope.showMessages = false;
            },duration)
        },
        showFormMessages : function(form,fieldsNames,duration,callback,justShow){
            if (!duration) duration =2000;
            var messages = [];
            var activeinputs = "";
            angular.forEach(fieldsNames,function(fieldName,key){
                if(form[fieldName]){
                    if(justShow){
                        activeinputs += fieldName+" ";
                    }
                    else{
                        var errors = form[fieldName].$error;
                        if(errors){
                            var i = false;
                            angular.forEach(errors,function(key,value){
                                messages.push(
                                    {
                                        context:'alert',
                                        content:"SIGNIN.MESSAGES."+value+"."+fieldName
                                    }
                                )
                                if(!i){
                                    activeinputs += fieldName+" ";
                                }
                                i = true;
                            })
                        }
                    }
                }
            });
            $rootScope.activeinputs = activeinputs;
            $timeout(function(){
                $rootScope.activeinputs = "";
            },duration)
            if(!justShow){
                service.show(messages,duration);
            }
        }
    };



    return service;
})

.factory('BtNavigate', function($state,$rootScope,$timeout) {
    var service = {
        stateChange : function(animClass,route){
            $rootScope.viewAnimClass = animClass;
            $timeout(function(){
                $state.go(route);
            })
        }
    };
    return service;
})

.factory('BtLoading', function($rootScope) {
    var service = {
        startLoad : function(nocon){
            nocon ? $rootScope.btLoadingNoCon = true : $rootScope.btLoading = true;
            service.disableButtons();
        },
        endLoad : function(nocon){
            nocon ? $rootScope.btLoadingNoCon = false : $rootScope.btLoading = false;
            service.enableButtons();
        },
        disableButtons : function(btClassesString){
            if (!btClassesString){
                var buttons = document.getElementsByClassName("bt-btn")
            }
            else {
                var buttons = document.getElementsByClassName("bt-btn "+btClassesString+" ")
            }
            len = buttons !== null ? buttons.length : 0,
            i = 0;
            for(i; i < len; i++) {
                buttons[i].disabled = true;
            }
        },
        enableButtons : function(btClassesString){
            if (!btClassesString){
                var buttons = document.getElementsByClassName("bt-btn")
            }
            else {
                var buttons = document.getElementsByClassName("bt-btn "+btClassesString+" ")
            }
            len = buttons !== null ? buttons.length : 0,
                i = 0;
            for(i; i < len; i++) {
                buttons[i].disabled = false;
            }
        }
    };
    return service;
})


