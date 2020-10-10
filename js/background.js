chrome.runtime.onMessageExternal.addListener((request, sender, response) => {
  if (request.type === "action spec") {
    response({
      name: actionSpec.name,
      actions: Object.entries(actionSpec.actions).map(
        ([name, { displayName }]) => {
          return { name, displayName };
        }
      )
    });
  } else if (request.type === "execute action") {
    switch (request.action.name) {
      case "switch language":
        getLanguages(languages => {
          chrome.runtime.sendMessage(
            sender.id,
            {
              type: "select",
              options: Object.keys(languages).map(key => ({value: key, displayName: key}))
            },
            response => {
              if (response.cancelled || response.selected === undefined) return;
              console.log(response.selected)
                requestNavigateTo(languages[response.selected])
            }
          );
        });
        break;
    }
    const action = actionSpec.actions[request.action.name];
    if (action !== undefined) action.f();
  }
});

const actionSpec = {
  name: "Wikipedia",
  actions: {
    "switch language": {
      f: requestSwitchLanguage
    }
  }
};

function getLanguages(sendLanguages) {
  sendMessageToActiveTab({ type: "switch language" }, sendLanguages);
}

function requestNavigateTo(url) {
    sendMessageToActiveTab({type: "navigate", url})
}