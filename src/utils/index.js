export const selectLanguage = () => {
    const pathname = window.location.pathname
    const params = pathname.split('/')
    const lang = params.length > 1 ? params[1] : ""

    lang === "en" && i18n.changeLanguage(lang)
}