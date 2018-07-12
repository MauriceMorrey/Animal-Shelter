import { Component, OnInit } from "@angular/core";
import { ExamsService } from "../exams.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.css"]
})
export class ShowComponent implements OnInit {
  pet;
  id;
  boolean = true;

  constructor(
    private _examsService: ExamsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    // this.getPetInfo()
    this._route.params.subscribe((params: Params) => {
      this.id = params["id"];
      console.log("The id is", params["id"]);
    });
    this._examsService.showPet(this.id).subscribe(data => {
      console.log("data", data["pet"]);
      console.log("data", data);
      if (data["status"] === "success") {
        console.log("data", data);
        this.pet = data["pet"];
        console.log(this.pet);
      } else {
        this._router.navigate(["/"]);
      }
    });
  }

  deletePetFromService(id) {
    console.log(`We're now deleting!`); // call the service's method to post the data, but make sure the data is bundled up in an object!
    let observable = this._examsService.deletePet(id);
    observable.subscribe(data => console.log("Deleted our pet!", data));
    // this.getPetsFromService();
    this._router.navigate(["/"]);
  }

  // likePet() {
  //   this.pet.likes += 1
  //   this.boolean = false;
  //   let observable = this._examsService.updatePet(this.id, this.pet.name,this.pet.type,this.pet.description,this.pet.skill1,this.pet.skill2,this.pet.skill3);
  //   observable.subscribe(data => { console.log("Liking our pet", data)
  //   })
  // }

  likePet() {
    let observable = this._examsService.likePet(this.id);
    observable.subscribe(data => {
      if (data["updated"]) {
        this.getPetInfo();
      }
    });
    this.boolean = false;
  }

  getPetInfo() {
    this._route.params.subscribe((params: Params) => {
      this.id = params["id"];
      let observable = this._examsService.showPet(this.id);
      observable.subscribe(data => {
        this.pet = data["pet"];
      });
    });
  }
}
