export interface IToasterProps {}
export interface IToasterOption {
  message: string | (() => JSX.Element);
}

export class Toaster {
  public currentSelected!: IToasterOption;
  show(options: IToasterOption) {
    this.currentSelected = options;
  }
  hide() {}
}
