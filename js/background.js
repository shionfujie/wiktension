chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log(request);
    switch (request.type) {
      case "action spec":
        sendResponse({
          name: actionSpec.name,
          actions: Object.entries(actionSpec.actions).map(
            ([name, { displayName }]) => {
              return { name, displayName };
            }
          )
        });
        break;
      case "execute action":
        switch (request.action.name) {
          case "switch language":
            getLanguages(languages => {
              chrome.runtime.sendMessage(sender.id, {
                type: "select",
                options: Object.entries(languages).map(([name, url]) => ({
                  value: url,
                  displayName: name
                }))
              });
            });
            break;
          default:
            const action = actionSpec.actions[request.action.name];
            if (action !== undefined) action.f();
            break;
        }
      case "select/response":
        if (request.cancelled || request.selected === undefined) return;
        console.log(request.selected);
        requestNavigateTo(request.selected);
        break;
    }
  }
);

const actionSpec = {
  name: "Wikipedia",
  actions: {
    "switch language": {
      f: getLanguages
    },
    "fragment": {
      displayName: "Wikipedia: Take the First Sentence",
      f: injectFragmentExtractor
    },
    "cite note": {
      displayName: "Wikipedia: Copy Citation",
      f: injectCitationExtractor
    },
    "perm": {
      displayName: "Wikipedia: Copy Permanent Link",
      f: requestCopyPermLink
    }
  }
};

function getLanguages(sendLanguages) {
  sendMessageToActiveTab({ type: "switch language" }, sendLanguages);
}

function requestNavigateTo(url) {
  sendMessageToActiveTab({ type: "navigate", url });
}

const executeScript = file => chrome.tabs.executeScript({ file })

function injectFragmentExtractor() {
  executeScript("/js/fragment.js")
}

function injectCitationExtractor() {
  executeScript("/js/util/dom.js")
  executeScript("/js/citation.js")
}

function requestCopyPermLink() {
  sendMessageToActiveTab({ type: "perm link" })
}