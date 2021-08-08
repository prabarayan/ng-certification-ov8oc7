import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../service/weather.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  isSpinner: boolean = false;
  weatherData: any = { zipcode: '', data: '', forecastLink: '', icon: '' };
  weatherDataResults: any[] = [];
  baseWeatherImgPath: string;
  weatherImg: any;

  constructor(private weatherService: WeatherService) {
    this.baseWeatherImgPath = this.weatherService.getBaseWhetherImgPath();
    this.weatherImg = this.weatherService.getWeatherImgs();
  }

  ngOnInit() {
    let weatherData = JSON.parse(localStorage.getItem('weatherData'));
    this.weatherDataResults = weatherData || [];
  }

  weatherForm = new FormGroup({
    zipcode: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?!0{3})[0-9]{5}$')
    ])
  });

  getZipcode() {
    return this.weatherForm.get('zipcode').value;
  }

  onSubmit() {
    this.isSpinner = true;
    this.getWeatherData(this.getZipcode());
    this.weatherForm.reset();
  }
  getWeatherData(zipcode) {
    this.weatherService.weatherDataByPincode(zipcode).subscribe(
      result => {
        this.isSpinner = false;
        this.weatherData.data = result;
        this.weatherData.zipcode = zipcode;
        this.weatherData.forecastLink =
          'forecast-details/' + this.weatherData.zipcode;
        if (this.weatherData.data != null && this.weatherData.data != '') {
          let index = this.findById(this.weatherData.zipcode);
          if (index != -1) {
            this.weatherDataResults[index].zipcode = this.weatherData.zipcode;
            this.weatherDataResults[index].data = this.weatherData.data;
            localStorage.setItem(
              'weatherData',
              JSON.stringify(this.weatherDataResults)
            );
          } else {
            this.weatherData.forecastLink =
              'forecast-details/' + this.weatherData.zipcode;
            this.weatherDataResults.push(
              JSON.parse(JSON.stringify(this.weatherData))
            );
            localStorage.setItem(
              'weatherData',
              JSON.stringify(this.weatherDataResults)
            );
          }
        } else {
          alert(
            'weather Result not available for given zipcode, try with other zipcode'
          );
        }
      },
      error => {
        console.log('error', error);
        this.isSpinner = true;
        alert(
          'weather Result not available for given zipcode, try with other zipcode'
        );
      }
    );
  }
  findById(zipcode: any) {
    let index = this.weatherDataResults.findIndex(
      obj => obj.zipcode == zipcode
    );
    return index;
  }
  clearWeatherData() {
    this.weatherData = { zipcode: '', data: '', forecastLink: '', icon: '' };
  }
  deleteCity(index) {
    this.weatherDataResults.splice(index, 1);
    localStorage.setItem(
      'weatherData',
      JSON.stringify(this.weatherDataResults)
    );
  }
}
