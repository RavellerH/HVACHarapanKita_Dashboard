let config = {};
getConfig();
setInterval(getConfig, 1000);
// Function to fetch configuration
function getConfig() {
  // Replace 'config.json' with the path to your configuration file
  const response = fetch("../config.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.serverIP);
      config = data.serverIP;
    })
    .catch((error) => {
      console.error("Error fetching configuration:", error);
      return {}; // Return an empty object if there's an error
    });

  return response;
}

function updateValue() {
  fetch("http://" + config + ":1880/getData")
    .then((response) => response.json())
    .then((data) => {
      const preFilter = parseFloat(data[0].Pre_Filter);
      const hepaFilter = parseFloat(data[0].HEPA_Filter);
      const outdoorUnit = parseFloat(data[0].Outdoor_Unit);
      const ahuStatus = parseFloat(data[0].AHU_Status);
      const bFan = parseFloat(data[0].Booster_Fan);
      const eFan = parseFloat(data[0].Exhaust_Fan);
      const heat1 = parseFloat(data[0].Heater_1);
      const heat2 = parseFloat(data[0].Heater_2);

      const exhaustStatusElement = document.getElementById("Exhaust_status");
      const outdoorStatusElement = document.getElementById("Outdoor_status");
      const heat1StatusElement = document.getElementById("Heater1_status");
      const heat2StatusElement = document.getElementById("Heater2_status");
      const boosterStatusElement = document.getElementById("Booster_status");
      const filterStatusElement = document.getElementById("Filter_status");
      const hepaStatusElement = document.getElementById("HEPA_status");

      if (eFan === 1) {
        exhaustStatusElement.style.backgroundColor =
          exhaustStatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        exhaustStatusElement.style.color = "white"; // Text color
        exhaustStatusElement.textContent = "Running";
      } else {
        exhaustStatusElement.style.backgroundColor = "red";
        exhaustStatusElement.style.color = "white"; // Text color
        exhaustStatusElement.textContent = "Stopped";
      }
      if (outdoorUnit === 1) {
        outdoorStatusElement.style.backgroundColor =
          outdoorStatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        outdoorStatusElement.style.color = "white"; // Text color
        outdoorStatusElement.textContent = "Running";
      } else {
        outdoorStatusElement.style.backgroundColor = "red";
        outdoorStatusElement.style.color = "white"; // Text color
        outdoorStatusElement.textContent = "Stopped";
      }
      if (heat1 === 1) {
        heat1StatusElement.style.backgroundColor =
          heat1StatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        heat1StatusElement.style.color = "white"; // Text color
        heat1StatusElement.textContent = "Running";
      } else {
        heat1StatusElement.style.backgroundColor = "red";
        heat1StatusElement.style.color = "white"; // Text color
        heat1StatusElement.textContent = "Stopped";
      }
      if (heat2 === 1) {
        heat2StatusElement.style.backgroundColor =
          heat2StatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        heat2StatusElement.style.color = "white"; // Text color
        heat2StatusElement.textContent = "Running";
      } else {
        heat2StatusElement.style.backgroundColor = "red";
        heat2StatusElement.style.color = "white"; // Text color
        heat2StatusElement.textContent = "Stopped";
      }
      if (bFan === 1) {
        boosterStatusElement.style.backgroundColor =
          boosterStatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        boosterStatusElement.style.color = "white"; // Text color
        boosterStatusElement.textContent = "Running";
      } else {
        boosterStatusElement.style.backgroundColor = "red";
        boosterStatusElement.style.color = "white"; // Text color
        boosterStatusElement.textContent = "Stopped";
      }
      if (preFilter >= 150 && preFilter <= 155) {
        filterStatusElement.style.backgroundColor =
          filterStatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        filterStatusElement.style.color = "white"; // Text color
        filterStatusElement.textContent = "Running";
      } else {
        filterStatusElement.style.backgroundColor = "red";
        filterStatusElement.style.color = "white"; // Text color
        filterStatusElement.textContent = "Stopped";
      }
      if (hepaFilter >= 150 && hepaFilter <= 155) {
        hepaStatusElement.style.backgroundColor =
          hepaStatusElement.style.backgroundColor === "lime"
            ? "#CCFF99"
            : "lime";
        hepaStatusElement.style.color = "white"; // Text color
        hepaStatusElement.textContent = "Running";
      } else {
        hepaStatusElement.style.backgroundColor = "red";
        hepaStatusElement.style.color = "white"; // Text color
        hepaStatusElement.textContent = "Stopped";
      }

      const tempCathlab = parseFloat(data[0].Temp_Cathlab);
      const rhCathlab = parseFloat(data[0].RH_Cathlab);

      const TempElement = document.getElementById("TBDSAa");
      TempElement.textContent = tempCathlab + "°C";
      const RHElement = document.getElementById("TBDSBb");
      RHElement.textContent = rhCathlab + "%";
      removeNotification();
    })
    .catch((error) => {
      console.error("Error:", error);
      // Show notification for connection error
      showNotification("Connecting...");
    });
  fetch("http://" + config + ":1880/getDataSetting")
    .then((response) => response.json())
    .then((data) => {
      const currentTemperature = parseFloat(data[0].TempCathlab);
      const TBDSAElement = document.getElementById("TBDSA");
      TBDSAElement.textContent = currentTemperature + "°C";
      const currentRH = parseFloat(data[0].RHCathlab);
      const TBDSBRHElement = document.getElementById("TBDSBRH");
      TBDSBRHElement.textContent = currentRH + "%";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// Function to show notification
function showNotification(message) {
  const notificationElement = document.createElement("div");
  notificationElement.textContent = message;
  notificationElement.classList.add("notification");
  document.body.appendChild(notificationElement);
}

// Function to remove notification
function removeNotification() {
  const notificationElement = document.querySelector(".notification");
  if (notificationElement) {
    notificationElement.remove();
  }
}
updateValue();
setInterval(updateValue, 1000);

function changeTemperature(delta) {
  const TBDSAElement = document.getElementById("TBDSA");
  let currentTemperature = parseInt(TBDSAElement.textContent); // Get current temperature as an integer
  // currentTemperature += delta; // Increment or decrement the temperature based on the delta
  const newTemperature = currentTemperature + delta;
  // Check if the new temperature is within the acceptable range (18 to 26 degrees Celsius)
  if (newTemperature < 18 || newTemperature > 26) {
    console.log(
      "Temperature is outside the acceptable range (18 to 26 degrees Celsius). Skipping update."
    );
    return; // Exit the function without updating the temperature
  }

  TBDSAElement.textContent = newTemperature + "°C"; // Update the temperature value in the HTML

  // Send the updated temperature value to the server via HTTP GET request
  fetch(`http://`  + config + `:1880/setDataTemp?value=${newTemperature}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Temperature updated successfully:", data);
    })
    .catch((error) => {
      console.error("There was a problem updating the temperature:", error);
    });
}
function changeRH(delta) {
  const TBDSBRHElement = document.getElementById("TBDSBRH");
  let currentRH = parseInt(TBDSBRHElement.textContent); // Get current temperature as an integer
  // currentRH += delta; // Increment or decrement the temperature based on the delta
  const newRH = currentRH + delta;
  // Check if the new temperature is within the acceptable range (18 to 26 degrees Celsius)
  if (newRH < 50 || newRH > 60) {
    console.log(
      "RH is outside the acceptable range (50 to 60). Skipping update."
    );
    return; // Exit the function without updating the temperature
  }

  TBDSBRHElement.textContent = newRH + "%"; // Update the temperature value in the HTML

  // Send the updated temperature value to the server via HTTP GET request
  fetch(`http://`  + config + `:1880/setDataRH?value=${newRH}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Temperature updated successfully:", data);
    })
    .catch((error) => {
      console.error("There was a problem updating the temperature:", error);
    });
}
// ______________________________
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const filter = document.getElementById("filter");
    filter.classList.add("active");
  }, 2);
});

