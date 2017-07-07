
app.controller('crmcontroller', function ($scope, $http, $window, $location) {

//*********************************************** */
//Delete selected patient
    $scope.deletePatient = function(req, res){
    
        var patientList = [];

        //checkbox selection
        for(var i=0; i<$scope.customerList.length; i++){

            if($scope.customerList[i].selected){
                patientList.push($scope.customerList[i]);
            }
        }
        
        $http.post(baseurl + 'deleteCustomer', patientList).success(function (res) {
            if (res.status == 'false') {

            } else {      
               
            }
        }).error(function () {
 
        })
        $window.location = 'patient.html';
        
    }


//*********************************************** */
//Get specific patient information to display

    $scope.getPatient = function(nric, res){
        $http.get(baseurl + 'findByIc/' + nric).success(function (res) {

            if (res.status == 'false') {

            } else {
                $scope.customer = res;
                //hide entire customer list
                //show only returned customer div

            }

        }).error(function () {

        });
        
    }

//*********************************************** */
//Get all customers to display

    $scope.allCustomer = function(req, res){
        $http.get(baseurl + 'allcustomer').success(function (res) {

            if (res.status == 'false') {

            } else {
                $scope.customerList = res;

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


