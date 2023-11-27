window.onload = () => {
    pprincipal()
}

const pprincipal = () => {

    let input = document.getElementById('input-nombre')
    let btn = document.getElementById('btn-principal')
    input.value = ''
    btn.style.display = 'none'
    const regexpassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/

    input.addEventListener('input', () => {
        if (input.value === '') {
            btn.style.display = 'none'
        }
        else {
            btn.style.display = 'block'
        }
    })

    btn.addEventListener('click', () => {
        if (!regexpassword.test(input.value)) {
            swal('Info:', 'El nombre tiene que tener una mayúscula, una minúscula, un número y un símbolo como mínimo, y 8 cacarteres.', 'error')
        }
        else {
            let nombre = input.value
            setCookie('Nombre',nombre,9999)
            window.location.assign('app.html')

            input.value = ''
        }
    })
}

function setCookie(nombre, valor, diasExpiracion) {
    const fechaExpiracion = new Date()
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (diasExpiracion * 24 * 60 * 60 * 1000))
    const cadenaExpiracion = `expires=${fechaExpiracion.toUTCString()}`
    document.cookie = `${nombre}=${valor}; ${cadenaExpiracion}; path=/`
}