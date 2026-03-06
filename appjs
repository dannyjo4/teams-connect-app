const CONNECT_INSTANCE_URL = "https://TU-INSTANCIA.my.connect.aws/connect/ccp-v2/";
let globalAgent = null; // Guardamos la referencia del agente

document.addEventListener("DOMContentLoaded", () => {
    inicializarTeams();
});

async function inicializarTeams() {
    try {
        await microsoftTeams.app.initialize();
        const context = await microsoftTeams.app.getContext();
        
        const userName = context.user.userPrincipalName;
        document.getElementById("userName").innerText = userName.split('@')[0];
        
        // Mostrar iniciales o foto si es posible obtenerla vía Graph API después
        document.getElementById("userInitials").innerText = userName.substring(0,2).toUpperCase();
        
        inicializarAmazonConnect();
    } catch (error) {
        document.getElementById("userName").innerText = "Modo Navegador";
        inicializarAmazonConnect();
    }
}

function inicializarAmazonConnect() {
    const containerDiv = document.getElementById("ccp-container");

    connect.core.initCCP(containerDiv, {
        ccpUrl: CONNECT_INSTANCE_URL,
        loginPopup: true,
        loginPopupAutoClose: true,
        softphone: { allowFramedSoftphone: true }
    });

    configurarEventosAgente();
}

function configurarEventosAgente() {
    connect.agent(function(agent) {
        globalAgent = agent;
        
        // 1. Cargar todos los estados configurados en el Contact Center de AWS
        const agentStates = agent.getRoutingProfile().getStates();
        const statusSelect = document.getElementById("agentStatusSelect");
        
        statusSelect.innerHTML = ""; // Limpiar
        agentStates.forEach(state => {
            const option = document.createElement("option");
            option.value = state.stateARN;
            option.text = state.name; // Ej: "Available", "Offline", "Almuerzo", "Break"
            statusSelect.appendChild(option);
        });
        
        statusSelect.disabled = false;

        // 2. Escuchar el estado actual para pintar el semáforo y actualizar el dropdown
        const updateStatusUI = () => {
            const currentStatus = agent.getStatus();
            statusSelect.value = currentStatus.stateARN;
            
            const indicator = document.getElementById("statusIndicator");
            if (currentStatus.type === connect.AgentStateType.ROUTABLE) {
                indicator.className = "w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"; // Disponible (Verde brillando)
            } else if (currentStatus.type === connect.AgentStateType.OFFLINE) {
                indicator.className = "w-3 h-3 rounded-full bg-gray-500"; // Desconectado (Gris)
            } else {
                indicator.className = "w-3 h-3 rounded-full bg-yellow-500"; // Ocupado/Break (Amarillo)
            }
        };

        updateStatusUI();
        agent.onStateChange(updateStatusUI);

        // 3. Permitir que el usuario cambie su estado desde nuestra barra superior
        statusSelect.addEventListener("change", (e) => {
            const newStateARN = e.target.value;
            const stateObj = agentStates.find(s => s.stateARN === newStateARN);
            if (stateObj) {
                agent.setState(stateObj, {
                    success: () => console.log("Estado cambiado a:", stateObj.name),
                    failure: (err) => console.error("Error al cambiar estado:", err)
                });
            }
        });
    });
}
