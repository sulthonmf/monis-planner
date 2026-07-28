import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetDirs = [
  'public/assets/desks',
  'public/assets/chairs',
  'public/assets/accessories',
];

async function processImage(filePath) {
  if (!filePath.endsWith('.png')) return;
  console.log(`Processing background removal for: ${filePath}`);

  try {
    const { data, info } = await sharp(filePath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;
    const pixelCount = width * height;

    for (let i = 0; i < pixelCount; i++) {
      const idx = i * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Check if pixel is near-white (background)
      if (r > 225 && g > 225 && b > 225) {
        // Calculate transparency alpha
        const brightness = (r + g + b) / 3;
        if (brightness > 245) {
          data[idx + 3] = 0; // Completely transparent
        } else {
          // Smooth alpha drop-off for edges
          const alpha = Math.max(0, Math.floor((245 - brightness) * 12.75));
          data[idx + 3] = alpha;
        }
      }
    }

    const tempPath = filePath.replace('.png', '_clean.png');
    await sharp(data, {
      raw: {
        width,
        height,
        channels,
      },
    })
      .png()
      .toFile(tempPath);

    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);
    console.log(`✓ Cleaned background: ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

async function main() {
  for (const dir of assetDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith('.png')) {
        await processImage(path.join(dir, file));
      }
    }
  }
  console.log('Finished removing white backgrounds from all assets!');
}

main();