var win = navigator.platform.indexOf("Win") > -1;
if (win && document.querySelector("#sidenav-scrollbar")) {
  var options = {
    damping: "0.5",
  };
  Scrollbar.init(document.querySelector("#sidenav-scrollbar"), options);
}

function takedatarelay() {
  var http = new XMLHttpRequest();
  http.open("GET", "http://127.0.0.1:1887/GetStatusRelay", true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      datarelay = data;
      createbutton();
    }
  };
}

function SendCommand(address) {
  var http = new XMLHttpRequest();
  http.open(
    "GET",
    "http://127.0.0.1:1887/SendCommand?address=" + String(address),
    true
  );
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      takedatarelay();
      createbutton();
    }
  };
}
function datasensor() {
  var http = new XMLHttpRequest();
  http.open("GET", "http://127.0.0.1:1887/GetCurrent", true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var len = data.length;
      main(data, len);
    }
  };
}
function Upper(data, len) {
  document.getElementById("tbdproduct").innerHTML =
    data[data.length - 1].Turbidity_Product;
  document.getElementById("TBDSA").innerHTML =
    data[data.length - 1].Turbidity_Sedimentation_A;
  document.getElementById("TBDSB").innerHTML =
    data[data.length - 1].Turbidity_Sedimentation_B;
}

