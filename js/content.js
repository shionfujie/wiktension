for (const ref of $$("sup.reference")) {
  const prev = ref.previousSibling
  if (prev && prev.nodeType === Node.TEXT_NODE && prev.data.endsWith(".")) {
    ref.after(document.createElement("br"))
  }
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.type) {
    case "switch language":
      sendResponse(getAvailableLanguage())
      break;
    case "navigate":
      location = message.url
      break
    case "perm link":
      copyPermLink()
      break
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

function copyPermLink() {
  const clip = $("#t-permalink > a").href
  console.debug("try to clip: ", clip)
  if (navigator.clipboard === undefined) {
    console.error("navigator.clipboard is not available")
  } else {
    navigator.clipboard.writeText(clip);
  }
}