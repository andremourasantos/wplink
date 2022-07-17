const temaPagina = document.querySelector('#tema_da_pagina_btn')
const temaPaginaIcone = document.querySelector('#tema_da_pagina_btn > img')
const infoBtn = document.querySelector('#info_btn')
//↑↑ CONSTANTES

//↓↓ VARIÁVEIS
let temaDaPagina = 'Claro'

//↓↓ ACIONADORES
window.addEventListener("load", function(){document.querySelector('#numero_telefone').focus()})
/*
if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    alterarTema()
}
temaPagina.addEventListener("click", alterarTema)
*/

    //↓↓ POPUPS
    //Abre o respectivo Popup
    document.querySelectorAll('*[id^="abrir_popup"]').forEach(item => item.addEventListener("click", function() {
        //Identifica o ID do elemento
        console.log(this.id)
        console.log('#'+this.id.replace('abrir_', ''))
        
        //Aplica os estilos ao respectivo Popup
        setTimeout(() => {
            document.querySelector('#'+this.id.replace("abrir_", "")).style.display = 'flex';
            document.querySelector('html').style.overflow = 'hidden';
            document.querySelector('#container_popup').style.display = 'flex';
        }, 125);
    }))

    //Fecha o Popup
    document.querySelectorAll('*[id^="btn_fechar_popup"]').forEach(item => item.addEventListener("click", function() {
        //Identifica o ID do elemento
        console.log(this.id)
        console.log('#'+this.id.replace('btn_fechar_', ''))

        //Aplica os estilos ao respectivo Popup
        setTimeout(() => {
            document.querySelector('#'+this.id.replace("btn_fechar_", "")).style.animation = 'popupDesaparecer 250ms ease-out';
        }, 125);
        setTimeout(() => {
            document.querySelector('#'+this.id.replace("btn_fechar_", "")).style.display = 'none';
            document.querySelector('#container_popup').style.display = 'none';
            document.querySelector('html').style.overflow = 'scroll'
            document.querySelector('#'+this.id.replace("btn_fechar_", "")).style.animationName = 'popupAparecer'
        }, 375);
    }))

        //Botões de links no Popup
        document.querySelector('#link_github_popup').addEventListener('click', function(){setTimeout(() => {
            window.open('https://github.com/andremourasantos/wplink', '_blank')
        }, 125);})
        document.querySelector('#link_doar_popup').addEventListener('click', function(){setTimeout(() => {
            window.open('https://link.andremourasantos.com/pix', '_blank')
        }, 125);})



//↓↓ FUNÇÕES
/*
function alterarTema(){
    document.querySelector('body').classList.toggle('modo_escuro')
    if(temaDaPagina === 'Claro'){
        temaPaginaIcone.setAttribute('src', 'imagens/modo_escuro.png'); temaDaPagina = 'Escuro'
    } else {temaPaginaIcone.setAttribute('src', 'imagens/modo_claro.png'); temaDaPagina = 'Claro'}
}
*/

//FERRAMENTA//
const saida = document.querySelector('#ferramenta_saida_link')
const containerSaida = document.querySelector('#ferramenta_saida')
const btnObterLink = document.querySelector('#obter_link_btn')
const btnCopiarLink = document.querySelector('#ferramenta_saida_copiar')
const btnAbrirLink = document.querySelector('#abrir_link_btn')

let telefone = document.querySelector('#numero_telefone').value
let mensagem = document.querySelector('#mensagem').value
let link = ''
//↑↑ VARIÁVEIS

//↓↓ ACIONADORES
btnObterLink.addEventListener('click', verificarEntradasFerramenta)
btnCopiarLink.addEventListener('click', copiarLink)

//↓↓ FUNÇÕES
function verificarEntradasFerramenta(){
    telefone = document.querySelector('#numero_telefone').value
    mensagem = document.querySelector('#mensagem').value

    if(telefone.length === 10 || telefone.length === 11){
        if (mensagem === ''){criarLink(telefone)} else{criarLink(telefone, mensagem.replaceAll(' ','%20'))}
    } else {exibirErroTelefone()}
}

function criarLink(telefone, mensagem=0){
    if(telefone.includes('55') || telefone.includes('055')){} else{telefone = '55' + telefone}

    link = `https://api.whatsapp.com/send/?phone=${telefone}${mensagem !=0 ? `&text=${mensagem}`: ``}`

    exibirLink()
}

function exibirContainerPopup() {
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('#container_popup').style.display = 'flex';
}

function exibirErroTelefone() {
    btnAbrirLink.setAttribute('disabled', 'disabled')
    containerSaida.style.display = 'none'
    exibirContainerPopup()
    document.querySelector('#popup_noti_erro_telefone').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#btn_fechar_popup_noti_erro_telefone').click()
        document.querySelector('#numero_telefone').focus()
    }, 2000);
}



function exibirLink(){    
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('#container_popup').style.display = 'flex';
    document.querySelector('#popup_noti_link_sucesso').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#btn_fechar_popup_noti_link_sucesso').click()
    }, 500);


    containerSaida.style.display = 'flex'

    btnCopiarLink.style.animation = "efeitoTranpolimBtn 1250ms infinite ease-in-out"
    btnCopiarLink.focus()
    btnCopiarLink.addEventListener('click', function(){document.activeElement.blur(); btnCopiarLink.style.animation = 'none'})

    saida.innerText = link
    btnAbrirLink.removeAttribute('disabled')
}

function copiarLink(){
    navigator.clipboard.writeText(link)
    saida.innerText = 'Link copiado!'
    setTimeout(() => {
        saida.innerText = link
    }, 1000);
}

function abrirLink(){
    if(btnAbrirLink.hasAttribute('disabled')){}else{window.open(link,'_blank')}
}