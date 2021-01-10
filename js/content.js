chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.type) {
    case "switch language":
      sendResponse(getAvailableLanguage())
      break;
    case "navigate": {
      location = message.url
      break
    }
  }
});

function getAvailableLanguage() {
  const languages = document.getElementById('p-lang')
    .getElementsByClassName("interlanguage-link")
  const m = {}
  for (const lang of Array.from(languages)) {
    const a = lang.getElementsByTagName("a")[0]
    m[a.textContent] = a.href
  }
  return m
}