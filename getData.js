const url =
  'https://cdn.builder.io/api/v3/query/3628f640692a4d2fa236d814bb277285/8c22b490d74c4be8840ebf9c8add7012?omit=meta.componentsUsed&apiKey=3628f640692a4d2fa236d814bb277285&userAttributes.urlPath=%2Fapi%2Finternal-preview-cart&userAttributes.host=upez-frontend.vercel.app&userAttributes.device=desktop&options.8c22b490d74c4be8840ebf9c8add7012.prerender=false&options.8c22b490d74c4be8840ebf9c8add7012.model=%22page%22&options.8c22b490d74c4be8840ebf9c8add7012.entry=%228c22b490d74c4be8840ebf9c8add7012%22';

fetch(url)
  .then((response) => response.json())
  .then((fullBuilderData) => {
    // Access the nested data using the dynamic ID
    const dynamicID = '8c22b490d74c4be8840ebf9c8add7012';

    const builderData = {
      settings: fullBuilderData[dynamicID]?.[0]?.data?.settings || [],
      blocks: fullBuilderData[dynamicID]?.[0]?.data?.blocks || [],
    };

    console.log('builderData === ', builderData);
    console.log('Settings:', builderData.settings);
    console.log('Blocks:', builderData.blocks);

    const blocks = builderData.blocks;
    const meta = blocks[1].children[0].meta;
    console.log('meta === ', meta);

    // Retrieve the id as specified
    const componentId = blocks[1].children[0].id;
    console.log('componentId === ', componentId); // Output: "builder-e75a638a9c7844e4b588bf3749daf6fb"

    // Assuming you want to access more deeply nested options.code values
    const firstItemOfCode = meta.bindingActions.component.options.code[0];
    console.log('firstItemOfCode === ', firstItemOfCode);
    const finalCode = firstItemOfCode.options.code;
    console.log('finalCode === ', finalCode); // finalCode === `<style>${state.getSettingValue('css')}</style>`
  })
  .catch((error) => console.error('Error fetching builder data:', error));
