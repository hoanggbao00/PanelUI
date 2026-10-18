'use client';

import { NotFound } from 'panelui-web/not-found';

export default function NotFoundOutline() {
  return (
    <NotFound>
      <NotFound.Code code="410" fill="outline" color="warning" />
      <NotFound.Title as="h2">Gone for good</NotFound.Title>
      <NotFound.Description>This page was retired and will not be coming back.</NotFound.Description>
    </NotFound>
  );
}
