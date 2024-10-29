// Define the URL
const url =
  'https://cdn.builder.io/api/v3/query/3628f640692a4d2fa236d814bb277285/8c22b490d74c4be8840ebf9c8add7012?omit=meta.componentsUsed&apiKey=3628f640692a4d2fa236d814bb277285&userAttributes.urlPath=%2Fapi%2Finternal-preview-cart&userAttributes.host=upez-frontend.vercel.app&userAttributes.device=desktop&options.8c22b490d74c4be8840ebf9c8add7012.prerender=false&options.8c22b490d74c4be8840ebf9c8add7012.model=%22page%22&options.8c22b490d74c4be8840ebf9c8add7012.entry=%228c22b490d74c4be8840ebf9c8add7012%22';

// First, fetch the data and settings
fetch(url)
  .then((response) => response.json())
  .then((fullBuilderData) => {
    const dynamicID = '8c22b490d74c4be8840ebf9c8add7012';

    const builderData = {
      settings: fullBuilderData[dynamicID]?.[0]?.data?.settings || [],
      blocks: fullBuilderData[dynamicID]?.[0]?.data?.blocks || [],
    };

    console.log('Current settings:', builderData.settings);

    // Add new CSS setting for button hover (just for local testing)
    const newSetting = {
      type: 'longText',
      id: 'button_hover_css',
      label: 'Button Hover Style',
      default: `
        outline: 2px solid red;
        outline-offset: 1px;
      `,
      info: 'CSS styles to apply when hovering over the button',
      placeholder: 'Enter CSS styles for button hover state',
    };

    // Log the new setting
    console.log('New setting to be added:', newSetting);

    // Apply hover effect locally
    const targetBuilderId = 'builder-5631b68cd5e5484ab94fb29f29a4ecfd';
    const element = document.querySelector(`[builder-id="${targetBuilderId}"]`);

    if (element) {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        [builder-id="${targetBuilderId}"]:hover {
          ${newSetting.default}
        }
      `;
      document.head.appendChild(styleElement);

      console.log('Hover styles added locally for button');
    }
  })
  .catch((error) => console.error('Error fetching data:', error));
