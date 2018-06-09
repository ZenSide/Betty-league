betty2App.factory('BtMessages', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  var service = {
    show : function(messages,duration,callback){
      if (!duration) duration = messages.length * 900;
      $rootScope.messages = messages;
      $rootScope.showMessages = true;
      if (callback) callback();
      $timeout(function(){
        $rootScope.messages = [];
        $rootScope.showMessages = false;
      },duration);
      return
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
      return
    }
  };

  return service;
}]);