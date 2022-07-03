export enum OrientationPexels {
  landscape = 'landscape',
  portrait = 'portrait',
  square = 'square',
}

export enum SizePexels {
  large = 'large',
  medium = 'medium',
  small = 'small',
}

interface PexelsSrc {
  landscape: string;
  large: string;
  large2x: string;
  medium: string;
  original: string;
  portrait: string;
  small: string;
  tiny: string;
}

export interface PexelsPhoto {
  alt: string;
  avg_color: string;
  height: number;
  id: number;
  liked: boolean;
  photographer: string;
  photographer_id: number;
  photographer_url: string;
  src: PexelsSrc;
  url: string;
  width: number;
}

export interface PexelsData {
  next_page: string;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
}
