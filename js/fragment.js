setup();

function setup() {
    addListeners();
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
    ev.stopPropagation()
    if (navigator.clipboard === undefined) {
        console.debug("takeFirstSentence: newClip: ", newClip)
        console.debug("takeFirstSentence: navigator.clipboard is not available")
    } else {
        navigator.clipboard.writeText(sentence);
    }
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