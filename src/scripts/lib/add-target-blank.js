const host = location.host

function addTargetBlank() {
  document.querySelectorAll('a').forEach((a) => {
    if (a.href && host != new URL(a.href).host) {
      a.target = '_blank'
    }
  })
}

export default addTargetBlank
