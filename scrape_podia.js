const https = require('https');

const urls = [
    "https://peguycasteloot.podia.com/sommeil",
    "https://peguycasteloot.podia.com/gestion-du-stress",
    "https://peguycasteloot.podia.com/amour-et-estime-de-soi",
    "https://peguycasteloot.podia.com/retrouver-l-elegie",
    "https://peguycasteloot.podia.com/nutrition-perte-de-poid"
];

function fetchHTML(url) {
    return new Promise((resolve) => {
        https.get(url, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve(data));
        });
    });
}

(async () => {
    for (const url of urls) {
        const html = await fetchHTML(url);
        // Find title
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        let title = titleMatch ? titleMatch[1].replace(' par Péguy Casteloot', '') : '';

        // Find first price block: <span ...>xx €</span>
        const priceMatch = html.match(/>(\d+(?:[,.]\d{2})?)\s*€\s*</);
        let price = priceMatch ? priceMatch[1] : 'NA';

        console.log(`- ${title} : ${price} €`);
    }
})();
