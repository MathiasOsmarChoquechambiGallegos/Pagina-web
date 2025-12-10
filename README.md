# Wild Roots - Aplicación Móvil y Plataforma Web

## Descripción
Wild Roots es una aplicación móvil que extiende la plataforma web de promoción del turismo regional en Arequipa, permitiendo a los usuarios explorar y descubrir destinos turísticos desde sus dispositivos móviles. La app ofrece información detallada de lugares poco conocidos, reseñas de otros visitantes y recomendaciones personalizadas según los intereses del usuario. Se integra con la API de la versión web para mantener la información continua y accesible.

---

## Contexto del desarrollo móvil
El desarrollo móvil constituye un pilar fundamental en la actualidad, permitiendo ofrecer herramientas de información y entretenimiento a los usuarios a través de smartphones y tablets. Para este proyecto se evaluaron entornos como **Android Studio**, **Xcode**, y frameworks multiplataforma como **Flutter**, **React Native** e **Ionic**.

---

## Relación con la plataforma web
La app móvil comparte:
- **Estilo de frontend** con la web, adaptado a móvil.
- **Mismo backend y base de datos** para consistencia de información.
---

## Objetivos

### Generales
- Desarrollar una aplicación móvil intuitiva, moderna y eficiente.
- Permitir acceso rápido a información actualizada de la web.
- Fortalecer la promoción del turismo local.

### Específicos
- Facilitar la interacción del usuario con destinos turísticos.
- Permitir publicar, editar y eliminar reseñas.
---

## Alcance del aplicativo móvil
- Gestión de perfil del usuario.
- Sincronización de reseñas y calificaciones con la plataforma web.
- Funcionalidades de calificación y revisión de comentarios.

---

## Análisis del Proyecto

### Requerimientos funcionales
- Registro e inicio de sesión con las mismas credenciales que la web.
- Búsqueda y visualización de destinos turísticos con reseñas, imágenes y calificaciones.
- Edición de perfil y preferencias.
- Publicación y gestión de comentarios.
- Sincronización de datos en tiempo real con la API web.

### Requerimientos no funcionales
- Interfaz intuitiva y coherente con la web.
- Compatible con dispositivos Android usando React Native.
- Consistencia de datos con la base web.
- Tiempo de carga < 3 segundos.
- Protección de datos personales.
- Escalable y fácil de ampliar.

### Público objetivo y casos de uso
- Turistas aventureros interesados en descubrir lugares únicos del Perú.
- Casos de uso:
  - Buscar destinos.
  - Consultar reseñas y valoraciones.
  - Interacción social con comentarios y calificaciones.

---

## Diseño del Sistema

### Arquitectura
- **Modelo-Vista-Controlador (MVC)** simplificado.
- **Modelo:** comunicación con API, almacenamiento local y lógica.
- **Vista/Controlador:** componentes React Native que manejan UI y eventos.

### Tecnologías y herramientas
- **Frontend móvil:** React Native (JavaScript)
- **Backend:** PHP 8.x, MySQL 8.x, API REST
- **Base de datos:** MySQL
- **Notificaciones:** Firebase Cloud Messaging (Android)
- **Prototipos UI/UX:** Wireframes y Mockups específicos para móvil

---

## Desarrollo e Implementación (Plan de 3-4 semanas)

1. **Semana 1:** Adaptación de la web a app móvil. Investigación de opciones. Distribución de tareas.
2. **Semana 2:** Migración inicial de la web al formato móvil. Primer entregable del informe.
3. **Semana 3:** Migración del código completo y enfoque en Android.
4. **Semana 4:** Finalización de implementación, conexión con backend y base de datos, corrección de errores.

---

## Integración con la Plataforma Web
- Comunicación a través de **API REST**.
- Acceso seguro mediante autenticación.
- Sincronización de datos entre web y móvil.
- Validación de credenciales y seguridad de usuario.

---

## Pruebas de interoperabilidad
- Creación de usuario desde la app móvil y acceso desde la web.
- Modificación de información desde la web y visualización en la app móvil.

---

## Presentación y Evaluación
- Demostración de la app móvil replicando todas las funcionalidades de la web.
- Integración de un **chatbot AI** para recomendaciones de atracciones.
- Resultados exitosos en interoperabilidad y sincronización.

---

## Posibles mejoras
- Interfaz más pulida y personalizable.
- Mayor control sobre comentarios (editar/eliminar).
- Ampliación a más regiones y países.
- Clasificación de lugares según puntuación de usuarios.

---


### Guías de uso
1. **Home:** Acceso rápido, exploración de provincias, interacción con chatbot.
2. **Login, Crear Usuario y Perfil:** Gestión de cuentas y preferencias.
3. **Explorar:** Buscador de atracciones y listado de provincias.
4. **Atracciones:** Información detallada, lista de reseñas y calificaciones, registro de visitas.
5. **RDF:** Representación de datos en Turtle, RDF/XML y JSON-LD.
