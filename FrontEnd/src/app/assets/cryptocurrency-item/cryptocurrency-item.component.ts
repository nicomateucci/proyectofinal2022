import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from 'src/app/services/asset/asset.service';

@Component({
  selector: 'app-cryptocurrency-item',
  templateUrl: './cryptocurrency-item.component.html',
  styleUrls: ['./cryptocurrency-item.component.css']
})
export class CryptocurrencyItemComponent implements OnInit {

  item: any;

  constructor(
    private assetService: AssetService,
    private route: ActivatedRoute
  ){ 
    this.route.params.subscribe((data: any) => {
      this.item = data.name;
    })
  }

  ngOnInit() {
    this.assetService.getDataCoin(this.item).subscribe((data:any) => {
      this.item = data[0];
      console.log(data[0])
    })
  }
}
