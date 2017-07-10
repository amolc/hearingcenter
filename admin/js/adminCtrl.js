
app.controller('admincontroller', function ($scope, $http, $window, $location) {

//*********************************************** */
//Authenticate Administrator
    
    $scope.authenticateAdmin = function (req, res) {
        var username = $scope.username;
        var password = $scope.password;

        if(username == "admin" && password == "admin"){
            $window.location = "patient.html";
        }else{
            $("#error").show();
        }
    }


//*********************************************** */
//Checkbox option for selecting patients 
    
    $scope.allSelected = function (value) {
        if (value !== undefined) {
            return setAllSelected(value);
        } else {
            return getAllSelected();
        }
    }

    function getAllSelected() {
        var selectedItems = $scope.customerList.filter(function (cust) {
            return cust.selected;
        });
        
        return selectedItems.length === $scope.customerList.length;
    }
    
    function setAllSelected(value) {
        angular.forEach($scope.customerList, function (cust) {
            cust.selected = value;
        });
    }


//*********************************************** */
//Delete selected patient
    $scope.deletePatient = function(req, res){
        
        console.log(req);
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
                console.log("in");
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


