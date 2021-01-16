setup();

function setup() {
    addListeners();
}

var capturing = undefined
function addListeners() {
    for (const el of document.querySelectorAll("p,div")) {
        el.addEventListener("mouseover", highlightBackground)
        el.addEventListener("click", takeFirstSentence)
    }
}

function highlightBackground(ev) {
    const el = ev.currentTarget
    if (capturing !== undefined) {
        capturing.style["background"] = ""
    }
    el.style["background"] = "#b3e5fc"
    capturing = el
    ev.stopPropagation()
}

function takeFirstSentence(ev) {
    const sentence = sentences(textMathSymbolsEscaped(ev.currentTarget))[0]
    ev.stopPropagation()
    if (navigator.clipboard === undefined) {
        console.debug("takeFirstSentence: clip: ", sentence)
        console.debug("takeFirstSentence: navigator.clipboard is not available")
    } else {
        navigator.clipboard.writeText(sentence);
    }
    teardown()
}

function sentences(text) {
    return text.replace(/([.!?]\s+(?=.))/g, "$1|").split(/[|]/g)
}

function textMathSymbolsEscaped(el) {
    var result = ""
    el.childNodes.forEach(n => {
        if (n.nodeType === Node.ELEMENT_NODE && n.className === "mwe-math-element") {
            result += "\n\n" + n.querySelector("img").alt.trim() + "\n\n"
        } else {
            result += n.textContent
        }
    })
    return result
}

function teardown() {
    if (capturing !== undefined) {
        capturing.style["background"] = ""
    }
    removeListeners()
}


function removeListeners() {
    for (const el of document.querySelectorAll("p,div")) {
        el.removeEventListener("mouseover", highlightBackground);
        el.removeEventListener("click", takeFirstSentence)
    }
}