import { Musica, TOGGLE } from "./module.js";

window.onload = () => {
    pprincipal()
    loadmusicplayer()
}

let nombre = null;

const pprincipal = () => {

    let input = document.getElementById('input-nombre')
    let div_p = document.getElementById('home')
    let btn = document.getElementById('btn-principal')
    let div_principal = document.getElementById('p-principal')
    
    btn.addEventListener('click',() => {
        nombre = input.value
        div_p.classList.add('none')
        div_principal.classList.remove('none')
        document.cookie = `Nombre=${nombre}`
        input.value = ''
        console.log(nombre)
    })
}

const loadmusicplayer = () => {
    let div = document.getElementById('mp')
    let div_p = document.getElementById('p-principal')

    let button_mp = document.getElementById('reproductor')

    button_mp.addEventListener('click',() => {
        div_p.classList.add('none')
        div.classList.remove('none')
    })
}
