import { TOGGLE, getCardList, getMusicList, svgplaymusiclist } from './module.js'

let arraymusica = []

window.onload = () => {
    pprincipal()
    loadmusicplayer()
    Controls()
}

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
    reproductor.crearlista()

    let svg_play = document.getElementById('play')
    let svg_pause = document.getElementById('pause')
    let svg_atras = document.getElementById('atras')
    let svg_adelante = document.getElementById('adelante')
    let svg_aleatorio = document.getElementById('aleatorio')
    let svg_refresh = document.getElementById('refresh')
    let path = document.getElementById('aleatoriorellenar')

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
        if (reproductor.Random) {
            reproductor.otracancion()
        } else {
            reproductor.otracancionnoaleatoria(-1)
        }
    })
    svg_adelante.addEventListener('click', () => {
        if (reproductor.Random) {
            reproductor.otracancion()
        } else {
            reproductor.otracancionnoaleatoria(1)
        }
    })

    svg_aleatorio.addEventListener('click', () => {
        reproductor.random()
        if (path.getAttribute('fill') == 'green') {
            path.setAttribute('fill', 'white')
        } else {
            path.setAttribute('fill', 'green')
        }
    })

    svg_refresh.addEventListener('click', () => {
        reproductor.refrescarcancion()
    })
}

class Reproductor {

    Random = false
    Id = 0
    cantSongs = 0
    p = document.createElement('p')
    p2 = document.createElement('p')
    barra_tiempo = document.querySelector('#progress')
    p_titulo = document.querySelector('#titulo_song')
    img = document.querySelector('#song_image')
    masv = document.querySelector('#mas')
    menosv = document.querySelector('#menos')
    volumen = document.querySelector('#volumen')
    pvolumen = document.querySelector('#volumenmusic')

    constructor() {
        this.p2.textContent = '0 : 00'
        this.p_titulo.textContent = "Initial D - Don't Go Baby"
        this.img.src = 'https://vmndims.binge.com.au/api/v2/img/5e704b06e4b0f4391761e2d6-1584417689045?location=tile&imwidth=1280'
        this.audio = new Audio('audio/ID_B.mp3')
        this.audio.volume = 0.5
        this.volumen.value = this.audio.volume * 100
        this.volumen.max = 100
        this.Id = 0
        this.pvolumen.textContent = this.audio.volume * 10

        this.masv.addEventListener('click', () => {
            let nuevo_volumen = this.volumen.value + 10
            if (nuevo_volumen >= 100) {
                this.volumen.value = 100
                this.cambiarvolumen(1)
                this.pvolumen.textContent = this.audio.volume * 10
            } else {
                this.volumen.value = nuevo_volumen
                this.cambiarvolumen((nuevo_volumen / 100).toFixed(1))
                this.pvolumen.textContent = this.audio.volume * 10
            }
        })

        this.menosv.addEventListener('click', () => {
            let nuevo_volumen = this.volumen.value - 10

            if (nuevo_volumen <= 0) {
                this.volumen.value = 0
                this.cambiarvolumen(0)
                this.pvolumen.textContent = this.audio.volume * 10
            } else {
                this.volumen.value = nuevo_volumen
                this.cambiarvolumen((nuevo_volumen / 100).toFixed(1))
                this.pvolumen.textContent = this.audio.volume * 10
            }
        })

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
        if (segundos < 10) {
            segundos = '0' + Math.floor(this.audio.duration.toFixed(0) % 60);
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
        if (this.audio.currentTime == 0) {
            this.p2.textContent = '0 : 00'
        }

        this.barra_tiempo.insertAdjacentElement('beforebegin', this.p2)
        this.barra_tiempo.max = this.audio.duration.toFixed(0)
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
        if (segundos < 10) {
            segundos = '0' + Math.floor(this.audio.currentTime % 60);
        }
        p2.textContent = `${minutos} : ${segundos}`
    }

    refrescarcancion() {

    }

    random() {
        if (this.Random === true) {
            this.Random = false
        }
        else {
            this.Random = true
        }

    }

    crearlista() {
        let div = document.getElementById('iconos')
        div.style.cssText = `
            margin-bottom: 30px;
        `

        getMusicList().then(data => {
            let cant = data.Music.length
            let listamusica = data.Music
            for (let i = cant - 1; i >= 0; i--) {
                let nuevo_div = document.createElement('div')
                nuevo_div.style.cssText = `
                    color: var(--white);
                    text-align: center;
                    margin-bottom: 20px;
                    border-radius: 30px;
                    font-family: var(--secondaryfont);
                    position: relative;
                    height: 2rem;
                    `
                let span = document.createElement('span')
                span.id = 'svg'
                span.innerHTML = svgplaymusiclist
                nuevo_div.insertAdjacentElement('beforeend', span)

                let p = document.createElement('p')
                p.textContent = listamusica[i].Titulo
                p.id = 'titulo'
                nuevo_div.insertAdjacentElement('afterbegin', p)
                div.insertAdjacentElement('afterend', nuevo_div)
            }
        })
    }

    otracancionnoaleatoria(numero) {
        let nextcancion = 0
        getMusicList()
            .then((data) => {
                this.cantSongs = data.Music.length
                let object = data.Music
                let objetorecibido = object.find(objectfound => objectfound.Id == this.Id)

                nextcancion = objetorecibido.Id + numero

                if (nextcancion >= this.cantSongs) {
                    nextcancion = 0
                }

                if (nextcancion < 0) {
                    nextcancion = data.Music.length - 1
                }

                this.Id = nextcancion

                let objetorecibido_ejecutar = object.find(objectfound => objectfound.Id == nextcancion)

                this.p_titulo.textContent = objetorecibido_ejecutar.Titulo
                this.img.src = objetorecibido_ejecutar.src_img
                this.audio.src = objetorecibido_ejecutar.src_audio
                this.barra_tiempo.value = 0
                this.barra_tiempo.max = 100
                this.p.textContent = '0 : 00'
                this.p2.textContent = '0 : 00'
            })
            .catch((error) => alert(`El error es: ${error}`))

        let svg_play = document.getElementById('play')
        let svg_pause = document.getElementById('pause')

        svg_pause.classList.add('none')
        svg_play.classList.remove('none')
    }

    cambiarvolumen(volumen) {
        this.audio.volume = volumen
    }
}