function main(data, len) {
  Upper(data, len);
}
function start() {
  takedatarelay();
  datasensor();
}
start();

function toggleMode(option, thisID, otherID, nID) {
  var url = "http://127.0.0.1:1887/getFilterMode?";
  if (option === "A") {
    document.getElementById(otherID).checked = false;
    document.getElementById("AutoF" + nID).style.display = "block";
    document.getElementById("ManualF" + nID).style.display = "none";
    url = url + "ID=" + thisID + "&Mode" + "=1";
  } else if (option === "B") {
    document.getElementById(otherID).checked = false;
    document.getElementById("AutoF" + nID).style.display = "none";
    document.getElementById("ManualF" + nID).style.display = "block";
    url = url + "ID=" + thisID + "&Mode" + "=0";
  }

  var http = new XMLHttpRequest();
  http.open("GET", url, true);
  http.send();
}

function btnCheck(buttonId) {
  document.getElementById(buttonId.substring(0, 3) + "_status").placeholder =
    "Getting Data";
  var buttonElement = document.getElementById(buttonId);
  var originalColor = buttonElement.style.backgroundColor;
  var originalText = buttonElement.textContent;
  var inputIds = [];
  inputIds.push(buttonId.substr(0, 3) + "_BLO_input");
  inputIds.push(buttonId.substr(0, 3) + "_BWS_input");

  document.querySelectorAll("button").forEach(function (buttonElement) {
    buttonElement.disabled = true;
  });
  setTimeout(() => {
    document.querySelectorAll("button").forEach(function (buttonElement) {
      buttonElement.disabled = false;
    });
  }, 500);

  buttonElement.style.backgroundColor = "#945e21";
  buttonElement.innerHTML =
    '<i class="btn bx bxs-bolt-circle bx-flashing btn-loading-icon"></i>';
  var http = new XMLHttpRequest();
  var url = "http://192.168.137.137:1887/CheckBackwash?ID=" + buttonId;
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText);
      setTimeout(function () {
        document.getElementById(inputIds[0]).value = data.BLO;
        document.getElementById(inputIds[1]).value = data.BWS;
        if (data.Stat) {
          document.getElementById(
            buttonId.substring(0, 3) + "_status"
          ).placeholder = "Checked";
        } else {
          document.getElementById(
            buttonId.substring(0, 3) + "_status"
          ).placeholder = "Check Failed";
        }
        buttonElement.style.backgroundColor = originalColor;
        buttonElement.textContent = originalText;
      }, 500);
    }
  };
}

