const CHANGE_THEME = "CHANGE_THEME"


const changeTheme = (theme) => {
    let root = document.querySelector(':root')
    root.style.setProperty('--color1', `var(--${theme}-color1)`)
    root.style.setProperty('--color2', `var(--${theme}-color2)`)
    root.style.setProperty('--color3', `var(--${theme}-color3)`)
    root.style.setProperty('--fieldColor', `var(--${theme}-fieldColor)`)
    root.style.setProperty('--button', `var(--${theme}-button)`)
    root.style.setProperty('--success', `var(--${theme}-success)`)
    root.style.setProperty('--error', `var(--${theme}-error)`)
    root.style.setProperty('--text-main', `var(--${theme}-text-main)`)
    root.style.setProperty('--text-second', `var(--${theme}-text-second)`)
    root.style.setProperty('--text-active', `var(--${theme}-text-active)`)

}


let initialState = {
    theme: 'Default'
}

const themeReducer = (state = initialState, action) =>{
    switch (action.type){
        case CHANGE_THEME:
            changeTheme(action.theme)
            return {
                ...state, theme: action.theme
            }
        default:
            return state

    }
}


export const CHANGE_THEME_ACTION_CREATOR = (theme) =>({type: CHANGE_THEME, theme})


export default themeReducer;