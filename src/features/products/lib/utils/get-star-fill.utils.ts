export type StarFill = 'empty' | 'half' | 'full';

export type RatingStarIconProps = {
  fill: StarFill;
};
export function getStarFill(star: number, rating: number): StarFill {
  if (rating >= star) return 'full';
  if (rating >= star - 0.5) return 'half';
  return 'empty';
}
