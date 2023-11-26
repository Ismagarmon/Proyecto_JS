export const TOGGLE = {
    UP: 'keyup',
    DOWN: 'keydown',
    RIGHT: 'keyright',
    LEFT: 'keyleft',
    ENTER: 'Enter'
}

export const getMusicList = async function() {
    const loadjson = await fetch('json/MusicList.json')
    const parsejson = await loadjson.json()

    return parsejson
}

export const getCardList = async function() {
    const loadjson = await fetch('json/CardList.json')
    const parsejson = await loadjson.json()

    return parsejson
}

export const svgplaymusiclist = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50"><path fill="white" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15z"/><path fill="white" d="M20 33.7V16.3L35 25l-15 8.7zm2-14v10.5l9-5.3l-9-5.2z"/></svg>'

export const imgcard = (ruta) => `<image src="${ruta}" width="100%" height="100%"/>`

