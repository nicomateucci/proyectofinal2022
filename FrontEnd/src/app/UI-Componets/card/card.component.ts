import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {


  @Input()
  name!:number

  @Input()
  professor!:string

  @Input()
  about!:string

}
