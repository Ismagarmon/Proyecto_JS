//Lo priero que hago es llamar a esta funcion para que cuando se termine de cargar la pagina llame a la funcion pprincipal

window.onload = () => {
    pprincipal()
    swal('Info:', 'La contraseña tiene que tener 8 caracaters como mínimo, mayusculas, minusculas, números y al menos un símbolo.', 'warning')
}

const pprincipal = () => {

    //Aquí obtengo el input del nombre y el botón, que solo aparecerá el botón cuando haya algo en el input
    let input = document.getElementById('input-nombre')
    let btn = document.getElementById('btn-principal')
    input.value = ''
    btn.style.display = 'none'

    //Esta es la regex para poner el nombre
    const regexpassword = /^[A-Za-z0-9\W]+$/g
    
    //Este es el evento para que aparezca el botón cuando se escriba algo
    input.addEventListener('input', () => {
        if (input.value === '') {
            btn.style.display = 'none'
        }
        else {
            btn.style.display = 'block'
        }
    })

    //En este botón vamos a crear una alerta para que cuando no se ponga bien el nombre se le notifique al usuario y que cuando esté correcta
    //se haga una cookie con el nombre de dicho usuario
    btn.addEventListener('click', () => {
        if (!regexpassword.test(input.value)) {
            alert('No has introducido correctamente el nombre')
        }
        else {
            let nombre = input.value
            setCookie('Nombre',nombre,9999)

            //Con esto nos redirigimos a la aplicacion, en donde está el juego de cartas y el reproductor
            window.location.assign('app.html')

            //Eliminamos el contenido del input
            input.value = ''
        }
    })
}

//Esta es la funcion que utilizo para crear la cookie
function setCookie(nombre, valor, diasExpiracion) {
    const fechaExpiracion = new Date()
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (diasExpiracion * 24 * 60 * 60 * 1000))
    const cadenaExpiracion = `expires=${fechaExpiracion.toUTCString()}`
    
    //Esta es la cookie que se crea, que luego la utilizaremos en la aplicacion
    document.cookie = `${nombre}=${valor}; ${cadenaExpiracion}; path=/`
}