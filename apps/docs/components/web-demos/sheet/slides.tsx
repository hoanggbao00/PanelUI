'use client';

import { ImagesIcon } from 'lucide-react';
import { Button } from 'panelui-web/button';
import { Sheet } from 'panelui-web/sheet';

const PHOTO = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;

const PHOTOS = [
  { id: '1506905925346-21bda4d32df4', alt: 'Snowy peaks above a sea of cloud at dusk' },
  { id: '1470071459604-3b5ec3a7fe05', alt: 'Green cliffs under morning cloud' },
  { id: '1441974231531-c6227db76b6e', alt: 'A path through a sunlit forest' },
  { id: '1493246507139-91e8fad9978e', alt: 'Mountains reflected in a still turquoise lake' },
  { id: '1507525428034-b723cf961d3e', alt: 'Waves reaching a beach at sunrise' },
  { id: '1519681393784-d120267933ba', alt: 'The night sky over a snowy ridge' },
  { id: '1472214103451-9374bd1c798e', alt: 'Green hills at sunset' },
];

export default function SheetSlidesPhotos() {
  return (
    <Sheet>
      <Sheet.Trigger render={<Button variant="outline" />}>
        <ImagesIcon />
        View the album
      </Sheet.Trigger>
      <Sheet.Content size="full">
        <Sheet.Header title="Highlands" description={`${PHOTOS.length} photos from the trip`} />
        <Sheet.Slides aria-label="Photos">
          {PHOTOS.map((photo) => (
            <Sheet.Slide key={photo.id}>
              <img src={PHOTO(photo.id)} alt={photo.alt} decoding="async" draggable={false} />
            </Sheet.Slide>
          ))}
        </Sheet.Slides>
      </Sheet.Content>
    </Sheet>
  );
}
