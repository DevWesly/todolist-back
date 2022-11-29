// const { response } = require("express");

// Capturar o elementos
let inputNome = document.getElementById("regNome");
let inputEmail = document.getElementById("regEmail");
let inputSenha = document.getElementById("regSenha");
let inputConf = document.getElementById("regConf");
let formRegistrar = document.getElementById("form-registrar");

// 
const urlBase = '/api';
    const tratarResposta = async response => {
        switch (response.status) {
            case 201:
                let conteudo = await response.json();
                sessionStorage.setItem('token',conteudo.token);
                sessionStorage.setItem('usuario',JSON.stringify(conteudo.usuario));
                location = "index.html";
                break;
    
            case 409:
                alert("E-mail já cadastrado.");
                break;
    
            case 422:
                alert("Senha preenchida incorretamente.");
                break;
    
            default:
                alert(`Erro inesperado: ${response.status}`);
                break;
        }
        
        
    }
    


const registrarUsuario = async (dados) => {
    // 1 - Definir a URL para onde a req vai ser enviada

    let url = `${urlBase}/auth/registrar`

    // 2 - Preparar as opções de envio
    let opcoes = {
        method: "POST",
        body: JSON.stringify({texto}),
        headers: {
            'Content-Type':'application/json',
            'Authorization': `bearer ${sessionStorage.getItem('token')}`
        }
    }


    // 3 - Enviar os dados para o endereço de registro

    let response = await fetch(url, opcoes)

    tratarResposta(response)

}

// Listeners
const onFormRegistrarSubmit = (evt) => {
    evt.preventDefault();
    let dados = {
        nome: inputNome.value,
        email: inputEmail.value,
        senha: inputSenha.value,
        confirmacao: inputConf.value,
    }

    registrarUsuario(dados)
}

// Associando listeners
formRegistrar.addEventListener('submit', onFormRegistrarSubmit)