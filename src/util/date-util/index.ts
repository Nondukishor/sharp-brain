interface ICfg {}
export default class DateFormatter extends Date {
  public fullDate: Date;
  public date: string | number | Date;
  public day: number;
  public year: number;
  public month: number;

  public hour: number;
  public min: number;
  public sec: number;
  constructor(date: Date = new Date()) {
    super(date);
    this.fullDate = date;
    this.date = date.getDate();
    this.day = date.getDay();
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.hour = date.getHours();
    this.min = date.getMinutes();
    this.sec = date.getSeconds();
  }
  isValid(): boolean {
    if (Date.parse(this?.fullDate?.toDateString())) return true;
    return false;
  }

  format(cfg: string): string {
    if (!this.isValid()) throw new Error('Date cannot be null');
    else {
      return this.fullDate.toLocaleString({});
    }
  }
}
