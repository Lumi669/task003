// First, find the button element
const targetBuilderId = 'builder-5631b68cd5e5484ab94fb29f29a4ecfd';
const element = document.querySelector(`[builder-id="${targetBuilderId}"]`);

// Get UPEZ_BUILDER_DATA
const builderData = window.UPEZ_BUILDER_DATA;

if (element && builderData) {
  const cartDataArray = builderData['8c22b490d74c4be8840ebf9c8add7012'];

  if (cartDataArray && cartDataArray.length > 0) {
    const cartData = cartDataArray[0];

    // 1. Create or update CSS setting
    if (!cartData.data) cartData.data = {};
    if (!cartData.data.settings) cartData.data.settings = [];

    const cssSettings = {
      id: 'css',
      type: 'css',
      label: 'Custom css',
      default: `
                [builder-id="${targetBuilderId}"]:hover {
                    outline: 2px solid red !important;
                    outline-offset: 1px !important;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
            `,
      info: 'Css code to be inserted between <style>...</style>',
    };

    // Update or add CSS settings
    const existingIndex = cartData.data.settings.findIndex(
      (s) => s.id === 'css'
    );
    if (existingIndex >= 0) {
      cartData.data.settings[existingIndex] = cssSettings;
    } else {
      cartData.data.settings.push(cssSettings);
    }

    // 2. Create Custom CSS block
    const customCssBlock = {
      '@type': '@builder.io/sdk:Element',
      '@version': 2,
      component: {
        name: 'Custom Code',
        options: {
          code: `<style>\${state.getSettingValue('css')}</style>`,
        },
      },
      id: 'builder-hover-css',
      layerName: 'Custom CSS',
    };

    // Add block
    if (!cartData.data.blocks) cartData.data.blocks = [];
    cartData.data.blocks.push(customCssBlock);

    // 3. For immediate effect, also apply directly
    const styleElement = document.createElement('style');
    styleElement.textContent = cssSettings.default;
    document.head.appendChild(styleElement);

    console.log('Updated CSS settings:', cssSettings);
    console.log('Updated cart data:', cartData);
  }
}
