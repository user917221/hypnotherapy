require('dotenv').config({ override: true });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
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

async function main() {
    console.log(`Checking bucket '${BUCKET_NAME}'...`);
    try {
        const { data: buckets, error: getBucketsError } = await supabase.storage.listBuckets();

        if (getBucketsError) {
            console.error('Error listing buckets:', getBucketsError);
        } else {
            const bucketExists = buckets.some(b => b.name === BUCKET_NAME);

            if (!bucketExists) {
                console.log(`Creating private bucket '${BUCKET_NAME}'...`);
                const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
                    public: false, // Must be private to protect the digital goods
                    allowedMimeTypes: ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'application/pdf'],
                    fileSizeLimit: 1024 * 1024 * 500 // 500MB limit
                });

                if (createError) {
                    console.error('Error creating bucket:', createError);
                }
            } else {
                console.log(`Bucket '${BUCKET_NAME}' already exists.`);
            }
        }
    } catch (err) {
        console.error('Exception during bucket setup:', err);
    }

    console.log(`Starting scan of '${BASE_DIR}'...`);
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
                    if (['.mp3', '.wav', '.pdf'].includes(ext)) {
                        allFiles.push(fullPath);
                    }
                }
            }
        } catch (e) {
            console.error('Error scanning directory:', e.message);
        }
    }

    scanDir(BASE_DIR);

    console.log(`Found ${allFiles.length} files to process.`);

    for (const filePath of allFiles) {
        const relativePath = path.relative(BASE_DIR, filePath);
        // Fix Windows slashes for Supabase storage paths
        // Remove special characters from filenames that might break URLs
        const storagePath = relativePath.split(path.sep).join('/');

        console.log(`Uploading: ${storagePath} ...`);

        try {
            const fileBuffer = fs.readFileSync(filePath);
            const contentType = mime.lookup(filePath) || 'application/octet-stream';

            const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(storagePath, fileBuffer, {
                contentType: contentType,
                cacheControl: '3600',
                upsert: true
            });

            if (error) {
                console.error(`Failed to upload ${storagePath}:`, error.message || error);
            } else {
                console.log(`✅ Success: ${storagePath}`);
            }
        } catch (err) {
            console.error(`Exception uploading ${storagePath}:`, err);
        }
    }

    console.log('All uploads complete!');
}

main().catch(console.error);
