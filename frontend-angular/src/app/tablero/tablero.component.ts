import { Component, OnInit } from '@angular/core';
import { ActivoService } from '../services/activo.service';
import {PageEvent} from "@angular/material/paginator"
import { PaginatePipe } from '../pipes/paginate.pipe';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  activos:any[]=[];

  pageSize: number = 30;
  pageNum: number = 1;
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

  handlerPage(page :PageEvent){
    this.pageNum= page.pageIndex+1;
    this.pageSize= page.pageSize
  }
}
