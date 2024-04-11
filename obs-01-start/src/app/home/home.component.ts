import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
// import { Observable } from 'rxjs-compat';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.subscription = interval(2000).subscribe(
    //   (count) => {
    //     console.log(count);
    //   }
    // );
    const customObservable = Observable.create(
      (observer) => {
        let count = 0;
        setInterval(
          () => {
            if (count > 13) {
              observer.error(new Error('Bahot ho gaya count!'));
            }
            observer.next(count);
            if (count > 11) {
              observer.complete();
            }
            count += 2;
          }, 750)
      }
    );
    
    this.subscription = customObservable.pipe(
      filter((data: number) => {
        return data%3 == 0;        
      }),
      map((data: number) => {
        return 'Round: ' + (data + 1);
      })
    )
    .subscribe(
      (data) => {
        console.log(data);
        
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        console.log('Observable completed!');
        
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
