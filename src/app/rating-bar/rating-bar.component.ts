import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {RatingBar} from "./rating-bar";

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.css']
})
export class RatingBarComponent implements OnInit {
  // @ts-ignore
   max!: any=10;
  // @ts-ignore
   ratingValue!: any=5;
   showRatingValue!: any;

  // @Output() rateChange = new EventEmitter<number>();
  ratingsUnits: Array<RatingBar> = [];

  constructor() {
  }

  ngOnchange(changes: SimpleChanges) {
    if ('max' in changes) {
      let max = changes.max.currentValue;
      max = typeof max === 'undefined' ? 5 : max;
      this.max = max;
      this.calculate(max, this.ratingValue);
    }
  }

  calculate(max: any, ratingValue: number) {
    this.ratingsUnits = Array.from({length: max}, (_, index) => ({
      value: index + 1,
      active: index < ratingValue
    }));
  }

  ngOnInit(): void {
    console.log(1);
    this.calculate(this.max,this.ratingValue)
  }

  select(index: number){
    this.ratingValue=index+1;
    this.ratingsUnits.forEach((item,idx)=>item.active=idx<this.ratingValue);
    // this.rateChange.emit(this.ratingValue);
  }
  enter(index:number){
    this.ratingsUnits.forEach((item,idx)=>item.active=idx<=index);
  }

  reset(){
    this.ratingsUnits.forEach((item,idx)=>item.active=idx<this.ratingValue);
  }
}
