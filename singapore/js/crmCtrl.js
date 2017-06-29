
app.controller('crmcontroller', function ($scope, $http, $window) {

//*********************************************** */
//Verify member login

    $scope.authenticateMember = function(req,res){
        console.log("method triggered");
        var ic = $scope.ic;
        var pw = $scope.pw;

        $scope.result = false;

        $http.get(baseurl + 'findByIc/' + ic).success(function (res) {
            if (res.status == 'false') {

            } else {

                if(res.length == 0){
                    $("#error").show();

                }else{

                    for(var i=0; i<res.length; i++){
                        console.log(res[i].password);

                        if(pw == res[i].password){
                            $window.location = 'memberdashboard.html';

                        }else{
                            $("#error").show();
                        }       
                    }
                }
                
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

//*********************************************** */
//Trigger default success or error message
    $scope.init = function(){
        $("#error").hide();
    }
 
});
