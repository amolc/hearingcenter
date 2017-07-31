app.controller('admincontroller', function ($scope, $http, $window, $location, $rootScope, $filter) {


//********************************************************************************* */
//Schedule Appointment box
$scope.feedbackScore = function(req, res){

    if(window.localStorage.getItem('user')!="1"){
            $window.location = 'index.html';
    }

    $http.get(baseurl + 'getAllFeedback' ).success(function (res) {

        if (res.status == 'false') {

        } else {
            $scope.feedbackLog = res;
            var clinic1Score = 0;
            var clinic1Counter = 0;

            var clinic2Score = 0;
            var clinic2Counter = 0;

            var clinic3Score = 0;
            var clinic3Counter = 0;

            for(var i=0; i<res.length; i++){
                if(res[i].clinic == "Clinic1"){
                    clinic1Score = clinic1Score + res[i].feedback_value;
                    clinic1Counter += 1;

                }else if(res[i].clinic == "Clinic2"){
                    clinic2Score = clinic2Score + res[i].feedback_value;
                    clinic2Counter += 1;

                }else{
                    clinic3Score = clinic3Score + res[i].feedback_value;
                    clinic3Counter += 1;

                }
            }

            $scope.clinic1Avg = Math.trunc(clinic1Score/clinic1Counter);
            $scope.clinic2Avg = Math.trunc(clinic2Score/clinic2Counter);
            $scope.clinic3Avg = Math.trunc(clinic3Score/clinic3Counter);

            $scope.clinic1Feedback = $scope.getDesc($scope.clinic1Avg);
            $scope.clinic2Feedback = $scope.getDesc($scope.clinic2Avg);
            $scope.clinic3Feedback = $scope.getDesc($scope.clinic3Avg);

            
        }

    }).error(function () {

    });
}


//********************************************************************************* */
//Feedback description
$scope.getDesc = function(req, res){
    console.log(req);
    $scope.desc = ""

    if(req == 5){
        $scope.desc = "Excellent";
    }else if(req == 4){
        $scope.desc = "Good";
    }else if(req == 3){ 
        $scope.desc = "Average";
    }else if(req == 2){
        $scope.desc = "Poor";
    }else{
        $scope.desc = "Very Poor";
    }
    return $scope.desc;
}
    
//********************************************************************************* */
//Schedule Appointment box
$scope.scheduleAppt = function(req,res){
     $("#user_input").hide();
     $("#newDivs").hide();
     $("#saveAndDiscard").hide();

    $scope.data = {};
    $scope.data.firstName = $scope.result.firstName;
    $scope.data.lastName = $scope.result.lastName;
    $scope.data.nric = $scope.result.nric;
    $scope.data.clinic = $scope.clinic;
    $scope.data.day = $scope.day;
    $scope.data.month = $scope.month;
    $scope.data.year = $scope.year;

    $http.post(baseurl + 'insertAppt', $scope.data).success(function (res) {
        if (res.status == 'false') 
        {

        } 
        else {      
        
        }
            
    }).error(function () {
 
    })

    $window.location = "patient2.html?nric=" + $scope.result.nric;
     
}

//********************************************************************************* */
//Update customer info from account.html
$scope.updateCustInfo = function(){
    $scope.data = {};

    $scope.data.firstName = $scope.result.firstName;
    $scope.data.lastName = $scope.result.lastName;
    $scope.data.mobile_number = $scope.result.mobile_number;
    $scope.data.home_number = $scope.result.home_number;
    $scope.data.id = $scope.result.id;
    $scope.data.gender = $scope.result.gender;
    $scope.data.type = $scope.result.type;
    $scope.data.residential_address = $scope.result.residential_address;
    $scope.data.postal = $scope.result.postal;
    $scope.data.country = $scope.result.country;
    $scope.data.email = $scope.result.email_address;
    $scope.data.nric = $scope.result.nric;

    $http.post(baseurl + 'updateCustomer', $scope.data).success(function (res) {
        if (res.status == 'false') 
        {

        } 
        else {      
            
        }
        
    }).error(function () {
 
    })
    
    $("#custinfo").hide();
    $("#itemSel").show();
    $("#pay").hide();
    

}

//********************************************************************************* */
//Show and hide tab info
$scope.custInfo = function() {
        $("#custinfo").hide();
        $("#itemSel").show();
        $("#pay").hide();
    };
  

$scope.itemSel = function(){
    $("#custinfo").hide();
    $("#itemSel").hide();
    $("#pay").show();
}




//********************************************************************************* */
//Retrieve patientLogs
    $scope.getLog = function(){

        if(window.localStorage.getItem('user')!="1")
        {
            $window.location = 'index.html';
        }

        //$("#modalEditPatient").hide();

        var stringUrl = $location.absUrl();
        var EqualPos = stringUrl.indexOf("=");
        var ic = stringUrl.substring(EqualPos + 1);

        $http.get(baseurl + 'getPatientLog/' + ic).success(function (res) {

            if (res.status == 'false') 
            {

            } 
            else 
            {
                $scope.patientLog = res;



            }

        }).error(function () {

        });
    }


//********************************************************************************* */
//Clear textLog content
    $scope.clearField = function(){
        document.getElementById("user_input").value = "";
    }


//********************************************************************************* */
//Get tab value
    $scope.inputLog = function(req,res){

        $scope.data = {};

        $scope.date = $filter('date')(new Date(), 'dd MMM yyyy');
        $scope.time = $filter('date')(new Date(), 'h.mma');

        $scope.data.firstName = $scope.result.firstName;
        $scope.data.lastName = $scope.result.lastName;
        $scope.data.nric = $scope.result.nric;
        $scope.data.tabType = $scope.tabId;
        $scope.data.date = $scope.date;
        $scope.data.time = $scope.time;
        $scope.data.remark = $scope.textLog;

        $http.post(baseurl + 'insertPatientLog', $scope.data).success(function (res) {

            if (res.status == 'false') 
            {


            } 
            else 
            {      
               
            }
            
        }).error(function () {
 
        })

        $window.location = "patient2.html?nric=" + $scope.result.nric;
        
    };


//********************************************************************************* */
//Get tab value
    $scope.buttonId = function(value){
      $scope.tabId = value;
      
      if($scope.tabId ==="Schedule Appointment"){
            $("#user_input").hide();
            $("#newDivs").hide();
            $("#saveAndDiscard").hide();
            $("#apptDate").show();

      }else{
            $("#user_input").show();
            $("#newDivs").show();
            $("#saveAndDiscard").show();
            $("#apptDate").hide();
      }
      
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

        if(window.localStorage.getItem('user')!="1")
        {
            $window.location = 'index.html';
        }

        // These will get the id
        var stringUrl = $location.absUrl();
        var EqualPos = stringUrl.indexOf("=");
        var ic = stringUrl.substring(EqualPos + 1);
        

        $("#custinfo").show();
        $("#itemSel").hide();
        $("#pay").hide();
        $("#apptDate").hide();


        $scope.editInfo = function(){
            $("#modalEditPatient").show();
        }


        $scope.edit = function(){
            $("#modalEditPatient").hide();
        }


        $http.get(baseurl + 'findByIc/' + ic).success(function (res) {

            if (res.status == 'false') 
            {

            } 
            else
            {

                if(res.length == 0)
                {
                    $("#error").show();

                }
                else
                {
                    for(var i=0; i<res.length; i++)
                    {
                        $scope.result = res[i];
                        console.log('res',$scope.result);
                        console.log('type',$scope.result.description);
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

            window.localStorage.setItem('user','1');

            $window.location = "patient.html";
        }else{
            $("#error").show();
        }
    }


//********************************************************************************* */
//Checkbox option for selecting patients 
    
    $scope.allSelected = function (value) {

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


//********************************************************************************* */
//Other variables that needs to be initialised
    $scope.tab = 1;
    
 
});



    


