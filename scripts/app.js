import { TOGGLE, getCardList, getMusicList } from "./module.js";

window.onload = () => {
    pprincipal()
    loadmusicplayer()
    Controls()

    getMusicList().then((data) => {
        //let cant = data.Music.length
        console.log(data)
    }).catch((error) => alert(`El error es: ${error}`))
}

let nombre = null;

const pprincipal = () => {

    let input = document.getElementById('input-nombre')
    let div_p = document.getElementById('home')
    let btn = document.getElementById('btn-principal')
    let div_principal = document.getElementById('p-principal')

    btn.addEventListener('click', () => {
        nombre = input.value
        div_p.classList.add('none')
        div_principal.classList.remove('none')
        document.cookie = `Nombre=${nombre}`
        input.value = ''
    })
}

const loadmusicplayer = () => {
    let div = document.getElementById('mp')
    let div_p = document.getElementById('p-principal')

    let button_mp = document.getElementById('reproductor')

    button_mp.addEventListener('click', () => {
        div_p.classList.add('none')
        div.classList.remove('none')
    })
}

function Controls() {
    const reproductor = new Reproductor()
    let svg_play = document.getElementById('play')
    let svg_pause = document.getElementById('pause')
    let svg_atras = document.getElementById('atras')
    let svg_adelante = document.getElementById('adelante')

    svg_play.addEventListener('click', () => {
        reproductor.play()
        svg_play.classList.add('none')
        svg_pause.classList.remove('none')
    })
    svg_pause.addEventListener('click', () => {
        reproductor.pause()
        svg_play.classList.remove('none')
        svg_pause.classList.add('none')
    })
    svg_atras.addEventListener('click', () => {
        reproductor.otracancion()
    })
    svg_adelante.addEventListener('click', () => {
        reproductor.otracancion()
    })
}

class Reproductor {

    constructor() {
        this.p_titulo = document.getElementById('titulo_song')
        this.img = document.getElementById('song_image')
        this.p_titulo.textContent = "Initial D - Spitfire"
        this.img.src = "https://vmndims.binge.com.au/api/v2/img/5e704b06e4b0f4391761e2d6-1584417689045?location=tile&imwidth=1280"
        this.audio = new Audio('audio/ID_Spitfire.mp3')
        this.audio.volume = 0.6
    }

    play() {
        this.audio.play()
    }

    pause() {
        this.audio.pause()
    }

    otracancion() {
        getMusicList()
        .then((data) => {
            let cant = data.Music.length
            let object = data.Music
            console.log(cant)
            let v = Math.floor(Math.random() * cant);
            this.p_titulo.textContent = object[v].Titulo
            this.img.src = object[v].src_img
            this.audio.src = object[v].src_audio
        })
        .catch((error) => alert(`El error es: ${error}`))
    }

}