document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const dashboard = document.getElementById("dashboard");
    dashboard.classList.add("active");
  }, 2);
});

let config = {};
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

// console.log(config);
// [[[[[[[[[FUNCTION TO GET DATA]]]]]]]]]]]

function updateInfoValue() {
  fetch("http://" + config + ":1880/getInfoData")
    .then((response) => response.json())
    .then((data) => {
      const modeValue = data[0].Mode;
      document.getElementById("modeValue").textContent = modeValue;
      const turboValue = data[0].Turbo;
      document.getElementById("turboValue").textContent = turboValue;
      const swingValue = data[0].Swing;
      document.getElementById("swingValue").textContent = swingValue;
      const quietValue = data[0].Quiet;
      document.getElementById("quietValue").textContent = quietValue;
      const sleepValue = data[0].Sleep;
      document.getElementById("sleepValue").textContent = sleepValue;
      const timeron1Value = data[0].TimerON1;
      document.getElementById("timeron1Value").textContent = timeron1Value;
      const timeron2Value = data[0].TimerON2;
      document.getElementById("timeron2Value").textContent = timeron2Value;
      const timeroff1Value = data[0].TimerOFF1;
      document.getElementById("timeroff1Value").textContent = timeroff1Value;
      const timeroff2Value = data[0].TimerOFF2;
      document.getElementById("timeroff2Value").textContent = timeroff2Value;
      const delayValue = data[0].DelayTimer;
      document.getElementById("delayValue").textContent = delayValue;
      const fanValue = data[0].Fan;
      document.getElementById("fanValue").textContent = fanValue;
      const unitstatValue = data[0].UnitStatus;
      document.getElementById("unitstatValue").textContent = unitstatValue;
    });
}
updateInfoValue();
getConfig();
setInterval(getConfig, 1000);
setInterval(updateInfoValue, 5000); // Refresh every 5 seconds (adjust as needed)

// INFORMATION

