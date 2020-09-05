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

  ngOnInit() {
    this.appService.getEmployeesDetails().subscribe((response) => {
      if(response && response.data && response.data.Employees){
         this.rows = response.data.Employees;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      position: {top: '0px'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./app.component.scss']
})
export class DialogOverviewExampleDialog {
  csvContent: string;
  contacts: Array<any> = [];
  properties: any = "";
  flag: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    public appService: AppService,
    private toastr: ToastrService
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileLoad = (fileLoadedEvent) => {

    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;

    //Flag is for extracting first line
    let flag = false;
    // Main Data
    let objarray: Array<any> = [];
    //Properties
    let prop: Array<any> = [];
    //Total Length
    let size: any = 0;

    for (const line of this.csvContent.split(/[\r\n]+/)) {

      if (flag) {

        let obj = {};
        for (let k = 0; k < size; k++) {
          //Dynamic Object Properties
          obj[prop[k]] = line.split(',')[k]
        }
        objarray.push(obj);

      } else {
        //First Line of CSV will be having Properties
        for (let k = 0; k < line.split(',').length; k++) {
          size = line.split(',').length;
          //Removing all the spaces to make them usefull
          prop.push(line.split(',')[k].replace(/ /g, ''));
        }
        flag = true;
      }
    }

    this.contacts = [...objarray];
    this.properties = [];

    this.properties = prop;

    this.flag = true;
    // console.log(this.csvContent);
  }




  onFileSelect(input: HTMLInputElement) {
    console.log("dsvfsg")

    const files = input.files;
    var fileTypes = ['csv'];  //acceptable file types

    if (files && files.length) {
      var extension = input.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
        isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
      //console.log(isSuccess);
      //  console.log("Filename: " + files[0].name);
      // console.log("Type: " + files[0].type);
      //  console.log("Size: " + files[0].size + " bytes");
      if(isSuccess){
        const fileToRead = files[0];

        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;
        fileReader.readAsText(fileToRead, "UTF-8");

      }else{
        this.toastr.error('Invalid File');
      }
    }
  }

  uploadFileData() {
    if(this.contacts && this.contacts.length){
      this.appService.uploadData(this.contacts).subscribe((response) => {
        this.dialogRef.close();
        if(response){
          this.toastr.success('File has been uploaded sucessfully');
        }
      });
    }else{
      this.toastr.error('Please select file');
    }

  }

}
