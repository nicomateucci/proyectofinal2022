import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  //ESTO DEBERIA SER UNA INTERFAZ O ALGO POR EL ESTILO
  coursesValue: any[] = [
    {
      value: 'principiante',
      viewValue: 'Principiante'
    },
    { 
      value: 'intermedio', 
      viewValue: 'Intermedio'
    },
    { 
      value: 'avanzado', 
      viewValue: 'Avanzado'
    },
  ];

  filterValues: any[] = [
    {
      value: 'cripto',
      viewValue: 'Cripto'
    },
    { 
      value: 'nft', 
      viewValue: 'NFT'
    },
    { 
      value: 'bonos', 
      viewValue: 'Bonos'
    },
    { 
      value: 'acciones', 
      viewValue: 'Acciones'
    },
    { 
      value: 'cedears', 
      viewValue: 'Cedears'
    },
  ];

  filterCourses : string | null = null;
  filterCategory : string | null = null;

  constructor(
    private router :Router
  ){

  }

  searchCourses(valueSelected : string){ 
    if (valueSelected){
      this.filterCourses = valueSelected;
    }
  }

  filterURL(filterSelected : string){
    if (filterSelected){
      this.filterCategory = filterSelected;
    }
  }

  applyFilters(){
    console.log("Navegando a la ruta de cursos "+this.filterCourses+" Cursos filtrados por el valor "+this.filterCategory);
    //ACA VA EL ROUTER APLICANDO LA URL CON EL FILTRO SI ES QUE EXISTEN
    this.resetFilters();
  }

  resetFilters(){
    console.log("Filtros eliminados");
    this.filterCourses = null;
    this.filterCategory = null;
  }
  
}
