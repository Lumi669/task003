// First, find the button element
const targetBuilderId = 'builder-5631b68cd5e5484ab94fb29f29a4ecfd';
const element = document.querySelector(`[builder-id="${targetBuilderId}"]`);

console.log('Found button element:', element);

// Get UPEZ_BUILDER_DATA
const builderData = window.UPEZ_BUILDER_DATA;
console.log('UPEZ_BUILDER_DATA:', builderData);

if (element && builderData) {
  // Find the cart data object
  const cartData = builderData['8c22b490d74c4be8840ebf9c8add7012'];
  console.log('Cart data:', cartData);

  if (cartData) {
    // Create new setting for hover styles
    const newSetting = {
      type: 'longText',
      id: 'button_hover_css',
      label: 'Button Hover Style',
      default: `
                outline: 2px solid red;
                outline-offset: 1px;
            `,
    };

    // Add setting to cart data
    if (!cartData.data) cartData.data = {};
    if (!cartData.data.settings) cartData.data.settings = [];
    cartData.data.settings.push(newSetting);

    console.log('Updated cart data with new setting:', cartData);

    // Create and add hover style
    const styleElement = document.createElement('style');
    styleElement.textContent = `
            [builder-id="${targetBuilderId}"]:hover {
                ${newSetting.default}
            }
        `;
    document.head.appendChild(styleElement);

    console.log('Hover effect added');
  }
}
