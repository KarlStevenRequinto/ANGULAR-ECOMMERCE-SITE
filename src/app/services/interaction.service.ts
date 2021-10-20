import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  interactions: string[] = [];

  add(interaction: string) {
    this.interactions.push(interaction);
  }

  clear() {
    this.interactions = [];
  }

  constructor() {}
}
