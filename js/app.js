angular.module("todoApp", ["ngRoute", "RouteControllers", "UserService", "TodoService"]);


// On line 1, we’re creating a new Angular module. The first argument this takes is the app name (todoApp).
// After that, we use an array to include any additional modules. This is called Dependency Injection as we 
// have certain dependencies that we need to inject into our angular module.
// In order to use angular-route, we need to include ngRoute. This module contains the routeProvider that we’ll use 
// when we’re actually creating our routes. Next we need RouteControllers.
// These RouteContollers are the controllers that we’ll call when we hit a specific URL.

angular.module("todoApp").config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    
// In Angular, we have to bind our controllers to our HTML.
// Essentially all we’re doing here is specifying a URL, deciding which HTML file we want to use for that URL, 
// and then binding a controller to that HTML file.
    
    $routeProvider.when("/", {
        templateUrl: "templates/home.html",
        controller: "DessertController"
    })
    .when("/about", {
        templateUrl: "templates/about.html"
    })
    .when("/contact", {
        templateUrl: "templates/form.html"
    })
    .when("/add", {
        templateUrl: "/templates/add.html",
        controller: "DessertController"
    })
    .when("/accounts/register", {
        templateUrl: "/templates/register.html",
        controller: "RegisterController"
    })
    .when("/todo", {
        templateUrl: "templates/todo.html",
        controller: "TodoController"
    })
    .when("/todo/edit/:id", {
        // What’s with the :id at the end of the route? This is called a route parameter, or route param.
        // This is a parameter that will allow us to pass basic information between controllers. 
        // It’s very common to use this approach to view details of a specific object. 
        // In this case we’ll be passing through the ID of a todo item.
        templateUrl: "templates/edit-todo.html",
        controller: "EditTodoController"
    });
});