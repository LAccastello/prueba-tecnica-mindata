import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUpperCase]',
  standalone: true,
})
export class UpperCaseDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value.toUpperCase();
    this.el.nativeElement.value = value;
  }
}