// Fetch data from Node-RED server and update JustGage value
function updateGaugeValue() {
  fetch("http://" + config + ":1880/getData")
    .then((response) => response.json())
    .then((data) => {
      // Parse the Temp_Cathlab value as a float
      const tempCathlab = parseFloat(data[0].Temp_Cathlab);
      const tempMachine = parseFloat(data[0].Temp_Machine);
      const rhCathlab = parseFloat(data[0].RH_Cathlab);
      const rhMachine = parseFloat(data[0].RH_Machine);
      const preFilter = parseFloat(data[0].Pre_Filter);
      const hepaFilter = parseFloat(data[0].HEPA_Filter);
      const outdoorUnit = parseFloat(data[0].Outdoor_Unit);
      const ahuStatus = parseFloat(data[0].AHU_Status);
      const bFan = parseFloat(data[0].Booster_Fan);
      const eFan = parseFloat(data[0].Exhaust_Fan);
      const heat1 = parseFloat(data[0].Heater_1);
      const heat2 = parseFloat(data[0].Heater_2);
      console.log(data[0]); // Log the data object to inspect its structure

      // Update the value parameter of the JustGage instance
      chartraw.refresh(tempCathlab);
      chartraw1.refresh(tempMachine);
      chartraww.refresh(rhCathlab);
      chartraww2.refresh(rhMachine);
      chartfm1.refresh(preFilter);
      chartfm3.refresh(hepaFilter);
      document.getElementById("tempCat").textContent = tempCathlab + " °C";
      document.getElementById("tempMac").textContent = tempMachine + " °C";
      document.getElementById("rhCath").textContent = rhCathlab + " %";
      document.getElementById("rhMac").textContent = rhMachine + " %";
      document.getElementById("prefil").textContent = preFilter + " Pa";
      document.getElementById("hepafil").textContent = hepaFilter + " Pa";

      const outdoorUnitElement = document.getElementById("OutdoorUnit");
      const outdoorIcon = document.getElementById("outdooricon");
      if (outdoorUnit === 1) {
        outdoorUnitElement.textContent = "ON";
        outdoorUnitElement.style.color = "";
        outdoorIcon.classList.add("bx-flashing");
        outdoorIcon.style.color = "";
      } else {
        outdoorUnitElement.textContent = "OFF";
        outdoorUnitElement.style.color = "red";
        outdoorIcon.classList.remove("bx-flashing");
        outdoorIcon.style.color = "red";
      }
      const AHUElement = document.getElementById("AHU");
      const ahuIcon = document.getElementById("ahuicon");
      if (ahuStatus === 1) {
        AHUElement.textContent = "ON";
        AHUElement.style.color = "";
        ahuIcon.classList.add("bx-flashing");
        ahuIcon.style.color = "";
      } else {
        AHUElement.textContent = "OFF";
        AHUElement.style.color = "red";
        ahuIcon.classList.remove("bx-flashing");
        ahuIcon.style.color = "red";
      }
      const BFElement = document.getElementById("Booster");
      const BFIcon = document.getElementById("boostericon");
      if (bFan === 1) {
        BFElement.textContent = "ON";
        BFElement.style.color = "";
        BFIcon.classList.add("bx-spin");
        BFIcon.style.color = "";
      } else {
        BFElement.textContent = "OFF";
        BFElement.style.color = "red";
        BFIcon.classList.remove("bx-spin");
        BFIcon.style.color = "red";
      }
      const EFElement = document.getElementById("Exhaust");
      const EFIcon = document.getElementById("exhausticon");
      if (eFan === 1) {
        EFElement.textContent = "ON";
        EFElement.style.color = "";
        EFIcon.classList.add("bx-spin");
        EFIcon.style.color = "";
      } else {
        EFElement.textContent = "OFF";
        EFElement.style.color = "red";
        EFIcon.classList.remove("bx-spin");
        EFIcon.style.color = "red";
      }
      const Heat1Element = document.getElementById("Heat1");
      const Heat1Icon = document.getElementById("heat1icon");
      if (heat1 === 1) {
        Heat1Element.textContent = "ON";
        Heat1Element.style.color = "";
        Heat1Icon.classList.add("bx-spin");
        Heat1Icon.style.color = "";
      } else {
        Heat1Element.textContent = "OFF";
        Heat1Element.style.color = "red";
        Heat1Icon.classList.remove("bx-spin");
        Heat1Icon.style.color = "red";
      }
      const Heat2Element = document.getElementById("Heat2");
      const Heat2Icon = document.getElementById("heat2icon");
      if (heat2 === 1) {
        Heat2Element.textContent = "ON";
        Heat2Element.style.color = "";
        Heat2Icon.classList.add("bx-spin");
        Heat2Icon.style.color = "";
      } else {
        Heat2Element.textContent = "OFF";
        Heat2Element.style.color = "red";
        Heat2Icon.classList.remove("bx-spin");
        Heat2Icon.style.color = "red";
      }
      removeNotification();
    })
    .catch((error) => {
      console.error("Error:", error);
      console.error("Error:", error);
      // Show notification for connection error
      showNotification("Connecting...");
    });
}

// Function to show notification
function showNotification(message) {
  let notificationElement = document.querySelector(".notification");

  // If notification already exists, update its content
  if (notificationElement) {
    notificationElement.textContent = message;
  } else {
    // Create new notification div
    notificationElement = document.createElement("div");
    notificationElement.textContent = message;
    notificationElement.classList.add("notification");

    // Create refresh button
    const refreshButton = document.createElement("button");
    refreshButton.textContent = "Refresh";
    refreshButton.classList.add("refresh-button");

    // Add click event listener to refresh button
    refreshButton.addEventListener("click", function () {
      // Refresh the page
      window.location.reload();
    });

    // Append refresh button to notification div
    notificationElement.appendChild(refreshButton);

    // Append notification div to body
    document.body.appendChild(notificationElement);
  }
}

// Function to remove notification
function removeNotification() {
  const notificationElement = document.querySelector(".notification");
  if (notificationElement) {
    notificationElement.remove();
  }
}

// Call the function to update the gauge value initially and periodically
updateGaugeValue();
setInterval(updateGaugeValue, 5000); // Refresh every 5 seconds (adjust as needed)

// [[[[[[[[[[END OF FUNCTION GET DATA]]]]]]]]]]

let chartraw = new JustGage({
  id: "gauRaw",
  value: 24,
  valueFontColor: "aliceblue",
  min: 0,
  max: 50,
  hideMinMax: true,
  title: "Temperature",
  titleFontColor: "aliceblue",
  label: "°C",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 1, // Set to 1 for a full circle
  gaugeColor: "rgba(203, 213, 225, 0.5)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
});

