export class PhoneNumber {
  country: string;
  number: number;

  get e164(): string {
    const num = this.country + this.number;
    return `+${num}`;
  }
}
