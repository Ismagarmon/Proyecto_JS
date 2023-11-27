//Con esta linea lo que hacemos es importar la clase, los metodos y los html para crear las dos aplicacion, en donde nos darán
//un json con las canciones y las cartas que vamos a usar para el juego de cartas
import { imgcard, getCardList, getMusicList, svgplaymusiclist, Contador } from './module.js'

//En cuanto se carge el DOM ejecutamos estas tres funciones
window.onload = () => {
    loadmenu()
    Controls()
    NewGame()
}

//Funcion para obtener el nombre de la cookie que hemos creado antes
function getCookie(nombre) {
    //metemos en un array todas las cookies porque están separadas por ; 
    const cookies = document.cookie.split(';')

    //Las vamos iterando
    for (let i = 0; i < cookies.length; i++) {
        //quitamos los epaciones en blanco para que no haya problemas de longitud luego
        const cookie = cookies[i].trim()

        //Si la cookie empieza por el nombre que le pasamos que nos de todo lo restante con el métido slice, que es lo que hay a la derecha del =
        if (cookie.startsWith(nombre + '=')) {
            return cookie.slice(nombre.length + 1)
        }
    }
}

//En esta funcion cargamos la funcionalidad de los botones
const loadmenu = () => {
    //Metemos en variables todos los elementos del DOM que sean los botones
    let div_mp = document.getElementById('mp')
    let div_p = document.getElementById('p-principal')
    let div_gc = document.getElementById('gc')

    let button_mp = document.getElementById('reproductor')

    let button_juego = document.getElementById('juego')

    let div_m_mp = document.getElementById('menu-mp')

    let div_m_gc = document.getElementById('menu-gc')

    //Aquí lo que hacemos es quitar y añadir la clase none para que se oculten y vayan apareciendo los que a mi me interesan
    button_mp.addEventListener('click', () => {
        div_p.classList.add('none')
        div_mp.classList.remove('none')
    })

    button_juego.addEventListener('click', () => {
        div_p.classList.add('none')
        div_gc.classList.remove('none')
    })

    div_m_mp.addEventListener('click', () => {
        div_p.classList.remove('none')
        div_mp.classList.add('none')
    })

    div_m_gc.addEventListener('click', () => {
        div_p.classList.remove('none')
        div_gc.classList.add('none')
    })
}

//Con esta funcion creamos los controles del reproductor de musica
function Controls() {
    //Creamos una nueva instancia del reproductor para poder utilizar sus metodos
    const reproductor = new ReproductorMusica()

    //Creamos la lista del reproductor
    reproductor.crearlista()

    //Obtenemos todos los svg para poder controlar las opciones del reproductor
    let svg_play = document.getElementById('play')
    let svg_pause = document.getElementById('pause')
    let svg_atras = document.getElementById('atras')
    let svg_adelante = document.getElementById('adelante')
    let svg_aleatorio = document.getElementById('aleatorio')
    let svg_refresh = document.getElementById('refresh')
    let path = document.getElementById('aleatoriorellenar')
    let svgmas = document.getElementById('mas')
    let svgmenos = document.getElementById('menos')

    svgmas.addEventListener('click', function () {
        reproductor.subirvolumen()
    })

    svgmenos.addEventListener('click', function () {
        reproductor.bajarvolumen()
    })

    //Este sirve para empezar a escuchar la musica seleccionada
    svg_play.addEventListener('click', () => {
        reproductor.play()
        svg_play.classList.add('none')
        svg_pause.classList.remove('none')

        setInterval(() => {
            reproductor.actualizartiempo()
            reproductor.actualizartiemposegundos()
        }, 1000)
    })

    //Este sirve para parar la musica seleccionada y cambiar el svg
    svg_pause.addEventListener('click', () => {
        reproductor.pause()
        svg_play.classList.remove('none')
        svg_pause.classList.add('none')
    })

    //Este svg sirve para ir a la pista anterior, y depende si está en aleatorio, para ello tengo un atributo en la clase
    svg_atras.addEventListener('click', () => {
        if (reproductor.Random) {
            reproductor.otracancion()
        } else {
            reproductor.otracancionnoaleatoria(-1)
        }
    })

    //Este svg sirve para ir a la pista posterior, y depende si está en aleatorio, para ello tengo un atributo en la clase
    svg_adelante.addEventListener('click', function () {
        if (reproductor.Random) {
            reproductor.otracancion()
        } else {
            reproductor.otracancionnoaleatoria(1)
        }
    })

    //Esto sirve para cambiar a verde el svg y mostrar al usuario el modo aleatorio o el normal
    svg_aleatorio.addEventListener('click', () => {
        reproductor.random()
        if (path.getAttribute('fill') == 'green') {
            path.setAttribute('fill', 'white')
        } else {
            path.setAttribute('fill', 'green')
        }
    })

    //Este sirve para poner la cancion a 0
    svg_refresh.addEventListener('click', () => {
        reproductor.refrescarcancion()
    })
}

