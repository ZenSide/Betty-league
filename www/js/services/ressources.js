var entities = {
    'leagues': [
        {}
    ],
    'users': [
        {}
    ]
}

angular.forEach(entities, function (options, routesCode){
    betty2App.factory("BT" + routesCode, function(Restangular, BtMessages, BtLoading){
        service = {
            api : Restangular.all(routesCode),
            query : function(filters,succesCallBack,errorCallBack){
                service.api.getList(filters).then(function(responseSucces){
                    if (succesCallBack) succesCallBack(responseSucces);
                },function(responseError){
                    if (errorCallBack) succesCallBack(responseError);
                    var messages = [
                        {
                            context:'alert',
                            content:"MESSAGES.GENERALERROR"
                        }
                    ];
                    BtMessages.show(messages);
                    BtLoading.endLoad();
                })
            }
        }
        return service;
    })

})
