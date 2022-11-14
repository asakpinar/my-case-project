import { AfterViewInit, Component, OnInit,Inject} from '@angular/core';
import { Products } from 'src/app/Module/Products';
import { DataService } from 'src/app/services/data.service';
import { EditModalData } from 'src/app/Module/EditModalData';
import { MatDialog } from '@angular/material/dialog';
import { EditdialogComponent } from '../editdialog/editdialog.component';



@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit,AfterViewInit {
product!: Products[];

displayedColumns: string[]=['Id','thumbnail','Brand','Title','Description','Price','Rating','Stock','Category','sold','EditSale'];


orders = new Map<number, EditModalData>(); 

  constructor(private dataService: DataService,public dialog: MatDialog) { 
   
  }

  ngOnInit(): void {
    this.getData();
   
  }

  ngAfterViewInit(): void {
    this.getData();
    console.log(this.product);
    setTimeout(()=> this.getData(), 5000)
  }

  getData(){
    this.dataService.getData().subscribe((data:any)=>{
      this.product=data.products;
      //  console.log(data);
    });
  }
  openEditModal(product: Products) {
    let data: EditModalData | undefined;
    data = this.getEdit(product);

    const dialogRef = this.dialog.open(EditdialogComponent, { //dialogu açtığımız kısım
      data: data, // datayı yolluyoruz
    });

    dialogRef.afterClosed().subscribe((result: EditModalData) => { //dialog kapandığında içerisindeki veriyi
      if (result.amount && result.description)                     
        this.orders.set(product.id, result);                   //kaydediyor.
    });
  }

  getEdit(product: Products) {
    if (!this.orders.get(product.id)) {
      return {
        title: product.title,
        productId: product.id,
      };
    } else {
      return this.orders.get(product.id);
    }
  }


}


