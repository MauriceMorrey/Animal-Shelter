import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  constructor(private _http: HttpClient) {   
    
  }

  getPets(sorted){
    return this._http.get(`/api/pets/${sorted}`);
  }

  postPets(data){
    console.log("data",data);
    return this._http.post('/api/pets',data);    
  }

  showPet(id){
    return this._http.get(`/api/showPet/${id}`);        
  }

  updatePet(id,name,type,description,skill1,skill2,skill3){
    return this._http.put(`/api/updatePet/${id}` ,{name:name, type:type, description:description, skill1:skill1, skill2:skill2, skill3:skill3});    
    
  }

  deletePet(id){
    return this._http.delete(`/api/deletePet/${id}`);    
    
  }

  likePet(id:string){
    return this._http.get(`/api/likePet/${id}`);
  }

}



