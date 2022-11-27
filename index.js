// https://randomuser.me/api for get request.
//https://jsonplaceholder.typicode.com/ for post request.

//utility function
//1 utility function to get DOM element from the string
console.log("hello Postman");
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

//initialize no of parametes
let addedParamsCount = 0;

let parameterBox = document.getElementById("parametersBox");
parameterBox.style.display = "none";

//If user clicks on params, hide the json box
let paramsRadio = document.getElementById("contentType");

paramsRadio.addEventListener("click", () => {
  console.log("ParamsRadio");
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

//If user clicks on  json, hide the parama box
let jsonRadio = document.getElementById("json");

jsonRadio.addEventListener("click", () => {
  console.log("json radio");
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
  // document.getElementById("parametersBox").style.display = "none";
});

//if the user clicks on + button, add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let paramms = document.getElementById("paramms");
  let string = `<div class="row mb-3">
                    <label for="parameterKey1" class="col-sm-2 col-form-label">parameter ${
                      addedParamsCount + 2
                    }</label>
                    <div class="col-sm-5">
                    <input type="email" class="form-control" id="parameterKey${
                      addedParamsCount + 2
                    }" placeholder="Enter parameter 1 key">
                    </div>
                    <div class="col-md-5 d-flex">
                    <input type="email" class="form-control" id="parameterValue${
                      addedParamsCount + 2
                    }" placeholder="Enter parameter 1 value">
                    <button id="addParam" class="btn btn-primary d-inline deleteParam">-</button>
            </div>
  </div>`;
  //Convert the element sting to DOM node
  let paramElement = getElementFromString(string);
  console.log(paramElement);
  paramms.appendChild(paramElement);
  //Add an eventlistener to remove the parameter on clicking - button.
  let deleteParam = document.getElementsByClassName("deleteParam");

  for (let item of deleteParam) {
    item.addEventListener("click", (e) => {
      //TODO: add a confirmation box to confirm the deletion.
      e.target.parentElement.parentElement.remove();
    });
  }

  addedParamsCount++;
});

//if the user clicks on the submit button
let submit = document.getElementById("submit").addEventListener("click", async() => {
  //show please wait in the response box to request patience from the user

  document.getElementById("responseJsonText").value =
    "Please wait. fetching response...";

  // fetch all the values user has entered
  let url = document.getElementById("urlField").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;

  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;

  //log all the values in the console for debugging.

  //if user has used params option instead of json, collect all the parameter in an object.
  let data;
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamsCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
      data = JSON.stringify(data);
    }
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  console.log("url is, url", url);
  console.log("request type is, ", requestType);
  console.log("contentType is ", contentType);
  console.log("data is ", data);

  //if the request type is post, invoke fetch api to create a post request
  if (requestType == "GET") {
    await fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseJsonText").value = text;
      });
  } else {
   await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
       .then((text) => {
        document.getElementById("responseJsonText").value = text;
      });
  }
});