//Esta funcion sirve para crear una nueva instancia del juego de cartas, y obteniendo el botón empezar para crear un nuevo juego
function NewGame() {
    //Esta es la instancia del juego de cartas
    const cardgame = new CardGame()

    let buttonstart = document.querySelector('#playbutton')

    //Con esta accion siempre empiezo un juego nuevo
    buttonstart.addEventListener('click', function () {
        cardgame.Play()
        buttonstart.textContent = 'Jugar de nuevo'
    })
}

//Aquí declaro la clase del reproductor de música, en donde hereda de la clase padre Contador, que en este momento no utilizo un contador que tiene dicha clase

class ReproductorMusica extends Contador {

    //Aquí declaro todos los atributos que tiene esta clase, que es lo que vamos a ir utilizando para ir cambiando de musica y realizar las peticiones
    //de cambiar musica y pararla, etc.....

    //Declaro en la propia clase una nueva instancia de auidio,pero no la inizializo
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

    //Creo un metodo get para obtener el ID de la cancion que hay en este momento
    get getID() {
        return this.Id
    }

    //En el constructor llamo al constructor de la clase padre y creo el texto para la primera cancion de todas
    constructor() {
        super()

        //Voy metiendo el nombre de las canciones a los parrafos, imagenes, volumen del auido, etc....
        this.p_titulo.textContent = "Initial D - Don't Go Baby"
        this.img.src = 'https://www.crunchyroll.com/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/aaee4e34242e3abc0af317edbada66aa.jpe'
        this.audio.src = 'audio/ID_B.mp3'
        this.audio.volume = 0.5
        this.volumen.value = this.audio.volume * 100
        this.Id = 0
        this.pvolumen.textContent = this.audio.volume * 10

        //Lo que hago aquí es darle estilos a los numeros para que no queden feos y además voy metiendo valores de los cuales
        //luego les voy a ir utilizando para actilizar el tiempo de la cancion y el actual
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

    //Esta es la funcion para subir el volumen, en donde voy pillando el volumen actual
    //y lo voy sumando 10 hasta que llegue a 100 como máximo, paso a la funcion valores entre 1 y 0, porque es lo que utiliza la API Auido de JS
    subirvolumen() {
        let nuevo_volumen = this.volumen.value + 10

        //Si es mayor que 100 el numero que sea 100 como maximo
        if (nuevo_volumen >= 100) {
            this.volumen.value = 100
            this.cambiarvolumen(1)
            this.pvolumen.textContent = this.audio.volume * 10
        } else {
            this.volumen.value = nuevo_volumen
            //Aquí lo que hago es que el numero solo tenga un decimal y es lo que le paso a la funcion
            this.cambiarvolumen((nuevo_volumen / 100).toFixed(1))
            this.pvolumen.textContent = this.audio.volume * 10
        }
    }

    //Esta es la funcion para bajar el volumen, en donde voy pillando el volumen actual
    //y lo voy restando 10 hasta que llegue a 0 como máximo, paso a la funcion valores entre 1 y 0, porque es lo que utiliza la API Auido de JS
    bajarvolumen() {
        let nuevo_volumen = this.volumen.value - 10

        if (nuevo_volumen <= 0) {
            this.volumen.value = 0
            this.cambiarvolumen(0)
            this.pvolumen.textContent = this.audio.volume * 10
        } else {
            this.volumen.value = nuevo_volumen
            //Aquí lo que hago es que el numero solo tenga un decimal y es lo que le paso a la funcion
            this.cambiarvolumen((nuevo_volumen / 100).toFixed(1))
            this.pvolumen.textContent = this.audio.volume * 10
        }
    }

    //Esta es la funcion que utilizo para poner en marcha la música, en donde creo los valores de la duracion correctamente
    play() {
        this.audio.play()

        //Los minutos son el resto de dividir entre 60 que es lo que tiene un minuto
        const minutos = Math.floor(this.audio.duration.toFixed(0) / 60)

        //Los segundos son el resto de dividir entre 60
        let segundos = Math.floor(this.audio.duration.toFixed(0) % 60)

        //Si los segundos son menos que 
        if (segundos < 10) {
            //Aquí lo que hago es que el numero solo tenga un numero y no decimales
            segundos = '0' + Math.floor(this.audio.duration.toFixed(0) % 60)
        }

        //Y lo añado al contexto
        this.p.textContent = `${minutos} : ${segundos}`

        this.barra_tiempo.insertAdjacentElement('afterend', this.p)

        //Y lo mismo hago para el tiempo actual, si el tiempo actual es 0 pongo 0 : 00
        this.p2.id = 'tiempoactual'

        if (this.audio.currentTime == 0) {
            this.p2.textContent = '0 : 00'
        }

        this.p2.textContent = '0 : 00'
        this.barra_tiempo.insertAdjacentElement('beforebegin', this.p2)

        //Actualizo la bara de tiempo con la duracion máxima de la cancion, pero lo numero, no decimales, esto puede ser lo que haga
        //que me quede un trozo muy pequeño cuando termina la cancion 
        this.barra_tiempo.max = this.audio.duration.toFixed(0)
    }

    //Esta es la funcion que utilizo para poner en pause la música
    pause() {
        this.audio.pause()
    }

    //Aquí es donde voy creando los numeros con el tiempo actualizado en cada segundo
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

    //Esta funcion la utilizo solo para obtener una cancion aleatoria de la pista
    otracancion() {
        getMusicList()
            //Obtengo el json y lo trato
            .then((data) => {
                //Calculo la longitud
                let cant = data.Music.length
                //Obtengo el array
                let object = data.Music
                //Creo una variable random dentro de la cantidad de canciones que hay
                let v = Math.floor(Math.random() * cant)
                //Mientras el id sea el mismo, o el de la anterior o posterior, se generan hasta que no coindice con uno de estos
                while (this.Id === v || this.Id + 1 === v || this.Id - 1 === v) {
                    v = Math.floor(Math.random() * cant)
                }

                //Ahora creamos la nueva cancion ajustando los valores
                this.p_titulo.textContent = object[v].Titulo
                this.img.src = object[v].src_img
                this.audio.src = object[v].src_audio
                this.Id = object[v].Id

                //Volvemos a restaurar los valores de la barra de tiempo
                this.barra_tiempo.value = 0
                this.barra_tiempo.max = 100

                //Restauramos los valores de los minutos y segundos
                this.p.textContent = '0 : 00'
                this.p2.textContent = '0 : 00'
            })
            .catch((error) => alert(`El error es: ${error}`))
        let svg_play = document.getElementById('play')
        let svg_pause = document.getElementById('pause')

        svg_pause.classList.add('none')
        svg_play.classList.remove('none')
    }

    //En esta funcion voy actualizando en tiempo real el tiempo de la canción
    actualizartiemposegundos() {
        let p2 = document.getElementById('tiempoactual')
        const minutos = Math.floor(this.audio.currentTime / 60)
        let segundos = Math.floor(this.audio.currentTime % 60)

        //Añadimos un cero a la izquierda si es menos de 10
        if (segundos < 10) {
            segundos = '0' + Math.floor(this.audio.currentTime % 60)
        }
        p2.textContent = `${minutos} : ${segundos}`
    }

    //En esta funcion paramos el audio, lo ponemos 0, y además actualizamos el tiempo actual a 0, igual que la barra de progreso
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

    //Esta funcion es importante porque mira si el usuario quiero una cancion aleatorio o quiere seguir el curso de la pista de audio
    random() {
        if (this.Random === true) {
            this.Random = false
        }
        else {
            this.Random = true
        }

    }

    //En esta funcion creamos la lista de canciones que tenemos en el json
    crearlista() {
        let div = document.getElementById('iconos')
        div.style.cssText = `
            margin-bottom: 30px;
        `

        getMusicList().then(data => {
            let cant = data.Music.length
            let listamusica = data.Music

            //Hago esto porque no entiendo porque las canciones me las pone de la ultima hasta la primera, con esto invierto el orden
            for (let i = cant - 1; i >= 0; i--) {

                //Voy creando divs 
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
                //Vamos metiendo el titulo de cada canción
                p.textContent = listamusica[i].Titulo
                p.id = 'titulo'

                //Y los vamos insertando en la posicion que yo quiero
                nuevo_div.insertAdjacentElement('afterbegin', p)
                div.insertAdjacentElement('afterend', nuevo_div)
            }
        })
    }

    //Esta funcion sirve para obtener la cancion siguiente a la que hay en la pista, que no sea aleatorio y siga el curso de la lista
    otracancionnoaleatoria(numero) {
        let nextcancion = 0
        getMusicList()
            .then((data) => {
                this.cantSongs = data.Music.length
                let object = data.Music

                //Lo que hago con esto es recibir el objeto con el id de la cancion que hay actualmente para luego tratarlo
                let objetorecibido = object.find(objectfound => objectfound.Id === this.Id)

                //Le sumo o le resto 1 al id de la cancion actual
                nextcancion = objetorecibido.Id + numero

                //Si la cancion es mayor a la cantidad de canciones volvemos a empezar desde 0
                if (nextcancion >= this.cantSongs) {
                    nextcancion = 0
                }

                //Se la cancion es menor que 0 empezamos por la ultima
                if (nextcancion < 0) {
                    nextcancion = data.Music.length - 1
                }

                //Actualizamos el id de la clase
                this.Id = nextcancion

                //Volvemos a buscar el objeto de la siguiente cancion 
                let objetoencontrado = object.find(objectfound => objectfound.Id == nextcancion)

                //Actualizo los parámetros para poder reproducir la siguiente cancion 
                this.p_titulo.textContent = objetoencontrado.Titulo
                this.img.src = objetoencontrado.src_img
                this.audio.src = objetoencontrado.src_audio
                this.barra_tiempo.value = 0
                this.barra_tiempo.max = 100

                //Vuelvo a restrablecer los minutos y segundos
                this.p.textContent = '0 : 00'
                this.p2.textContent = '0 : 00'
            })
            .catch((error) => alert(`El error es: ${error}`))

        let svg_play = document.getElementById('play')
        let svg_pause = document.getElementById('pause')

        svg_pause.classList.add('none')
        svg_play.classList.remove('none')
    }

    //Esta es la funcion que realmente cambia el volumen del audio
    cambiarvolumen(volumen) {
        this.audio.volume = volumen
    }
}

//Ahora empezamos con la clase del juego de cartas
class CardGame extends Contador {

