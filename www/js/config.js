betty2App.config(['RestangularProvider', function(RestangularProvider) {
    // The URL of the API endpoint
    RestangularProvider.setBaseUrl(window.API_URL);

    // JSON-LD @id support
    RestangularProvider.setRestangularFields({
        id: '@id',
        selfLink: '@id'
    });
    RestangularProvider.setSelfLinkAbsoluteUrl(true);

    // Hydra collections support
    RestangularProvider.addResponseInterceptor(function(data, operation) {
        // Remove trailing slash to make Restangular working
        function populateHref(data) {
            if (data['@id']) {
                data.href = data['@id'].substring(1);
            }
        }

        // Populate href property for the collection
        populateHref(data);

        if ('getList' === operation) {
            var collectionResponse = data['hydra:member'];
            collectionResponse.metadata = {};

            // Put metadata in a property of the collection
            angular.forEach(data, function(value, key) {
                if ('hydra:member' !== key) {
                    collectionResponse.metadata[key] = value;
                }
            });

            // Populate href property for all elements of the collection
            angular.forEach(collectionResponse, function(value) {
                populateHref(value);
            });

            return collectionResponse;
        }

        return data;
    });
}]);
betty2App.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
