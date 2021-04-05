const basename = location.pathname.replace(/^.*\/|\.[^.]*$/g, '')
const es = $$(".mwe-math-element").map((_, i) => {
  const a = document.createElement("A")
  const p = document.createElement("P")
  const clone = _.cloneNode(true)
  const img = clone.querySelector("img")
  a.append(p)
  p.append(clone)
  img.style = "border-bottom-color: transparent !important; " + img.style.cssText

  _.id = basename + i
  a.href = "#" + basename + i
  a.addEventListener('click', e => {
    e.preventDefault()

    const block = _.closest('.mw-parser-output > *')
    const y0 = _.getBoundingClientRect().y
    const y1 = clone.getBoundingClientRect().y
    block.style['background'] = '#cfe8fc'
    block.addEventListener('mouseleave', () => block.style['background'] = '', true)
    window.scrollBy(0, y0 - y1)
  })

  return a
})
const toc = $('#toc')
if (toc) {
  toc.after(...es)
} else {
  $(".mw-parser-output").prepend(...es)
}

for (const p of $$("p", $(".mw-parser-output"))) {
  const ul = document.createElement("ul")
  const lis = $$("*:not(sup) > a[title]", p).map(_ => {
    const li = document.createElement("li")
    const a = _.cloneNode()
    li.append(a)
    a.append(a.title)
    return li
  })
  p.before(ul)
  ul.append(...lis)
}

for (const ref of $$("sup.reference")) {
  const prev = ref.previousSibling
  if (prev && prev.nodeType === Node.TEXT_NODE && prev.data.endsWith(".")) {
    ref.after(document.createElement("br"))
  }
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.type) {
    case "switch language":
      sendResponse(getAvailableLanguage())
      break;
    case "navigate":
      location = message.url
      break
    case "perm link":
      copyPermLink()
      break
  }
});

function getAvailableLanguage() {
  const languages = document.getElementById('p-lang')
    .getElementsByClassName("interlanguage-link")
  const m = {}
  for (const lang of Array.from(languages)) {
    const a = lang.getElementsByTagName("a")[0]
    m[a.textContent] = a.href
  }
  return m
}

function copyPermLink() {
  const clip = $("#t-permalink > a").href
  console.debug("try to clip: ", clip)
  if (navigator.clipboard === undefined) {
    console.error("navigator.clipboard is not available")
  } else {
    navigator.clipboard.writeText(clip);
  }
}