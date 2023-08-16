// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));


chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  const url = new URL(tab.url);
  console.log(url)
});