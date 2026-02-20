import { parseRSS } from './server/rssParser.js';

async function test() {
    try {
        const res = await parseRSS('https://letterboxd.com/auswoo/rss/');
        console.log(`Successfully parsed ${res.movies.length} movies.`);
    } catch (err) {
        console.error('ERROR!', err);
    }
}

test();
