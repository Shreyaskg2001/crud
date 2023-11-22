const policyName = localStorage.getItem('policy_name');

// Get the card header element.
const cardHeader = document.querySelector('.card-header');

// Set the card header text to the policy name.
cardHeader.textContent = policyName;

// Update the "Edit" button text to the policy name.
document.querySelector('.edit-policy-button').textContent = `Edit ${policyName}`;

// Add a click event listener to the "Edit" button.
document.querySelector('.edit-policy-button').addEventListener('click', function() {
  // Get the policy edit form element.
  const policyEditForm = document.querySelector('.policy-edit-form');

  // Set the policy name input field value to the policy name.
  document.querySelector('.policy-edit-form input[name="policy_name"]').value = policyName;

  // Show the policy edit form.
  policyEditForm.style.display = 'block';
});

// Update the local storage with the new policy name.
localStorage.setItem('policy_name', policyName);
