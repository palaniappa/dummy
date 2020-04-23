import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.styl']
})
export class ViewRegistrationComponent implements OnInit {

  public bikeReg;

  constructor(private bikeService: BikeService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getBike(this.route.snapshot.params.id);
  }

  getBike(id:number){
    this.bikeService.getBike(id).subscribe(
      data =>{
        this.bikeReg = data;
      },
      error =>{
        console.log(error);
      }
      ,() =>{
        console.log('bike loaded');
      }
    );
  }
}
