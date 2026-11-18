# Asset requirements — Diksha Jewellers

Public research was done before this preview was built. The site uses the address, phone, hours, Google rating and map link supplied for the showroom. It does not use conflicting directory claims.

## Found and downloaded

- 22 jewellery photographs from Pexels, under the Pexels License (commercial use is allowed; attribution is not required). They are sample studies, not Diksha Jewellers stock. Sources are listed in `data/asset-manifest.json`.
- One CC0 gold-ring GLB from Grab3D (`public/assets/360/glb/demo-gold-ring.glb`). It is a small stylised model, not a showroom piece.
- 72 generated frames for a ring and 72 for a necklace, so the drag-to-rotate viewer works before real photography exists.

## Not found

- An official logo.
- A photograph that can honestly be called the Diksha Jewellers showroom, counter or entrance.
- Product photographs that belong to this shop.
- A real 360° photograph sequence of a jewellery piece under a licence that could be downloaded.
- Unsplash files were requested and returned HTTP 401, so they were not used.

## Deliberately left off the website

These appeared in public directories and were not treated as verified:

- A founding year of 1985, and the name Sumit Soni, on TradeIndia.
- The name Mahesh Soni on IndiaMART, and a GST record at a different address (B-111, Chetak Marg, Jaipur 302023).
- A place-index pin code of 302049, and the email dikshajewellers4you@gmail.com.
- A wholesale silver-earring price.
- A numeric Facebook link that could not be checked as the official page.

The site uses postal code 302039, as supplied.

## What to send when you can

1. Official logo, preferably SVG or a transparent PNG, in colour and in one light version for dark backgrounds.
2. Showroom photographs: exterior, entrance, interior, counters. Horizontal, well lit, without other shops in the frame.
3. Product photographs on a consistent background: necklaces, earrings, bangles, rings, pendants, bridal sets. One piece per folder if it should spin.
4. For each piece that should rotate: 36 or 72 photographs named `frame-001.webp`, `frame-002.webp`, and so on, shot on a turntable. Put them in `public/assets/360/image-sequences/your-piece/` and point the product’s `sequenceId` at that folder in `data/viewers.ts` and `data/products.ts`.
5. Optional GLB files can replace `public/assets/360/glb/demo-gold-ring.glb`, or a new path can be set in `data/viewers.ts`.
6. Confirmed prices, metal purity, weights and stone details, only for pieces you want those fields to show. Empty fields stay hidden.
7. The real domain, set as `NEXT_PUBLIC_SITE_URL`.
8. A confirmed public email, if you want one on the contact page.
9. Polki and mangalsutra photographs, if those categories should show pictures. They are navigation categories only until then.

Replace the temporary wordmark by putting the logo files in `public/assets/brand/` and setting `logo.temporary` to `false` in `data/business.ts`.
