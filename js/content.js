chrome.runtime.onMessage.addListener(({ type }) => {
    switch (type) {
      case "switch language":
        const languages = getAvailableLanguage();
        console.log(languages)
        break;
    }
  });

  function getAvailableLanguage() {
    return []
  }