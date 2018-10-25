import { Directive, ElementRef, Renderer2, AfterViewInit } from "../../../../node_modules/@angular/core";

@Directive({
    selector: '[slice]'
})

export class SliceDirective implements AfterViewInit{
    constructor(private elementRef: ElementRef, private renderer: Renderer2){
        
    }
    ngAfterViewInit() {
        let text = this.elementRef.nativeElement.innerText
        if(text.split('').length >= 25) {
            this.elementRef.nativeElement.innerHTML = text.slice(0, 25) + '...'
        }
    }
}