import { Component, ViewChild, AfterViewInit, OnInit, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssetService } from 'src/app/Services/asset/asset.service';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-cryptocurrency',
  templateUrl: './cryptocurrency.component.html',
  styleUrls: ['./cryptocurrency.component.css']
})
export class CryptocurrencyComponent implements OnInit, AfterViewInit {

  pageSize!: number;
  pageNum!: number;
  pageSizeOptions = [5, 10, 20]
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['rank', 'name', 'rate', 'allTimeHighUSD', 'volume'];

  constructor(
    private assetService: AssetService,
    private userService : UserService
  ) {}

  handlePage(e: PageEvent) {
    this.pageNum = e.pageIndex + 1;
    this.pageSize = e.pageSize;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.assetService.getDataCoins().subscribe(
      (data: any) => {
        this.dataSource.data = data;
      }
    )
    // this.assetService.getDataFromApi().subscribe(
    //   (data: any) => {
    //     this.dataSource.data = data
    //   }
    // )
  }

  @ViewChild('paginator') paginator !: MatPaginator;
  @ViewChild('empTbSort') empTbSort !: MatSort;
  
  ngAfterViewInit() {
    //Esto para pasarle el dato del paginador
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.empTbSort;
  }

  showMessage(){
    alert("Agregado a favoritos");
  }

  checkAutentication(){
    return this.userService.checkAunthentication();
  }
}
