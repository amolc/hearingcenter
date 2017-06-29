
app.controller('crmcontroller', function ($scope, $http, $window) {

//*********************************************** */
//Verify member login

    $scope.authenticateMember = function(req,res){
        var ic = $scope.ic;
        var pw = $scope.password;

        $scope.result = false;

        $http.get(baseurl + 'findByIc/' + ic).success(function (res) {
            if (res.status == 'false') {

            } else {
                //verify password
                //if correct, redirect to member homepage
                //$window.location = 'something.html';
            }

        }).error(function () {

        });
    }


//*********************************************** */
//Register customer for queue number

    $scope.getQueue = function(req,res){
        var ic = $scope.ic;

        $scope.result = "";

        $http.get(baseurl + 'findByIc/' + ic).success(function (res) {

            if (res.status == 'false') {
                $scope.result = "You have entered an invalid NRIC/Passport Number"

            } else {
                //generate queue number
                //assign it into $scope.result
            }

        }).error(function () {

        });
    }

 
});
