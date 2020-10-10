function sendMessageToActiveTab(message, handleResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, message, handleResponse);
  });
}
