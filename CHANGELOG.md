# Descripción del Proyecto
Este es el sitio web de una empresa que ofrece servicios de limpieza. Los potenciales clientes pueden contactarse para obtener información personalizada sobre los servicios mediante el chat del sitio web.

## Detalles
- **Desarrollado por**: Jetzer Ramirez
- **Comisión**: DWM4AH
- **Fecha**: Diciembre 2023
- Escuela DaVinci

# Changelog

## [2023-12-13] 
### Corregido
- Errores tras el deploy para la entrega final.

### Refactorizado
- Modularización de funciones de la vista `myAccount`.

### Eliminado
- Opciones para editar email y contraseña. No funcionó tras varios intentos basados en la documentación. Además, dichos temas no fueron vistos en clase.

## [2023-12-12]
### Añadido
- Funcionalidad para actualizar nombre y apellido del usuario.

## [2023-12-11]
### Estilos
- Formulario para editar nombre y apellido desde la vista `myAccount`.

## [2023-12-10]
### Añadido
- Subir/Actualizar foto de perfil del usuario desde Firebase.
- Mostrar foto de perfil del usuario en la barra de navegación.
- Mostrar información del usuario en la vista `MyAccount`.
- Crear elementos iniciales en `MyAccount` para mostrar información del usuario.

## [2023-12-08]
### Añadido
- Hacer funcionar los enlaces "Mis Cuentas" y Dashboard con vistas de administrador.
- Crear vista `myAccount`.
- Añadir icono de avatar de cuenta en la barra de navegación.

## [2023-11-27]
### Corregido
- Realizar deploy tras eliminar `index.html` de enlaces redirigidos.
- Eliminar `index.html` de los hashes.
- Errores tras el deploy para entrega de parcial.
- Renderizado de vista de administrador tras errores de deploy.

## [2023-11-26]
### Mejoras y Limpieza de Código
- Fusión del pull request para refactorizar.
- Reemplazo de `app.html` por `index.html`.
- Eliminación de archivos HTML innecesarios.
- Limpieza de código: eliminación de 'console.logs'.
- Limpieza del código de inicio de sesión.
### Corregido
- Función de chat para renderizar nombres de conversaciones.
- Filtrado por categoría utilizando ID en lugar del nombre.
- Renderizado del nombre de la categoría en la lista de servicios.
### Estilos
- Corrección de estilos del chat y vistas de tarjetas de servicios.
### Refactorizado
- `homeView`.
### Añadido
- Renderizado del nombre de categoría en la lista de servicios.
- Añadir imagen a la vista de servicios públicos.

## [2023-11-25]
### Añadido
- Limpieza de código para la lógica del chat.
- Modularización y exportación/importación de la vista del chat.
- Creación e importación de la vista del chat.
- Intento de limpieza del código actual de `chat.html`.
- Creación de JS para la lógica del chat.
- Copia de la vista actual del chat.
### Funcionalidades
- Función para actualizar un documento en Firestore.
- Creación de una función única para obtener datos de Firestore.
- Función para obtener el nombre de la categoría.
- Añadir nueva categoría a la base de datos.
- Mostrar categorías en una tabla de administrador.
- Actualizar servicio y mostrar errores.
- Limpieza del código de las vistas de formularios de `adminservices`.
- Funciones para obtener información de un servicio y renderizar el formulario de servicios.

## [2023-11-24]
### Añadido
- Función para manejar la eliminación de archivos en `mydropzone`.
- Modularización e importación de la vista `addService`.
- Creación de funciones para `addService`.
- Mensaje de éxito al crear un servicio.
- Subida de imagen de servicio usando `dropzone`.
- Funciones para subir una imagen y crear un nuevo servicio.
- Subir un servicio con imagen.
- Refactorización de `adminServicesRouterContent`.
### Mejoras
- Trabajo en la ejecución de funciones de cada vista cuando es necesario.
- refactorización del código de `add_service.html` a módulo.
- Creación de `adminServicesCreate` vista.

## [2023-11-23]
### Añadido
- Nueva función para renderizar datos de una tabla.
- Función `createListTable` para vistas de administrador.
- Vista `servicesList` en administrador desde `app.html`.
- Pruebas de funciones de `adminservices` en `admin_services.html` desde `app.js`.
- Funciones para lista de servicios HTML.
- Añadir `datatable` a `admin_services.html`.
### Corregido
- Carga de la tabla de lista de servicios.
- Botón de edición en la tabla.
### Refactorizado
- Página de administración para renderizar sus propias vistas.
- `adminView` para crear su propio enrutador.
### Seguridad
- Autorización para que solo usuarios autenticados vean la vista de administrador.

## [2023-11-22]
### Corregido
- Enlaces en las migas de pan (`breadcrumbs`).
### Añadido
- Modularización de la vista de administrador y visualización en `app.html`.
- Creación de funciones para modularizar la página de admin.
- Modularización de la vista de inicio de sesión y su importación en `app.html`.

## [2023-11-18]
### Añadido
- Creación de `loginView`.
- Función para mostrar migas de pan (`breadcrumbs`).
- Función para crear un elemento HTML.
- Limpieza y mejora del código de servicios.

### Refactorizado
- Refactorización de la creación de elementos en la vista de servicios.
- Cambio en la vista de servicios para adjuntar vistas en lugar de usar `innerHTML`.
- Refactorización y renderización de la vista de servicios.
- Visualización de una vista al cargar o refrescar la página.
- Refactorización de la vista principal (`home view`).
- Movimiento del encabezado y pie de página al archivo `app.html`.


## [2023-10-24]
### Añadido
- Centralización de todas las funciones en `app.js`.
- Función adicional para actualizar el listado de servicios.
- Función `where` de Firestore para búsquedas.
- Renderización de servicios desde HTML.

### Corregido
- Obtención de información desde la consulta.
- Implementación de búsqueda dinámica.

## [2023-10-09]
### Añadido
- Visualización de lista de servicios desde la base de datos.
- Funcionalidad para agregar un nuevo servicio a la base de datos.
- Importación de configuración de Firebase al HTML de agregar servicio.
- Creación del archivo `config.js` para su reutilización.
- Instalación de Firebase.
- Creación de formulario HTML para agregar servicios a la base de datos.
- Actualización de estilos CSS.
- Creación de archivo de plantilla HTML con estructura, encabezado y pie de página.
- Adición de la maqueta inicial.

### Inicial
- Commit inicial del proyecto.

## [2023-10-08]
### Añadido
- Configuración inicial del proyecto y estructura básica.
