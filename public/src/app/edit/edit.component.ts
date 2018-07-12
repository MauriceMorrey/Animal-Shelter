import { Component, OnInit } from '@angular/core';
import { ExamsService } from "../exams.service";
import { ActivatedRoute, Router, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  pet;
  petToEdit: any;
  id;
  message;

  constructor(private _examsService: ExamsService,private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit() {
    // this.petToEdit = {_id: "", title: "", price: "", image_url: ""}
    this._route.params.subscribe((params: Params) => {this.id = params['id']
    console.log("The id is", params['id'])});
    this._examsService.showPet(this.id).subscribe(data => {
      console.log("data",data['pet'])
      console.log("data",data)
      if(data['status'] === "success"){
        console.log("data",data)
        this.pet = (data["pet"])
        console.log(this.pet)
      }
      else{
        this._router.navigate(['/'])
      }
    });

  }
  editPet(){
    this._examsService.updatePet(this.id, this.pet.name,this.pet.type,this.pet.description,this.pet.skill1,this.pet.skill2,this.pet.skill3).subscribe(data => {
      if(data['status'] === "success"){
        this._router.navigate(['/'])
      }
      else{
        this.message = 'something went south'
      }
    })
  }


  deletePetFromService(id) {
    console.log(`We're now deleting!`); // call the service's method to post the data, but make sure the data is bundled up in an object!
    let observable = this._examsService.deletePet(id);
    observable.subscribe(data => console.log("Deleted our pet!", data));
    // this.getPetsFromService();
    this._router.navigate(['/'])

  }

}