function btnSubmit(buttonId) {
  var buttonElement = document.getElementById(buttonId);
  var originalColor = buttonElement.style.backgroundColor;
  var originalText = buttonElement.textContent;
  var inputIds = [];
  inputIds.push(buttonId.substr(0, 3) + "_BLO_input");
  inputIds.push(buttonId.substr(0, 3) + "_BWS_input");
  var data = [];
  var validationFailed = false;
  inputIds.forEach(function (id) {
    var inputValue = document.getElementById(id).value;
    data.push(parseInt(inputValue));
    if (!inputValue || parseFloat(inputValue) === 0) {
      validationFailed = true;
      return;
    }
  });

  if (validationFailed) {
    Swal.fire({
      icon: "error",
      title: "Submit Failed!",
      text: "Ensure that the duration inputs are not empty or zero.",
    });
    return;
  }

  document.getElementById(buttonId.substring(0, 3) + "_status").placeholder =
    "Submitting";
  document.querySelectorAll("button").forEach(function (buttonElement) {
    buttonElement.disabled = true;
  });
  setTimeout(() => {
    document.querySelectorAll("button").forEach(function (buttonElement) {
      buttonElement.disabled = false;
    });
  }, 500);

  buttonElement.style.backgroundColor = "#391e75";
  buttonElement.innerHTML =
    '<i class="btn bx bxs-bolt-circle bx-flashing btn-loading-icon"></i>';
  var http = new XMLHttpRequest();
  var url =
    "http://192.168.137.137:1887/SettingBackwash?ID=" +
    buttonId +
    "&Data=" +
    JSON.stringify(data);
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText);
      setTimeout(function () {
        if (data.Stat) {
          document.getElementById(
            buttonId.substring(0, 3) + "_status"
          ).placeholder = "Submitted";
        } else {
          document.getElementById(
            buttonId.substring(0, 3) + "_status"
          ).placeholder = "Submit Failed";
        }
        buttonElement.style.backgroundColor = originalColor;
        buttonElement.textContent = originalText;
      }, 500);
    }
  };
}

function btnStop(buttonId) {
  document.getElementById(buttonId.substring(0, 3) + "_status").placeholder =
    "Stopping";
  var buttonElement = document.getElementById(buttonId);
  var originalColor = buttonElement.style.backgroundColor;
  var originalText = buttonElement.textContent;
  document.querySelectorAll("button").forEach(function (buttonElement) {
    buttonElement.disabled = true;
  });
  setTimeout(() => {
    document.querySelectorAll("button").forEach(function (buttonElement) {
      buttonElement.disabled = false;
    });
  }, 500);

  buttonElement.style.backgroundColor = "#75195e";
  buttonElement.innerHTML =
    '<i class="btn bx bxs-bolt-circle bx-flashing btn-loading-stop"></i>';

  setTimeout(() => {
    // window.location.reload();
    buttonElement.style.backgroundColor = originalColor;
    buttonElement.textContent = originalText;
    document.getElementById(buttonId.substring(0, 3) + "_status").placeholder =
      "Stopped";
  }, 2000);

  // var http = new XMLHttpRequest();
  // var url = "http://192.168.137.137:1887/StopBackwash?ID=" + buttonId;
  // http.open("GET", url, true);
  // http.send();
  // http.onreadystatechange = function () {
  //     if (this.readyState === 4 && this.status === 200) {
  //         var data = JSON.parse(this.responseText);
  //         setTimeout(function () {
  //             if (data.Stat) {
  //                 document.getElementById(buttonId.substring(0, 3) + "_status").placeholder = "Stopped";
  //             } else {
  //                 document.getElementById(buttonId.substring(0, 3) + "_status").placeholder = "Stop Failed";
  //             }
  //             buttonElement.style.backgroundColor = originalColor;
  //             buttonElement.textContent = originalText;
  //         }, 500);
  //     }
  // }
}

