angular.module("UserService", [])
    .factory("UserAPIService", function($http) {
    // So what we’re doing here is creating a new Angular module. 
    // This time we’re creating a service. Services in Angular are generally used to make calls to APIs. 
    // The reason for this is that putting all the logic for calling APIs into your controllers can get messy, 
    // so it’s best to put that code elsewhere!
    // We’re calling our module UserService and the Service that we’re creating within that module is going to be called UserAPIService. 
    // This service requires the $http module that’s provided by Angular. This is the module that will allow us to makes calls to the API!
    // Inside the UserAPIService, we’re going to create a new object called UserAPIService. 
    // We’ll then give that UserAPIService object a method called callAPI.
        UserAPIService = {
            callAPI: function(url, data) {
                return $http.post(url, data);
            }
        };
        return UserAPIService;
    })
    
angular.module("TodoService", [])
    .factory("TodoAPIService", function($http) {
        
        TodoAPIService = {
            
            getTodos: function(url, data, token) {
                let header = "Authorization: JWT " + token;
                // When making HTTP calls, a header will always be first to reach the destination. 
                // We can use these headers to inform servers of the type of data they’ll be dealing it with, 
                // the amount of content to deal with. These are created as strings but the server reads them as key/value pairs.
                return $http.get(url, {params:{"username": data}}, header);
                // This method is different from the one that we used when registering the user. We use the post request to send data from the 
                // client to the server when we wish to create data on the server. Earlier we were creating a new user, as well as a JWT, so it was 
                // OK for us to use a post request.
                // In this instance however, we’ll be getting data from the server, so we use the get method. This also means that when we want to send 
                // data to the server using a get request, we use query parameters, or params
                // To do this we need to create an anonymous object. The only property of that object will be params. 
                // The value for the params property will be a set of key/value pairs. It’s not uncommon to use multiple query parameters, but in this case
                // we only need one – username.
                // Using this query parameter will allow the server to search for todo items specific to that user. After we’ve added the query params, 
                // we just need to pass in our header variable so the server will know to authenticate us!
                
            },
            createTodo: function(url, data, token) {
                let header = "Authorization: JWT" + token;
                return $http.post(url, data, header);
            },
            editToDo: function(url, data, token) {
                let header = "Authorization: JWT" + token;
                return $http.put(url, data, header);
            },
            deleteToDo: function(url, token) {
                let header = "Authorization: JWT" + token;
                return $http.delete(url, header);
            }
        };
        return TodoAPIService;
    })
    
