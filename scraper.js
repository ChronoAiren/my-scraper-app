import axios from 'axios';
import * as cheerio from 'cheerio';
import { createObjectCsvWriter } from 'csv-writer';

// Function to scrape BBC News headlines
export async function scrapeBBCNews() {
  const url = 'https://www.bbc.com/news';
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const headlines = [];

    // Select each story container
    $('.gs-c-promo').each((index, element) => {
      const story = $(element);

      // Get the headline
      const headlineElement = story.find('a.gs-c-promo-heading h3');
      const headline = headlineElement.text().trim();

      // Get the URL
      const url = story.find('a.gs-c-promo-heading').attr('href');
      const fullUrl = url ? `https://www.bbc.com${url}` : '';

      // Get the summary
      const summary = story.find('p.gs-c-promo-summary').text().trim();

      // Get the date
      const date = story.find('time.gs-o-bullet__text').text().trim();

      if (headline) {
        headlines.push({
          headline,
          url: fullUrl,
          summary,
          date
        });
      }
    });

    return headlines;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    throw error;
  }
}

// Run the scraper if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeBBCNews().then(headlines => {
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
        { id: 'summary', title: 'Summary' }
      ]
    });

    csvWriter.writeRecords(headlines).then(() => {
      console.log('Headlines saved to headlines.csv');
    });
  });
}
