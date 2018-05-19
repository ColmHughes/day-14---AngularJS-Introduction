angular.module("RouteControllers",[])
    .controller("DessertController", function($scope, $location) {
        // The $scope object is an object that provides a shared context between the angular controller and the template that controller is bound to
        $scope.title = "Welcome to AngularJS";
        if (localStorage.getItem("username")) {
             $scope.loggedInUser = localStorage.getItem("username");
        } else {
            $scope.loggedInUser = "Not logged in yet!";
        }
        $scope.favouriteDessert = "chocolate lava pudding";
        $scope.desserts = [
            {name: "Trifle", description: "Grandma's fave"},
            {name: "Cheesecake", description: "Hopefully lemon"},
            {name: "Red Velvet", description: "Cake with vanilla frosting"},
            {name: "Sticky Toffee Pudding", description: "Katie's favourite"}
            ]
            $scope.dessert = {name: "", description: ""};
            $scope.save = function() {
                $scope.desserts.push($scope.dessert);
                $location.path("/");
            }
            
    })
    
    .controller("RegisterController", function($scope, UserAPIService) {
        
        $scope.registrationUser = {};
        let URL = "https://morning-castle-91468.herokuapp.com/";
        
        // First, we’ll create a new Angular controller called RegisterController and we’ll pass in the $scope object.
        // Next we’ll create a new empty object on our $scope object. Our empty object will be called registrationUser.
        // After that we create the submitForm() method that we reference in the ng-submit attribute of our HTML form.
        // Because this method needs to be accessed by the template, we need to add the submitForm() method to the $scope object.
        
        $scope.login = function() {
            UserAPIService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results) {
                // accounts/api-token-auth/ Returns a JSON Web Token that can be used for authenticated requests.
                $scope.token = results.data.token;
                localStorage.setItem("username", $scope.registrationUser.username);
                localStorage.setItem("authToken", $scope.token);
                // LocalStorage: What this allows us to do is store information in the browser as key/value pairs, just like a JavaScript object.
            }).catch(function(err) {
                console.log(err);
            });
        }
        
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;
               
                
                // callAPI is our function within our UserAPIService object in service.js, it takes two arguments. url and data.
                // The url argument will be a string that will contain the URL that we’ll be calling for our API. 
                // The data argument will be the user object that contains the username and password that we’ll be registering with.
                // So once the API call is made, the then method will be invoked.
                // And inside the then method we’re passing the results object that gets passed back from the service.
                UserAPIService.callAPI(URL + "accounts/register/", $scope.registrationUser).then(
                    function(results){
                        $scope.data = results.data;
                        alert("You have successfully registered! Go you!!");
                        $scope.login();
                    }).catch(function(err) {
                        alert("Oh no! There was an error.");
                        console.log(err);
                    })
            }
            
        }
    })
    .controller("TodoController", function($scope, $location, TodoAPIService) {
        let URL = "https://morning-castle-91468.herokuapp.com/";
        
        $scope.authToken = localStorage.getItem("authToken");
        $scope.username = localStorage.getItem("username");
        
        $scope.todos = [];
        
        TodoAPIService.getTodos(URL + "todo/", $scope.username, $scope.authToken).
            then(function(results) {
                $scope.todos = results.data || [];
                console.log($scope.todos);
            }).catch(function(err) {
                console.log(err);
            });
            
            $scope.editToDo = function(id) {
                $location.path("/todo/edit/" + id);
            }
            
            $scope.deleteToDo = function(id) {
                TodoAPIService.deleteToDo(URL + "todo/" + id, $scope.authToken).then
                    (function(results) {
                        console.log(results);
                        alert("Item deleted successfully.");
                    }).catch(function(err) {
                        console.log(err);
                    })
            }
            
            $scope.submitForm = function() {
                if ($scope.todoForm.$valid) {
                    $scope.todo.username = $scope.username;
                    $scope.todos.push($scope.todo);
                    
                    TodoAPIService.createTodo(URL + "todo/", $scope.todo, $scope.authToken).
                        then(function(results) {
                            console.log(results);
                        }).catch(function(err) {
                            console.log(err)
                        });
                }
            }
    })
   .controller("EditTodoController", function($scope, $location, $routeParams, TodoAPIService) {
       // The $routeParams object will contain the id that we passed through as parameter.
       let id = $routeParams.id;
       let URL = "https://morning-castle-91468.herokuapp.com/";
       
       $scope.authToken = localStorage.getItem("authToken");
       $scope.username = localStorage.getItem("username");
       
       TodoAPIService.getTodos(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
       //   Our getTodos method here is pretty much the same as it always was. 
       //   The only difference is that we’re passing the ID as part of the URL so we can access that specific todo item!
           $scope.todo = results.data;
       }).catch(function(err) {
           console.log(err);
       })
       
       $scope.submitForm = function() {
           if ($scope.todoForm.$valid) {
               $scope.todo.username = $scope.username;
               
               TodoAPIService.editToDo(URL + "todo/" + id, $scope.todo, $scope.authToken).
                    then(function(results) {
                        $location.path("/todo");
                    }).catch(function(err) {
                        console.log(err);
                    })
               
           }
       }
       
   })
















