(function () {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
        .state('home', {
            url: '/',
            templateUrl: 'src/templates/home.template.html'
        })

        // Premade list page
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/templates/categories.template.html',
            controller: 'Categories as mainList',
            resolve: {
                items: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/category-detail/{itemId}',
            templateUrl: 'src/templates/items.template.html',
            controller: 'ItemDetailController as itemDetail',
            resolve: {
                item: ['$stateParams', 'ShoppingListService',
                      function ($stateParams, MenuDataService) {
                          return MenuDataService.getItemsForCategory()
                            .then(function (items) {
                                return items[$stateParams.itemId];
                            });
                      }]
            }
        });
    }

})();
