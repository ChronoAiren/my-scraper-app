import axios from 'axios';
import * as cheerio from 'cheerio';
import { createObjectCsvWriter } from 'csv-writer';

// Function to scrape news headlines from a given URL
export async function scrapeBBCNews(pages = 1, baseUrl = 'https://www.bbc.com/news') {
  const headlines = [];
  for (let page = 1; page <= pages; page++) {
    const url = page === 1 ? baseUrl : `${baseUrl}/${page}`;
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // Updated selectors for current BBC News structure
      $('.nw-c-promo').each((index, element) => {
        const story = $(element);

        // Get the headline
        const headlineElement = story.find('h3');
        const headline = headlineElement.text().trim();

        // Get the URL
        const relativeUrl = story.find('a.nw-o-link-split__anchor').attr('href');
        const fullUrl = relativeUrl ? `${baseUrl}${relativeUrl}` : '';

        // Get the summary
        const summary = story.find('p.nw-c-promo-summary').text().trim();

        // Get the date
        const date = story.find('time.nw-c-timestamp').text().trim();

        if (headline) {
          headlines.push({
            headline,
            url: fullUrl,
            summary,
            date,
            page
          });
        }
      });
    } catch (error) {
      console.error(`Error fetching page ${page} from ${baseUrl}:`, error);
      // Continue to next page if one fails
    }
  }
  return headlines;
}

// Run the scraper if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeBBCNews(3).then(headlines => {
    console.log('Fetched Headlines:');
    headlines.forEach((item, index) => {
      console.log(`${index + 1}. ${item.headline}`);
      console.log(`   Date: ${item.date}`);
      console.log(`   URL: ${item.url}`);
      console.log(`   Summary: ${item.summary}`);
      console.log('');
    });

    // Save to CSV
    const csvWriter = createObjectCsvWriter({
      path: 'headlines.csv',
      header: [
        { id: 'headline', title: 'Headline' },
        { id: 'date', title: 'Date' },
        { id: 'url', title: 'URL' },
        { id: 'summary', title: 'Summary' },
        { id: 'page', title: 'Page' }
      ]
    });

    csvWriter.writeRecords(headlines).then(() => {
      console.log('Headlines saved to headlines.csv');
    });
  });
}
