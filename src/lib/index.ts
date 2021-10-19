const host = location.host

export const addTargetBlank = (): void => {
  document.querySelectorAll('a').forEach(a => {
    try {
      if (a.href && host != new URL(a.href).host) {
        a.target = '_blank'
      }
    } catch (e) {
      console.error(a, e)
    }
  })
}

export const hideOriginalPageTree = (): void => {
  document
    .querySelectorAll(
      '.acs-side-bar .page-tree, .acs-side-bar .plugin_pagetree'
    )
    .forEach(e => ((e as HTMLDivElement).style.display = 'none'))
}

export const transitToEditPage = (): void => {
  const editLink = document.querySelector('#editPageLink')
  if (!editLink) {
    return
  }
  location.href = (editLink as HTMLAnchorElement).href
}

export const compactButtons = (): void => {}
