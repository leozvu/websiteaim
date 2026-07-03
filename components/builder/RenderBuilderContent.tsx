'use client';

/* Render nội dung Builder.io + nạp các block AIM đã đăng ký. */

import { Content, type BuilderContent } from '@builder.io/sdk-react';
import { customComponents } from './registry';

export function RenderBuilderContent({
  content,
  apiKey,
  model = 'page',
}: {
  content: BuilderContent | null;
  apiKey: string;
  model?: string;
}) {
  return <Content content={content ?? undefined} apiKey={apiKey} model={model} customComponents={customComponents} />;
}
