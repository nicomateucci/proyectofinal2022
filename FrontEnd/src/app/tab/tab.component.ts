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

  pageNum: number = 0;
  pageSizeOptions =[5,10,20]
  dataSource : MatTableDataSource<any>;
  displayedColumns: string[] = ['rank', 'name', 'rate','allTimeHighUSD','volume'];

  constructor(
    private activoService:ActivoService
  ) 
  {
    //SI ESTO VA EN EL CONSTRUCTOR EL API, EL PAGINADOR Y EL ORDENAMIENTO FUNCIONA, EN EL ONINIT NO
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.activoService.getData();
    // this.activoService.getDataFromApi().subscribe(
    //   (data:any)=>
    //   {
    //     this.dataSource.data = data
    //   }
    // )
  }

  public getLength():number{
    //ACA IRIA EL TAMAÑO DE LOS DATOS TRAIDOS DE LA API
    return this.activoService.getData().length;
  }

  handlePage(e:PageEvent){
    this.pageNum=e.pageIndex+1;
    this.pageSize=e.pageSize;
  }

  ngOnInit(): void {
  }

  @ViewChild('paginator') paginator !: MatPaginator;
  @ViewChild('empTbSort') empTbSort !: MatSort;
  ngAfterViewInit() {
    //Esto para pasarle el dato del paginador
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.empTbSort;
  }

}
