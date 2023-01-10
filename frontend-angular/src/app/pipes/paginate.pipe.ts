import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(array:any[], tamPagina: number , numPagina : number ): any[] {
    if (array.length) return [];
    tamPagina = tamPagina || 30;
    numPagina = numPagina || 1;
    --numPagina
    return array.slice(numPagina * tamPagina , (numPagina+1) * tamPagina)
  }

}
