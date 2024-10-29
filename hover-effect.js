// First, define the hover handlers
function handleHover(event) {
  const element = event.target;
  element.style.setProperty('outline', '2px solid red', 'important');
  element.style.setProperty('outline-offset', '1px', 'important');
}

function handleMouseLeave(event) {
  const element = event.target;
  element.style.setProperty('outline', 'none', 'important');
  element.style.setProperty('outline-offset', '', 'important');
}

// Remove any existing event listeners
document.removeEventListener('mouseover', handleHover);
document.removeEventListener('mouseout', handleMouseLeave);

// The specific builder-id we want to target
const targetBuilderId = 'builder-5631b68cd5e5484ab94fb29f29a4ecfd';

// Find the element in the DOM
const element = document.querySelector(`[builder-id="${targetBuilderId}"]`);

if (element) {
  console.log('Found target element:', element);

  // Add hover handlers
  element.addEventListener('mouseover', handleHover);
  element.addEventListener('mouseout', handleMouseLeave);

  console.log('Hover effect added to Buy Now button');
}
