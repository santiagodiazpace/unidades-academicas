import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InstitutionalComponent } from './institutional.component';
import { NewsComponent } from './news.component';
import { CalendarComponent } from './calendar.component';
import { ParishComponent } from './parish.component';
import { MartinRodriguezComponent } from './martin-rodriguez.component';
import { BegoniaComponent } from './begonia.component';
import { FamiliesComponent } from './families.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Unidades Académicas Tandil' },
  {
    path: 'propuesta-institucional',
    component: InstitutionalComponent,
    title: 'Propuesta institucional | Unidades Académicas Tandil',
  },
  {
    path: 'noticias',
    component: NewsComponent,
    title: 'Noticias | Unidades Académicas Tandil',
  },
  {
    path: 'calendario',
    component: CalendarComponent,
    title: 'Calendario | Unidades Académicas Tandil',
  },
  {
    path: 'parroquia',
    component: ParishComponent,
    title: 'Parroquia | Unidades Académicas Tandil',
  },
  {
    path: 'm-rodriguez',
    component: MartinRodriguezComponent,
    title: 'Colegio Martín Rodríguez | Unidades Académicas Tandil',
  },
  {
    path: 'begonia',
    component: BegoniaComponent,
    title: 'Colegio Nuestra Señora de Begoña | Unidades Académicas Tandil',
  },
  {
    path: 'familias',
    component: FamiliesComponent,
    title: 'Familias | Unidades Académicas Tandil',
  },
  { path: '**', redirectTo: '' },
];
