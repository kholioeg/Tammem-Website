import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-plus-minus',
  templateUrl: './plus-minus.component.html',
  styleUrls: ['./plus-minus.component.scss'],
})
export class PlusMinusComponent implements OnInit {
  title = 'Stepper input';
  @Input() initialValue;
  @Input() step = 0;
  @Input() min = 0;
  @Output() emitter: EventEmitter<number> = new EventEmitter();
  renderedValue: string;
  value = 0;

  ngOnInit(): void {
    this.value = this.initialValue;
  }

  toggleMore = () => {
    this.value = this.value + this.step;
    this.emitter.emit(this.value);
  }

  toggleLess = () => {
    if (this.value - this.step >= this.min) {
      this.value = this.value - this.step;
      this.emitter.emit(this.value);
    }
  }
}
