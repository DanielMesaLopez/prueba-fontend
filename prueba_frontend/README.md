Solución Técnica del Proyecto Prueba_Frontend

El desarrollo de esta prueba técnica se realizó siguiendo los parámetros establecidos por la empresa HOMEPOWER. A continuación, se describe el proceso llevado a cabo:

Inicio del Proyecto

Se realizo un fork del proyecto, creando una copia desde mi cuenta de GitHub, en donde se procede a clonar el repositorio desde i local git clone https://github.com/HomePower-Co/prueba-fontend.git, creandose una nueva rama identificado con mi nombre en este caso DanielMesaLopez.

Herramientas utilizadas:

Entorno de desarrollo donde se implementó la solución utilizando React Native y TypeScript. Este último permite detectar errores gracias al tipado estático, mejorando la calidad y optimización del código.

Procedimiento:

✅ Desarrolle una pantalla que consuma datos de una API pública (https://jsonplaceholder.typicode.com/users.), que es de tipo GET ya que identifique que ese Endpoint esta diseñado para otener datos mas no para modificarlos.
✅ Utilice Arquitectura Hexagonal, hace parte de la arquitectura limpiaen la cual orgarniza el código en capas para aislar la lógica del negocio del código de insfraestructura y la interfaz del usuario.
✅ Se implemento la navegación entre pantallas, tales como: lista de usuarios y la pantalla detalle.
✅ Se realizo un filtrado de busqueda por nombre o corrreo.
✅ Se implento un loader con el proposito de reflejar un circulo de carga, cada vez que se refresca, se debe dar clik en

Tecnologías a utilizar
React Native con TypeScript.
Zustand para el manejo del estado global.
React Navigation para la gestión de pantallas.
Jest y React Testing Library para pruebas.
🔗 API a utilizar
Usaremos la API de JSONPlaceholder para obtener la lista de usuarios: 📌 Endpoint: https://jsonplaceholder.typicode.com/users.

✅ Se Manejo el estado global con Zustand ya que esta maneja el estado de la apliación y Axios para la interacción con el API.
✅ En el desarrollo se aplico buenas prácticas de código y estructura de archivos.
✅ Se implemento pruebas unitarias con Jest y React Testing Library, para reflejar un reporte de mis pruebas, se instalo Coverage (npm run test:coverage) que me permite mostrar los archivos que se deben realizar pruebas unitarias, el porcentaje de cobertura de cada componente existente en el proyecto; lo ideal es dejarlos al 100 % aunque lo minimo es al 70 %. Se utilizo el Patrón triple AAA: Arrange, Act y Assert.  
Para los estilos se utilizo styled-components.

Se realizo los siguientes extras :

✨ Se Agrego un campo de busqueda que permita filtrar en tiempo real por nombre o email.
✨ Se programo cargar usuarios de forma paginada por 5 usuarios
✨ Se Agrego un loader para carga de datos (Carga de todos los usuarios, ingreso a pantalla de detalles, paginación).
✨ Animaciones para mejorar la UX en las pantallas en donde cada usuario muestra: Nombre, Correo Electrónico, Avatar (imagen genérica).
✨ Se implemento manejo de caché con AsyncStorage.
✨Se Describe brevemente en que escenarios se utilizarias utilizo Expo y en cuales React Native CLI. Este proyecto usa React Native, gestionado con Expo para simplificar la configuración y permitir desarrollo rápido. Expo facilita testing, prototipado y deployment sin lidiar con Xcode/Android Studio en las primeras fases.

Proceso de Ejecución del Proyecto:

Para compilar las pruebas unitarias y reflejar el reporte se ejecuta el siguiente comando:
npm run test:coverage
Una vez ejecutado el comando anterior, dentro del proyecto se encuentra una carpeta coverage, estando allí dirigirse al archivo Icov report y seguido darle clik al index.html, enseguida se abrira el navegador mostrando los reportes de los componentes y su porcentaje de cubrimiento, estos deben estar al 100% y minimo al 70%.
Para levantar el proyecto Prueba_frontend, se debe:
Instalar el node_modules con el siguiente comando npm install
Una vez ejecutado el comando anterior procedemos a levantar el proyecto con el siguiente comando npx expo start -c, la c me permite borrar el cache cada vez que levanto el proyecto, como se esta utilizando Expo, me permite visualizarlo a traves de qr por medio del app Expo Go ya sea desde Android o IOS, desde la WEB, Andoid Studio y entre el listado que nos ofrece según la opción que esta a su alcance. Por ejm para verlo desde la WEB se selecciona la letra W.

De esta manera se da solución a la prueba técnica prueba_frontend.
