
Para ejecutar este proyecto es necesario node y npm.

Después de clonarlo, es necesario instalar las dependencias

### `npm i`

Para correr el proyecto en modo desarrollo, ejecutar el siguiente comando:

### `npm start`
- Se ejecutará en [http://localhost:3000], se recargará si se hacen cambios al código


Para generar la versión de producción

### `npm run build`

Los archivos generados se pueden poner en un servidor (por ejemplo, http-server de node) para su uso.
Este comando optimiza los archivos y tiene mejor desempeño que el modo desarrollo.



Comentarios sobre el ejercicio
- No hacer llamadas innecesarias al API:
    Se decidió utilizar redux para facilitar este punto; solo se hace una llamda al servidor y se mantiene en memoria.
    El filtrado, vista de detalle y generación de CSV se hacen de manera local.
- Organización del código
    Se utilizó la librería React para dividir el código en componentes. Además, se decidió utilizar Typescript para tener un mejor autocomplete y detección de errores; los modelos se definieron en models.ts.
    Se logró no duplicar código.
- Router recomendado
    Se utilizó React Router; su uso se puede ver principalmente en App.tsx
- Mobile First y diseño responsive
    La aplicación no consume muchos recursos por lo que puede correr en dispositivos móviles; asumiendo una mala velocidad de conexión, todas las pantallas tienen indicadores de loading.
    Se utilizó la librería de componentes Material UI, lo que permite tener un diseño responsive sin complicación.
- Optimización DEV/PROD
    El comando 'build' de react se encarga de esto.

Sobre los requerimientos UX/UI
- Descarga de documento asíncrono
    Como esto ocurre muy rápido, se símuló un tiempo de espera (mostrado por un snackbar y un indicador de carga) con lo que se muestra que no se bloquea la aplicación y más bien esto se hace de manera asíncrona.
- Sobre las URL
    Para poder recargar o entrar directo a la página de detalles, se utilizó por simpleza Hash History, que inserta un # en la url para poder determinar en el cliente que ruta es.
- Hover hace aparecer botón de borrar
    Como en el celular no hay mouse, se optó por mantener siempre visible el botón de borrar usuario. En el caso de si tener mouse, el botón se pondrá rojo on hover.