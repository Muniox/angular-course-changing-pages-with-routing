import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSuscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this.user = {
    //   id: this.route.snapshot.params['id'],
    //   name: this.route.snapshot.params['name'],
    // };
    this.paramsSuscription = this.route.params.subscribe((params: Params) => {
      this.user = { id: params['id'], name: params['name'] };
    });
  }

  /**
   * The ActivatedRoute and its observables are insulated from the Router itself.
   * The Router destroys a routed component when it is no longer needed
   * and the injected ActivatedRoute dies with it.
   */

  ngOnDestroy() {
    this.paramsSuscription.unsubscribe(); //można to zrobić ale nie trzeba wytłumaczenie powyżej
  }
}
