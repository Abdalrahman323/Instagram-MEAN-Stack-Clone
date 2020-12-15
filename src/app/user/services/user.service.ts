import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const backend_url = environment.apiUrl+'/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient :HttpClient) { }
  
  getUserData(userId :string){
    return this.httpClient.get(backend_url+"/"+userId);
  }
}
