//Este export no lo utilizo pero quería emplear los eventos por teclado

export const TOGGLE = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    RIGHT: 'ArrowRight',
    LEFT: 'ArrowLeft',
    ENTER: 'Enter'
}

//Esta es la funcion que utilizo para obtener el json de la lista de canciones
export const getMusicList = async function () {
    const loadjson = await fetch('json/MusicList.json')
    const parsejson = await loadjson.json()

    return parsejson
}

//Esta es la funcion que utilizo para obtener el json de la lista de cartas
export const getCardList = async function () {
    //Utilizo una funcion asíncrona y meto en las variables la espera del fetch y de la promesa para meter la promesa 
    const loadjson = await fetch('json/CardList.json')
    const parsejson = await loadjson.json()
    //Devuelvo la promesa para que se concatene con un then, pero tiene el json ya cargado y listo para usarse, lo mismo hago con la otra funcion
    return parsejson
}

//Aquí exporto el svg que utlizo en el div de la lista de música
export const svgplaymusiclist = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50"><path fill="white" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17zm0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15z"/><path fill="white" d="M20 33.7V16.3L35 25l-15 8.7zm2-14v10.5l9-5.3l-9-5.2z"/></svg>'

//Aquí export una imagen modificable para meter la imagen de interrogación o la de la carta en el juego de cartas
export const imgcard = (ruta, width, height) => `<image src="${ruta}" width="${width}%" height="${height}%"/>`

//Aquí tengo la clase contador que es la clase padre en donde tengo puesto el timer que utilizo en el juego de las cartas
export class Contador {

    constructor(){
        
    }

    minutos = 0
    segundos = 0

    //Esta es la función del timer
    Timer() {

        let segundosformateados = 0
        if (this.segundos == 60) {
            this.segundos = 0
            this.minutos++
        }

        //Aquí utilizo otro tipo de condicional, la ternaria para añadir el 0 si es un numero menor que 10
        segundosformateados = this.segundos < 10 ? '0' + this.segundos : this.segundos

        this.segundos++

        //Retorno el formato 
        return `${this.minutos} : ${segundosformateados}`
    }
}
