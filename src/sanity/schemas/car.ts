// NOTE: Install `sanity` package to use typed helpers.
// Schema is intentionally typed as `object` for now so the app
// compiles without the full Sanity Studio dependency.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const carSchema: any = {
  name: 'car',
  title: 'Car Listing',
  type: 'document',
  fields: [
    { name: 'make', title: 'Make', type: 'string', validation: (R: any) => R.required() },
    { name: 'model', title: 'Model', type: 'string', validation: (R: any) => R.required() },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (R: any) => R.required().min(1886).max(new Date().getFullYear()),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => `${doc.year}-${doc.make}-${doc.model}`,
        maxLength: 96,
      },
      validation: (R: any) => R.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Enquire Only', value: 'enquire' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
      validation: (R: any) => R.required(),
    },
    { name: 'featured', title: 'Feature on Homepage', type: 'boolean', initialValue: false },
    { name: 'price', title: 'Price (display string, e.g. "POA" or "£195,000")', type: 'string' },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' },
        { name: 'cloudinaryUrl', title: 'Cloudinary URL (overrides Sanity asset)', type: 'url' },
      ],
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'cloudinaryUrl', title: 'Cloudinary URL', type: 'url' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'shortDescription',
      title: 'Short Description (card preview)',
      type: 'text',
      rows: 3,
      validation: (R: any) => R.max(200),
    },
    { name: 'description', title: 'Full Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'colour', title: 'Colour', type: 'string' },
    { name: 'interiorColour', title: 'Interior Colour', type: 'string' },
    { name: 'mileage', title: 'Mileage', type: 'string' },
    { name: 'engine', title: 'Engine', type: 'string' },
    {
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: [
          { title: 'Manual', value: 'manual' },
          { title: 'Automatic', value: 'automatic' },
          { title: 'Semi-Automatic', value: 'semi-automatic' },
        ],
      },
    },
    { name: 'chassis', title: 'Chassis Number', type: 'string' },
    { name: 'bodyStyle', title: 'Body Style', type: 'string' },
    { name: 'rightHandDrive', title: 'Right Hand Drive', type: 'boolean', initialValue: true },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
      ],
    },
  ],
  preview: {
    select: { title: 'make', subtitle: 'model', year: 'year', media: 'mainImage' },
    prepare({ title, subtitle, year, media }: { title: string; subtitle: string; year: number; media: unknown }) {
      return { title: `${year} ${title} ${subtitle}`, media };
    },
  },
};

export { carSchema };
