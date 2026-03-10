require('dotenv').config({ override: true });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const BUCKET_NAME = 'products';
const TEMP_DIR = path.join(process.cwd(), 'temp_audio');

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
}

function compressAudio(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        console.log(`\n🎧 Compressing: ${path.basename(inputPath)} -> MP3`);
        const ffmpeg = spawn('ffmpeg', ['-y', '-i', inputPath, '-codec:a', 'libmp3lame', '-b:a', '192k', outputPath]);
        ffmpeg.on('close', (code) => {
            if (code === 0) resolve(outputPath);
            else reject(new Error(`ffmpeg exited with code ${code}`));
        });
        ffmpeg.on('error', (err) => reject(err));
    });
}

function normalizeStr(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); // Remove accents and lowercase
}

async function retry() {
    console.log("🚀 Scanning for the missing files...");
    const allFiles = [];

    function scanDir(dir) {
        try {
            const items = fs.readdirSync(dir);
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                if (stat.isDirectory()) {
                    scanDir(fullPath);
                } else if (stat.isFile() && fullPath.endsWith('.wav')) {
                    allFiles.push(fullPath);
                }
            }
        } catch (e) { }
    }

    const BASE_DIR = "c:\\Users\\newgenprometheus\\.gemini\\antigravity\\playground\\nascent-magnetar\\BOX DIGITALES";
    scanDir(BASE_DIR);

    // We filter dynamically based on normalized strings
    const targetKeywords = ['pacifier', 'rythme'];
    const filesToUpload = allFiles.filter(f => {
        const norm = normalizeStr(f);
        return targetKeywords.some(k => norm.includes(k));
    });

    console.log(`Found ${filesToUpload.length} files matching the failed folders.`);

    for (const filePath of filesToUpload) {
        const ext = path.extname(filePath);
        const baseName = path.basename(filePath, ext);

        // Convert to forwards slashes and remove accents for standard clean URL paths
        // We know they failed because of accents, so we normalize the dirname
        let relativeDir = path.dirname(path.relative(BASE_DIR, filePath));
        let storagePathDir = relativeDir.replace(/\\/g, '/');

        // Only strip accents from the folder path, leave structure intact
        storagePathDir = storagePathDir.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const storagePath = `${storagePathDir}/${baseName}.mp3`;

        const tempOutputPath = path.join(TEMP_DIR, `temp_${Date.now()}.mp3`);

        try {
            const compressed = await compressAudio(filePath, tempOutputPath);
            const fileBuffer = fs.readFileSync(compressed);

            console.log(`☁️ Uploading to: ${storagePath}`);
            const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(storagePath, fileBuffer, {
                contentType: 'audio/mpeg',
                cacheControl: '3600',
                upsert: true
            });

            if (error) console.error(`❌ Failed:`, error.message);
            else console.log(`✅ Success: ${storagePath}`);

            if (fs.existsSync(compressed)) fs.unlinkSync(compressed);
        } catch (e) {
            console.error(e.message);
        }
    }
}

retry().catch(console.error);
