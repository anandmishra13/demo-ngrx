import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";

@Injectable()
export class UIservice {
  public loadingStateChange = new Subject<boolean>();

  constructor(
    private snachber: MatSnackBar
  ){}

  showSnackbar(message: string, action: string | undefined, duration: number) {
    this.snachber.open(message, action, {
      duration: duration
    })
  }

}
