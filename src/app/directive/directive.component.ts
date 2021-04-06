import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent {

  listCourse: string[] = [
    'Java',
    'Php',
    'C#',
    'C++'
  ]

  available: boolean = true;

  constructor() { 

  }

  public setAvailable(): void {
    this.available = (this.available==true)? false:true
  }
}
