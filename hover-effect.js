// First, remove any existing event listeners to avoid duplicates
document.removeEventListener('mouseover', handleHover);
document.removeEventListener('mouseout', handleMouseLeave);

function hasTemplateBinding(element) {
  // Check for Builder.io specific attributes
  if (
    element.getAttribute('builder-id') ||
    element.getAttribute('builder-type') ||
    element.classList.contains('builder-block')
  ) {
    console.log('Found Builder element:', element);
    return true;
  }

  // Look for inline script tags that might contain settings
  const scripts = element.getElementsByTagName('script');
  for (const script of scripts) {
    if (script.textContent?.includes('state.getSettingValue')) {
      console.log('Found template binding in script:', script.textContent);
      return true;
    }
  }

  // Check element's own content and attributes
  const hasBinding =
    element.textContent?.includes('state.getSettingValue') ||
    element.outerHTML?.includes('state.getSettingValue');

  if (hasBinding) {
    console.log('Found template binding in element:', element.outerHTML);
  }

  return hasBinding;
}

function handleHover(event) {
  console.log('Hovering over element:', event.target);
  const element = event.target;

  // Check if element or its parents have template binding
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
    console.log('Checking parent at depth:', depth, targetElement);
  }

  if (targetElement && depth < maxDepth) {
    console.log('FOUND TARGET - Applying red background to:', targetElement);
    // Force the background change with !important
    targetElement.setAttribute(
      'style',
      'background-color: rgba(255, 0, 0, 0.3) !important'
    );
    // Store for restoration
    targetElement._originalBackground = targetElement.getAttribute('style');
  }
}

function handleMouseLeave(event) {
  console.log('Mouse leaving element:', event.target);
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
    console.log('Restoring original background for:', targetElement);
    // Remove the forced style
    targetElement.removeAttribute('style');
  }
}

// Add event listeners
document.addEventListener('mouseover', handleHover);
document.addEventListener('mouseout', handleMouseLeave);

console.log(
  'Hover effect activated - move mouse over elements with template settings to highlight them'
);
