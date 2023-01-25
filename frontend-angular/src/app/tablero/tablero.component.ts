import { Component, OnInit } from '@angular/core';
import { ActivoService } from '../services/activo.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  activos : any[] = [];
  pageSize: number = 20;
  pageNum: number = 0;
  pageSizeOptions =[20,30,50]

  constructor(
    private activoService:ActivoService
  ) { }

  ngOnInit(): void {
    this.activos = this.activoService.getData()
    //ACA IRIA LA CONSULTA A LA API
    // this.activoService.getDataFromApi().subscribe(
    //   (data:any)=>
    //   {
    //     this.activos=data
    //   }
    // )
  }
}
