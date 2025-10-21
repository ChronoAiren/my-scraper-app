# Fetch and Show Latest News Headlines

A React application that scrapes and displays the latest headlines from BBC News. The scraper fetches headlines, handles pagination (for future expansion), and saves results to a CSV file.

## Project Structure

- `scraper.js`: Node.js script to scrape BBC News headlines using Axios and Cheerio.
- `server.js`: Express server to provide API endpoints for the React app.
- `src/App.jsx`: React component to display headlines.
- `headlines.csv`: Output CSV file (generated after running the scraper).

## Libraries Used

All libraries are npm installable:

- **axios**: For making HTTP requests to fetch HTML content.
- **cheerio**: For parsing HTML and extracting data.
- **csv-writer**: For writing scraped data to CSV format.
- **express**: For creating the backend server.
- **cors**: For handling cross-origin requests in the server.
- **react**: For building the user interface.
- **vite**: For development server and build tool.

## Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory:
   ```
   cd my-scraper-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Project

1. **Start the backend server** (provides API for headlines):
   ```
   npm run server
   ```
   The server will run on `http://localhost:3001`.

2. **Start the React development server** in a new terminal:
   ```
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

3. **Fetch headlines**: Click the "Fetch Headlines" button in the React app to retrieve and display the latest headlines.

## Running the Scraper Directly

To run the scraper as a standalone script and save to CSV:
```
npm run scrape
```
This will fetch headlines, display them in the console, and save to `headlines.csv`.

## Chosen News Site

- **BBC News** (`https://www.bbc.com/news`): Selected for its structured HTML and reliable content. The scraper targets elements with classes like `gs-c-promo` for story containers, `gs-c-promo-heading` for headlines, and `gs-o-bullet__text` for dates.

## Pagination Handling

Currently, the scraper fetches from the main page. For pagination, modify the `scrapeBBCNews` function to loop over pages (e.g., `/news/2`, `/news/3`) and combine results.

## Output Format

- **Console Display**: Headlines are printed with date, URL, and summary.
- **CSV Format**: `headline, date, URL, summary` (e.g., in `headlines.csv`).

## Notes

- Ensure the BBC News website structure hasn't changed, as scraping is dependent on HTML classes.
- The scraper does not use browser automation; it relies on HTTP requests and HTML parsing.
- For production, consider adding error handling, rate limiting, and compliance with the site's robots.txt.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make changes and test.
4. Submit a pull request.

## License

This project is for educational purposes. Respect the terms of service of the scraped websites.
