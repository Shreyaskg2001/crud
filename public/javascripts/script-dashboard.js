  // Get the current year and month.
  var year = new Date().getFullYear();
  var month = new Date().getMonth() + 1;
  
  // Generate the audit calendar.
  var auditCalendar = generateAuditCalendar(year, month);
  
  // Display the audit calendar.
  document.querySelector('.audit-calendar').appendChild(auditCalendar);
  
  // Function to generate the audit calendar.
  function generateAuditCalendar(year, month) {
    // Create a table to store the audit calendar.
    var table = document.createElement('table');
    table.classList.add('table');
  
    // Create a header row for the table.
    var headerRow = document.createElement('tr');
    headerRow.classList.add('header-row');
  
    // Add the days of the week to the header row.
    for (var i = 0; i < 7; i++) {
      var th = document.createElement('th');
      th.textContent = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i];
      headerRow.appendChild(th);
    }
  
    table.appendChild(headerRow);
  
    // Create a body row for each week in the month.
    for (var i = 0; i < auditCalendar.length; i++) {
      var bodyRow = document.createElement('tr');
      bodyRow.classList.add('body-row');
  
      // Add the days of the week to the body row.
      for (var j = 0; j < auditCalendar[i].length; j++) {
        var td = document.createElement('td');
        td.textContent = auditCalendar[i][j];
  
        bodyRow.appendChild(td);
      }
  
      table.appendChild(bodyRow);
    }
  
    return table;
  }
  // Get the audit calendar for the selected date.
var auditCalendar = generateAuditCalendar(year, month, day);

// Add a click event handler to the "View All" button.
document.querySelector('#view-all-btn').addEventListener('click', function() {
  // Display all audits.
  displayAuditCalendar(auditCalendar);
});

// Display the audit calendar for the selected date.
displayAuditCalendar(auditCalendar);

// Function to display the audit calendar.
function displayAuditCalendar(auditCalendar) {
  // Clear the audit calendar container.
  document.querySelector('.audit-calendar').innerHTML = '';

  // Add the audit calendar to the container.
  document.querySelector('.audit-calendar').appendChild(auditCalendar);
}
// Get the audit calendar container.
var auditCalendarContainer = document.querySelector('.audit-calendar');

// Add a click event handler to the "View All" button.
document.querySelector('#view-all-btn').addEventListener('click', function() {
  // Show the audit calendar.
  auditCalendarContainer.classList.add('visible');
});

// Hide the audit calendar when the user clicks outside of it.
document.addEventListener('click', function(event) {
  if (event.target !== auditCalendarContainer && !auditCalendarContainer.contains(event.target)) {
    auditCalendarContainer.classList.remove('visible');
  }
});
// Get the approver's name from the database
const approverName = getApproverName();

// Add the approver's name to the approver dropdown
const approverDropdown = document.querySelector('.filter-input.approver');
const approverOption = document.createElement('option');
approverOption.value = approverName;
approverOption.textContent = approverName;
approverDropdown.appendChild(approverOption);
