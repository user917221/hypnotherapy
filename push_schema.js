const fs = require('fs');
const { execSync } = require('child_process');

const content = fs.readFileSync('.env', 'utf-8');

// Replace connection pool port and args with direct connection
const directContent = content.replace(
    /:6543\/([^\s?]+)(\?[\w=&]+)/g,
    ':5432/$1' // Strip query params like pgbouncer=true, use port 5432
);

console.log("Saving direct connection to .env...");
fs.writeFileSync('.env', directContent);

try {
    console.log("Running prisma db push...");
    execSync('npx.cmd prisma db push --skip-generate', { stdio: 'inherit' });
    console.log("Prisma push successful.");
} catch (e) {
    console.error("Prisma push failed.", e.message);
} finally {
    console.log("Restoring original .env...");
    fs.writeFileSync('.env', content);
}