let chartraww = new JustGage({
  id: "gauRaww",
  value: 50,
  valueFontColor: "aliceblue",
  min: 0,
  max: 85,
  hideMinMax: true,
  title: "Relative Humidity",
  titleFontColor: "aliceblue",
  label: "%",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 1, // Set to 1 for a full circle
  gaugeColor: "rgba(203, 213, 225, 0.5)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
});

let chartraw1 = new JustGage({
  id: "gauRaw1",
  value: 24,
  valueFontColor: "aliceblue",
  min: 0,
  max: 50,
  hideMinMax: true,
  title: "Temperature",
  titleFontColor: "aliceblue",
  label: "°C",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 1, // Set to 1 for a full circle
  gaugeColor: "rgba(203, 213, 225, 0.5)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
});

let chartraww2 = new JustGage({
  id: "gauRaww2",
  value: 75,
  valueFontColor: "aliceblue",
  min: 40,
  max: 80,
  hideMinMax: true,
  title: "Relative Humidity",
  titleFontColor: "aliceblue",
  label: "%",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 1, // Set to 1 for a full circle
  gaugeColor: "rgba(203, 213, 225, 0.5)", // Adjust the alpha value for transparency
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
});

let chartfm1 = new JustGage({
  id: "gaufm1",
  value: 150,
  valueFontColor: "aliceblue",
  min: 125,
  max: 175,
  hideMinMax: true,
  title: "Pre & Medium Filter",
  titleFontColor: "aliceblue",
  label: "Pa",
  labelFontColor: "aliceblue",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.7,
  gaugeColor: "rgb(203, 213, 225)",
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
});

let chartfm2 = new JustGage({
  id: "gaufm2",
  value: 150,
  valueFontColor: "aliceblue",
  min: 125,
  max: 175,
  hideMinMax: true,
  titleFontColor: "#64748b",
  label: "Pa",
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.7,
  gaugeColor: "rgb(203, 213, 225)",
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
});

let chartfm3 = new JustGage({
  id: "gaufm3",
  value: 150,
  valueFontColor: "aliceblue",
  min: 125,
  max: 175,
  hideMinMax: true,
  title: "HEPA Filter",
  titleFontColor: "aliceblue",
  label: "Pa",
  labelFontColor: "aliceblue", // Set the color of the label
  labelFontSize: 148, // Set the font size of the label
  levelColors: [
    "#00B6D4", // Blue (low)
    "#00FF50", // Green (medium)
    "#FF0000", // Red (high)
  ],
  gaugeWidthScale: 0.7,
  gaugeColor: "rgb(203, 213, 225)",
  counter: true,
  pointer: true,
  pointerOptions: {
    toplength: 0,
    bottomlength: 10,
    bottomwidth: 0,
    color: "#ffffff",
    stroke: "#64748b",
    stroke_width: 3,
    stroke_linecap: "round",
  },
});

