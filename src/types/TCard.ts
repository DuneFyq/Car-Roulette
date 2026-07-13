export type TCardContent = {
  action: string;
  type: string;
};
export type TCard = Record<string, TCardContent>;
export interface ICardsResponse {
  count: number;
  [cardName: string]: TCardContent | number;
}
