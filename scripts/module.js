class Musica {

    Id = '';
    Url = '';
    Nombre = '';

    constructor(id,url,nombre) {
        this.Id = id
        this.Url = url
        this.Nombre = nombre
    }

    getName() {
        return this.Nombre
    }

    getId() {
        return this.Id
    }

    getUrl() {
        return this.Url
    }


}

export { Musica }

export const TOGGLE = {
    KEYUP: 'keyup',
    KEYDOWN: 'keydown',
    KEYRIGHT: 'keyright',
    KEYLEFT: 'keyleft'
}

