import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';
import { Subscriber, Subscription } from 'rxjs';
import { SubscribeOnObservable } from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  activateUser() {
    this.userService.activateEmitter.next(true);
  }

  ngOnDestroy(): void {
    this.userService.activateEmitter.next(false);
    this
  }
}
