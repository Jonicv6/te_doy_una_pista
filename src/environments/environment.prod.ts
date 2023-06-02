// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  version: "1.2.0",

  //Variables Host NodeJS
  endPoint: "https://31.131.183.8:3000",
  trackPoint: "/track/",
  sporcenterPoint: "/sportcenter/",
  reservePoint: "/reserve/",
  commentPoint: "/comment/",
  nodemailerPoint: "/email/",

  //Variables OpenWeatherAPI
  openMeteoURI:"https://api.open-meteo.com/v1/forecast?",
  openMeteoParam: "&hourly=temperature_2m,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=auto",
 
  //Variables usadas en el ModalWeather
  titleModalWeather: "Estado del Clima",
  precipitation: "Precipitación",
  temperature_hour: "Temperatura en esa hora",
  precipitation_hour: "Lluvia en esa hora",
  temperature_max: "Temperatura Máxima",
  temperature_min: "Temperatura Minima",
  windspeed_max: "Velocidad del viento",

  //Variables usadas en el ModalComment
  titleModalComment: "Comparte tu opinión",
  placeHolderComment:"Escribe tu opinión...",
  selectScore: "Selecciona un valor",
  buttonComment: "Enviar",
  

  //Variables nombre
  sportcenter: "pabellón",
  search: "buscar",
  save: "guardar",
  maps: "mapa",
  reserves: "reservas",
  profile: "perfil",
  city: "ciudad",
  sport: "deporte",
  track: "pista",
  date: "fecha",
  hour: "hora",
  reserver: "reservar",
  reserveName: "Nombre de la Reserva",
  reserveEmail: "Correo de la Reserva",
  yourName: "Su nombre",
  back: "Volver",
  titleApp: "¿Te doy una pista?",
  score: "Puntuación",
  comments: "Opiniones",

  //Variables usadas en la página Profile
  titleMyProfile: "Mi perfil",
  titleProfile: "Nombre de usuario",
  titleEmail: "Correo electrónico",
  titleUbication: "Ubicación",
  titleSport: "Deporte favorito",
  titleProfileDescription: "Estos datos se usarán para completar los datos de las reservas y poder enviarle una copia de la misma.",

  //Horas disponibles
  hoursOpen: [{ idHour: 1, hour: "08", minutes: "00" }, { idHour: 2, hour: "09", minutes: "00" },
  { idHour: 3, hour: "10", minutes: "00" }, { idHour: 4, hour: "11", minutes: "00" },
  { idHour: 5, hour: "12", minutes: "00" }, { idHour: 6, hour: "13", minutes: "00" },
  { idHour: 7, hour: "16", minutes: "00" }, { idHour: 8, hour: "17", minutes: "00" },
  { idHour: 9, hour: "18", minutes: "00" }, { idHour: 9, hour: "19", minutes: "00" },
  { idHour: 11, hour: "20", minutes: "00" }, { idHour: 10, hour: "21", minutes: "00" },
  { idHour: 13, hour: "22", minutes: "00" }],

  //Titulos SweetAlert
  titleSuccessReserve: "Reserva realizada",
  titleErrorReserve: "Reserva no realizada",
  titleErrorDataReserve: "Datos erróneos",
  titleErrorSelectDay: "Error Fecha",
  titleDeleteReserve: "¿Está seguro?",
  titleDeleted: "¡Borrado!",
  titleErrorDeleted: "¡Borrado Fallido!",
  titleSaveProfile: "Datos Guardados",
  titleSaveProfileError: "Datos Erróneos",
  titleErrorComment: "Comentario erroneo", 
  titleSuccessComment: "Comentario realizado",
  titleErrorConnection: "Error de conexión",
  titleErrorLocation: "Error en la localización",

  //Mensaje SweetAlert
  textDeleteReserve: "Eliminará su reserva",
  textSaveProfile: "Se han guardado tus datos, a partir de ahora se autocompletarán en los formularios de reserva",


  //Botones SweetAlert
  buttonConfirmDelete: "Sí, borralo.",
  buttonCancelDelete: "No lo borres",
  buttonRetry: "Reintentar",

  //Mensajes 
  textWait: "Espere por favor",
  textLoading: "Cargando...",
  textHere: "Usted esta aquí",
  textSendEmail: "Enviando email...",
  messageLocationDenied: "No ha aceptado los permisos de localización, configuralos en el apartado de permisos de la app",

  //Mensajes de selects
  selectCitySport: "Selecciona una Ciudad y un Deporte",
  selectTrack: "Seleccione una pista",
  selectHour: "Seleccione una hora",
  selectCity: "Selecciona Ciudad",
  selectSport: "Seleccione Deporte",
  selectSportMap: "Debes de seleccionar un deporte",

  //Mensajes de vacio
  emptySportCenter: "Actualmente no hay ningún polideportivo disponible",
  emptySearch: "Sin resultados. Inténtelo de nuevo.",
  emptyHours: "No hay horas libres, seleccione otro día.",
  emptyReserveLocal: "No has reservado ninguna pista todavía. Desliza hacía abajo para actualizar la lista",
  emptyComments: "No existen opiniones de esta pista",

  //Mensajes de exito
  successReserve: "Ha realizado su reserva con éxito",
  successReserveDeleted: "Se ha eliminado con éxito",
  successComment: "Ha realizado el comentario con éxito",

  //Iconos
  iconMapURL: "assets/icon/sports/alfiler.png",
  iconSportCenterURL: "assets/icon/sports/estadio-ubicacion.png",
  iconsWeatherURL: "assets/icon/Weather_Icons.png",

  //Mensajes de Error 
  errorReserve: "Error en la reserva, seleccione otros datos.",
  errorDataReserve: "Rellene todos los datos de la reserva.",
  errorDeleteReserve: "Ha ocurrido un error al eliminar la reserva",
  errorSelectDay: "Debe seleccionar primero una pista.",
  errorSaveProfile: "Debe de cumplimentar los datos correctamente",  
  errorComment: "Faltan datos por completar",
  errorConnection: "No se ha recibido respuesta del servidor",
  errorLocation: "Debe darnos permisos de localización para usar el mapa",

  //Mensajes de Error de Validación
  errorNameLength: "El nombre debe tener una longitud minima de 2 caracteres",
  errorNameRequired: "Nombre es un dato requerido",
  errorNameFormat: "El Nombre no puede empezar por espacio",
  errorEmailRequired: "Email es un dato requerido",
  errorEmailFormat: "El formato del Email es incorrecto"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
