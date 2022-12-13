// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { config } from "process";

export const environment = {
  production: true,
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  /*firebaseConfig: {
    apiKey: "AIzaSyAgkpKuy49LY1GFOHCCnVP6a-zsjjgBjuM",
    authDomain: "superb-tendril-224107.firebaseapp.com",
    databaseURL: "https://superb-tendril-224107.firebaseio.com",
    projectId: "superb-tendril-224107",
    storageBucket: "superb-tendril-224107.appspot.com",
    messagingSenderId: "702844795474",
    appId: "1:702844795474:web:a22f5702e871f66d63bd8b",
    measurementId: "G-XGZ2PTLG4B"
  },*/
  //Variables Host
  endPoint: "https://31.131.183.8:3000",
  trackPoint: "/track/",
  sporcenterPoint: "/sportcenter/",
  reservePoint: "/reserve/",
  commentPoint: "/comment/",

  //Variables nombre
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

  //Variables
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
  titleSaveProfile: "Datos Guardados",

  //Mensaje SweetAlert
  textDeleteReserve: "Eliminará su reserva",
  textSaveProfile: "Se han guardado tus datos, a partir de ahora se autocompletarán en los formularios de reserva",


  //Botones SweetAlert
  buttonConfirmDelete: "Sí, borralo.",
  buttonCancelDelete: "No lo borres",

  //Mensajes 
  textWait: "Espere por favor",
  textLoading: "Cargando...",
  textHere: "Usted esta aquí",

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

  //Iconos
  iconMapURL: "assets/icon/sports/alfiler.png",
  iconSportCenterURL: "assets/icon/sports/estadio-ubicacion.png",

  //Mensajes de Error 
  errorReserve: "Error en la reserva, seleccione otros datos.",
  errorLocation: "Error en la localización",
  errorDataReserve: "Rellene todos los datos de la reserva.",
  errorSelectDay: "Debe seleccionar primero una pista."
};


export const firebaseConfig= {
  apiKey: "AIzaSyAgkpKuy49LY1GFOHCCnVP6a-zsjjgBjuM",
  authDomain: "superb-tendril-224107.firebaseapp.com",
  databaseURL: "https://superb-tendril-224107.firebaseio.com",
  projectId: "superb-tendril-224107",
  storageBucket: "superb-tendril-224107.appspot.com",
  messagingSenderId: "702844795474",
  appId: "1:702844795474:web:a22f5702e871f66d63bd8b",
  measurementId: "G-XGZ2PTLG4B",
  client_id: "702844795474-sbh3uc19otjoi43n1esknkgmq431l1j5.apps.googleusercontent.com",
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  scope: "https://www.googleapis.com/auth/calendar"
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
