import { AfterViewChecked, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Gauge } from './components/gauge';

@Component({
  selector: 'app-root',
  template: `
  <div class="container mx-auto bg-white">
    <div class="text-xl">Dashboard</div>
    <div class="grid grid-cols-4">
      <ng-template #gauges ></ng-template>
    </div>
  </div>
  `,
  styles: []
})
export class AppComponent implements OnDestroy {

  myGauges: Array<ComponentRef<Gauge>> = [];

  @ViewChild("gauges", { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngAfterViewInit(): void {
    this.generateGauges();
  }

  ngOnDestroy(): void {
    for (let x = 0; x < this.myGauges.length; ++x) {
      this.myGauges[x].destroy();
    }
  }

  generateGauges() {
    // Get a factory for a known component
    const factory: ComponentFactory<Gauge> = this.resolver.resolveComponentFactory(Gauge);

    // Dynamic creating them
    for (let x = 0; x < 20; ++x) {
      const gauge = this.container.createComponent(factory);

      // Set instance properties
      gauge.instance.val = Math.ceil(Math.random() * Math.floor(20));

      // Ensure that change detection happens once
      // gauge.changeDetectorRef.detectChanges();

      // Keep a copy for destruction
      this.myGauges.push(gauge);
    }

  }

}
