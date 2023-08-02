import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from 'src/app/services/asset/asset.service';

@Component({
  selector: 'app-values-item',
  templateUrl: './values-item.component.html',
  styleUrls: ['./values-item.component.css']
})
export class ValuesItemComponent {

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
