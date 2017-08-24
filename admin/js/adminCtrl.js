app.controller('admincontroller', function ($scope, $http, $window, $location, $rootScope, $filter) {


    $scope.Date = new Date();

//********************************************************************************* */
//Schedule Appointment box
    $scope.feedbackScore = function (req, res) {

        if (window.localStorage.getItem('user') != "1") {
            $window.location = 'index.html';
        }

        $http.get(baseurl + 'getAllFeedback').success(function (res) {

            if (res.status == 'false') {

            } else {
                $scope.feedbackLog = res;
                var clinic1Score = 0;
                var clinic1Counter = 0;

                var clinic2Score = 0;
                var clinic2Counter = 0;

                var clinic3Score = 0;
                var clinic3Counter = 0;

                for (var i = 0; i < res.length; i++) {
                    if (res[i].clinic == "Clinic1") {
                        clinic1Score = clinic1Score + res[i].feedback_value;
                        clinic1Counter += 1;

                    } else if (res[i].clinic == "Clinic2") {
                        clinic2Score = clinic2Score + res[i].feedback_value;
                        clinic2Counter += 1;

                    } else {
                        clinic3Score = clinic3Score + res[i].feedback_value;
                        clinic3Counter += 1;

                    }
                }

                $scope.clinic1Avg = Math.trunc(clinic1Score / clinic1Counter);
                $scope.clinic2Avg = Math.trunc(clinic2Score / clinic2Counter);
                $scope.clinic3Avg = Math.trunc(clinic3Score / clinic3Counter);

                $scope.clinic1Feedback = $scope.getDesc($scope.clinic1Avg);
                $scope.clinic2Feedback = $scope.getDesc($scope.clinic2Avg);
                $scope.clinic3Feedback = $scope.getDesc($scope.clinic3Avg);


            }

        }).error(function () {

        });
    }


//********************************************************************************* */
//Feedback description
    $scope.getDesc = function (req, res) {
        console.log(req);
        $scope.desc = ""

        if (req == 5) {
            $scope.desc = "Excellent";
        } else if (req == 4) {
            $scope.desc = "Good";
        } else if (req == 3) {
            $scope.desc = "Average";
        } else if (req == 2) {
            $scope.desc = "Poor";
        } else {
            $scope.desc = "Very Poor";
        }
        return $scope.desc;
    }

//********************************************************************************* */
//Schedule Appointment box
    $scope.scheduleAppt = function (req, res) {
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
            if (res.status == 'false') {

            }
            else {

            }

        }).error(function () {

        })

        $window.location = "patient2.html?nric=" + $scope.result.nric;

    }

//********************************************************************************* */
//Update customer info from account.html
    $scope.updateCustInfo = function () {
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
        $scope.data.custypeID = $scope.result.custypeID;


        $http.post(baseurl + 'updateCustomer', $scope.data).success(function (res) {
            if (res.status == 'false') {

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
    $scope.custInfo = function () {
        $("#custinfo").hide();
        $("#itemSel").show();
        $("#pay").hide();
    };


    $scope.itemSel = function () {
        $("#custinfo").hide();
        $("#itemSel").hide();
        $("#pay").show();
    }


//********************************************************************************* */
//Retrieve patientLogs
    $scope.getLog = function () {

        if (window.localStorage.getItem('user') != "1") {
            $window.location = 'index.html';
        }

        //$("#modalEditPatient").hide();

        var stringUrl = $location.absUrl();
        var EqualPos = stringUrl.indexOf("=");
        var ic = stringUrl.substring(EqualPos + 1);

        $http.get(baseurl + 'getPatientLog/' + ic).success(function (res) {

            if (res.status == 'false') {

            }
            else {
                $scope.patientLog = res;


            }

        }).error(function () {

        });
    }


//********************************************************************************* */
//Clear textLog content
    $scope.clearField = function () {
        document.getElementById("user_input").value = "";
    }


//********************************************************************************* */
//Get tab value
    $scope.inputLog = function (req, res) {

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

            if (res.status == 'false') {


            }
            else {

            }

        }).error(function () {

        })

        $window.location = "patient2.html?nric=" + $scope.result.nric;

    };


//********************************************************************************* */
//Get tab value
    $scope.buttonId = function (value) {
        $scope.tabId = value;

        if ($scope.tabId === "Schedule Appointment") {
            $("#user_input").hide();
            $("#newDivs").hide();
            $("#saveAndDiscard").hide();
            $("#apptDate").show();

        } else {
            $("#user_input").show();
            $("#newDivs").show();
            $("#saveAndDiscard").show();
            $("#apptDate").hide();
        }

    };


//********************************************************************************* */
//
    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };


//********************************************************************************* */
//When admin click on tab, it initialises the variable with value
    $scope.setSubTab = function (newTab) {
        $scope.subTab = newTab;
    };

//********************************************************************************* */
//Check if current tab is set to the initialised value. If true, display, else, hide
    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };


