import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

export async function getFeaturedCar() {
  return sanityClient.fetch(`
    *[_type == "car" && featured == true][0] {
      "slug": slug.current,
      make, model, year, price, status, shortDescription, mileage, colour, engine,
      "mainImage": {
        "url": coalesce(mainImage.cloudinaryUrl, mainImage.asset->url),
        "alt": mainImage.alt
      }
    }
  `);
}

export async function getAllCars() {
  return sanityClient.fetch(`
    *[_type == "car" && status != "archived"] | order(year desc) {
      "slug": slug.current,
      make, model, year, price, status, shortDescription, mileage, colour,
      "mainImage": {
        "url": coalesce(mainImage.cloudinaryUrl, mainImage.asset->url),
        "alt": mainImage.alt
      }
    }
  `);
}

export async function getCarBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "car" && slug.current == $slug][0] {
      "slug": slug.current,
      make, model, year, price, status, shortDescription, colour,
      interiorColour, mileage, engine, transmission, chassis,
      bodyStyle, rightHandDrive, description,
      "mainImage": {
        "url": coalesce(mainImage.cloudinaryUrl, mainImage.asset->url),
        "alt": mainImage.alt
      },
      "images": images[] {
        "url": coalesce(cloudinaryUrl, asset->url),
        "alt": alt,
        caption
      },
      seo
    }`,
    { slug }
  );
}
