import { FC } from 'react';

export type CircularGalleryItem = { image: string; text: string };

export type CircularGalleryProps = {
  items?: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onItemClick?: (index: number) => void;
};

declare const CircularGallery: FC<CircularGalleryProps>;
export default CircularGallery;
