// Function to create a table row for a station
function createStationRow(station) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = station.name;
    row.appendChild(nameCell);

    const stateCell = document.createElement("td");
    stateCell.textContent = station.state;
    row.appendChild(stateCell);

    const zoneCell = document.createElement("td");
    zoneCell.textContent = station.zone;
    row.appendChild(zoneCell);

    const addressCell = document.createElement("td");
    addressCell.textContent = station.address;
    row.appendChild(addressCell);

    return row;
}

// Function to display the table when "Choose" is clicked
document.querySelector("#loadDataLink").addEventListener("click", function (e) {
    e.preventDefault();

    // Use AJAX to fetch the JSON data from "stations.json"
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "stations.json", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const jsonData = JSON.parse(xhr.responseText);
            const stationData = jsonData.features.map((feature) => feature.properties);
            const tableBody = document.querySelector("#stationTableBody");

            // Clear existing rows
            tableBody.innerHTML = "";

            // Create and append rows for each station
            stationData.forEach((station) => {
                const row = createStationRow(station);
                tableBody.appendChild(row);
            });

            // Display the table container
            const tableContainer = document.querySelector("#stationTableContainer");
            tableContainer.style.display = "block";
        } else {
            console.error("Failed to fetch data.");
        }
    };

    xhr.send();
});
