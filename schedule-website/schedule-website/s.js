document.addEventListener('DOMContentLoaded', function () {
    let jsonData; // Variable to store the JSON data
    let originalTable; // Variable to store the original table HTML

    // Fetch the JSON file
    fetch('out.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Store the JSON data

            // Access the JSON data
            const jsonContainer = document.getElementById('json-container');
            originalTable = jsonContainer.innerHTML; // Store the original table HTML

            // Hide the original table
            jsonContainer.innerHTML = '';

            // Create a search input field
            const searchContainer = document.getElementById('search-container');
            createSearchInput(searchContainer);

            // Add an event listener for searching
            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    const query = searchInput.value.trim();
                    searchTable(query);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });

    function createSearchInput(container) {
        // Create a search input field
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'search-input';
        searchInput.placeholder = 'Enter';

        container.appendChild(searchInput);
    }

    function createTable(data, container) {
        // Create an HTML table
        const table = document.createElement('table');
        table.classList.add('json-table');

        // Create the table header row
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // Get the column names from the first object in the JSON array
        const columnNames = Object.keys(data[0]);

        columnNames.forEach(columnName => {
            const th = document.createElement('th');
            th.textContent = columnName;
            headerRow.appendChild(th);
        });

        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        // Create the table body
        const tableBody = document.createElement('tbody');

        data.forEach(item => {
            const dataRow = document.createElement('tr');

            columnNames.forEach(columnName => {
                const td = document.createElement('td');
                // Check if the property exists in the current item
                if (item.hasOwnProperty(columnName)) {
                    td.textContent = item[columnName];
                } else {
                    td.textContent = ''; // Set empty cell for missing data
                }
                dataRow.appendChild(td);
            });

            tableBody.appendChild(dataRow);
        });

        table.appendChild(tableBody);

        // Display the table in the HTML container
        container.innerHTML = ''; // Clear the container
        container.appendChild(table);
    }

    function searchTable(query) {
        const jsonContainer = document.getElementById('json-container');

        if (query) {
            // Filter the data based on user input
            const filteredData = jsonData.filter(item => {
                for (const key in item) {
                    if (item.hasOwnProperty(key) && item[key].toLowerCase().includes(query.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });

            // If there are search results, show the original table with the filtered data
            if (filteredData.length > 0) {
                createTable(filteredData, jsonContainer);
            } else {
                // If no results, show a message
                jsonContainer.innerHTML = 'No matching results found.';
            }
        } else {
            // If no search criteria, hide the message and show the original table
            jsonContainer.innerHTML = originalTable;
        }
    }
});
