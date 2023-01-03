import { Component, OnInit } from '@angular/core';
import { ActivoService } from '../services/activo.service';

@Component({
  selector: 'app-activo',
  templateUrl: './activo.component.html',
  styleUrls: ['./activo.component.css']
})
export class ActivoComponent implements OnInit {

  constructor(
    private activos : ActivoService
  ) { }

  ngOnInit(): void {
    console.log(this.activos.getData())
  }

}
