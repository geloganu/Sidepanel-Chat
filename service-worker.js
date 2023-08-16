// Allows users to open the side panel by clicking on the action toolbar icon

function sendDataToBackend(tabId, content) {
  const url = 'https://chrome-panel-backend-ff37a3d3fc79.herokuapp.com/send/tab';
  content = JSON.stringify(content); 
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: { tableId: tabId, content: content }
  })
  .then(response => response)
  .then(responseData => {
      console.log('Response from backend:', responseData);
  })
  .catch(error => {
      console.error('Error sending data:', error);
  });
}


function fetchUrl(tabId,url) {
  // Function logic goes here
  fetch(url,{method: 'GET'})
      .then(response => response.text())
      .then(html => {
        // Parse the HTML content using DOMParser
        const doc = html;
        console.log('acccessed on tab:', tabId)
        console.log(doc);
        console.log(typeof tabId)
        console.log(typeof doc)
        sendDataToBackend(tabId, doc)
      })
      .catch(error => {
        console.error('Error fetching or parsing the HTML:', error);
      });
}

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  // Get the information about newly accessed webpage
  if (info.status === 'complete') {
    const url = new URL(tab.url);
    // Fetch the HTML content of the webpage
    fetchUrl(tabId,url)
  }
});


chrome.tabs.onActivated.addListener(function(activeInfo) {
  // Get the information about the newly activated tab
  const tabId = activeInfo.tabId;
  // Retrieve the tab using its ID
  chrome.tabs.get(tabId, function(tab) {
    // Check if the tab is accessible
    if (!chrome.runtime.lastError && tab && tab.url.startsWith("http")) {
      const url = tab.url;
      // Fetch the HTML content of the webpage
      fetchUrl(tabId,url)
    }
  });
});