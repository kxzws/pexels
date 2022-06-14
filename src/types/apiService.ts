export enum orientationPexels {
  landscape = 'landscape',
  portrait = 'portrait',
  square = 'square',
}

export enum sizePexels {
  large = 'large',
  medium = 'medium',
  small = 'small',
}

export interface pexelsData {
  next_page: string;
  page: number;
  per_page: number;
  photos: pexelsPhoto[];
  total_results: number;
}

export interface pexelsPhoto {
  alt: string;
  avg_color: string;
  height: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  src: pexelsSrc;
  url: string;
  width: number;
}

interface pexelsSrc {
  landscape: string;
  large: string;
  large2x: string;
  medium: string;
  original: string;
  portrait: string;
  small: string;
  tiny: string;
}
