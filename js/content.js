chrome.runtime.onMessage.addListener(({ type }) => {
    switch (type) {
      case "switch language":
        const languages = getAvailableLanguage();
        console.log(languages)
        break;
    }
  });

  function getAvailableLanguage() {
    const languages = document.getElementById('p-lang')
        .getElementsByClassName("interlanguage-link")
    return Array.from(languages).map(lang => {
        const a = lang.getElementsByTagName("a")[0]
        return {
            displayName: a.textContent,
            url: a.href
        }
    })
  }