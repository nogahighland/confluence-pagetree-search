const host = location.host

export const addTargetBlank = () => {
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
