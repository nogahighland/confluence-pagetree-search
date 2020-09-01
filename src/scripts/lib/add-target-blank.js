const host = location.host

function addTargetBlank() {
  document.querySelectorAll('a').forEach((a) => {
    try {
      if (a.href && host != new URL(a.href).host) {
        a.target = '_blank'
      }
    } catch(e) {
      console.error(a, e)
    }
  })
}

export default addTargetBlank
