import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WeatherComponent } from './weather/weather.component';
import { ForecastComponent } from './forecast-details/forecast-details.component';
import { AppRoutingModule } from './app-routing.module';
import { WeatherService } from './service/weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DateChangePipe } from './pipes/date-change.pipe';
import { RoundPipe } from './pipes/round-value.pipe';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    WeatherComponent,
    ForecastComponent,
    DateChangePipe,
    RoundPipe
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {}
