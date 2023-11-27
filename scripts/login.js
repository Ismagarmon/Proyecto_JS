window.onload = () => {
    pprincipal()
}

const pprincipal = () => {

    let input = document.getElementById('input-nombre')

    input.value = ''
    let div_p = document.getElementById('home')
    let btn = document.getElementById('btn-principal')
    btn.style.display = 'none'
    let div_principal = document.getElementById('p-principal')
    const regexpassword = /^(?=.*[A-Z]){1,}(?=.*[a-z]){1,}(?=.*[0-9]){1,}(?=.*[\W_]){1,}/

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
            swal('Info:', 'El nombre tiene que tener una mayúscula, una minúscula, un número y un símbolo como mínimo.', 'error')
        }
        else {
            let nombre = input.value
            div_p.classList.add('none')
            div_principal.classList.remove('none')
            
            document.cookie = `Nombre=${nombre}`

            input.value = ''
        }
    })
}

function getCookie(nombre) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith(nombre + '=')) {
            return cookie.slice(nombre.length + 1);
        }
    }
}