    //Aquí declaro todos los atributos que voy a utilzar para poder crear correctamente el juego de memoria de cartas
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

    //En este constructor meto el objeto con el nombre de usuario y los puntos iniciales para luego ir haciendo comprobaciones
    constructor() {
        super()
        this.estilarTimer()
        localStorage.setItem("puntos", JSON.stringify({ nombreusuario: getCookie('Nombre'), puntos: 0 }))
    }

    //Con esta funcion voy pintando las cartas
    pintarcartas() {
        //Empiezo a correr el tiempo
        this.StartTimer()

        //Obtengo las cartas del juego y creo los arrays para meter las cartas de manera aleatoria
        getCardList().then(json => {

            let array_primero = [0, 1, 2, 3, 4, 5, 6]
            //Con esta funcion desordeno el array
            array_primero = array_primero.sort(function () { return Math.random() - 0.5 })

            let array_segundo = [0, 1, 2, 3, 4, 5, 6]
            array_segundo = array_segundo.sort(function () { return Math.random() - 0.5 })

            //Llamo al metodo para generar las cartas
            this.generarcartas(array_primero, array_segundo, json)

        })
    }

    //Con esto lo unico que hago es estilar un poco el timer para quedarlo bonito
    estilarTimer() {


        this.pttiempo.style.paddingBottom = '1rem'
        this.timer.style.color = 'var(--white)'
        this.timer.style.fontFamily = 'var(--secondaryfont)'
        this.timer.style.fontSize = 'large'
    }

