import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[toListIcon]'
})
export class ToListIconDirective {

  constructor(el: ElementRef) {
    // el.nativeElement.style.background = "url('../../../assets/add_icon.svg')";
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('click') onMouseLeave() {
    console.log('Directive heard the Click !');

    // this.highlight('');
  }

  private toggleIcon(color: string) {
    // this.el.nativeElement.style.backgroundColor = color;
  }

}
