export class Landslide {
  readonly cooldown: number;
  constructor(cooldown: number) {
    this.cooldown = cooldown;
  }

  get key() {
    return this.cooldown.toFixed(1);
  }
}

export class Erosion {
  readonly cooldown: number;
  readonly initialDelay: number;
  constructor(cooldown: number, initialDelay: number) {
    this.cooldown = cooldown;
    this.initialDelay = initialDelay;
  }

  get key() {
    return `${this.cooldown.toFixed(1)}/${this.initialDelay.toFixed(1)}`;
  }
}
