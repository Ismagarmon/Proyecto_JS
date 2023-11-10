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