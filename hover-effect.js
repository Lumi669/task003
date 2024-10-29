// First, remove any existing event listeners and variables
document.removeEventListener('mouseover', handleHover);
document.removeEventListener('mouseout', handleMouseLeave);

const builderId = 'builder-5631b68cd5e5484ab94fb29f29a4ecfd';

function handleHover(event) {
  const element = event.target;
  const builderId = element.getAttribute('builder-id');

  if (builderId === window.targetBuilderId) {
    console.log('Hovering over target element:', element);
    // Store original outline
    element._originalOutline = element.style.outline;
    element._originalOutlineOffset = element.style.outlineOffset;
    // Add red frame
    element.style.setProperty('outline', '2px solid red', 'important');
    element.style.setProperty('outline-offset', '1px', 'important');
  }
}

function handleMouseLeave(event) {
  const element = event.target;
  const builderId = element.getAttribute('builder-id');

  if (builderId === window.targetBuilderId) {
    // Restore original outline
    element.style.setProperty(
      'outline',
      element._originalOutline || 'none',
      'important'
    );
    element.style.setProperty(
      'outline-offset',
      element._originalOutlineOffset || '',
      'important'
    );
  }
}

// Fetch data and setup hover effects after we have the ID
fetch(
  'https://cdn.builder.io/api/v3/query/3628f640692a4d2fa236d814bb277285/8c22b490d74c4be8840ebf9c8add7012?omit=meta.componentsUsed&apiKey=3628f640692a4d2fa236d814bb277285&userAttributes.urlPath=%2Fapi%2Finternal-preview-cart&userAttributes.host=upez-frontend.vercel.app&userAttributes.device=desktop&options.8c22b490d74c4be8840ebf9c8add7012.prerender=false&options.8c22b490d74c4be8840ebf9c8add7012.model=%22page%22&options.8c22b490d74c4be8840ebf9c8add7012.entry=%228c22b490d74c4be8840ebf9c8add7012%22'
)
  .then((response) => response.json())
  .then((fullBuilderData) => {
    const dynamicID = '8c22b490d74c4be8840ebf9c8add7012';

    const builderData = {
      blocks: fullBuilderData[dynamicID]?.[0]?.data?.blocks || [],
    };

    const blocks = builderData.blocks;
    const meta = blocks[1].children[0].meta;
    const componentId = blocks[1].children[0].id;
    const firstItemOfCode = meta.bindingActions.component.options.code[0];
    const finalCode = firstItemOfCode.options.code;

    if (finalCode.includes('state.getSettingValue')) {
      window.targetBuilderId = componentId;
      console.log('Found target builder-id:', window.targetBuilderId);

      // Add event listeners only after we have the ID
      document.addEventListener('mouseover', handleHover);
      document.addEventListener('mouseout', handleMouseLeave);

      console.log(
        'Hover effect activated - will highlight element with template settings'
      );
    }
  })
  .catch((error) => console.error('Error fetching builder data:', error));
