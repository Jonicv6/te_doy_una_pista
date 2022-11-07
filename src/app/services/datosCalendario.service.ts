import { Injectable } from '@angular/core';


export class datosCalendario {
  text: string;

  startDate: Date;

  endDate: Date;

  allDay?: boolean;
}

const appointments: datosCalendario[] = [
  {text: 'La revetlla de Sant Joan (festivo regional)', startDate: new Date('2021-06-24'), endDate: new Date('2021-06-25')},
   {text: 'Día del Padre', startDate: new Date('2022-03-19'), endDate: new Date('2022-03-20')},
  {text: 'San Esteban (festivo regional)', startDate: new Date('2022-12-26'), endDate: new Date('2022-12-27')},
  {text: 'Día del Padre', startDate: new Date('2023-03-19'), endDate: new Date('2023-03-20')},
  {text: 'San Juan (festivo regional)', startDate: new Date('2021-06-24'), endDate: new Date('2021-06-25')},
  {text: 'Año Nuevo', startDate: new Date('2023-01-01'), endDate: new Date('2023-01-02')},
  {text: 'Año Nuevo (festivo regional)', startDate: new Date('2023-01-02'), endDate: new Date('2023-01-03')},
  {text: 'San José (festivo regional)', startDate: new Date('2023-03-19'), endDate: new Date('2023-03-20')},
  {text: 'San Jorge. Día de Aragón (Aragón)', startDate: new Date('2023-04-23'), endDate: new Date('2023-04-24')},
  {text: 'descanso laboral correspondiente a San Jorge. Día de Aragón (Aragón)', startDate: new Date('2023-04-24'), endDate: new Date('2023-04-25')},
  {text: 'Día de Todos los Santos', startDate: new Date('2023-11-01'), endDate: new Date('2023-11-02')},
  {text: 'Día de la Constitución Española', startDate: new Date('2023-12-06'), endDate: new Date('2023-12-07')}
];



@Injectable({
  providedIn: 'root'
})
export class ServiceCalendar {
  constructor() { }

  public getDatos() {
    return appointments;
  }
}