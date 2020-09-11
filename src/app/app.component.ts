import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  constructor( public appService: AppService, public dialog: MatDialog) {
  }
  rows = [];

  ngOnInit() { }


  MyData(): void {
    this.appService.myTokenData().subscribe((response) => {
      console.log("response==", response)
    });
  }
}




