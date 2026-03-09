# 📞 Netser Connect Center (Integración Teams + AWS Connect)

## 📝 Resumen del Proyecto
Aplicación embebida para Microsoft Teams que integra el panel telefónico de **Amazon Connect** junto con un **CRM/Panel de Casos** personalizado. Permite a los agentes recibir llamadas, ver información del cliente en pantalla dividida y tipificar los casos sin salir de Teams.

## 🚀 Estado Actual (Fase 1 completada)
- [x] Interfaz de usuario (HTML/Tailwind) creada con diseño Split-Screen.
- [x] Integración de la librería `amazon-connect-streams.js`.
- [x] Pantalla interactiva de inicio de sesión de AWS Connect agregada.
- [x] Despliegue del prototipo estático (PoC) en GitHub Pages.
- [x] Logotipo corporativo de Netser añadido.

## 🛠️ Pila Tecnológica (Tech Stack)
* **Frontend:** HTML5, Vanilla JS, Tailwind CSS, SDK de MS Teams.
* **Backend (Pendiente):** PHP 8.x en AWS EC2.
* **Base de Datos (Pendiente):** MariaDB en Amazon RDS.
* **Comunicaciones:** Amazon Connect CCP v2.

## 🗺️ Roadmap: ¿Qué sigue para la próxima sesión?
Cuando haya tiempo libre, retomar desde aquí:

1. **Backend y Base de Datos:**
   * Diseñar la tabla `tickets_atencion` en MariaDB para saber qué campos llenará el agente.
   * Crear el archivo `guardar_ticket.php` en el EC2 para conectar el formulario HTML con la base de datos mediante una petición `fetch()`.
2. **Eventos de Llamada:**
   * Conectar el evento `contact.onConnecting()` de Amazon Connect con la base de datos para buscar automáticamente al cliente por su número de teléfono.
3. **SSO y Seguridad:**
   * Mover los archivos HTML/JS al servidor oficial EC2 (para soporte PHP).
   * Configurar SAML 2.0 en AWS para inicio de sesión sin contraseña (SSO).

---
*Proyecto iniciado por Danny - [Fecha de inicio]*
