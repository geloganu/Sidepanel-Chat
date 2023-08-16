// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status === 'complete') {
    const url = new URL(tab.url);

    // Fetch the HTML content of the webpage
    fetch(url,{method: 'GET'})
      .then(response => response.text())
      .then(html => {
        // Parse the HTML content using DOMParser
        const doc = html;
        console.log('acccessed', tabId)
        console.log(doc);
      })
      .catch(error => {
        console.error('Error fetching or parsing the HTML:', error);
      });
  }
});


chrome.tabs.onActivated.addListener(function(activeInfo) {
  // Get the information about the newly activated tab
  const tabId = activeInfo.tabId;

  // Retrieve the tab using its ID
  chrome.tabs.get(tabId, function(tab) {
    // Check if the tab is accessible
    if (!chrome.runtime.lastError && tab && tab.url.startsWith("http")) {
      const pageUrl = tab.url;
      console.log("URL of the active page:", pageUrl);
      
      // Fetch the HTML content of the webpage
      fetch(tab.url,{method: 'GET'})
      .then(response => response.text())
      .then(html => {
        // Parse the HTML content using DOMParser
        const doc = html;
        console.log('acccessed',tabId)
        console.log(doc);
      })
      .catch(error => {
        console.error('Error fetching or parsing the HTML:', error);
      });

      // Now you can perform actions with the URL, such as scraping content or any other logic you need
    }
  });
});