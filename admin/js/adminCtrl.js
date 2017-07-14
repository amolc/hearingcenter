
app.controller('admincontroller', function ($scope, $http, $window, $location, $rootScope, $filter) {
    
//********************************************************************************* */
//Clear textLog content
    $scope.clearField = function(){
        document.getElementById("user_input").value = "";
    }


//********************************************************************************* */
//Get tab value
    $scope.inputLog = function(req,res){
      var firstName = $scope.result.firstName;
      var lastName = $scope.result.lastName;
      var id = $scope.tabId;

      $scope.toPost = "Admin created a " + id + " for " + firstName + " " + lastName;
      $scope.date = $filter('date')(new Date(), 'dd MMM yyyy');
      $scope.time = $filter('date')(new Date(), 'h.mma');
      
      $scope.toPost3 = req;
      $("#display").append();
    };


//********************************************************************************* */
//Get tab value
    $scope.buttonId = function(value){
      $scope.tabId = value;
      console.log($scope.tabId);
    };

    
//********************************************************************************* */
//
    

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };


//********************************************************************************* */
//When admin click on tab, it initialises the variable with value
    $scope.setSubTab = function(newTab){
      $scope.subTab = newTab;
    };

//********************************************************************************* */
//Check if current tab is set to the initialised value. If true, display, else, hide
    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };


//********************************************************************************* */
//Check if current tab is set to the initialised value. If true, display, else, hide
    $scope.isSubSet = function(tabNum){
      return $scope.subTab === tabNum;
    };


//********************************************************************************* */
//Patient detail using their nric
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
                    }
                }
                
            }

        }).error(function () {

        });
    }


//********************************************************************************* */
//Little function to create the sort order click handler
    $scope.setOrder = function (orderProp) {
        $scope.orderProp = orderProp;
    };


//********************************************************************************* */
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


//********************************************************************************* */
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
            return cust.selected;
        });
        
        return selectedItems.length === $scope.customerList.length;
    }
    
    function setAllSelected(value) {
        angular.forEach($scope.customerList, function (cust) {
            cust.selected = value;
        });
    }


//********************************************************************************* */
//count number of checkbox selected
    $scope.$watch('customerList', function() {
        var no = 0;
        for(var i = 0; i < $scope.customerList.length; i++) {
            if($scope.customerList[i].selected === true)
                no++;
        }
        $scope.noSelectedItems = no;
    }, true);


//********************************************************************************* */
//Delete selected patient
    $scope.delete = function(req, res){
        
      
        var patientList = $scope.customerList.filter(function (cust) {
            return cust.selected;
            
        });
        
        $http.post(baseurl + 'deleteCustomer', patientList).success(function (res) {
            if (res.status == 'false') {

            } else {      
               
            }
        }).error(function () {
 
        })
        $window.location = 'patient.html';
        
    }


//********************************************************************************* */
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


//********************************************************************************* */
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


//********************************************************************************* */
//Logout function
    $scope.logout = function(){
        window.localStorage.setItem('user','0');
        $window.location = 'index.html';
    }
 

//********************************************************************************* */
//Trigger default success or error message
    $scope.init = function(){
        $("#error").hide();
    }
 
});


//********************************************************************************* */
//Other variables that needs to be initialised
    $scope.tab = 1;

    


