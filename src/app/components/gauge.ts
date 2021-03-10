import { Component } from "@angular/core";

@Component({
  template: `<div class="border rounded border-gray-300 m-1 p-1">
    <div>% Complete</div>
    <div [innerHtml]="'&#x2588;'.repeat(this.val)"></div>
  </div>`
})
export class Gauge {
  val = 0;
}