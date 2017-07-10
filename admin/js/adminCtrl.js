
app.controller('admincontroller', function ($scope, $http, $window, $location) {

//*********************************************** */
//Authenticate Administrator
    
    $scope.authenticateAdmin = function (req, res) {
        var username = $scope.username;
        var password = $scope.password;

        if(username == "admin" && password == "admin"){
            console.log("authenticated");
            window.localStorage.setItem('user','1');
            console.log(window.localStorage.getItem('user'));
            $window.location = "patient.html";
        }else{
            $("#error").show();
        }
    }


//*********************************************** */
//Checkbox option for selecting patients 
    
    $scope.allSelected = function (value) {
        //console.log(value);
        if (value != undefined) {
            return setAllSelected(value);
        } else {
            return getAllSelected();
        }
    }

    function getAllSelected() {
        var selectedItems = $scope.customerList.filter(function (cust) {
            console.log(cust.selected);
            return cust.selected;
        });
        
        return selectedItems.length === $scope.customerList.length;
    }
    
    function setAllSelected(value) {
        angular.forEach($scope.customerList, function (cust) {
            cust.selected = value;
        });
    }

    // $scope.selectedCounter = 0;
   
    // $scope.change = function (cust) {
    //     if (cust.selected) {
    //         $scope.selectedCounter++
    //     } else {
    //         if($scope.selectedCounter > 0){
    //             $scope.selectedCounter--
    //         }else{
    //             $scope.selectedCounter = 0;
    //         }
            
    //     }
    // };
/***************************************** */
//count number of checkbox selected
    $scope.$watch('customerList', function() {
        var no = 0;
        for(var i = 0; i < $scope.customerList.length; i++) {
            if($scope.customerList[i].selected === true)
                no++;
        }
        $scope.noSelectedItems = no;
    }, true);
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

        if(window.localStorage.getItem('user')!="1"){
            $window.location = 'index.html';
        }

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
//Logout function
    $scope.logout = function(){
        window.localStorage.setItem('user','0');
        $window.location = 'index.html';
    }
 

//*********************************************** */
//Trigger default success or error message
    $scope.init = function(){
        $("#error").hide();
    }
 
});


