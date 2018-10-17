import { Pipe, PipeTransform } from '@angular/core';
import { IShow } from '../state/state';

@Pipe({ name: 'showTitle' })
export class ShowTitlePipe implements PipeTransform  {
  constructor() {}

  transform(show: IShow): string {
    const year = show.premiered && show.premiered.split('-')[0];
    return `${show.name} (${year})`;
  }
}
