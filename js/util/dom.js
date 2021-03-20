function $(selector, startNode) {
    return (startNode || document).querySelector(selector)
}

function $$(selector, startNode) {
    return (startNode || document).querySelectorAll(selector)
}