    //En esta funcion creo todas las cartas
    generarcartas(array_primero, array_segundo, json) {

        array_primero.forEach(number => {

            //Creo los elemenos div y añadiendo las clases que tengo en el css
            let div = document.createElement('div')
            div.classList.add('flex-cc')
            div.style.backgroundColor = 'var(--white)'

            div.classList.add('no_seleccionado')
            div.style.width = '13.7rem'
            div.style.height = '17rem'
            div.classList.add('cursor_pointer')

            //Aquí meto el id de la carta porque luego lo voy a utilizar para comprobar las cartas
            div.id = json.Cartas[number].Id

            //De primeras meto la imagen de la carta y no la oculta
            div.innerHTML = imgcard(json.Cartas[div.id].src, 100, 100)

            //Los divs los añado al tablero
            this.tablero.append(div)
        })

        //Hago lo mismo para el segundo array
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

        //Aquí llamo a empezar juego una vez que haya creado todas las cartas
        this.empezarjuego(json)
    }


    empezarjuego(json) {

        //Selecciono todos los divs de dentro del tablero
        let divs = this.tablero.querySelectorAll('div')

        setTimeout(() => {
            //Creo un timeout para que puedas ver las cartas durante 4 segundos y luego te ponga la imagen pero de interrogación para que no veas la otra parte de la cara
            divs.forEach(div => {
                div.classList.add('rotate')
                div.innerHTML = imgcard('img/Interrogacion.png', 50, 50)
                let img = div.querySelector('img')
                img.classList.add('rotate')
                //Y les añado el evento de click en el que comprueba la carta 
                div.addEventListener('click', () => this.Voltear(div, json))
            })
        }, 4000)
    }

