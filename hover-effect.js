(() => {
  // Get Builder data from window
  const builderData = window.UPEZ_BUILDER_DATA;
  if (!builderData) {
    console.error('Builder data not found');
    return;
  }

  // Get template data
  const templateData = Object.values(builderData)[0]?.[0];
  const settings = templateData?.data?.settings || [];
  const blocks = templateData?.data?.blocks || [];

  // Function to extract setting name from binding string
  const extractSettingName = (binding) => {
    const patterns = [
      /state\.getSettingValue\(['"](.*?)['"]\)/,
      /state\.settings\.(\w+)/,
      /state\.settings\?\.(\w+)/,
      /settings\.get\(['"](.*?)['"]\)/,
      /settings\.(\w+)/,
    ];

    for (const pattern of patterns) {
      const match = binding.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  // Function to process blocks
  const processBlocks = (blocks) => {
    blocks.forEach((block) => {
      if (block.bindings) {
        Object.entries(block.bindings).forEach(([key, binding]) => {
          if (typeof binding === 'string') {
            // Look for relevant binding patterns
            if (
              binding.includes('state.settings') ||
              binding.includes('state.getSettingValue') ||
              binding.includes('settings.get')
            ) {
              const settingName = extractSettingName(binding);
              if (settingName) {
                // Try different selectors to find the element
                const selectors = [
                  `[builder-id="${block.id}"]`,
                  `[data-builder-id="${block.id}"]`,
                  `#${block.id}`,
                ];

                let element;
                for (const selector of selectors) {
                  element = document.querySelector(selector);
                  if (element) break;
                }

                if (element) {
                  // Find matching setting
                  const setting = settings.find(
                    (s) => s.name === settingName || s.id === settingName
                  );

                  if (setting) {
                    element.classList.add('has-setting-binding');

                    // Add event listeners for hover effect
                    element.addEventListener('mouseenter', () => {
                      element.style.outline = '4px solid red'; // Thicker outline
                      element.style.outlineOffset = '4px'; // More space between element and outline
                      element.style.cursor = 'pointer';
                      console.log('Template Setting:', setting);
                    });

                    element.addEventListener('mouseleave', () => {
                      element.style.outline = '';
                      element.style.outlineOffset = '';
                      element.style.cursor = '';
                    });
                  }
                }
              }
            }
          }
        });
      }

      // Process nested blocks/children
      if (block.blocks || block.children) {
        const childBlocks = block.blocks || block.children;
        if (Array.isArray(childBlocks)) {
          processBlocks(childBlocks);
        }
      }
    });
  };

  // Start processing blocks
  processBlocks(blocks);

  // Add mutation observer to handle dynamically added elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        processBlocks(blocks);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
