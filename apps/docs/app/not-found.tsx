import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { NotFound, NotFoundActions, NotFoundCode, NotFoundDescription, NotFoundTitle } from 'panelui-web/not-found';
import { homeOptions } from '@/app/layout.config';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
};

/**
 * The site's 404, built from the web collection's own NotFound. It sits in the
 * home layout so the navigation is still there to get somewhere else from.
 */
export default function SiteNotFound() {
  return (
    <HomeLayout {...homeOptions}>
      <main className="flex flex-1 items-center justify-center py-16">
        <NotFound>
          <NotFoundCode />
          <NotFoundTitle>This page isn't here</NotFoundTitle>
          <NotFoundDescription>
            The address may be mistyped, or the page has moved. Try the components, or start again from the
            front page.
          </NotFoundDescription>
          <NotFoundActions>
            <Button render={<Link href="/docs/components" />}>Open the components</Button>
            <Button variant="ghost" render={<Link href="/" />}>
              Front page
            </Button>
          </NotFoundActions>
        </NotFound>
      </main>
    </HomeLayout>
  );
}
