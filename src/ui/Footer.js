export function Footer() {
  const footer = document.createElement('footer')
  footer.classList.add('main-footer')
  footer.innerHTML = `
    <p>© ${new Date().getFullYear()} GamesHub — Paula Meneses Alonso — Todos los derechos reservados.</p>
  `
  return footer
}
