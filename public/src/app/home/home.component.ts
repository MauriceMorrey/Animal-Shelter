import { Component, OnInit } from '@angular/core';
import { ExamsService } from "../exams.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pets = [];
  pet;
  sorted = false;
  constructor(private _examsService: ExamsService){}

  ngOnInit() {
    this.getPetsFromService(false)
  }

  getPetsFromService(bool) {
    console.log("boolean is", bool)
    let observable = this._examsService.getPets(bool);
    observable.subscribe(data => {
      console.log("Got our pets!", data);
      // In this example, the array of pets is assigned to the key 'pets' in the data object.
      // This may be different for you, depending on how you set up your Pet API.
      this.pets = data["pets"];
    });
  }

  typeSort(){
    this.sorted = !this.sorted;
    if(this.sorted){
      this.getPetsFromService(true);
    console.log("boolean is", this.sorted)
    }else{
      this.getPetsFromService(false);
    }
  }

  deletePetFromService(id) {
    console.log(`We're now deleting!`); // call the service's method to post the data, but make sure the data is bundled up in an object!
    let observable = this._examsService.deletePet(id);
    observable.subscribe(data => console.log("Deleted our pet!", data));
    // this.getPetsFromService();
    if(this.sorted){
      this.getPetsFromService(true);
    }else{
      this.getPetsFromService(false);
    }
  }

}
