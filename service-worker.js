// Allows users to open the side panel by clicking on the action toolbar icon

function sendDataToBackend(tabId, content) {
  const url = 'http://127.0.0.1:8000/send/tab';
  tabId = String(tabId)
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "tab_id": tabId, "content": content })
  })
  .then(response => response.text())
  .then(data => {
    console.log('Data response:', data);
  })
  .catch(error => {
      console.error('Error sending data:', error);
  });
}


// function fetchUrl(tabId,url) {
//   // Function logic goes here
//   fetch(url,{method: 'GET'})
//       .then(response => response.text())
//       .then(html => {
//         // Parse the HTML content using DOMParser
//         const doc = html;
//         console.log('acccessed on tab:', tabId)
//         console.log(doc);
//         console.log(typeof tabId)
//         console.log(typeof doc)
//         sendDataToBackend(tabId, doc)
//       })
//       .catch(error => {
//         console.error('Error fetching or parsing the HTML:', error);
//       });
// }

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  // Get the information about newly accessed webpage
  if (info.status === 'complete') {
    const url = new URL(tab.url);
    // Fetch the HTML content of the webpage
    sendDataToBackend(tabId,url)
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
      sendDataToBackend(tabId,url)
    }
  });
});