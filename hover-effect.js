const url =
  'https://cdn.builder.io/api/v3/query/3628f640692a4d2fa236d814bb277285/8c22b490d74c4be8840ebf9c8add7012?omit=meta.componentsUsed&apiKey=3628f640692a4d2fa236d814bb277285&userAttributes.urlPath=%2Fapi%2Finternal-preview-cart&userAttributes.host=upez-frontend.vercel.app&userAttributes.device=desktop&options.8c22b490d74c4be8840ebf9c8add7012.prerender=false&options.8c22b490d74c4be8840ebf9c8add7012.model=%22page%22&options.8c22b490d74c4be8840ebf9c8add7012.entry=%228c22b490d74c4be8840ebf9c8add7012%22';

const dynamicID = '8c22b490d74c4be8840ebf9c8add7012';

// Fetch the data from the new URL
fetch(url)
  .then((response) => {
    console.log('Fetch request status:', response.status); // Check fetch status
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then((fullBuilderData) => {
    // Extract settings and blocks from the retrieved data
    const builderData = {
      settings: fullBuilderData[dynamicID]?.[0]?.data?.settings || [],
      blocks: fullBuilderData[dynamicID]?.[0]?.data?.blocks || [],
    };

    console.log('Fetched builderData:', builderData);
    console.log('Settings:', builderData.settings);
    console.log('Blocks:', builderData.blocks);

    const settings = builderData.settings;
    const blocks = builderData.blocks;

    // Helper function to find elements with bindings to template settings
    function findElementsWithBindings(blocks, settings) {
      const elementsWithBindings = [];

      function traverseBlocks(block) {
        if (block.bindings) {
          for (let binding in block.bindings) {
            if (block.bindings[binding].includes('settings.')) {
              const settingKey =
                block.bindings[binding].match(/settings\.(\w+)/)[1];
              const setting = settings.find((s) => s.name === settingKey);
              elementsWithBindings.push({ block, setting });
            }
          }
        }
        if (block.children) {
          block.children.forEach(traverseBlocks);
        }
      }

      blocks.forEach(traverseBlocks);
      return elementsWithBindings;
    }

    const elementsWithBindings = findElementsWithBindings(blocks, settings);

    // Debug: Print out builder ids and associated settings
    elementsWithBindings.forEach(({ block, setting }) => {
      console.log(
        'Found block with builder id:',
        block.id,
        'and setting:',
        setting
      );
    });

    // Apply hover effect to elements with bindings to template settings
    elementsWithBindings.forEach(({ block, setting }) => {
      const element = document.querySelector(`[builder-id="${block.id}"]`);
      if (element) {
        console.log(
          'Applying hover effect to element with builder id:',
          block.id
        );
        element.addEventListener('mouseenter', () => {
          element.style.outline = '2px solid red';
          console.log('Template setting on hover:', setting);
        });
        element.addEventListener('mouseleave', () => {
          element.style.outline = 'none';
        });
      } else {
        console.warn(
          'No matching element found in DOM for builder id:',
          block.id
        );
      }
    });
  })
  .catch((error) => console.error('Error fetching or processing data:', error));
