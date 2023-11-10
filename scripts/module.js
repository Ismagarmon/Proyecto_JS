export const TOGGLE = {
    UP: 'keyup',
    DOWN: 'keydown',
    RIGHT: 'keyright',
    LEFT: 'keyleft',
    ENTER: 'Enter'
}

export async function getMusicList() {
    const loadjson = await fetch('../json/MusicList.json')
    const parsejson = await loadjson.json()

    return parsejson
}

export async function getCardList() {
    const loadjson = await fetch('../json/CardList.json')
    const parsejson = await loadjson.json()

    return parsejson
}