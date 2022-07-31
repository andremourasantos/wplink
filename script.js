function definirCookies(nome,valor,validade=0){
    const dia = new Date()
    dia.setTime(dia.getTime() + (validade*24*60*60*1000))
    document.cookie = nome + '=' + valor +'; expires='+ dia.toUTCString()+';'

    //Registra as alterações na página
    document.querySelector('#popup_noti_cookies > div:first-of-type > p:first-of-type').innerText = document.cookie
}

function pegarValorCookie(nome=''){
    let cookies = document.cookie.split(';')

    for(i=0;i<cookies.length;i++){
        let nomeCookie = cookies[i]
        if(nomeCookie.charAt(0) === ' '){nomeCookie = nomeCookie.substring(1)}
        if(nomeCookie.split('=')[0] === nome){
            return nomeCookie.split('=')[1]
        }
    }

    return '...'
}

let versao_da_ferramenta = 'versao1.3'
//↑↑ COOKIES & ARMAZENAMENTO LOCAL

//↓↓ CONSTANTES
const temaPagina = document.querySelector('#tema_da_pagina_btn')
const temaPaginaIcone = document.querySelector('#tema_da_pagina_btn > img')
const infoBtn = document.querySelector('#info_btn')


//↓↓ VARIÁVEIS
let temaDaPagina = 'Claro'


//↓↓ ACIONADORES
window.addEventListener('DOMContentLoaded', function(){if(this.localStorage.getItem('temaDaPagina') != null){this.localStorage.getItem('temaDaPagina') === 'Escuro' ? temaDaPagina = 'Escuro' : temaDaPagina = 'Claro'; alterarTema()}})


window.addEventListener('load', function(){
    document.querySelector('#numero_telefone').focus()

    if(this.localStorage.getItem('totalVisitas') == 1){this.localStorage.setItem('totalVisitas',1)}else{this.localStorage.setItem('totalVisitas', Number(this.localStorage.getItem('totalVisitas')) + 1)}

    //Esse código será excluído na versão 1.4
    if(pegarValorCookie('ultima_visita') != '...'){this.localStorage.setItem('ultimaVersaoAcessada', pegarValorCookie('ultima_visita')); definirCookies('ultima_visita',0)}

    if(this.localStorage.getItem('ultimaVersaoAcessada') == null){this.localStorage.setItem('ultimaVersaoAcessada', versao_da_ferramenta);abrirPopup('#popup_noti_boas-vindas');setTimeout(() => {fecharPopup('#popup_noti_boas-vindas')}, 2000);} else if(this.localStorage.getItem('ultimaVersaoAcessada') != versao_da_ferramenta){this.localStorage.setItem('ultimaVersaoAcessada', versao_da_ferramenta); abrirPopup('#popup_log_novidades');}

    if(this.localStorage.getItem('telefone') != null){document.querySelector('#numero_telefone').value = this.localStorage.getItem('telefone')}
})


