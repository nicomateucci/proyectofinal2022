import { Component, OnInit } from '@angular/core';
import { ActivoService } from '../services/activo.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  activos:any[]=[];

  constructor(
    private activoService:ActivoService
  ) { }

  ngOnInit(): void {
    this.activos = this.activoService.getData()
  }

}
