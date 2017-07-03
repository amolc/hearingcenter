
app.controller('crmcontroller', function ($scope, $http, $window, $location) {


//*********************************************** */
//Insert user's medical histories
    $scope.insertHistories = function(req, res){
        
        var stringUrl = $location.absUrl();
        var EqualPos = stringUrl.indexOf("=");
        var id = stringUrl.substring(EqualPos + 1);

        $window.location.href = 'customer_misc.html?id=' + id;
        
    }



//*********************************************** */
//Insert user's miscellaneous responses
    $scope.insertResponse = function(req, res){
        
        var stringUrl = $location.absUrl();
        var EqualPos = stringUrl.indexOf("=");
        var id = stringUrl.substring(EqualPos + 1);

        var checkList = [];
        checkList.push(id);

        for(var i=0; i<req.length; i++){
;
            if(req[i].checked){
                checkList.push(req[i]);
            }
        }
        
        $http.post(baseurl + 'insertmisc', checkList).success(function (res) {
            if (res.status == 'false') {

            } else {
                
               
            }
        }).error(function () {
            console.log("error");
        })
        
    }


//*********************************************** */
//Retrieve miscellaneous responses
    $scope.getOption = function(req, res){
        
        $http.get(baseurl + 'getoption').success(function (res) {

            if (res.status == 'false') {
                $scope.result = "You have entered an invalid NRIC/Passport Number"

            } else {
                $scope.option = res;
                console.log("success");
            }

        }).error(function () {

        });
        
    }

//*********************************************** */
//Register customer for queue number
    $scope.insertCustomer = function(req, res){
        $scope.data = {};
        $scope.data.firstName = $scope.firstName;
        $scope.data.lastName = $scope.lastName;
        $scope.data.country = $scope.country;
        $scope.data.nric = $scope.nric;
        $scope.data.gender = $scope.gender;
        $scope.data.mobile_number = $scope.mobile;
        $scope.data.home_number = $scope.home;
        $scope.data.email_address = $scope.email;
        $scope.data.residential_address = $scope.address;
        $scope.data.postal = $scope.postal;


        $http.post(baseurl + 'insertcustomer', $scope.data).success(function (res) {
            if (res.status == 'false') {

            } else {
                
                $http.get(baseurl + 'findByIc/' + $scope.data.nric).success(function (res) {
                    if (res.status == 'false') {

                    } else {

                        console.log(res);
                        for(var i=0; i<res.length; i++){
                            $window.location.href = 'customer_medicalHist.html?id=' + res[i].id;
                        }
                    }

                }).error(function () {

                });
            }
        }).error(function () {
            console.log("error");
        })
    }

//*********************************************** */
//Get member NRIC from url and display his/her data on memberdashboard.html

    $scope.getID = function(){

        var stringUrl = $location.absUrl();
        var EqualPos = stringUrl.indexOf("=");
        var ic = stringUrl.substring(EqualPos + 1);
        
        $http.get(baseurl + 'findByIc/' + ic).success(function (res) {
            if (res.status == 'false') {

            } else {

                if(res.length == 0){
                    $("#error").show();

                }else{
                    for(var i=0; i<res.length; i++){
                        $scope.result = res[i];
                        console.log($scope.result);
                    }
                }
                
            }

        }).error(function () {

        });
    }

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
                            $window.location.href = 'memberdashboard.html?nric=' + ic;

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
