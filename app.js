const CONNECT_INSTANCE_URL = "https://TU-INSTANCIA.my.connect.aws/connect/ccp-v2/";

document.addEventListener("DOMContentLoaded", () => {
    inicializarTeams();
});

async function inicializarTeams() {
    try {
        // Obtenemos el nombre del usuario de Teams solo para el saludo (UX)
        await microsoftTeams.app.initialize();
        const context = await microsoftTeams.app.getContext();
        const userName = context.user.userPrincipalName.split('@')[0];
        
        document.getElementById("welcome-name").innerText = `Hola, ${userName}`;
        
    } catch (error) {
        console.log("Ejecutando fuera de Teams");
    }

    // Configurar el botón para que dispare el login de Amazon Connect
    const btnLogin = document.getElementById("btn-iniciar-login");
    const msgEspera = document.getElementById("esperando-login-msg");

    btnLogin.addEventListener("click", () => {
        // Cambiar la UI para indicar que el pop-up se abrió
        btnLogin.innerText = "Autenticando...";
        btnLogin.classList.replace("bg-orange-500", "bg-gray-500");
        btnLogin.disabled = true;
        msgEspera.classList.remove("hidden"); // Mostrar mensaje de "Revisa el popup"

        // Inicializamos el teléfono (esto abre el popup de credenciales de AWS)
        inicializarAmazonConnect();
    });
}

function inicializarAmazonConnect() {
    const containerDiv = document.getElementById("ccp-container");

    connect.core.initCCP(containerDiv, {
        ccpUrl: CONNECT_INSTANCE_URL,
        loginPopup: true,           // TRUE: Obligatorio para que AWS pida el usuario/password
        loginPopupAutoClose: true,  // Cierra el popup solo cuando el usuario pone su clave correcta
        softphone: { allowFramedSoftphone: true }
    });

    // ESTE EVENTO ES LA MAGIA: Se dispara ÚNICAMENTE cuando el usuario pone su clave correcta en el popup
    connect.core.onInitialized(() => {
        console.log("Login de Amazon Connect exitoso");
        
        // 1. Ocultar la pantalla de Login con una animación
        document.getElementById("login-screen").style.display = "none";
        
        // 2. Mostrar el panel telefónico de AWS
        document.getElementById("ccp-container").classList.remove("opacity-0");
        
        // 3. Activar los eventos para leer el estado del agente y las llamadas
        configurarEventosAgente();
    });
}

// (El resto de funciones configurarEventosAgente y configurarEventosLlamada se mantienen igual)
