import { slideInOutAnimation } from './../../../core';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
  animations: [slideInOutAnimation]
})
export class SegmentComponent implements OnInit {
  isSearchExpanded = false;

  constructor(@Inject(DOCUMENT) private document: any,
  private elementRef: ElementRef,) { }

  ngOnInit() {
  }

  showCategories(event: any){
    event.stopPropagation();
    this.isSearchExpanded = !this.isSearchExpanded;
  };

  pageChange(pageNumber: number){
    console.log(pageNumber);
  }

  ngAfterViewInit(): void {
    let scripts = ['assets/scripts/custom.js'];

    scripts.forEach(element => {
      const s = this.document.createElement('script');
      s.type = 'text/javascript';
      s.src = element;
      this.elementRef.nativeElement.appendChild(s);
    });
  };
}
