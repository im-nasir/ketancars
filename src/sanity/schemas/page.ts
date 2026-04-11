// NOTE: Install `sanity` package to use typed helpers.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pageSchema: any = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string', validation: (R: any) => R.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    { name: 'heroHeadline', title: 'Hero Headline', type: 'string' },
    { name: 'heroSubline', title: 'Hero Subline', type: 'string' },
    { name: 'heroVideo', title: 'Hero Video (Cloudinary URL)', type: 'url' },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
        { name: 'cloudinaryUrl', title: 'Cloudinary URL', type: 'url' },
      ],
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'ogImage', title: 'OG Image', type: 'image', options: { hotspot: true } },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      return { title, subtitle: `/${subtitle}` };
    },
  },
};

export { pageSchema };
