# TODO App

Realizado por: Pablo Astudillo

Proyecto final de la materia Interacción Hombre Máquina de Ingeniería de Software en la Universidad Católica de Cuenca. Consiste en una aplicación CRUD para gestionar una lista de tareas.

## Tecnologías utilizadas

- Front-end: HTML, CSS, JavaScript con Bootstrap v5.2.
- Back-end: Laragon, MySQL y PHP.

## Configuración de la base de datos

Los scripts de la base de datos se encuentran en el archivo `db-scripts.txt` en la carpeta `back-end`. Asegúrese de ejecutar estos scripts en su servidor MySQL para crear la estructura de la base de datos necesaria para la aplicación.

## Configuración del servidor PHP

Para montar el servidor PHP se requiere tener Laragon instalado y configurado correctamente. Luego desde la terminal `Cmder`:

1. Navegue hasta el directorio `./todo/back-end`.
2. Ejecute el siguiente comando: `php -S localhost:9000`.

Esto iniciará el servidor PHP en `localhost` en el puerto `9000`.

## Uso de la aplicación

Una vez que el servidor PHP esté en funcionamiento y la base de datos esté configurada, puede acceder a la aplicación a través de su navegador web (archivo `./front-end/index.html`). La aplicación permite crear, leer, actualizar y eliminar tareas en la lista.