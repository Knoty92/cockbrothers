/**
 * Server-side mockup renderer — composites brand elements onto product
 * templates and renders via Sharp (or @resvg/resvg-js for SVG).
 *
 * This module is designed to run server-side (Vinxi API routes, Inngest jobs).
 * It is NOT imported in client bundles.
 */

// NOTE: In a real deployment, import sharp and resvg:
// import sharp from 'sharp';
// import { Resvg } from '@resvg/resvg-js';

export interface MockupJob {
  productId: string;
  brandId: string;
  templateId: string;
  variantName: string;
  brand: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
    logoUrl?: string;
    headingFont: string;
    bodyFont: string;
  };
  template: {
    data: Record<string, unknown>; // SVG / canvas definition JSON
    previewUrl?: string;
  };
}

export interface MockupResult {
  productId: string;
  variantName: string;
  imageUrl: string;
  generationTimeMs: number;
  width: number;
  height: number;
  format: string;
}

interface BuildSvgParams {
  template: Record<string, unknown>;
  brand: MockupJob['brand'];
  variant: string;
}

/**
 * Build an SVG composition from the template data + brand assets.
 */
function buildSvgComposition(params: BuildSvgParams): string {
  const { template, brand, variant } = params;

  // The template JSON describes layers and zones.
  // Example shape:
  // {
  //   width: 1200,
  //   height: 1600,
  //   layers: [
  //     { type: 'rect', x: 0, y: 0, w: 1200, h: 1600, fill: '#fff' },
  //     { type: 'text', x: 100, y: 200, text: '{{BRAND_NAME}}', font: 'heading' },
  //     { type: 'image', x: 400, y: 300, w: 400, h: 400, src: '{{LOGO_URL}}' },
  //   ]
  // }

  const width = Number(template.width ?? 1200);
  const height = Number(template.height ?? 1600);
  const layers = Array.isArray(template.layers)
    ? (template.layers as Record<string, unknown>[])
    : [];

  const elements = layers
    .map((layer) => {
      const type = String(layer.type ?? '');

      switch (type) {
        case 'rect': {
          const fill = String(layer.fill ?? brand.primaryColor);
          const rx = Number(layer.rx ?? 0);
          return `<rect x="${layer.x ?? 0}" y="${layer.y ?? 0}" width="${layer.w ?? 100}" height="${layer.h ?? 100}" fill="${fill}" ${rx ? `rx="${rx}"` : ''} />`;
        }
        case 'circle': {
          const fill = String(layer.fill ?? brand.primaryColor);
          return `<circle cx="${layer.cx ?? 50}" cy="${layer.cy ?? 50}" r="${layer.r ?? 50}" fill="${fill}" />`;
        }
        case 'text': {
          const text = String(layer.text ?? '')
            .replace('{{BRAND_NAME}}', variant)
            .replace('{{PRIMARY_COLOR}}', brand.primaryColor);
          const fontSize = Number(layer.fontSize ?? 48);
          const fontWeight = Number(layer.fontWeight ?? 700);
          const fontFamily = layer.font === 'body' ? brand.bodyFont : brand.headingFont;
          const color = String(layer.color ?? brand.primaryColor);
          const textAnchor = String(layer.textAnchor ?? 'start');
          return `<text x="${layer.x ?? 0}" y="${layer.y ?? fontSize}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${color}" text-anchor="${textAnchor}">${escapeXml(text)}</text>`;
        }
        case 'image': {
          const href = String(layer.src ?? '')
            .replace('{{LOGO_URL}}', brand.logoUrl ?? '')
            .replace('{{ACCENT_COLOR}}', brand.accentColor ?? brand.primaryColor);
          if (!href) return '';
          return `<image x="${layer.x ?? 0}" y="${layer.y ?? 0}" width="${layer.w ?? 100}" height="${layer.h ?? 100}" href="${href}" preserveAspectRatio="xMidYMid meet" />`;
        }
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${brand.headingFont.replace(/ /g, '+')}:wght@400;700&family=${brand.bodyFont.replace(/ /g, '+')}:wght@400;600&display=swap');
    </style>
  </defs>
  ${elements}
</svg>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Render SVG buffer to PNG using @resvg/resvg-js,
 * optionally composite over a mockup background, then optimize with Sharp.
 */
async function svgToPng(svg: string, width: number): Promise<Buffer> {
  // In production:
  // const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width } });
  // const pngBuffer = resvg.render().asPng();
  // return Buffer.from(pngBuffer);

  // Stub for development — returns a dummy buffer
  return Buffer.from(
    `<svg stub width="${width}">${svg}</svg>`,
  );
}

/**
 * Composite a rendered product design onto a mockup background image.
 */
async function compositeWithBackground(
  designBuffer: Buffer,
  backgroundBuffer: Buffer,
): Promise<Buffer> {
  // In production:
  // return sharp(backgroundBuffer)
  //   .composite([{ input: designBuffer, top: 0, left: 0, blend: 'over' }])
  //   .png({ quality: 90 })
  //   .toBuffer();

  return designBuffer; // Stub
}

/**
 * Load a mockup background image from storage / CDN.
 */
async function loadMockupBackground(
  templateId: string,
  variantName: string,
): Promise<Buffer> {
  // In production, fetch from Supabase Storage or local filesystem:
  // const { data } = await supabase.storage
  //   .from('mockup-backgrounds')
  //   .download(`${templateId}/${variantName}.png`);
  // return Buffer.from(await data!.arrayBuffer());

  return Buffer.from(`stub background for: ${templateId}/${variantName}`);
}

/**
 * Main entry point: generate a production-ready mockup for a single variant.
 *
 * Pipeline:
 * 1. Build SVG composition from template + brand
 * 2. Render SVG → PNG via @resvg/resvg-js
 * 3. Composite over mockup background via Sharp
 * 4. Optimize and return buffer
 */
export async function generateMockup(job: MockupJob): Promise<MockupResult> {
  const startTime = Date.now();

  // 1. Build SVG composition
  const svg = buildSvgComposition({
    template: job.template.data,
    brand: job.brand,
    variant: job.variantName,
  });

  // 2. SVG → PNG
  const pngBuffer = await svgToPng(svg, 1200);

  // 3. Composite over mockup background
  const mockupBg = await loadMockupBackground(job.templateId, job.variantName);
  const composited = await compositeWithBackground(pngBuffer, mockupBg);

  // 4. In production: upload to Supabase Storage
  // const filePath = `mockups/${job.productId}/${job.variantName}.png`;
  // const { data: upload } = await supabase.storage.from('mockups').upload(filePath, composited, {
  //   contentType: 'image/png',
  //   upsert: true,
  // });
  // const imageUrl = supabase.storage.from('mockups').getPublicUrl(filePath).data.publicUrl;

  const imageUrl = `https://cdn.cockbrothers.app/mockups/${job.productId}/${job.variantName}.png`; // stub

  return {
    productId: job.productId,
    variantName: job.variantName,
    imageUrl,
    generationTimeMs: Date.now() - startTime,
    width: 1200,
    height: 1600,
    format: 'png',
  };
}

/**
 * Generate mockups for multiple variants of the same product (batch).
 */
export async function generateMockupBatch(
  jobs: MockupJob[],
): Promise<MockupResult[]> {
  const results: MockupResult[] = [];
  for (const job of jobs) {
    try {
      const result = await generateMockup(job);
      results.push(result);
    } catch (err) {
      console.error(`Mockup generation failed for ${job.variantName}:`, err);
    }
  }
  return results;
}