    //Esta es la funcion que comprueba la carta
    Voltear(div, json) {
        if(div.classList.contains('drop')){
            //Si tiene la clase de que ya ha sido eliminada no hace nada
            alert('No haces nada pulsando en una carta adivinada')
        }
        else {
            //Sino, añade al array global los id del div y muestra el contenido de este
            this.array_cartas.push(parseInt(div.id))

            div.classList.remove('no_seleccionado')
            //Les añado el seleccionado para que se diferencie de su pareja, voy modificando dinamicamente el DOM
            div.classList.add('seleccionado')
            div.classList.remove('rotate')
            div.classList.add('rotate-reverse')
    
            setTimeout(() => {
                div.innerHTML = imgcard(json.Cartas[div.id].src, 100, 100)
            }, 200)
    
            //Llamamos a la función de comprobar
            this.comprobar()
        }
        
    }

    //Esta es la funcion comprobar
    comprobar() {

        //Si el array tiene 2 numeros y son iguales, selecciona los divs con ese id, les quita el cursor pointer y además los hace desaparecer, y quitamos el evento
        //añadimos 1 a las cartas acertadas hasta que tenga 7 y vaciamos el array
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
        //Si el array tiene 2 caracteres pero no son iguales, llamamos al metodo resetear las cartas y vaciamos el array para los nuevos numeros
        else if (this.array_cartas.length == 2 && this.array_cartas[0] !== this.array_cartas[1]) {

            this.ResetearCartas(this.array_cartas)
            this.array_cartas = []
        }
    }

    //Esta es la funcion que recibe el array lleno para observar los divs que hay ahí
    ResetearCartas(array_cartas) {
        //Seleccionamos cada div por su id y además compruebo si es el seleccionado, porque al haber dos iguales tienen que tener algo distinto
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
                        //Esto lo añado para que cuando se rote el div, se vuelva a rotar la imagen y quede correcta, simplemente visual
                        img.classList.add('rotate')

                    }
                })

            }, 500)
        })
    }

    //Esta es la funcion para saber si ha ganado, si he ganado, le saco una alerta, le calculo los puntos que obtiene y además si la puntuación que ha obtenido
    //es mayor que se actualice en el json del localstorage
    Ganar() {

        alert('¡Has ganado, enhorabuena!')
        this.reestablecertablero()

        this.puntuacion = this.cant_puntos * 30

        let jsonEnLocalStorage = localStorage.getItem("puntos")
        let json = JSON.parse(jsonEnLocalStorage)

        if (this.puntuacion > this.span_mj.textContent) {
            this.span_mj.textContent = this.puntuacion
            alert('¡Has obtenido record personal!')

        }
        json.puntos = this.puntuacion
        //Utilizo el localstorage para 
        localStorage.setItem("puntos", JSON.stringify(json))

    }

    //Esta es la función que uso para calcular el tiempo de juego y además donde tengo un temporizador de 1:30 de tiempo máximo
    //y la cantidad de puntos para que cuanto menos tiempo pase menos puntos obtengas
    StartTimer() {
        this.intervalo_tiempo = setInterval(() => {
            this.timer.textContent = this.Timer()

            this.pttiempo.insertAdjacentElement('afterend', this.timer)
            this.cant_segundos--
            this.cant_puntos--
            //Si la cantidad de segundos es 0, se te acaba el tiempo y llamo al metodo perder
            if (this.cant_segundos == 0) {
                this.Perder()
                clearInterval(this.intervalo_tiempo)
            }

        }, 1000)
    }

    //Esta es la función de perder
    Perder() {
        this.reestablecertablero()
        alert('¡Has perdido, vuelve a intentarlo!')

    }

    //Este es el metodo principal, para volver a jugar y volver a pintar las cartar en el tablero
    Play() {
        this.reestablecertablero()
        this.pintarcartas()
    }

    //Limpio el tablero para que no haya nada, reestablezco los segundos de la clase padre que es donde está el timer, además vuelvo a reestrablecer los valores inciales de la aplicacion
    reestablecertablero(){
        this.tablero.innerHTML = ''

        this.segundos = 0
        this.minutos = 0

        this.timer.textContent = '0 : 00'

        this.cartas_acertadas = 0
        this.cant_puntos = 200
        this.puntuacion = 0
        this.cant_segundos = 92
    }

}
