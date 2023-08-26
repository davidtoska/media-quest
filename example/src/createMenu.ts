type MenuItem = { label: string; onclick: () => void }

const menuItem = (name: string, onclick: () => void) => {
  const btn = document.createElement("button")
  btn.innerText = name
  btn.classList.add("menu-button")
  btn.onclick = (ev) => {
    ev.preventDefault()
    ev.stopPropagation()
    onclick()
  }
  return btn
}
export const createMenu = (items: ReadonlyArray<MenuItem>) => {
  const root = document.createElement("div")
  root.style.display = "flex"
  root.style.gap = "12px"
  root.style.background = "gray"
  root.style.paddingRight = "12px"
  root.style.paddingLeft = "12px"
  root.style.paddingTop = "6px"
  root.style.paddingBottom = "6px"

  items.forEach((item) => {
    const menuButton = menuItem(item.label, item.onclick)
    root.append(menuButton)
  })
  return root
}
