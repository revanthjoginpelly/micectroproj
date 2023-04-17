var baseUrl = "http://api.login2explore.com:5577";
var Imlendpoint = "/api/iml";
var Irlendpoint = "/api/irl";
var token = "90932800|-31949279050282272|90948147";
var rel = "PROJECT-TABLE ";
var dbName = "COLLEGE-DB";

function checkEmptyFields(obj) {
  for (const field in obj) {
    if (!obj[field]) {
      return false;
    }
  }
  return true;
}

function record(resObj) {
  var data = JSON.parse(resObj.data);
  localStorage.setItem("recno", data.rec_no);
}

$("#proId").focus();
function getEmpID() {
  var proID = $("#proId").val();
  var json = {
    id: proID,
  };
  return JSON.stringify(json);
}

function fillData(resObj) {
  record(resObj);
  var data = JSON.parse(resObj.data).record;
  $("#proName").val(data.name);
  $("#proAssign").val(data.Assigned_to);
  $("#proAssignDate").val(data.Assignment_Date);
  $("#proDead").val(data.DeadlineDate);
}
function validate() {
  var id, name, Assigned_to, Assignment_Date, DeadlineDate;
  id = $("#proId").val();
  name = $("#proName").val();
  Assigned_to = $("#proAssign").val();
  Assignment_Date = $("#proAssignDate").val();
  DeadlineDate = $("#proDead").val();
  if (id === "") {
    alert("id required");
    $("#proId").focus();
  }
  if (name === "") {
    alert("name required");
    $("#proName").focus();
  }
  if (Assigned_to === "") {
    alert("Assigned to required");
    $("#proAssign").focus();
  }
  if (Assignment_Date === "") {
    alert("Assignment Date required");
    $("#proAssignDate").focus();
  }
  if (DeadlineDate === "") {
    alert("Deadlone Date required");
    $("#proDead").focus();
  }
  var jsonobj = {
    id: id,
    name: name,
    Assigned_to: Assigned_to,
    Assignment_Date: Assignment_Date,
    DeadlineDate: DeadlineDate,
  };
  return JSON.stringify(jsonobj);
}

function saveEmployee() {
  var data = validate();
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
    $("#proId").focus();
  }
}
function Reset() {
  $("#proId").val("");
  $("#proName").val("");
  $("#proAssign").val("");
  $("#proAssignDate").val("");
  $("#proDead").val("");
  $("#proId").prop("disabled", false);
  $("#empChange").prop("disabled", true);
  $("#empReset").prop("disabled", true);
  $("#empSave").prop("disabled", true);
  $("#proId").focus();
}
function GetId() {
  var empID = getEmpID();
  var getRequest = createGET_BY_KEYRequest(token, dbName, rel, empID);
  jQuery.ajaxSetup({ async: false });
  var resObj = executeCommandAtGivenBaseUrl(getRequest, baseUrl, Irlendpoint);
  jQuery.ajaxSetup({ async: true });
  if (resObj.status === 400) {
    $("#empSave").prop("disabled", false);
    $("#empReset").prop("disabled", false);
    $("#proName").focus();
  } else if (resObj.status === 200) {
    fillData(resObj);
    $("#proId").prop("disabled", true);
    $("#empChange").prop("disabled", false);
    $("#empReset").prop("disabled", false);
    $("#proName").focus();
    
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
    $("#proId").focus();
  }
}
