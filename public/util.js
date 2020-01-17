function removeSandboxAttribute() {
  try {
    const iframe = window.parent.document.querySelector('iframe')
    iframe.removeAttribute('sandbox')
    alert('sandbox attribute after removal:' + iframe.getAttribute('sandbox'))
  }
  catch (error) {
    console.error('failed to remove sandbox attribute', error)
    alert('failed to remove sandbox attribute')
  }
}

function addSandboxAttribute() {
  try {
    const iframe = window.parent.document.querySelector('iframe')
    iframe.removeAttribute('sandbox')
    iframe.sandbox.add("allow-scripts")
    iframe.sandbox.add("allow-same-origin")
    iframe.sandbox.add("allow-modals")
    alert('sandbox attribute after add:' + iframe.getAttribute('sandbox'))
  }
  catch (error) {
    console.error('failed to add sandbox attribute', error)
    alert('failed to add sandbox attribute')
  }
}

function initializeChildIFrame() {
  const buttons = document.querySelectorAll('button')
  if (buttons.length === 2) {
    buttons[0].addEventListener('click', removeSandboxAttribute)
    buttons[1].addEventListener('click', addSandboxAttribute)
  }
}

function createIframe(useSrcDoc) {
  const iframe = document.createElement('iframe')
  iframe.setAttribute('style', "width: 100%; height: 200px")
  iframe.sandbox.add("allow-scripts")
  iframe.sandbox.add("allow-same-origin")
  iframe.sandbox.add("allow-modals")
  if (useSrcDoc) {
    iframe.srcdoc = getSrcDoc(useSrcDoc)
  } else {
    iframe.src = `data:text/html;base64,${btoa(getSrcDoc(useSrcDoc))}`
  }
  const container = document.getElementById('iframe_container')
  container.append(iframe)
}

function getSrcDoc(useSrcDoc) {

  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <h2>Iframe child</h2>
      <div>
        <button>Remove sandbox attribute</button>
      </div>
      <div>
        <button>Add sandbox attribute</button>
      </div>
      <script src="${window.location.protocol}//${window.location.host}/util.js"></script>
    </body>
  </html>
  `
}

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    if (window === window.top) {
      if (document.getElementById('iframe_container')) {
        createIframe(window.location.pathname.includes('srcdoc'))
      }
    } else {
      initializeChildIFrame()
    }
  })
})()
