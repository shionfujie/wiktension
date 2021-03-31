function $(selector, startNode) {
    return (startNode || document).querySelector(selector)
}

function $$(selector, startNode) {
    return Array.from((startNode || document).querySelectorAll(selector))
}