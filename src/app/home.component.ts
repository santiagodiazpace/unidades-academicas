import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @ViewChild('declarationDialog') declarationDialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('valuesDialog') valuesDialog?: ElementRef<HTMLDialogElement>;

  quickLinks = [
    ['assets/iconos/inscripciones.svg', 'Inscripciones', 'Fechas, requisitos y preinscripción'],
    ['assets/iconos/pagos.svg', 'Cuotas', 'Medios e instrucciones de pago'],
    ['assets/iconos/documentacion.svg', 'Documentación', 'Circulares y archivos para descargar'],
    ['assets/iconos/calendario.svg', 'Calendario', 'Fechas importantes del ciclo lectivo'],
    ['assets/iconos/reuniones.svg', 'Reuniones', 'Solicitar reunión'],
    ['assets/iconos/uniformes.svg', 'Uniformes', 'Vestimenta de los alumnos'],
  ];

  levels = [
    ['Guardería', 'Primeros vínculos, cuidado y descubrimiento.'],
    ['Nivel Inicial', 'Aprender jugando, explorar y compartir.'],
    ['Nivel Primario', 'Bases sólidas para crecer con confianza.'],
    ['Nivel Secundario', 'Herramientas para construir el propio futuro.'],
  ];

  news = [
    ['Institucional', '12 AGO 2027', 'Una jornada para encontrarnos y celebrar'],
    ['Begoña · Nivel Primario', '08 AGO 2027', 'Aprender haciendo: nuevos proyectos en el aula'],
    ['Martín Rodríguez · Nivel Secundario', '02 AGO 2027', 'Estudiantes que transforman su comunidad'],
  ];

  events = [
    ['18', 'SEP', 'Ambas instituciones', 'Encuentro de familias'],
    ['24', 'SEP', 'Martín Rodríguez', 'Muestra anual de proyectos'],
    ['03', 'OCT', 'Nuestra Señora de Begoña', 'Celebración de la comunidad'],
  ];

  openDeclaration(event: Event): void {
    event.preventDefault();
    this.declarationDialog?.nativeElement.showModal();
  }

  closeDeclaration(): void {
    this.declarationDialog?.nativeElement.close();
  }

  closeDeclarationFromBackdrop(event: MouseEvent): void {
    if (event.target === this.declarationDialog?.nativeElement) {
      this.closeDeclaration();
    }
  }

  openValues(event: Event): void {
    event.preventDefault();
    this.valuesDialog?.nativeElement.showModal();
  }

  closeValues(): void {
    this.valuesDialog?.nativeElement.close();
  }

  closeValuesFromBackdrop(event: MouseEvent): void {
    if (event.target === this.valuesDialog?.nativeElement) {
      this.closeValues();
    }
  }
}
