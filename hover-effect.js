// First, remove any existing event listeners to avoid duplicates
document.removeEventListener('mouseover', handleHover);
document.removeEventListener('mouseout', handleMouseLeave);

function hasTemplateBinding(element) {
  // Look for inline script tags that might contain settings
  const scripts = element.getElementsByTagName('script');
  for (const script of scripts) {
    if (script.textContent?.includes('state.getSettingValue')) {
      return true;
    }
  }

  // Check element's own content and attributes
  return (
    element.textContent?.includes('state.getSettingValue') ||
    element.outerHTML?.includes('state.getSettingValue')
  );
}

function handleHover(event) {
  const element = event.target;

  // Check if element or its parents have template binding
  let targetElement = element;
  let depth = 0;
  const maxDepth = 10; // Prevent infinite loops

  while (
    targetElement &&
    !hasTemplateBinding(targetElement) &&
    depth < maxDepth
  ) {
    targetElement = targetElement.parentElement;
    depth++;
  }

  if (targetElement && depth < maxDepth) {
    // Store original background color
    targetElement._originalBackground = targetElement.style.backgroundColor;
    // Set background to red with some transparency
    targetElement.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    console.log('Found element with template setting:', targetElement);
  }
}

function handleMouseLeave(event) {
  const element = event.target;

  let targetElement = element;
  let depth = 0;
  const maxDepth = 10;

  while (
    targetElement &&
    !hasTemplateBinding(targetElement) &&
    depth < maxDepth
  ) {
    targetElement = targetElement.parentElement;
    depth++;
  }

  if (targetElement && depth < maxDepth) {
    // Restore original background color
    targetElement.style.backgroundColor =
      targetElement._originalBackground || '';
  }
}

// Add event listeners
document.addEventListener('mouseover', handleHover);
document.addEventListener('mouseout', handleMouseLeave);

console.log(
  'Hover effect activated - move mouse over elements with template settings to highlight them'
);
