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
        console.log('acccessed')
        console.log(doc);
      })
      .catch(error => {
        console.error('Error fetching or parsing the HTML:', error);
      });
  }
});