function btnRun(buttonId) {
  document.getElementById(buttonId.substring(0, 3) + "_status").placeholder =
    "Starting";
  var buttonElement = document.getElementById(buttonId);
  var originalColor = buttonElement.style.backgroundColor;
  var originalText = buttonElement.textContent;
  document.querySelectorAll("button").forEach(function (buttonElement) {
    buttonElement.disabled = true;
  });
  setTimeout(() => {
    document.querySelectorAll("button").forEach(function (buttonElement) {
      buttonElement.disabled = false;
    });
  }, 500);
  buttonElement.style.backgroundColor = "#21612c";
  buttonElement.innerHTML =
    '<i class="btn bx bxs-bolt-circle bx-flashing btn-loading-run"></i>';

  setTimeout(() => {
    // window.location.reload();
    buttonElement.style.backgroundColor = originalColor;
    buttonElement.textContent = originalText;
    document.getElementById(buttonId.substring(0, 3) + "_status").placeholder =
      "Running";
  }, 2000);

  //   var http = new XMLHttpRequest();
  //   var url = "http://192.168.137.137:1887/RunBackwash?ID=" + buttonId;
  //   http.open("GET", url, true);
  //   http.send();
  //   http.onreadystatechange = function () {
  //       if (this.readyState === 4 && this.status === 200) {
  //           var data = JSON.parse(this.responseText);
  //           setTimeout(function () {
  //               if (data.Stat) {
  //                   document.getElementById(buttonId.substring(0, 3) + "_status").placeholder = "Running";
  //               } else {
  //                   document.getElementById(buttonId.substring(0, 3) + "_status").placeholder = "Run Failed";
  //               }
  //               buttonElement.style.backgroundColor = originalColor;
  //               buttonElement.textContent = originalText;
  //           }, 500);
  //       }
  //   }
}

function btnInlet(buttonId) {
  updateFlag = false;
  var buttonElement = document.getElementById(buttonId);
  var originalColor = buttonElement.style.backgroundColor;
  document.querySelectorAll("button").forEach(function (buttonElement) {
    buttonElement.disabled = true;
  });
  setTimeout(() => {
    document.querySelectorAll("button").forEach(function (buttonElement) {
      buttonElement.disabled = false;
    });
  }, 4500);
  buttonElement.style.backgroundColor = "#f75e05";
  buttonElement.style.color = "#fff";
  buttonElement.innerHTML =
    '<i class="btn bx bxs-bolt-circle bx-flashing btn-loading-run"></i>';

  if (originalColor === "rgb(94, 114, 228)") {
    var action = 1;
  } else if (originalColor === "rgb(0, 247, 21)") {
    var action = 0;
  }
  var http = new XMLHttpRequest();
  var url =
    "http://192.168.137.137:1887/InletManual?ID=" +
    buttonId +
    "&action=" +
    action;
  http.open("GET", url, true);
  http.send();
  setTimeout(function () {
    updateFlag = true;
    updateButton();
  }, 4500);
}

function btnDrain(buttonId) {
  updateFlag = false;
  var buttonElement = document.getElementById(buttonId);
  var originalColor = buttonElement.style.backgroundColor;
  document.querySelectorAll("button").forEach(function (buttonElement) {
    buttonElement.disabled = true;
  });
  setTimeout(() => {
    document.querySelectorAll("button").forEach(function (buttonElement) {
      buttonElement.disabled = false;
    });
  }, 4500);
  buttonElement.style.backgroundColor = "#f75e05";
  buttonElement.style.color = "#fff";
  buttonElement.innerHTML =
    '<i class="btn bx bxs-bolt-circle bx-flashing btn-loading-valve"></i>';

  if (originalColor === "rgb(94, 114, 228)") {
    var action = 1;
  } else if (originalColor === "rgb(0, 247, 21)") {
    var action = 0;
  }

  var http = new XMLHttpRequest();
  var url =
    "http://192.168.137.137:1887/DrainManual?ID=" +
    buttonId +
    "&action=" +
    action;
  http.open("GET", url, true);
  http.send();
  setTimeout(function () {
    updateFlag = true;
    updateButton();
  }, 4500);
}

