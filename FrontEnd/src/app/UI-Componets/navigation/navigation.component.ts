import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  //ESTO DEBERIA SER UNA INTERFAZ O ALGO POR EL ESTILO
  coursesValue: any[] = [
    {
      value: 'Principiante',
      viewValue: 'Principiante'
    },
    { 
      value: 'Intermedio', 
      viewValue: 'Intermedio'
    },
    { 
      value: 'Avanzado', 
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

  filterCourses !: string | null ;
  filterCategory !: string | null ;

  //ACA QUEDARIA PENDIENTE COMO TRABAJAMOS EL TEMA DE LOS VALORES APRA FILTRADO Y POR DEMAS, POR DEFECTO LOS TOMA DE UN OBJETO DEFINIDO
  //HABRIA QUE VER SI LOS TRAEMOS DEL BACK O LOS DEJAMOS ESTATICOS ASI

  constructor(
    private router :Router,
    private route: ActivatedRoute
  ){ }

  ngOnInit() {
    // Suscribirse a los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      this.filterCourses = params['CoursesType']; 
      this.filterCategory = params['CoursesByCategory']; 
    });
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
    if(this.filterCourses || this.filterCategory){
      this.router.navigate(
        ['/courses'], {
        queryParams: 
          { 
            CoursesType : this.filterCourses,
            CoursesByCategory : this.filterCategory,
          }, 
      });
    }
  }

  resetFilters(){
    this.filterCourses = null;
    this.filterCategory = null;
    this.router.navigate(['/courses']);
  }
  
}
