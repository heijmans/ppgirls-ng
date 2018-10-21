import { Subscription } from "rxjs";

export class SubscriptionList {
  private subscriptions?: Subscription[];

  public add(subscription: Subscription): void {
    if (!this.subscriptions) {
      this.subscriptions = [];
    }
    this.subscriptions.push(subscription);
  }

  public unsubscribeAll(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}

export function makeSubscriptionList(): SubscriptionList {
  return new SubscriptionList();
}
