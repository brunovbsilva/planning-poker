import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable()
export class TitlePrefixStrategy extends TitleStrategy {
  constructor(private title: Title) {
    super();
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) this.title.setTitle(`PlanningPoker - ${title}`);
    else this.title.setTitle(`PlanningPoker`);
  }
}