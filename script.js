const temaPagina = document.querySelector('#tema_da_pagina_btn')
const temaPaginaIcone = document.querySelector('#tema_da_pagina_btn > img')
const infoBtn = document.querySelector('#info_btn')
//↑↑ CONSTANTES

//↓↓ VARIÁVEIS
let temaDaPagina = 'Claro'

//↓↓ ACIONADORES
if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    alterarTema()
}
temaPagina.addEventListener("click", alterarTema)
infoBtn.addEventListener("click", abrirPopupInfo)
document.querySelector('#fechar_popup_info').addEventListener('click', fecharPopup)

//↓↓ FUNÇÕES
function alterarTema(){
    document.querySelector('body').classList.toggle('modo_escuro')
    if(temaDaPagina === 'Claro'){
        temaPaginaIcone.setAttribute('src', 'imagens/modo_escuro.png'); temaDaPagina = 'Escuro'
    } else {temaPaginaIcone.setAttribute('src', 'imagens/modo_claro.png'); temaDaPagina = 'Claro'}
}

function abrirPopupInfo(){
    document.querySelector('html').style.overflow = 'hidden'
    document.querySelector('#container_popup').style.display = 'flex';
}

function fecharPopup(){
    setTimeout(() => {
        document.querySelector('#container_popup').style.display = 'none';
        document.querySelector('html').style.overflow = 'scroll'
    }, 250);
}

//FERRAMENTA//
const saida = document.querySelector('#ferramenta_saida_link')
const container_saida = document.querySelector('#ferramenta_saida')
const btn_copiar_link = document.querySelector('#ferramenta_saida_copiar')
const btn_abrir_link = document.querySelector('#abrir_link_btn')

let telefone = document.querySelector('#numero_telefone').value
let mensagem = document.querySelector('#mensagem').value
let link = ''
//↑↑ VARIÁVEIS

//↓↓ ACIONADORES
btn_copiar_link.addEventListener('click', copiarLink)

//↓↓ FUNÇÕES
function verificarEntradasFerramenta(){
    telefone = document.querySelector('#numero_telefone').value
    mensagem = document.querySelector('#mensagem').value
    if(telefone === ''){alert('O campo de telefone deve ser preenchido!')}else if (mensagem === '') {criarLink(telefone)} else {criarLink(telefone, mensagem.replaceAll(' ','%20'))}
}

function criarLink(telefone, mensagem=0){
    if(telefone.includes('55') || telefone.includes('055')){} else{telefone = '55' + telefone}

    link = `https://api.whatsapp.com/send/?phone=${telefone}${mensagem !=0 ? `&text=${mensagem}`: ``}`

    exibirLink()
}

function exibirLink(){
    container_saida.style.display = 'flex'
    saida.innerText = link
    if(btn_abrir_link.hasAttribute('disabled')){btn_abrir_link.removeAttribute('disabled')}else{}
}

function copiarLink(){
    navigator.clipboard.writeText(link)
    saida.innerText = 'Link copiado!'
    setTimeout(() => {
        saida.innerText = link
    }, 1000);
}

function abrirLink(){
    if(btn_abrir_link.hasAttribute('disabled')){}else{window.open(link,'_blank')}
}