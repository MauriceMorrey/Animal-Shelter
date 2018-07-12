import { Component, OnInit } from "@angular/core";
import { ExamsService } from "../exams.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-new",
  templateUrl: "./new.component.html",
  styleUrls: ["./new.component.css"]
})
export class NewComponent implements OnInit {
  newPet: any;
  name: string;
  type: number;
  description: string;
  skill1: any;
  skill2: any;
  skill3: any;
  nameError: string;
  pet;
  message;


  constructor(
    private _examsService: ExamsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.newPet = { name: "", type: "", description: "", skill1: "", skill2: "", skill3: "" };
  }

  onSubmit(form) {
    console.log(`Looks like we're submitting!`); // call the service's method to post the data, but make sure the data is bundled up in an object!
    console.log("this is the new Pet", this.newPet);
    if(form.valid){
      let observable = this._examsService.postPets(this.newPet);
      observable.subscribe(data => {
        console.log("Posted our pet!", data);
      });

      this.newPet = { name: "", type: "", description: "", skill1: "", skill2: "", skill3: "" };
      this._router.navigate(["/"]);
    }

    (error : any) => {
      let errorData = error.json();
      if(errorData.name.errors.length > 0){
           this.nameError = errorData.name.errors[0];
      }
    }
  }

  // createPet(){
  //   console.log(this)
  //   this._examsService.postPets(this.pet.name, this.pet.type, this.pet.description, this.pet.skill1,this.pet.skill2,this.pet.skill3).subscribe((response => {
  //     console.log(response)
  //     console.log()
  //     if(JSON.parse(response['_body'])['message'] === "That name is taken"){
  //       this.message = JSON.parse(response['_body'])['message']
  //     }
  //     else if(response['status'] == "success"){
  //       // console.log('did it')
  //       this._router.navigate(['/'])
  //     }
  //     else{
  //       console.log(response)
  //       this.message = "There was a problem saving exams. Please try again."
  //     }
  //   }))
  // }
}
