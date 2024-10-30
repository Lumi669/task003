const url =
  'https://cdn.builder.io/api/v3/query/3628f640692a4d2fa236d814bb277285/8c22b490d74c4be8840ebf9c8add7012?omit=meta.componentsUsed&apiKey=3628f640692a4d2fa236d814bb277285&userAttributes.urlPath=%2Fapi%2Finternal-preview-cart&userAttributes.host=upez-frontend.vercel.app&userAttributes.device=desktop&options.8c22b490d74c4be8840ebf9c8add7012.prerender=false&options.8c22b490d74c4be8840ebf9c8add7012.model=%22page%22&options.8c22b490d74c4be8840ebf9c8add7012.entry=%228c22b490d74c4be8840ebf9c8add7012%22';

const dynamicID = '8c22b490d74c4be8840ebf9c8add7012';

fetch(url)
  .then((response) => {
    console.log('Fetch request status:', response.status); // Check fetch status
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then((fullBuilderData) => {
    const builderData = {
      settings: fullBuilderData[dynamicID]?.[0]?.data?.settings || [],
      blocks: fullBuilderData[dynamicID]?.[0]?.data?.blocks || [],
    };

    // Collect all builder-ids
    const builderIds = [];

    function collectBuilderIds(blocks) {
      blocks.forEach((block) => {
        if (block.id) {
          builderIds.push(block.id);
        }
        if (block.children) {
          collectBuilderIds(block.children);
        }
      });
    }

    collectBuilderIds(builderData.blocks);

    // Apply hover effect to each element with the collected builder-id
    builderIds.forEach((builderId) => {
      const element = document.querySelector(`[builder-id="${builderId}"]`);
      if (element) {
        console.log(
          `Applying hover effect to element with builder-id: ${builderId}`
        );
        element.addEventListener('mouseenter', () => {
          element.style.outline = '2px solid red';
        });
        element.addEventListener('mouseleave', () => {
          element.style.outline = 'none';
        });
      } else {
        console.warn(
          `No matching element found in DOM for builder-id: ${builderId}`
        );
      }
    });
  })
  .catch((error) => console.error('Error fetching or processing data:', error));
