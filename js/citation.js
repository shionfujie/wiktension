var refs = $$(`[href^="#cite_note"]`)
setup();

function setup() {
    addListeners();
}

function teardown() {
    removeListeners()
}

function addListeners() {
    for (const ref of refs) {
        ref.addEventListener("click", copyCitation)
    }
}

function removeListeners() {
    for (const ref of refs) {
        ref.removeEventListener("click", copyCitation)
    }
}

function copyCitation(ev) {
    ev.stopPropagation()
    ev.preventDefault()

    const a = ev.currentTarget
    const id = a.getAttribute("href").substring(1)
    const citation = document.getElementById(id)
    const clip = $(".reference-text", citation).textContent
    console.debug("try to clip: ", clip)
    if (navigator.clipboard === undefined) {
        console.error("navigator.clipboard is not available")
    } else {
        navigator.clipboard.writeText(clip);
    }

    teardown()
}