//↓↓ POPUPS
function exibirContainerPopup() {
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('#container_popup').style.display = 'flex';
}

    //Abre o popup requisitado
    function abrirPopup(idDoPopup){
        //Fecha todos os Popups anteriores (evitar erros)
        document.querySelectorAll('*[id^="popup_"]').forEach(popup => {popup.style.display = 'none'})

        //Aplica os estilos ao respectivo Popup
        exibirContainerPopup()
        document.querySelector(idDoPopup).style.display = 'flex';

        //Atalho de teclado para fechar Popup
        window.addEventListener('keyup', tecla => {if(tecla.code === 'Escape'){fecharPopup(idDoPopup)}})
    }

    //Fecha o popup requisitado
    function fecharPopup(idDoPopup){
        document.querySelector(idDoPopup).style.animation = 'popupDesaparecer 250ms ease-out';

        //Aplica os estilos ao respectivo Popup
        setTimeout(() => {
            document.querySelector(idDoPopup).style.display = 'none';
            document.querySelector('#container_popup').style.display = 'none';
            document.querySelector('html').style.overflow = 'scroll'
            document.querySelector(idDoPopup).style.animationName = 'popupAparecer'
        }, 250);
    }

    //Abre o Popup a partir de interação
    document.querySelectorAll('*[id^="abrir_popup"]').forEach(item => item.addEventListener("click", function() {
        //Identifica o ID do elemento
        /*console.log(this.id)
        console.log('#'+this.id.replace('abrir_', ''))*/

        //Fecha todos os Popups anteriores (evitar erros)
        document.querySelectorAll('*[id^="popup_"]').forEach(popup => {popup.style.display = 'none'})
        
        //Aplica os estilos ao respectivo Popup
        setTimeout(() => {
            exibirContainerPopup()
            document.querySelector('#'+this.id.replace("abrir_", "")).style.display = 'flex';
        }, 125);

        //Atalho de teclado para fechar Popup
        window.addEventListener('keyup', tecla => {if(tecla.code === 'Escape'){fecharPopup('#'+this.id.replace("abrir_", ""))}})
    }))


    //Fecha o Popup
    document.querySelectorAll('*[id^="btn_fechar_popup"]').forEach(item => item.addEventListener("click", function() {
        //Identifica o ID do elemento
        /*console.log(this.id)
        console.log('#'+this.id.replace('btn_fechar_', ''))*/

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
function alterarTema(interacao=0){
    if(temaDaPagina === 'Claro'){
        if(interacao === 1){
            document.querySelector('body').classList.add('modo_escuro')
            
            //Altera os ícones do cabeçalho
            document.querySelectorAll('header > section:nth-child(2) > button img').forEach(icone => {icone.src = icone.src.split('.png',1)+'_modo_escuro.png'})

            //Altera os ícones da ferramenta
            document.querySelectorAll('#container_ferramenta > div img').forEach(icone => {icone.src = icone.src.split('.png',1)+'_modo_escuro.png'})
            
            document.querySelector('head meta:nth-child(1)').content = '#333333'
            interacao == 1 ? temaDaPagina = 'Escuro': '';
        } else {
            document.querySelector('body').classList.remove('modo_escuro')

            //Altera os ícones do cabeçalho
            document.querySelectorAll('header > section:nth-child(2) > button img').forEach(icone => {icone.src = icone.src.split('_modo_escuro.png',1)})
            
            //Altera os ícones da ferramenta
            document.querySelectorAll('#container_ferramenta > div img').forEach(icone => {icone.src = icone.src.split('_modo_escuro.png',1)})

            document.querySelector('head meta:nth-child(1)').content = '#FDFBEE'
        }
    } else {
        if(interacao === 1){
            document.querySelector('body').classList.remove('modo_escuro')
            
            //Altera os ícones do cabeçalho
            document.querySelectorAll('header > section:nth-child(2) > button img').forEach(icone => {icone.src = icone.src.split('_modo_escuro.png',1)+'.png'})

            //Altera os ícones da ferramenta
            document.querySelectorAll('#container_ferramenta > div img').forEach(icone => {icone.src = icone.src.split('_modo_escuro.png',1)+'.png'})

            document.querySelector('head meta:nth-child(1)').content = '#FDFBEE'
            interacao == 1 ? temaDaPagina = 'Claro' : '';
        } else {
            document.querySelector('body').classList.add('modo_escuro')

            //Altera os ícones do cabeçalho
            document.querySelectorAll('header > section:nth-child(2) > button img').forEach(icone => {icone.src = icone.src.split('.png',1)+'_modo_escuro.png'})

            //Altera os ícones da ferramenta
            document.querySelectorAll('#container_ferramenta > div img').forEach(icone => {icone.src = icone.src.split('.png',1)+'_modo_escuro.png'})
            document.querySelector('head meta:nth-child(1)').content = '#655D8A'
        }
    }

    localStorage.setItem('temaDaPagina', temaDaPagina)
}


//FERRAMENTA//
const saida = document.querySelector('#ferramenta_saida_link')
const containerSaida = document.querySelector('#ferramenta_saida')
const btnObterLink = document.querySelector('#obter_link_btn')
const btnCopiarLink = document.querySelector('#ferramenta_saida_copiar')
const btnAbrirLink = document.querySelector('#abrir_link_btn')
const dddsBrasil = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99]

let wplink = {
    pais: '55',
    ddd: '',
    telefone: '',
    mensagem: '',
    salvar: () => {localStorage.setItem('telefone', wplink.ddd+wplink.telefone)
        if(wplink.mensagem != ''){localStorage.setItem('mensagem', wplink.mensagem)}},
    criarlink: function() {this.link = `https://api.whatsapp.com/send/?phone=${this.pais+this.ddd+this.telefone}${this.mensagem !='' ? `&text=${this.mensagem.replaceAll(' ', '%20')}`: ``}`},
    contagemDeLinks: () => {if(localStorage.getItem('contagemDeLinks') == null){localStorage.setItem('contagemDeLinks',0)} else{localStorage.setItem('contagemDeLinks',Number(localStorage.getItem('contagemDeLinks')) + 1)}},
    link: ''
}
//↑↑ CONFIGURAÇÕES


//↓↓ ACIONADORES
btnObterLink.addEventListener('click', verificarEntradasFerramenta)
btnCopiarLink.addEventListener('click', copiarLink)
document.querySelector('#mensagem').addEventListener('focus', function(){document.querySelector('#ferramenta_entrada_mensagem').scrollIntoView()})


//↓↓ ATALHOS DE TECLADO
document.querySelector('#numero_telefone').addEventListener('keyup', tecla => {if(tecla.code === 'Enter'){document.querySelector('#mensagem').focus()}else{}})

document.querySelector('#mensagem').addEventListener('keyup', tecla => {if(tecla.code === 'Enter'){btnObterLink.focus()} else{}})

window.addEventListener('keydown', tecla => {if(tecla.code == 'KeyL' && tecla.altKey == true){abrirPopup('#popup_log_novidades')}})


//↓↓ FUNÇÕES
function limitarCaracteres(elemento){
    if(elemento.value.length >= 8 && elemento.value.length <=9){}else{elemento.value = elemento.value.substr(0, 11)}
}

function verificarEntradasFerramenta(){
    wplink.telefone = document.querySelector('#numero_telefone').value.substring(2)
    wplink.ddd = document.querySelector('#numero_telefone').value.substring(0,2)
    wplink.mensagem = document.querySelector('#mensagem').value

    if(document.querySelector('#numero_telefone').value === ''){exibirErro('campoVazio')} else if(dddsBrasil.indexOf(Number(wplink.ddd)) == -1){exibirErro('ddd')} else if(wplink.telefone.length >= 8 && wplink.telefone.length <=9){wplink.criarlink();wplink.salvar();wplink.contagemDeLinks();exibirLink()} else{exibirErro('telefone')}
}

function exibirLink(){
    exibirContainerPopup()
    document.querySelector('#popup_noti_link_sucesso').style.display = 'flex';
    setTimeout(() => {
        fecharPopup('#popup_noti_link_sucesso')
        document.querySelector('header').scrollIntoView({behavior: 'smooth'})
    }, 500);

    containerSaida.style.display = 'flex'

    btnCopiarLink.style.animation = "efeitoTranpolimBtn 1250ms infinite ease-in-out"
    btnCopiarLink.focus()
    btnCopiarLink.addEventListener('click', function(){document.activeElement.blur(); btnCopiarLink.style.animation = 'none'})

    saida.innerText = wplink.link
    btnAbrirLink.removeAttribute('disabled')
}

function exibirErro(tipo=0) {
    const aviso = document.querySelector('#popup_noti_erro')
    const avisoTexto = document.querySelector('#noti_erro_texto')
    //↑↑ CONFIGURAÇÕES

    btnAbrirLink.setAttribute('disabled', 'disabled')
    containerSaida.style.display = 'none'
    if(tipo === 'campoVazio'){avisoTexto.innerText = 'É preciso pelo menos menos do número de telefone para continuar.'} else if(tipo === 'telefone'){avisoTexto.innerText = 'Parece que você não digitou o número de telefone corretamente.';} else if(tipo === 'ddd'){avisoTexto.innerText = 'Veja novamente o DDD digitado.'}
    else{avisoTexto.innerText = 'Por favor, recarregue a página.'}

    exibirContainerPopup()
    aviso.style.display = 'flex';
    setTimeout(() => {
        document.querySelector('#btn_fechar_popup_noti_erro').click()
        document.querySelector('#numero_telefone').focus()
    }, 2000);
}

function copiarLink(){
    navigator.clipboard.writeText(wplink.link)
    saida.innerText = 'Link copiado!'
    setTimeout(() => {
        saida.innerText = wplink.link
    }, 1000);
}

function abrirLink(){
    if(btnAbrirLink.hasAttribute('disabled')){}else{window.open(wplink.link,'_blank')}
}