/**
 * The pictures one viewer page draws.
 *
 * Kept apart from the component so the same values reach the viewer's own
 * `Image` and an app's `renderPicture` alike, and so the contract tests can
 * drive the load state in Node. Nothing here imports React Native at runtime.
 */
import { useState, type ReactNode } from 'react';
import type { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

/** What `renderPicture` is handed: everything the viewer's own picture is drawn from. */
export interface ImageViewerPicture {
  /** `thumb` is the trigger's `source`, which flies; `full` is its `fullSource`, over it once loaded. */
  kind: 'thumb' | 'full';
  source: ImageSourcePropType;
  /** Fills the picture's box. The full picture's also holds it transparent until it loads. */
  style: StyleProp<ImageStyle>;
  /** Set on the full picture: call it once the picture is drawn, and it fades in. */
  onLoad?: () => void;
}

export type ImageViewerPictureRenderer = (picture: ImageViewerPicture) => ReactNode;

export interface ViewerPictures {
  thumb: ImageViewerPicture;
  full: ImageViewerPicture | null;
}

export function useViewerPictures(
  source: ImageSourcePropType,
  fullSource: ImageSourcePropType | undefined,
  fill: StyleProp<ImageStyle>
): ViewerPictures {
  const [fullLoaded, setFullLoaded] = useState(false);

  return {
    thumb: { kind: 'thumb', source, style: fill },
    full: fullSource
      ? {
          kind: 'full',
          source: fullSource,
          style: [fill, { opacity: fullLoaded ? 1 : 0 }],
          onLoad: () => setFullLoaded(true),
        }
      : null,
  };
}
