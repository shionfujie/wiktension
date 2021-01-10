setup();

function setup() {
    console.debug("Setting up")
    addListeners();
    injectCSS();
}

var capturing = undefined
function addListeners() {
    for (const el of document.querySelectorAll("p,div")) {
        el.addEventListener("mouseover", decorate)
        el.addEventListener("click", takeFirstSentence)
    }
}

function decorate(ev) {
    const el = ev.currentTarget
    if (capturing !== undefined) {
        capturing.style["background"] = ""
    }
    el.style["background"] = "#b3e5fc"
    capturing = el
    ev.stopPropagation()
}

function takeFirstSentence(ev) {
    const sentence = sentences(ev.currentTarget.textContent)[0]
    console.debug(sentence)
    ev.stopPropagation()
    teardown()
}

function sentences(text) {
    return text.replace(/([.!?]\s+(?=.))/g, "$1|").split(/[|]/g)
}

function teardown() {
    if (capturing !== undefined) {
        capturing.style["background"] = ""
    }
    removeListeners()
}


function removeListeners() {
    for (const el of document.querySelectorAll("p,div")) {
        el.removeEventListener("mouseover", decorate);
        el.removeEventListener("click", takeFirstSentence)
    }
}

// function extractFragment(e) {
//     const el = e.currentTarget


// }