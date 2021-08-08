import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastComponent } from './forecast-details/forecast-details.component';
import { WeatherComponent } from './weather/weather.component';
const routes: Routes = [
  { path: 'forecast-details/:id', component: ForecastComponent },
  { path: '', component: WeatherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
