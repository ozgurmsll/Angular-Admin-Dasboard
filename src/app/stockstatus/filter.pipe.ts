import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any[],filter:string) {
    if(!filter){
      return value;
    }
    return value.filter(p=>{
      const name=p.name.toLowerCase().includes(filter);
      return name ;
    });

  }
  transform2(value:any[],filter:string) {
    if(!filter){
      return value;
    }
    return value.filter(p=>{
      const adetkg=p.adetkg.toLowerCase().includes(filter);
      return adetkg ;
    });

  }
}
