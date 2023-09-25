let allModules = [];

// Function to populate the module list
function populateModuleList(moduleData) {

  // Module Text and Icon
  const moduleList = document.getElementById("moduleList");

  const listItem = document.createElement("li");
  listItem.className = "module-list-item";

  const moduleText = document.createElement("div");
  moduleText.className = "module-text";

  const title = document.createElement("h2");
  title.className = "module-title";
  title.textContent = moduleData.label;

  const description = document.createElement("span");
  description.className = "module-description";
  description.textContent = moduleData.description;

  const icon = document.createElement("img");
  icon.src = moduleData.iconUrl;
  icon.alt = moduleData.label;

  moduleText.appendChild(title);
  moduleText.appendChild(description);

  listItem.appendChild(icon);
  listItem.appendChild(moduleText);

  // Module stats container
  const moduleStats = document.createElement("div");
  moduleStats.className = "module-stats";

  const pointTotal = document.createElement("div");
  pointTotal.className = "stat";
  pointTotal.textContent = `+${moduleData.pointTotal} points`;

  const minuteTotal = document.createElement("div");
  minuteTotal.className = "stat";
  minuteTotal.textContent = `~${moduleData.minuteTotal} minutes`;

  const ppm = document.createElement("div");
  ppm.className = "stat";
  ppm.textContent = moduleData.ppm.toFixed(2) + " ppm";

  moduleStats.appendChild(pointTotal);
  moduleStats.appendChild(minuteTotal);
  moduleStats.appendChild(ppm);

  listItem.appendChild(moduleStats);

  // Open the module in a new tab button
  const openModule = document.createElement("a");
  openModule.className = "open-module";

  openModule.href = moduleData.url;
  openModule.target = "_blank";
  openModule.textContent = "View Module";

  openModule.onclick = () => {

    // Log module interaction for anonymous usage stats
    // Only collects what was interacted with, not who interacted with it
    fetch(`https://docs.google.com/forms/d/e/1FAIpQLScANQzvx1WrjpEoysbCXYUiHtbJPfNw1Clc0je2iOlcPN2KGg/formResponse?entry.163422026=module_interaction&entry.988610028=${moduleData.id}&entry.2094226950=${moduleData.ppm}&submit=Submit`);
  };

  listItem.appendChild(openModule);

  moduleList.appendChild(listItem);
}

// Get data from modules.json and get stats
function getData() {
  // Get module data from modules.json
  fetch("./modules.json")
    .then((response) => response.json())
    .then((data) => {

      let stats = {
        maxPoints: 0,
        maxMinutes: 0,
        totalPpm: 0,
      };

      // Sort the modules by ppm
      data.sort((a, b) => {
        return b.ppm - a.ppm;
      });

      allModules = data;

      data.forEach((module) => {

        // Update the max points and minutes
        if (module.pointTotal > stats.maxPoints) {
          stats.maxPoints = module.pointTotal;
        }

        if (module.minuteTotal > stats.maxMinutes) {
          stats.maxMinutes = module.minuteTotal;
        }


        stats.totalPpm += module.ppm;
      });

      document.getElementById('moduleCount').textContent = data.length;
      document.getElementById("maxPoints").textContent = stats.maxPoints;
      document.getElementById("maxMinutes").textContent = stats.maxMinutes;
      document.getElementById("ppmAverage").textContent = (stats.totalPpm / data.length).toFixed(2);

      resetSort();
    });

  // Log website load for anonymous usage stats
  // Only collects that the website was loaded, not who loaded it
  fetch("https://docs.google.com/forms/d/e/1FAIpQLScANQzvx1WrjpEoysbCXYUiHtbJPfNw1Clc0je2iOlcPN2KGg/formResponse?entry.163422026=website_load&submit=Submit");
}

// Reset sort buttons
function resetSort() {
  // Get the sort buttons
  const ppmLow = document.getElementById("sortPpmLow");
  const ppmHigh = document.getElementById("sortPpmHigh");
  const pointsLow = document.getElementById("sortPointsLow");
  const pointsHigh = document.getElementById("sortPointsHigh");
  const minutesLow = document.getElementById("sortMinutesLow");
  const minutesHigh = document.getElementById("sortMinutesHigh");

  // Hide the sort buttons
  ppmLow.style.display = "none";
  ppmHigh.style.display = "none";
  pointsLow.style.display = "none";
  pointsHigh.style.display = "none";
  minutesLow.style.display = "none";
  minutesHigh.style.display = "none";

  // Remove event listeners
  ppmLow.onclick = null;
  ppmHigh.onclick = null;
  pointsLow.onclick = null;
  pointsHigh.onclick = null;
  minutesLow.onclick = null;
  minutesHigh.onclick = null;

  // Add event listeners
  ppmLow.onclick = () => sortPpm(false);
  ppmHigh.onclick = () => sortPpm(true);
  pointsLow.onclick = () => sortPoints(false);
  pointsHigh.onclick = () => sortPoints(true);
  minutesLow.onclick = () => sortMinutes(false);
  minutesHigh.onclick = () => sortMinutes(true);

  // Show high to low buttons
  ppmHigh.style.display = "inline-block";
  pointsHigh.style.display = "inline-block";
  minutesLow.style.display = "inline-block";

  sortPpm(true);
}

// Sort functions
function sortPpm(highToLow) {
  const ppmLow = document.getElementById("sortPpmLow");
  const ppmHigh = document.getElementById("sortPpmHigh");
  const moduleList = document.getElementById("moduleList");
  moduleList.innerHTML = "";

  if (highToLow) {
    allModules.sort((a, b) => {
      return b.ppm - a.ppm;
    });
    ppmLow.style.display = "inline-block";
    ppmHigh.style.display = "none";
  } else {
    allModules.sort((a, b) => {
      return a.ppm - b.ppm;
    });
    ppmLow.style.display = "none";
    ppmHigh.style.display = "inline-block";
  }

  allModules.forEach((module) => {
    populateModuleList(module);
  });
}

function sortPoints(highToLow) {
  const pointsLow = document.getElementById("sortPointsLow");
  const pointsHigh = document.getElementById("sortPointsHigh");
  const moduleList = document.getElementById("moduleList");
  moduleList.innerHTML = "";

  if (highToLow) {
    allModules.sort((a, b) => {
      return b.pointTotal - a.pointTotal;
    });
    pointsLow.style.display = "inline-block";
    pointsHigh.style.display = "none";
  } else {
    allModules.sort((a, b) => {
      return a.pointTotal - b.pointTotal;
    });
    pointsLow.style.display = "none";
    pointsHigh.style.display = "inline-block";
  }

  allModules.forEach((module) => {
    populateModuleList(module);
  });
}

function sortMinutes(highToLow) {
  const minutesLow = document.getElementById("sortMinutesLow");
  const minutesHigh = document.getElementById("sortMinutesHigh");
  const moduleList = document.getElementById("moduleList");
  moduleList.innerHTML = "";

  if (highToLow) {
    allModules.sort((a, b) => {
      return b.minuteTotal - a.minuteTotal;
    });
    minutesLow.style.display = "inline-block";
    minutesHigh.style.display = "none";
  } else {
    allModules.sort((a, b) => {
      return a.minuteTotal - b.minuteTotal;
    });
    minutesLow.style.display = "none";
    minutesHigh.style.display = "inline-block";
  }

  allModules.forEach((module) => {
    populateModuleList(module);
  });
}

// Get the data
getData();