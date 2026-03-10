const fs = require('fs');
const { execSync } = require('child_process');

const content = fs.readFileSync('.env', 'utf-8');
const lines = content.split('\n');

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
        const key = match[1].trim();
        const val = match[2].trim();

        console.log(`Configuring ${key}...`);
        try {
            execSync(`npx.cmd vercel env rm ${key} production -y`, { stdio: 'ignore' });
        } catch (e) { }

        try {
            execSync(`npx.cmd vercel env add ${key} production`, {
                input: val,
                encoding: 'utf-8'
            });
            console.log(`Success: ${key}`);
        } catch (e) {
            console.error(`Failed to add ${key}`);
        }
    }
}
console.log('Finished pushing env vars to Vercel production.');
