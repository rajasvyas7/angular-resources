import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  showActivatedLabel = false;
  subscription: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.activateEmitter.subscribe((aFlag) => {
      this.showActivatedLabel = aFlag;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