function btnOutlet(buttonId) {
  updateFlag = false;
  var buttonElement = document.getElementById(buttonId);
  var originalColor = buttonElement.style.backgroundColor;
  document.querySelectorAll("button").forEach(function (buttonElement) {
    buttonElement.disabled = true;
  });
  setTimeout(() => {
    document.querySelectorAll("button").forEach(function (buttonElement) {
      buttonElement.disabled = false;
    });
  }, 4500);
  buttonElement.style.backgroundColor = "#f75e05";
  buttonElement.style.color = "#fff";
  buttonElement.innerHTML =
    '<i class="btn bx bxs-bolt-circle bx-flashing btn-loading-valve"></i>';

  if (originalColor === "rgb(94, 114, 228)") {
    var action = 1;
  } else if (originalColor === "rgb(0, 247, 21)") {
    var action = 0;
  }

  var http = new XMLHttpRequest();
  var url =
    "http://192.168.137.137:1887/OutletManual?ID=" +
    buttonId +
    "&action=" +
    action;
  http.open("GET", url, true);
  http.send();
  setTimeout(function () {
    updateFlag = true;
    updateButton();
  }, 4500);
}

function btnBlower(buttonId) {
  updateFlag = false;
  var buttonElement = document.getElementById(buttonId);
  var originalColor = buttonElement.style.backgroundColor;
  document.querySelectorAll("button").forEach(function (buttonElement) {
    buttonElement.disabled = true;
  });
  setTimeout(() => {
    document.querySelectorAll("button").forEach(function (buttonElement) {
      buttonElement.disabled = false;
    });
  }, 4500);
  buttonElement.style.backgroundColor = "#f75e05";
  buttonElement.style.color = "#fff";
  buttonElement.innerHTML =
    '<i class="btn bx bxs-bolt-circle bx-flashing btn-loading-valve"></i>';

  if (originalColor === "rgb(94, 114, 228)") {
    var action = 1;
  } else if (originalColor === "rgb(0, 247, 21)") {
    var action = 0;
  }

  var http = new XMLHttpRequest();
  var url =
    "http://192.168.137.137:1887/BlowerManual?ID=" +
    buttonId +
    "&action=" +
    action;
  http.open("GET", url, true);
  http.send();
  setTimeout(function () {
    updateFlag = true;
    updateButton();
  }, 4500);
}

function btnBackwash(buttonId) {
  updateFlag = false;
  var buttonElement = document.getElementById(buttonId);
  var originalColor = buttonElement.style.backgroundColor;
  document.querySelectorAll("button").forEach(function (buttonElement) {
    buttonElement.disabled = true;
  });
  setTimeout(() => {
    document.querySelectorAll("button").forEach(function (buttonElement) {
      buttonElement.disabled = false;
    });
  }, 4500);
  buttonElement.style.backgroundColor = "#f75e05";
  buttonElement.style.color = "#fff";
  buttonElement.innerHTML =
    '<i class="btn bx bxs-bolt-circle bx-flashing btn-loading-valve"></i>';

  if (originalColor === "rgb(94, 114, 228)") {
    var action = 1;
  } else if (originalColor === "rgb(0, 247, 21)") {
    var action = 0;
  }

  var http = new XMLHttpRequest();
  var url =
    "http://192.168.137.137:1887/BackwashManual?ID=" +
    buttonId +
    "&action=" +
    action;
  http.open("GET", url, true);
  http.send();
  setTimeout(function () {
    updateFlag = true;
    updateButton();
  }, 4500);
}

