import { Component, ViewChild,AfterViewInit, OnInit,Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoService } from '../services/activo.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit,AfterViewInit {

  @Input()
  pageSize!: number;
  
  activos : any[]=[];

  pageNum: number = 0;
  pageSizeOptions =[5,10,20]
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['rank', 'name', 'rate','allTimeHighUSD','volume'];

  constructor(
    private activoService:ActivoService
  ) {}

  public getLength():number{
    //ACA IRIA EL TAMAÑO DE LOS DATOS TRAIDOS DE LA API
    return this.activoService.getData().length;
  }

  handlePage(e:PageEvent){
    this.pageNum=e.pageIndex+1;
    this.pageSize=e.pageSize;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.activoService.getData());
    //ACA IRIA LA CONSULTA A LA API
    // this.activoService.getDataFromApi().subscribe(
    //   (data:any)=>
    //   {
    //     this.dataSource=data
    //     console.log(this.dataSource); 
    //   }
    // )
    console.log(this.dataSource);
  }

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    //Esto para pasarle el dato del paginador
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
