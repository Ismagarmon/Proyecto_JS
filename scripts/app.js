import { imgcard, getCardList, getMusicList, svgplaymusiclist, Contador } from './module.js'

window.onload = () => {
    loadmenu()
    Controls()
    NewGame()
}

const loadmenu = () => {
    let div_mp = document.getElementById('mp')
    let div_p = document.getElementById('p-principal')
    let div_gc = document.getElementById('gc')

    let button_mp = document.getElementById('reproductor')

    let button_juego = document.getElementById('juego')

    let div_m_mp = document.getElementById('menu-mp')

    let div_m_gc = document.getElementById('menu-gc')

    button_mp.addEventListener('click', () => {
        div_p.classList.add('none')
        div_mp.classList.remove('none')
    })

    button_juego.addEventListener('click',() => {
        div_p.classList.add('none')
        div_gc.classList.remove('none')
    })

    div_m_mp.addEventListener('click',() => {
        div_p.classList.remove('none')
        div_mp.classList.add('none')
    })

    div_m_gc.addEventListener('click',() => {
        div_p.classList.remove('none')
        div_gc.classList.add('none')
    })
}

function Controls() {
    const reproductor = new ReproductorMusica()
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

    svg_adelante.addEventListener('click', function () {
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

function NewGame() {
    const cardgame = new CardGame()

    let buttonstart = document.querySelector('#playbutton')

    buttonstart.addEventListener('click', function () {
        cardgame.Play()
        buttonstart.textContent = 'Jugar de nuevo'
    })
}

class ReproductorMusica extends Contador {

    audio = new Audio()
    refresh = document.querySelector('#refresh')
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

    get getID() {
        return this.Id
    }

    constructor() {
        super()
        this.p_titulo.textContent = "Initial D - Don't Go Baby"
        this.img.src = 'https://www.crunchyroll.com/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/aaee4e34242e3abc0af317edbada66aa.jpe'
        this.audio.src = 'audio/ID_B.mp3'
        this.audio.volume = 0.5
        this.volumen.value = this.audio.volume * 100
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

        this.p.textContent = '0 : 00'
        this.p.style.cssText = `
            color: white;
            padding-left: 20px;
            font-size: medium;
            font-family: var(--secondaryfont)
        `
        this.barra_tiempo.insertAdjacentElement('afterend', this.p)

        this.p2.textContent = '0 : 00'
        this.p2.style.cssText = `
            color: white;
            padding-right: 20px;
            font-size: medium;
            font-family: var(--secondaryfont)
        `
        this.barra_tiempo.insertAdjacentElement('beforebegin', this.p2)
    }

    play() {
        this.audio.play()

        const minutos = Math.floor(this.audio.duration.toFixed(0) / 60)
        let segundos = Math.floor(this.audio.duration.toFixed(0) % 60)
        if (segundos < 10) {
            segundos = '0' + Math.floor(this.audio.duration.toFixed(0) % 60)
        }
        this.p.textContent = `${minutos} : ${segundos}`

        this.barra_tiempo.insertAdjacentElement('afterend', this.p)
        this.p2.id = 'tiempoactual'

        if (this.audio.currentTime == 0) {
            this.p2.textContent = '0 : 00'
        }

        this.p2.textContent = '0 : 00'
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

            const minutos = Math.floor(this.audio.duration.toFixed(0) / 60)
            let segundos = Math.floor(this.audio.duration.toFixed(0) % 60)
            if (segundos < 10) {
                segundos = '0' + Math.floor(this.audio.duration.toFixed(0) % 60)
            }
            this.p.textContent = `${minutos} : ${segundos}`

            this.barra_tiempo.value += 1
        }
    }

    otracancion() {
        getMusicList()
            .then((data) => {
                let cant = data.Music.length
                let object = data.Music
                let v = Math.floor(Math.random() * cant)
                while (this.Id === v || this.Id + 1 === v || this.Id - 1 === v) {
                    v = Math.floor(Math.random() * cant)
                }
                this.p_titulo.textContent = object[v].Titulo
                this.img.src = object[v].src_img
                this.audio.src = object[v].src_audio
                this.Id = object[v].Id
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

    actualizartiemposegundos() {
        let p2 = document.getElementById('tiempoactual')
        const minutos = Math.floor(this.audio.currentTime / 60)
        let segundos = Math.floor(this.audio.currentTime % 60)
        if (segundos <= 10) {
            segundos = '0' + Math.floor(this.audio.currentTime % 60)
        }
        p2.textContent = `${minutos} : ${segundos}`
    }

    refrescarcancion() {
        this.refresh.addEventListener('click', () => {
            let svg_play = document.getElementById('play')
            let svg_pause = document.getElementById('pause')

            svg_pause.classList.add('none')
            svg_play.classList.remove('none')

            this.p2.textContent = '0 : 00'
            this.audio.currentTime = 0
            this.audio.pause()

            this.barra_tiempo.value = 0
        })
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
                let objetorecibido = object.find(objectfound => objectfound.Id === this.Id)

                nextcancion = objetorecibido.Id + numero

                if (nextcancion >= this.cantSongs) {
                    nextcancion = 0
                }

                if (nextcancion < 0) {
                    nextcancion = data.Music.length - 1
                }

                this.Id = nextcancion

                let objetoencontrado = object.find(objectfound => objectfound.Id == nextcancion)

                this.p_titulo.textContent = objetoencontrado.Titulo
                this.img.src = objetoencontrado.src_img
                this.audio.src = objetoencontrado.src_audio
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

class CardGame extends Contador {

    array_cartas = []
    tablero = document.querySelector('#tablerogrid')
    cartas_acertadas = 0
    btnplay = document.getElementById('playbutton')
    timer = document.getElementById('ttranscurrido')
    pttiempo = document.getElementById('ttranscurridop')
    span_mj = document.getElementById('mj')
    puntuacion = 0
    cant_segundos = 92
    intervalo_tiempo = null
    cant_puntos = 280

    constructor() {
        super()
        this.pttiempo.style.paddingBottom = '1rem'
        this.timer.style.color = 'var(--white)'
        this.timer.style.fontFamily = 'var(--secondaryfont)'
        this.timer.style.fontSize = 'large'
        localStorage.setItem('puntuacion', JSON.stringify({ nombre: `${getCookie('Nombre')}`, puntuacion: 0 }))
    }

    pintarcartas() {

        this.StartTimer()

        getCardList().then(json => {

            let array_primero = [0, 1, 2, 3, 4, 5, 6]
            array_primero = array_primero.sort(function () { return Math.random() - 0.5 })

            let array_segundo = [0, 1, 2, 3, 4, 5, 6]
            array_segundo = array_segundo.sort(function () { return Math.random() - 0.5 })


            this.generarcartas(array_primero, array_segundo, json)

        })
    }

    generarcartas(array_primero, array_segundo, json) {

        array_primero.forEach(number => {

            let div = document.createElement('div')
            div.classList.add('flex-cc')
            div.style.backgroundColor = 'var(--white)'

            div.classList.add('no_seleccionado')
            div.style.width = '13.7rem'
            div.style.height = '17rem'
            div.classList.add('cursor_pointer')
            div.id = json.Cartas[number].Id
            div.innerHTML = imgcard(json.Cartas[div.id].src, 100, 100)

            this.tablero.append(div)
        })

        array_segundo.forEach(number => {

            let div = document.createElement('div')
            div.classList.add('flex-cc')
            div.style.backgroundColor = 'var(--white)'

            div.classList.add('no_seleccionado')
            div.style.width = '13.7rem'
            div.style.height = '17rem'
            div.classList.add('cursor_pointer')
            div.id = json.Cartas[number].Id
            div.innerHTML = imgcard(json.Cartas[div.id].src, 100, 100)

            this.tablero.append(div)
        })

        this.empezarjuego(json)
    }


    empezarjuego(json) {

        let divs = this.tablero.querySelectorAll('div')

        setTimeout(() => {
            divs.forEach(div => {
                div.classList.add('rotate')
                div.innerHTML = imgcard('img/Interrogacion.png', 50, 50)
                let img = div.querySelector('img')
                img.classList.add('rotate')

                div.addEventListener('click', () => this.Voltear(div, json))
            })
        }, 4000)
    }

    Voltear(div, json) {
        this.array_cartas.push(parseInt(div.id))

        div.classList.remove('no_seleccionado')
        div.classList.add('seleccionado')
        div.classList.remove('rotate')
        div.classList.add('rotate-reverse')

        setTimeout(() => {
            div.innerHTML = imgcard(json.Cartas[div.id].src, 100, 100)
        }, 200)

        this.comprobar()
    }

    comprobar() {

        if (this.array_cartas.length == 2 && this.array_cartas[0] === this.array_cartas[1]) {
            let divocultar = document.querySelectorAll(`div[id="${this.array_cartas[0]}"]`)

            divocultar.forEach(div => {

                div.classList.remove('cursor_pointer')
                div.classList.add('cursor_default')

                setTimeout(() => {
                    div.classList.add('drop')
                    div.removeEventListener('click', () => this.Voltear())
                }, 500)
            })

            this.array_cartas = []
            this.cartas_acertadas++
            if (this.cartas_acertadas === 7) {
                this.Ganar()
            }
        }
        else if (this.array_cartas.length == 2 && this.array_cartas[0] !== this.array_cartas[1]) {

            this.ResetearCartas(this.array_cartas)
            this.array_cartas = []
        }
    }

    ResetearCartas(array_cartas) {
        array_cartas.forEach(id => {
            let divocultar = document.querySelectorAll(`div[id="${id}"]`)

            setTimeout(() => {
                divocultar.forEach(div => {
                    if (div.classList.contains('seleccionado')) {
                        div.classList.remove('seleccionado')
                        div.classList.add('no_seleccionado')
                        div.classList.remove('rotate-reverse')
                        div.classList.add('rotate')
                        div.innerHTML = imgcard('img/Interrogacion.png', 50, 50)
                        let img = div.querySelector('img')
                        img.classList.add('rotate')
                    }
                })
            }, 500)
        })
    }

    Ganar() {

        setTimeout(() => {
            this.tablero.innerHTML = ''

            alert('¡Has ganado, enhorabuena!')

            clearInterval(this.intervalo_tiempo)
            this.segundos = 0
            this.minutos = 0

            this.timer.textContent = '0 : 00'

            this.puntuacion = this.cant_puntos * 30

            let jsonEnLocalStorage = localStorage.getItem("puntuacion")
            let json = JSON.parse(jsonEnLocalStorage)

            if (this.puntuacion > this.span_mj.textContent) {
                this.span_mj.textContent = this.puntuacion
                alert('¡Has obtenido record personal!')

            }
            json.puntuacion = this.puntuacion
            localStorage.setItem("puntuacion", JSON.stringify(json));

        }, 400)

        this.cartas_acertadas = 0

    }

    StartTimer() {
        this.intervalo_tiempo = setInterval(() => {
            this.timer.textContent = this.Timer()

            this.pttiempo.insertAdjacentElement('afterend', this.timer)
            this.cant_segundos--
            this.cant_puntos--
            console.log(this.cant_segundos)
            if (this.cant_segundos == 0) {
                this.Perder()
                clearInterval(this.intervalo_tiempo)
            }

        }, 1000)
    }

    Perder() {
        this.tablero.innerHTML = ''
        alert('¡Has perdido, vuelve a intentarlo!')

        clearInterval(this.intervalo_tiempo)
        this.segundos = 0
        this.minutos = 0

        this.timer.textContent = '0 : 00'

        this.cartas_acertadas = 0

    }

    Play() {
        this.pintarcartas()
    }

}
