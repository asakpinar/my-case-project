import { Component, Inject, OnInit } from '@angular/core';
import { EditModalData } from 'src/app/Module/EditModalData';
import { Products } from 'src/app/Module/Products';
import { DataService } from 'src/app/services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css']
})
export class EditdialogComponent implements OnInit {
  orderForm!: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditModalData,) { } //gönderdiğimiz datayı burda alıyoruz

 
  ngOnInit(): void {
    this.orderForm = new FormGroup(
      {
       
          amount: new FormControl(this.data ? this.data.amount : 0, [
            Validators.required,
          ]),
          description: new FormControl(this.data ? this.data.description : '', [
            Validators.required,
          ]),
 
      }) 

    }

  onNoClick(): void {
    this.data.amount =
      this.orderForm.value.amount > 0
        ? this.orderForm.value.amount
        : this.data.amount;
    this.data.description =
      this.orderForm.value.description.length > 0
        ? this.orderForm.value.description
        : this.data.description;
    this.dialogRef.close(this.data); 
    
  }

 

}