//********************************************************************************* */
//Check if current tab is set to the initialised value. If true, display, else, hide
    $scope.isSubSet = function (tabNum) {
        return $scope.subTab === tabNum;
    };


//********************************************************************************* */
//Patient detail using their nric
    /*    $scope.getCustomerType = function(){

     $http.get(baseurl + 'customerType').success(function (res) {

     if (res.status == 'false')
     {

     }
     else
     {

     $scope.customerType = res;
     console.log('customerType: ', $scope.customerType );

     }

     }).error(function () {

     });
     }   */

//********************************************************************************* */
//Patient detail using their nric
    $scope.getID = function () {

        if (window.localStorage.getItem('user') != "1") {
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


        $scope.editInfo = function () {
            $("#modalEditPatient").show();
        }


        $scope.edit = function () {
            $("#modalEditPatient").hide();
        }

        // get the customer type 


        $http.get(baseurl + 'findByIc/' + ic).success(function (res) {

            if (res.status == 'false') {

            }
            else {

                if (res.length == 0) {
                    $("#error").show();

                }
                else {
                    for (var i = 0; i < res.length; i++) {
                        $scope.result = res[i];
                        $scope.result.desc = $scope.result.description;
                        $scope.getNoteList($scope.result.nric);
                        $scope.getLogList($scope.result.nric);
                        $scope.getTaskList($scope.result.nric);
                        $scope.getAppointmentList($scope.result.nric);
                        $scope.getNpLog($scope.result.nric);
                        // console.log('res',$scope.result.description);


                        $http.get(baseurl + 'customerType').success(function (res2) {

                            if (res2.status == 'false') {

                            }
                            else {
                                // no. of customer type
                                var custypeID = $scope.result.custypeID;

                                // DATA
                                $scope.customerType = res2;

                                //GET THE ID FOR SELECTED ID
                                $scope.selected = angular.copy($scope.customerType[custypeID]);


                                $scope.changeColor = function (id) {
                                    console.log('id', id);


                                    // this will change the color of patient type
                                    switch (id) {

                                        case 1:
                                            $scope.colorChange = {'color': '#aa66cc'};
                                            break;
                                        case 2:
                                            $scope.colorChange = {'color': '#fbc02d'};
                                            break;
                                        case 3:
                                            $scope.colorChange = {'color': '#263238'};
                                            break;
                                        default:
                                            $scope.colorChange = {'color': 'green'};
                                    }


                                }


                                console.log('customerType Res: ', $scope.customerType);

                            }

                        }).error(function () {

                        });

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

        if (username == "admin" && password == "admin") {

            window.localStorage.setItem('user', '1');

            $window.location = "patient.html";
        } else {
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
    $scope.$watch('customerList', function () {
        var no = 0;
        for (var i = 0; i < $scope.customerList.length; i++) {
            if ($scope.customerList[i].selected === true)
                no++;
        }
        $scope.noSelectedItems = no;
    }, true);


//********************************************************************************* */
//Delete selected patient
    $scope.delete = function (req, res) {


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

    $scope.getPatient = function (nric, res) {
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

    $scope.allCustomer = function (req, res) {

        if (window.localStorage.getItem('user') != "1") {
            $window.location = 'index.html';
        }

        $http.get(baseurl + 'allcustomer').success(function (res) {

            if (res.status == 'false') {

            }
            else {

                res.forEach(function (row) {
                    if (row.lastVisit)
                        row.lastVisit = new Date(row.lastVisit);
                });
                $scope.customerList = res;
                console.log('customerList: ', $scope.customerList);

            }

        }).error(function () {

        });


    }


//********************************************************************************* */
//Logout function
    $scope.logout = function () {
        window.localStorage.setItem('user', '0');
        $window.location = 'index.html';
    }


//********************************************************************************* */
//Trigger default success or error message
    $scope.init = function () {
        $("#error").hide();
    }


//********************************************************************************* */
//Other variables that needs to be initialised
    $scope.tab = 1;


//    patient note, log, task
    $scope.saveNote = function (note) {
        if (!note)
            return;
        console.log("note", note);
        console.log("result", $scope.result);
        var createObj = {
            customer_id: $scope.result.id,
            first_name: $scope.result.firstName,
            last_name: $scope.result.lastName,
            nric: $scope.result.nric,
            description: note || ""
        };
        console.log("createObj", createObj);

        $http.post(baseurl + 'note/' + $scope.result.nric, createObj).success(function (res) {
            console.log("res", res);
            $scope.note = "";
            $scope.noteList.unshift(createObj);
        }).error(function (err) {
            console.log("err", err);

        })

    };
    $scope.updateNote = function (note) {
        if (!note)
            return;
        $http.put(baseurl + 'note/' + $scope.result.nric + '/' + note.id, note).success(function (res) {
            console.log("res", res);
            $scope.note = "";
            $scope.switchEditMode(note);
        }).error(function (err) {
            console.log("err", err);
        })
    };
    $scope.deleteNote = function (item) {
        $http.delete(baseurl + 'note/' + $scope.result.nric + '/' + item.id).success(function (res) {
            console.log("res", res);
            $scope.noteList.splice(item, 1)
        }).error(function (err) {
            console.log("err", err);

        })
    };


    $scope.saveLog = function (log) {
        if (!log)
            return;
        console.log("log", log);
        console.log("result", $scope.result);
        var createObj = {
            customer_id: $scope.result.id,
            first_name: $scope.result.firstName,
            last_name: $scope.result.lastName,
            nric: $scope.result.nric,
            description: log || ""
        };
        console.log("createObj", createObj);

        $http.post(baseurl + 'log/' + $scope.result.nric, createObj).success(function (res) {
            console.log("res", res);
            $scope.log = "";
            $scope.logList.unshift(createObj);
        }).error(function (err) {
            console.log("err", err);

        })

    };
    $scope.updateLog = function (log) {
        if (!log)
            return;
        $http.put(baseurl + 'log/' + $scope.result.nric + '/' + log.id, log).success(function (res) {
            console.log("res", res);
            $scope.log = "";
            $scope.switchEditMode(log);
        }).error(function (err) {
            console.log("err", err);
        })
    };
    $scope.deleteLog = function (item) {
        $http.delete(baseurl + 'log/' + $scope.result.nric + '/' + item.id).success(function (res) {
            console.log("res", res);
            $scope.logList.splice(item, 1)
        }).error(function (err) {
            console.log("err", err);

        })
    };


    $scope.saveTask = function (task, end_date, status) {
        if (!task)
            return;
        console.log("task", task);
        console.log("result", $scope.result);
        var createObj = {
            customer_id: $scope.result.id,
            first_name: $scope.result.firstName,
            last_name: $scope.result.lastName,
            nric: $scope.result.nric,
            description: task || "",
            end_date: end_date,
            status: status
        };
        console.log("createObj", createObj);

        $http.post(baseurl + 'task/' + $scope.result.nric, createObj).success(function (res) {
            console.log("res", res);
            $scope.task = "";
            $scope.taskList.unshift(createObj);
        }).error(function (err) {
            console.log("err", err);

        })

    };
    $scope.updateTask = function (task) {
        if (!task)
            return;
        $http.put(baseurl + 'task/' + $scope.result.nric + '/' + task.id, task).success(function (res) {
            console.log("res", res);
            $scope.task = "";
            $scope.switchEditMode(task);
        }).error(function (err) {
            console.log("err", err);
        })
    };
    $scope.deleteTask = function (item) {
        $http.delete(baseurl + 'task/' + $scope.result.nric + '/' + item.id).success(function (res) {
            console.log("res", res);
            $scope.taskList.splice(item, 1)
        }).error(function (err) {
            console.log("err", err);

        })
    };

    $scope.saveAppointment = function (date, start, end) {

        console.log("result", $scope.result);
        var createObj = {
            customer_id: $scope.result.id,
            first_name: $scope.result.firstName,
            last_name: $scope.result.lastName,
            nric: $scope.result.nric,
            date: date,
            start_time: start,
            end_time: end
        };
        console.log("createObj", createObj);

        $http.post(baseurl + 'appointment/' + $scope.result.nric, createObj).success(function (res) {
            console.log("res", res);
            $scope.task = "";
            $scope.appointmentList.unshift(createObj);
        }).error(function (err) {
            console.log("err", err);

        })

    };
    $scope.updateAppointment = function (task) {
        console.log(task);

        if (!task)
            return;
        $http.put(baseurl + 'appointment/' + $scope.result.nric + '/' + task.id, task).success(function (res) {
            console.log("res", res);
            $scope.task = "";
            $scope.switchEditMode(task);
        }).error(function (err) {
            console.log("err", err);
        })
    };
    $scope.deleteAppointment = function (item) {
        $http.delete(baseurl + 'appointment/' + $scope.result.nric + '/' + item.id).success(function (res) {
            console.log("res", res);
            $scope.appointmentList.splice(item, 1)
        }).error(function (err) {
            console.log("err", err);

        })
    };

    $scope.noteList = [];
    $scope.logList = [];
    $scope.taskList = [];
    $scope.appointmentList = [];
    $scope.npLog = {};
    $scope.getNoteList = function (nric) {
        $http.get(baseurl + 'note/' + $scope.result.nric).success(function (res) {
            initEditObj(res);
            $scope.noteList = res;
        }).error(function (err) {
            console.log("err", err);

        })
    };
    $scope.getLogList = function (nric) {
        $http.get(baseurl + 'log/' + $scope.result.nric).success(function (res) {
            initEditObj(res);
            $scope.logList = res;
        }).error(function (err) {
            console.log("err", err);

        })
    };
    $scope.getTaskList = function (nric) {
        $http.get(baseurl + 'task/' + $scope.result.nric).success(function (res) {
            initEditObj(res);
            $scope.taskList = res;
        }).error(function (err) {
            console.log("err", err);

        })
    };
    $scope.getAppointmentList = function (nric) {
        $http.get(baseurl + 'appointment/' + $scope.result.nric).success(function (res) {
            initEditObj(res);
            $scope.appointmentList = res;
        }).error(function (err) {
            console.log("err", err);

        })
    };
    $scope.getNpLog = function (nric) {
        $http.get(baseurl + 'new-log/' + $scope.result.nric).success(function (res) {
            $scope.npLog = res;
        }).error(function (err) {
            console.log("err", err);

        })
    };
    $scope.switchEditMode = function (item) {
        item.editMode = !item.editMode;
    };
    function initEditObj(arrObj) {
        for (var i = 0; i < arrObj.length; i++) {
            arrObj[i].editMode = false;
            if (arrObj[i].end_date)
                arrObj[i].end_date = new Date(arrObj[i].end_date);

            if (arrObj[i].date)
                arrObj[i].date = new Date(arrObj[i].date);
            if (arrObj[i].start_time)
                arrObj[i].start_time = new Date(arrObj[i].start_time);
            if (arrObj[i].end_time)
                arrObj[i].end_time = new Date(arrObj[i].end_time);

        }
    }


    $scope.feedback = {
        "branchName": "Lucky Plaza",
        "manager": "Tan Yi Wei",
        "Email": "tomtan@gmail.com",
        "nirc": "S1355695D",
        "mobileNo": "90668301",
        "officeNo": "63882027",
        "gender": "Male",
        "address": "391B Orchard Road #23-01 Ngee Ann City Tower B",
        "postalCode": "238874",
        "country": "Singapore",
        "rating": 3
    };

    $scope.getFeedbackList = function () {
        var url_string = $location.absUrl();
        var url = new URL(url_string);
        var clinic = url.searchParams.get("clinic");
        console.log(clinic);
        $http.get(baseurl + 'feedback?clinic=' + clinic)
            .success(function (data) {
                console.log("data", data);
                $scope.feedbackList = data;

                var clinic3Score = 0;
                var clinic3Counter = 0;
                for (var i = 0; i < data.length; i++) {
                    clinic3Score = clinic3Score + data[i].feedback_value;
                    clinic3Counter += 1;
                }
                $scope.feedbackAvg = Math.trunc(clinic3Score / clinic3Counter);
                $scope.feedbackAvgName = $scope.getDesc($scope.feedbackAvg);

            })
            .error(function (err) {
                console.log("err", err);
            })
    };

    $scope.saveNewLog = function () {
        var createObj = {
            customer_id: $scope.result.id,
            first_name: $scope.result.firstName,
            last_name: $scope.result.lastName,
            nric: $scope.result.nric,
            description: JSON.stringify($scope.npLog)
        };
        console.log("createObj", createObj);

        $http.put(baseurl + 'new-log/' + $scope.result.nric, createObj).success(function (res) {
            console.log("res", res);
        }).error(function (err) {
            console.log("err", err);

        })

    };
    $scope.complaint_of_multi = [
        {name: 'Eir Pain', model:'EirPain'},
        {name: 'Head Injury', model:'HeadInjury'},
        {name: 'Medical Condition', model:'MedicalCondition'},
        {name: 'Discharge', model:'Discharge'},
        {name: 'Surgery', model:'Surgery'},
        {name: 'Current Medication', model:'CurrentMedication'},
        {name: 'Headache', model:'Headache'},
        {name: 'Vomiting', model:'Vomiting'},
        {name: 'Noise Exposer', model:'NoiseExposer'},
        {name: 'Sinusitus', model:'Sinusitus'},
        {name: 'Pain Swallowing', model:'PainSwallowing'},
        {name: 'Family History', model:'FamilyHistory'},
        {name: 'Vertigo', model:'Vertigo'},
        {name: 'Fullness of Ear', model:'FullnessofEar'},
        {name: 'Tinnnis', model:'Tinnnis'}
    ];
    $scope.complaint_of_three = [
        {name: 'Gradual', model:'gradual'},
        {name: 'Student', model:'student'},
        {name: 'Birth', model:'birth'}
    ];
    $scope.complaint_of_two = [
        {name: 'R', model:'right'},
        {name: 'L', model:'left'}
    ];
    $scope.areaOfDifficulty_six =[
        {name: '1 to 1', model:'1to1'},
        {name: 'Meeting', model:'Meeting'},
        {name: 'Television', model:'Television'},
        {name: 'Group', model:'Group'},
        {name: 'Church', model:'Church'},
        {name: 'Telephone', model:'Telephone'}
    ];
    $scope.hearingAid_three = [
        {name: 'Both Ears', model:'BothEars'},
        {name: 'Right', model:'Right'},
        {name: 'Left', model:'Left'}
    ];
    $scope.otoscopicExamination_right = [
        {name: 'Clear', model:'clear'},
        {name: 'Wax', model:'wax'},
        {name: 'Discharge', model:'discharge'}
    ];
    $scope.otoscopicExamination_left = [
        {name: 'Clear', model:'clear'},
        {name: 'Wax', model:'wax'},
        {name: 'Discharge', model:'discharge'}
    ];
    $scope.otoscopicExamination_table = generateTable(
        {
            row:["Right", "Left"],
            column:["Type", "ECV",	"SC", "Peak Pressure"]
        }
    );
    $scope.acousticRelexThresholds_first = generateTable(
        {
            row:["Right", "Left"],
            column:["500", "1000", "2000", "4000"]
        }
    );
    $scope.acousticRelexThresholds_second = generateTable(
        {
            row:["Right", "Left"],
            column:["500", "1000", "2000", "4000"]
        }
    );
    $scope.pureToneAudiometry_first = generateTable(
        {
            row:["AC", "BC", "MAC", "MBC"],
            column:["250", "500", "1000", "2000", "3000", "4000", "6000", "8000"]
        }
    );$scope.pureToneAudiometry_second = generateTable(
        {
            row:["AC", "BC", "MAC", "MBC"],
            column:["250", "500", "1000", "2000", "3000", "4000", "6000", "8000"]
        }
    ); $scope.pureToneAudiometry_third = generateTable(
        {
            row:["Right", "Left"],
            column:["PTA", "SRT", "PbMAX", "UCL"]
        }
    );
    $scope.pureToneAudiometry_four = [
        {name: 'Pure Tome Audimometry', model:'PureTomeAudimometry'},
        {name: 'Aided Test', model:'AidedTest'},
        {name: 'Play Audiometry', model:'PlayAudiometry'},
        {name: 'Unaided Test', model:'UnaidedTest'}
    ];

    function generateTable(data) {
        var rowList = data.row;
        var columnList = data.column;
        var table = [];

        for(var i = 0; i < rowList.length; i++){
            table[i+1] = [];
            for(var j = 0; j < columnList.length; j++){
                table[i+1][j+1] = {
                    model: i+'_'+j,
                    type: 'input'
                }
            }
        }
        table[0] = [];
        for(var i = 0; i < rowList.length; i++){
            table[i+1][0] = {
                type: 'label',
                value: rowList[i]
            }
        }
        for(var i = 0; i < columnList.length; i++){
            table[0][i+1] = {
                type: 'label',
                value: columnList[i]
            }
        }
        return table;
    }
})
    .controller('NewPLogCtrl', function ($scope, $http, $window, $location, $rootScope, $filter) {

    })

    .directive('rating', function () {
        return {
            restrict: "AE",
            scope: {
                bindedModel: "=ngModel"
            },
            template: "<div style=\"font-size: 24px; color: #FEBF00\">\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 0 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 1 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 2 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 3 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            <span class=\"glyphicon .glyphicon-star-empty\" ng-class=\"bindedModel > 4 ? 'glyphicon-star': 'glyphicon-star-empty'\"></span>\n            </div>",
            link: function (scope, element, attrs) {
                // console.log(attrs);
            }
        }
    });