var updateFlag = true;
function updateButton() {
  if (updateFlag) {
    var http = new XMLHttpRequest();
    var url = "http://192.168.137.137:1887/UpdateButton?";
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var data = JSON.parse(this.responseText);
        var btnID = ["FI_INL", "FI_OTL", "FI_DRA", "FI_BLO", "FI_BWS"];
        var btnNM = ["Inlet", "Outlet", "Drain", "Blower", "Backwash"];

        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < 5; j++) {
            buttonElement = document.getElementById(
              btnID[j].slice(0, 2) + (i + 1) + btnID[j].slice(2)
            );
            if (data[i][j] === 1) {
              buttonElement.style.backgroundColor = "rgb(0, 247, 21)";
              buttonElement.textContent = btnNM[j];
            } else if (data[i][j] === 0) {
              buttonElement.style.backgroundColor = "rgb(94, 114, 228)";
              buttonElement.textContent = btnNM[j];
            }
          }
        }
      }
    };
  }
}

setInterval(updateButton, 1000);

function updateSensor() {
  var http = new XMLHttpRequest();
  var url = "http://192.168.137.137:1887/UpdateSensor?";
  http.open("GET", url, true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var data = JSON.parse(this.responseText);
      var inputIds = [];
      var inputIds2 = [];
      for (var i = 1; i <= 8; i++) {
        inputIds.push("FI" + [i] + "_low");
        inputIds2.push("FI" + [i] + "_high");
      }
      inputIds.forEach(function (id) {
        document.getElementById(id).hidden = !data[`Filter${id[2]}L`];
      });
      inputIds2.forEach(function (id) {
        document.getElementById(id).hidden = !data[`Filter${id[2]}H`];
      });
    }
  };
}
updateSensor();
setInterval(updateSensor, 1000);

// Function to disable all buttons
// Function to disable all buttons
function disableAllButtons() {
  document.getElementById("increaseTemperatureButton").disabled = true;
  document.getElementById("decreaseTemperatureButton").disabled = true;
  document.getElementById("increaseRHButton").disabled = true;
  document.getElementById("decreaseRHButton").disabled = true;

  // Change background color to grey
  document.getElementById("increaseTemperatureButton").style.backgroundColor =
    "grey";
  document.getElementById("decreaseTemperatureButton").style.backgroundColor =
    "grey";
  document.getElementById("increaseRHButton").style.backgroundColor = "grey";
  document.getElementById("decreaseRHButton").style.backgroundColor = "grey";
}

// Function to enable all buttons
function enableAllButtons() {
  document.getElementById("increaseTemperatureButton").disabled = false;
  document.getElementById("decreaseTemperatureButton").disabled = false;
  document.getElementById("increaseRHButton").disabled = false;
  document.getElementById("decreaseRHButton").disabled = false;

  // Change background color back to azure
  document.getElementById("increaseTemperatureButton").style.backgroundColor =
    "azure";
  document.getElementById("decreaseTemperatureButton").style.backgroundColor =
    "azure";
  document.getElementById("increaseRHButton").style.backgroundColor = "azure";
  document.getElementById("decreaseRHButton").style.backgroundColor = "azure";
}

// Function to enable buttons for 1 minute after password verification
function enableButtonsForOneMinute() {
  enableAllButtons(); // Enable buttons
  setTimeout(disableAllButtons, 60000); // Disable buttons after 1 minute (60000 milliseconds)
}

// Function to verify password
function verifyPassword() {
  var password = prompt("Please enter your password:");
  if (password === "hvac5") {
    alert("Password verified. Buttons will be enabled for 1 minute.");
    enableButtonsForOneMinute(); // Enable buttons for 1 minute
  } else {
    alert("Incorrect password. Buttons remain disabled.");
  }
}

// Call disableAllButtons function on page load
window.onload = disableAllButtons;
