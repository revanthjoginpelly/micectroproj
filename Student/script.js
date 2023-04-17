var baseUrl = "http://api.login2explore.com:5577";
var Imlendpoint = "/api/iml";
var Irlendpoint = "/api/irl";
var token = "90932800|-31949279050282272|90948147";
var rel = "STUDENT-TABLE ";
var dbName = "SCHOOL-DB";

function record(resObj) {
  var data = JSON.parse(resObj.data);
  localStorage.setItem("recno", data.rec_no);
}
function checkEmptyFields(obj) {
  for (const field in obj) {
    if (!obj[field]) {
      return false;
    }
  }
  return true;
}
$("#empId").focus();
function getEmpID() {
  var empID = $("#empId").val();
  var json = {
    id: empID,
  };
  return JSON.stringify(json);
}

function fillData(resObj) {
  record(resObj);
  var data = JSON.parse(resObj.data).record;
  $("#empName").val(data.name);
  $("#empClass").val(data.class);
  $("#empDob").val(data.dob);
  $("#empAdress").val(data.Adress);
  $("#empEnrollment").val(data.enrollmentDate);
}
function validate() {
  var id, name, clas, dob, adress, enrollment;
  id = $("#empId").val();
  name = $("#empName").val();
  clas = $("#empClass").val();
  dob = $("#empDob").val();
  adres = $("#empAdress").val();
  enrollment = $("#empEnrollment").val();
  if (id === "") {
    alert("id required");
    $("#empId").focus();
  }
  if (name === "") {
    alert("name required");
    $("#empName").focus();
  }
  if (clas === "") {
    alert("cls required");
    $("#empClass").focus();
  }
  if (dob === "") {
    alert("dob required");
    $("#empDob").focus();
  }
  if (adres === "") {
    alert("adress required");
    $("#empAdress").focus();
  }
  if (enrollment === "") {
    alert("enrollment required");
    $("#empEnrollment").focus();
  }
  var jsonobj = {
    id: id,
    name: name,
    class: clas,
    dob: dob,
    Adress: adres,
    enrollmentDate: enrollment,
  };
  return JSON.stringify(jsonobj);
}
function saveEmployee() {
  var data = validate();
  console.log(data);
  if (data === "") {
    return "";
  }
  const obj = JSON.parse(data);
  if (checkEmptyFields(obj)) {
    var putrequest = createPUTRequest(token, data, dbName, rel);
    jQuery.ajaxSetup({ async: false });
    var resObj = executeCommandAtGivenBaseUrl(putrequest, baseUrl, Imlendpoint);
    jQuery.ajaxSetup({ async: true });
    Reset();
    $("#empId").focus();
  }
}
function Reset() {
  $("#empId").val("");
  $("#empName").val("");
  $("#empClass").val("");
  $("#empDob").val("");
  $("#empAdress").val("");
  $("#empEnrollment").val("");
  $("#empId").prop("disabled", false);
  $("#empChange").prop("disabled", true);
  $("#empReset").prop("disabled", true);
  $("#empSave").prop("disabled", true);
  $("#empId").focus();
}

function GetId() {
  var empID = getEmpID();
  console.log(empID);
  var getRequest = createGET_BY_KEYRequest(token, dbName, rel, empID);
  jQuery.ajaxSetup({ async: false });
  var resObj = executeCommandAtGivenBaseUrl(getRequest, baseUrl, Irlendpoint);
  jQuery.ajaxSetup({ async: true });
  if (resObj.status === 400) {
    $("#empSave").prop("disabled", false);
    $("#empReset").prop("disabled", false);
    $("#empName").focus();
  } else if (resObj.status === 200) {
    fillData(resObj);
    $("#empId").prop("disabled", true);
    $("#empChange").prop("disabled", false);
    $("#empReset").prop("disabled", false);
    $("#empName").focus();
  }
}
function ChangeEmployee() {
  var jsonobchng = validate();
  const obj = JSON.parse(jsonobchng);
  if (checkEmptyFields(obj)) {
    var update = createUPDATERecordRequest(
      token,
      jsonobchng,
      dbName,
      rel,
      localStorage.getItem("recno")
    );
    jQuery.ajaxSetup({ async: false });
    var resObj = executeCommandAtGivenBaseUrl(update, baseUrl, Imlendpoint);
    jQuery.ajaxSetup({ async: true });
    Reset();
    $("#empId").focus();
  }
}
