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
    const builderData = {
      settings: fullBuilderData[dynamicID]?.[0]?.data?.settings || [],
      blocks: fullBuilderData[dynamicID]?.[0]?.data?.blocks || [],
    };

    console.log('Fetched builderData:', builderData);
    console.log('Settings:', builderData.settings);
    console.log('Blocks:', builderData.blocks);

    // Recursive function to print all target builder-ids
    function printAllBuilderIds(blocks) {
      blocks.forEach((block, index) => {
        if (block.id) {
          console.log(`Found builder-id: ${block.id} at level ${index + 1}`);
        }

        // Check for nested children and recursively traverse them
        if (block.children) {
          printAllBuilderIds(block.children);
        }
      });
    }

    // Start printing all builder-ids
    printAllBuilderIds(builderData.blocks);
  })
  .catch((error) => console.error('Error fetching or processing data:', error));
