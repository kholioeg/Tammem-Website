import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtonClicked]',
})
export class ButtonClickedDirective {
  constructor(private render: Renderer2, private elRef: ElementRef) {}

  @HostListener('click', ['$event']) clicked(e): void {
    this.elRef.nativeElement.parentElement.childNodes.forEach((child) => {
      if (child.classList.contains('green-background')) {
        this.render.removeClass(child, 'green-background');
      }
    });
    this.render.addClass(this.elRef.nativeElement, 'green-background');
  }
}

