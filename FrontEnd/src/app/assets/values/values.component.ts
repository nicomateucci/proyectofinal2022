import { Component, ViewChild, AfterViewInit, OnInit, Input } from '@angular/core';
import { AssetService } from 'src/app/services/asset/asset.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit, AfterViewInit {

  @Input()
  pageSize!: number;

  lenght!:number;
  dataSource!: MatTableDataSource<any>;
  pageNum: number = 0;
  pageSizeOptions = [5, 10, 20]
  displayedColumns: string[] = ['rank', 'name', 'rate', 'allTimeHighUSD', 'volume'];

  constructor(
    private assetService: AssetService
  ) {}

  handlePage(e: PageEvent) {
    this.pageNum = e.pageIndex + 1;
    this.pageSize = e.pageSize;
  }

  ngOnInit(): void {
    //SI ESTO VA EN EL CONSTRUCTOR EL API, EL PAGINADOR Y EL ORDENAMIENTO FUNCIONA, EN EL ONINIT NO
    this.dataSource = new MatTableDataSource();
    this.assetService.getDataAllCoins().subscribe(
      (data: any) => {
        this.dataSource.data = data
      }
    )
  }

  @ViewChild('paginator') paginator !: MatPaginator;
  @ViewChild('empTbSort') empTbSort !: MatSort;
  ngAfterViewInit() {
    //Esto para pasarle el dato del paginador
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.empTbSort;
  }
}