let totalizerData = [
  {
    data: [],
    diffElementId: "diffTRW",
    diffElementSuffix: "TRW",
    elementId: "Totalizer_Raw_Water",
    dataKey: "Totalizer_Raw",
  },
  {
    data: [],
    diffElementId: "diffTPW0",
    diffElementSuffix: "TPW0",
    elementId: "Totalizer_Product_Water0",
    dataKey: "Totalizer_Product",
  },
  {
    data: [],
    diffElementId: "diffTPW1",
    diffElementSuffix: "TPW1",
    elementId: "Totalizer_Product_Water1",
    dataKey: "TOTALIZER_PRODUCT_1",
  },
  {
    data: [],
    diffElementId: "diffTPW2",
    diffElementSuffix: "TPW2",
    elementId: "Totalizer_Product_Water2",
    dataKey: "TOTALIZER_PRODUCT_2",
  },
  {
    data: [],
    diffElementId: "diffTBW",
    diffElementSuffix: "TBW",
    elementId: "Totalizer_Backwash_Water",
    dataKey: "TOTALIZER_TBW",
  },
  {
    data: [],
    diffElementId: "diffreservoir",
    diffElementSuffix: "reservoir",
    elementId: "Reservoir_Volume",
    dataKey: "Reservoir_Volume",
  },
];
let elementsToUpdate = [
  { id: "traw1", key: "Totalizer_Raw", unit: " m&sup3" },
  { id: "traw2", key: "Totalizer_Raw", unit: " m&sup3" },
  { id: "frraw", key: "Flow_Rate_Raw", unit: " LPS" },
  { id: "tbdraw", key: "Turbidity_Raw", unit: " NTU" },
  { id: "phraw", key: "pH_Raw", unit: "" },
  { id: "rvol", key: "Reservoir_Volume", unit: " m&sup3" },
  { id: "fmp1", key: "FLOWRATE_PRODUCT_1", unit: " LPS" },
  { id: "fmp2", key: "FLOWRATE_PRODUCT_2", unit: " LPS" },
  { id: "fmp3", key: "Flow_Rate_Product", unit: " LPS" },
  { id: "tbdp", key: "Turbidity_Product", unit: " NTU" },
  { id: "phproduct", key: "pH_Product", unit: "" },
  { id: "cproduct", key: "Chlorine_Product", unit: " ppm" },
  { id: "tbds1", key: "Turbidity_Sedimentation_A", unit: " NTU" },
  { id: "tbds2", key: "Turbidity_Sedimentation_B", unit: " NTU" },
];
function addSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateDiffElement(diffElement, diffValue) {
  let diffplusmin = diffValue < 0 ? "-" : "+";
  let formattedDiff = addSeparator(Math.abs(diffValue).toFixed(2));
  diffElement.classList.add(diffValue < 0 ? "text-red-500" : "text-green-500");
  diffElement.innerHTML = `${diffplusmin}${formattedDiff}`;
}

function processData(data, len, dataIndex) {
  let totalizer = totalizerData[dataIndex];
  let diffElement = document.getElementById(totalizer.diffElementId);
  totalizer.data = data.map((item) => item[totalizer.dataKey]);
  let diffPercent = totalizer.data[len - 1] - totalizer.data[0];
  document.getElementById(totalizer.elementId).innerHTML = addSeparator(
    totalizer.data[len - 1]
  );

  updateDiffElement(diffElement, diffPercent);
}

function updateElementValues(data, len) {
  let lastData = data[len - 1];
  for (let i = 0; i < elementsToUpdate.length; i++) {
    let elementInfo = elementsToUpdate[i];
    let value = lastData[elementInfo.key];
    let formattedValue = `${addSeparator(value)}${elementInfo.unit}`;
    document.getElementById(elementInfo.id).innerHTML = formattedValue;
  }
}

function start() {
  let http = new XMLHttpRequest();
  http.open("GET", "http://127.0.0.1:1887/GetCurrent", true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      let len = data.length;

      updateElementValues(data, len);
      chartraw.refresh(data[len - 1].Flow_Rate_Raw);
      chartreservoir.refresh(data[len - 1].Reservoir_Level);
      chartfm1.refresh(data[len - 1].FLOWRATE_PRODUCT_1);
      chartfm2.refresh(data[len - 1].FLOWRATE_PRODUCT_2);
      chartfm3.refresh(data[len - 1].Flow_Rate_Product);
      for (let i = 0; i < totalizerData.length; i++) {
        processData(data, len, i);
      }
      setTimeout(start, 1000);
    }
  };
}

start();

// Get the modal
const modal = document.getElementById("myModal");
// Get the elements inside the modal
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const passwordInput = document.getElementById("passwordInput");
const modalActionButton = document.getElementById("modalActionButton");
let modalstatus = "";
// Function to open the modal
function openModal(data) {
  modal.style.display = "block";
  console.log(data);
  modalstatus = data;
}
function openModalinfo() {
  var modal = document.getElementById("infoModal");
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

function closeModalinfo() {
  var modal = document.getElementById("infoModal");
  modal.style.display = "none";
}

// Function to handle modal action (password verification or close)
function verifyPassword() {
  const passwordInput = document.getElementById("passwordInput").value;
  // Replace 'your-password' with the actual password
  if (passwordInput === "hvac5") {
    alert(
      "Password is correct. Proceed with " + modalstatus + " functionality."
    );
    closeModal(); // Close the modal if password is correct
    document.getElementById("passwordInput").value = ""; // Reset password input
  } else {
    alert("Incorrect password. Please try again.");
    document.getElementById("passwordInput").value = ""; // Reset password input
    closeModal(); // Close the modal if password is correct
  }
}
