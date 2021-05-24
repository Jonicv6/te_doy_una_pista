// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig : {
    apiKey: "AIzaSyAgkpKuy49LY1GFOHCCnVP6a-zsjjgBjuM",
    authDomain: "superb-tendril-224107.firebaseapp.com",
    databaseURL: "https://superb-tendril-224107.firebaseio.com",
    projectId: "superb-tendril-224107",
    storageBucket: "superb-tendril-224107.appspot.com",
    messagingSenderId: "702844795474",
    appId: "1:702844795474:web:a22f5702e871f66d63bd8b",
    measurementId: "G-XGZ2PTLG4B"
  },
  //Variables Host
  endPoint: "http://31.131.183.8:3000",
  trackPoint: "/track/",
  sporcenterPoint: "/sportcenter/",

  //Variables nombre
  search: "buscar",
  maps: "mapa",
  reserves: "reservas",
  calendar: "calendario",
  city: "ciudad",
  sport: "deporte",
  track: "pista",
  date: "fecha",
  hour: "hora",
  reserver: "reservar",
  reserveName: "Nombre de la Reserva",
  yourName: "Su nombre",

  //Variables
  hoursOpen: ["8","9","10","11","12","13","16","17","18","19","20","21","22"],

  //Mensajes 
  textWait: "Espere por favor",
  textLoading: "Cargando...",
  textHere: "Usted esta aquí",
  
  //Mensajes de selects
  selectCitySport: "Selecciona una Ciudad y un Deporte",
  selectHour: "Seleccione una hora",
  selectCity: "Selecciona Ciudad",
  selectSport: "Seleccione Deporte",

  //Mensajes de vacio
  emptySportCenter: "Actualmente no hay ningún polideportivo disponible",
  emptySearch: "Sin resultados. Inténtelo de nuevo.",
  emptyHours: "No hay horas libres, seleccione otro día.",

  //Iconos
  iconMapURL: "assets/icon/sports/alfiler.png",
  iconSportCenterURL: "assets/icon/sports/estadio-ubicacion.png",
  
  //Mensajes de Error 
  errorLocation: "Error en la localización"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
