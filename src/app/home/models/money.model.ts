export interface MoneyData {
  id: number;
  gf: number;
  kl: number;
  mu: number;
  tt: number;
}

export class Money {
  id: number;
  gf: number;
  kl: number;
  mu: number;
  tt: number;

  constructor(data?: MoneyData) {
    this.id = data?.id || -1;
    this.gf = data?.gf || 0;
    this.kl = data?.kl || 0;
    this.mu = data?.mu || 0;
    this.tt = data?.tt || 0;
  }
}
