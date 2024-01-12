import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { Settings } from './model/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getSettings(id: number): Observable<Settings> {
    return this.http.get<Settings>(`${environment.apiHost}users/settings/${id}`);
  }

  saveSettings(settings: Settings): Observable<Settings> {
    return this.http.put<Settings>(`${environment.apiHost}users/settings`, settings);
  }

  accessSettings(): Settings | null {
    const settingsString = localStorage.getItem('settings');

    if (settingsString) {
      try {
        const settings = JSON.parse(settingsString);
        return settings;
      } catch (error) {
        console.error('Error parsing settings:', error);
      }
    }

    return null;
  }

}
