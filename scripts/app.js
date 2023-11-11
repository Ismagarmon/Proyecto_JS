import { TOGGLE, getCardList, getMusicList } from "./module.js";

window.onload = () => {
    pprincipal()
    loadmusicplayer()
    Controls()
    let p = document.getElementById('progress')
    p.addEventListener('click', () => {
        console.log(p.value)
    })
}

let nombre = null;

const pprincipal = () => {

    let input = document.getElementById('input-nombre')
    let div_p = document.getElementById('home')
    let btn = document.getElementById('btn-principal')
    let div_principal = document.getElementById('p-principal')

    btn.addEventListener('click', () => {
        if (input.value === '') {
            alert('Introduce algo en el nombre')
        }
        else {
            nombre = input.value
            div_p.classList.add('none')
            div_principal.classList.remove('none')
            document.cookie = `Nombre=${nombre}`
            input.value = ''
        }
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
        setInterval(() => {
            reproductor.actualizartiempo()
            reproductor.actualizartiemposegundos()
        }, 1000)
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
        this.p = document.createElement('p')
        this.p2 = document.createElement('p')
        this.barra_tiempo = document.getElementById('progress')
        this.p_titulo = document.getElementById('titulo_song')
        this.img = document.getElementById('song_image')
        this.p_titulo.textContent = "Initial D - Spitfire"
        this.img.src = "https://vmndims.binge.com.au/api/v2/img/5e704b06e4b0f4391761e2d6-1584417689045?location=tile&imwidth=1280"
        this.audio = new Audio('audio/ID_Spitfire.mp3')
        this.audio.volume = 0.6
    }

    play() {
        this.audio.play()
        this.p.style.cssText = `
        color: white;
        padding-left: 20px;
        font-size: medium;
        font-family: var(--secondaryfont)
        `
        const minutos = Math.floor(this.audio.duration.toFixed(0) / 60);
        let segundos = Math.floor(this.audio.duration.toFixed(0) % 60);
        if(segundos < 10){
            segundos = '0'+Math.floor(this.audio.duration.toFixed(0) % 60);
        }
        this.p.textContent = `${minutos} : ${segundos}`

        this.barra_tiempo.insertAdjacentElement('afterend', this.p)
        this.p2.id = 'tiempoactual'
        this.p2.style.cssText = `
        color: white;
        padding-right: 20px;
        font-size: medium;
        font-family: var(--secondaryfont)
        `
        if(this.audio.currentTime == 0){
            this.p2.textContent = '0 : 0'
        }
        
        this.barra_tiempo.insertAdjacentElement('beforebegin', this.p2)
        this.barra_tiempo.max = this.audio.duration
    }

    pause() {
        this.audio.pause()
    }

    actualizartiempo() {
        if (this.audio.currentTime > 0) {
            let progreso = this.audio.currentTime
            let tiempo = Math.floor(progreso)
            this.barra_tiempo.value = tiempo
        }

        if (this.audio.ended) {
            let svg_play = document.getElementById('play')
            let svg_pause = document.getElementById('pause')

            svg_pause.classList.add('none')
            svg_play.classList.remove('none')
        }
    }

    otracancion() {
        getMusicList()
            .then((data) => {
                let cant = data.Music.length
                let object = data.Music
                let v = Math.floor(Math.random() * cant);
                this.p_titulo.textContent = object[v].Titulo
                this.img.src = object[v].src_img
                this.audio.src = object[v].src_audio
                this.barra_tiempo.value = 0
                this.barra_tiempo.max = 100
                this.p.textContent = ''
                this.p2.textContent = ''
            })
            .catch((error) => alert(`El error es: ${error}`))
        let svg_play = document.getElementById('play')
        let svg_pause = document.getElementById('pause')

        svg_pause.classList.add('none')
        svg_play.classList.remove('none')
    }

    actualizartiemposegundos() {
        let p2 = document.getElementById('tiempoactual')
        const minutos = Math.floor(this.audio.currentTime / 60);
        let segundos = Math.floor(this.audio.currentTime % 60);
        if(segundos < 10){
            segundos = '0'+Math.floor(this.audio.currentTime % 60);
        }
        p2.textContent = `${minutos} : ${segundos}`
    }

}

