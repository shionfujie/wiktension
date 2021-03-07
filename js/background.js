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
    }
  }
};

function getLanguages(sendLanguages) {
  sendMessageToActiveTab({ type: "switch language" }, sendLanguages);
}

function requestNavigateTo(url) {
  sendMessageToActiveTab({ type: "navigate", url });
}

function injectFragmentExtractor() {
  chrome.tabs.executeScript({ file: "/js/fragment.js" })
}
