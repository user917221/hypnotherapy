require('dotenv').config({ override: true });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const mime = require('mime-types');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase URL or Service Role Key in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const BUCKET_NAME = 'products';
const BASE_DIR = "c:\\Users\\newgenprometheus\\.gemini\\antigravity\\playground\\nascent-magnetar\\BOX DIGITALES";
const TEMP_DIR = path.join(process.cwd(), 'temp_audio');

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

// Helper to compress audio using ffmpeg
function compressAudio(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        console.log(`\n🎧 Compressing: ${path.basename(inputPath)} -> MP3 (192kbps)`);

        // Use high-quality 192kbps compression which is great for voice
        const ffmpeg = spawn('ffmpeg', [
            '-y', // Overwrite output files without asking
            '-i', inputPath,
            '-codec:a', 'libmp3lame',
            '-b:a', '192k',
            outputPath
        ]);

        ffmpeg.stderr.on('data', (data) => {
            // ffmpeg outputs progress to stderr
            // We can optionally log this, but it gets noisy.
        });

        ffmpeg.on('close', (code) => {
            if (code === 0) {
                const originalSize = fs.statSync(inputPath).size / (1024 * 1024);
                const newSize = fs.statSync(outputPath).size / (1024 * 1024);
                console.log(`📉 Size reduced: ${originalSize.toFixed(1)}MB -> ${newSize.toFixed(1)}MB`);
                resolve(outputPath);
            } else {
                reject(new Error(`ffmpeg exited with code ${code}`));
            }
        });

        ffmpeg.on('error', (err) => reject(err));
    });
}

async function main() {
    console.log(`\n🚀 Starting Processing & Upload of '${BASE_DIR}'...\n`);
    const allFiles = [];

    function scanDir(dir) {
        try {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    scanDir(fullPath);
                } else if (stat.isFile()) {
                    const ext = path.extname(fullPath).toLowerCase();
                    if (['.mp3', '.wav'].includes(ext)) {
                        allFiles.push(fullPath);
                    }
                }
            }
        } catch (e) {
            console.error('Error scanning directory:', e.message);
        }
    }

    scanDir(BASE_DIR);
    console.log(`Found ${allFiles.length} audio files to process.`);

    for (const filePath of allFiles) {
        const ext = path.extname(filePath).toLowerCase();
        const baseName = path.basename(filePath, ext);

        // Calculate original relative path
        const relativeDir = path.dirname(path.relative(BASE_DIR, filePath));

        // Clean folder names for URL (Optional, but good practice)
        let storagePathDir = relativeDir.replace(/\\/g, '/');

        // Output path for MP3
        const finalFileName = `${baseName}.mp3`;
        let storagePath = storagePathDir === '.' ? finalFileName : `${storagePathDir}/${finalFileName}`;

        // Remove spaces and special chars for clean URLs (optional, Supabase handles spaces but they get percent-encoded)
        // storagePath = storagePath.replace(/\s+/g, '-').toLowerCase();

        const tempOutputPath = path.join(TEMP_DIR, `temp_${Date.now()}.mp3`);

        try {
            let fileToUpload = filePath;

            // Compress if it's a WAV file or just a very large MP3
            const stat = fs.statSync(filePath);
            const sizeMB = stat.size / (1024 * 1024);

            if (ext === '.wav' || (ext === '.mp3' && sizeMB > 30)) {
                fileToUpload = await compressAudio(filePath, tempOutputPath);
            } else {
                console.log(`\n⏭️ Skipping compression for: ${baseName}${ext} (${sizeMB.toFixed(1)}MB)`);
            }

            console.log(`☁️ Uploading: ${storagePath} ...`);

            const fileBuffer = fs.readFileSync(fileToUpload);

            const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(storagePath, fileBuffer, {
                contentType: 'audio/mpeg',
                cacheControl: '3600',
                upsert: true
            });

            if (error) {
                console.error(`❌ Failed to upload ${storagePath}:`, error.message || error);
            } else {
                console.log(`✅ Upload Success: ${storagePath}`);
            }

            // Clean up temp file if we created one
            if (fileToUpload === tempOutputPath && fs.existsSync(tempOutputPath)) {
                fs.unlinkSync(tempOutputPath);
            }

        } catch (err) {
            console.error(`❌ Exception processing ${filePath}:`, err.message || err);
            // Ensure temp file is cleaned up on error
            if (fs.existsSync(tempOutputPath)) {
                fs.unlinkSync(tempOutputPath);
            }
        }
    }

    console.log('\n🎉 All audio files processed and uploaded successfully!');

    // Clean up temp directory
    if (fs.existsSync(TEMP_DIR)) {
        fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    }
}

main().catch(console.error);
