# Fetch and Show Latest News Headlines

A production-level React application that scrapes and displays the latest headlines from BBC News. The scraper fetches headlines, handles pagination, and saves results to a CSV file with robust error handling and modern UI.

## Project Structure

- `scraper.js`: Node.js script to scrape BBC News headlines using Axios and Cheerio.
- `server.js`: Express server to provide API endpoints for the React app.
- `src/App.jsx`: React component to display headlines with loading states and error handling.
- `headlines.csv`: Output CSV file (generated after running the scraper).

## Libraries Used

All libraries are npm installable:

- **axios**: For making HTTP requests to fetch HTML content.
- **cheerio**: For parsing HTML and extracting data.
- **csv-writer**: For writing scraped data to CSV format.
- **express**: For creating the backend server.
- **cors**: For handling cross-origin requests in the server.
- **react**: For building the user interface.
- **react-dom**: For rendering React components.
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
This will fetch headlines from up to 3 pages, display them in the console, and save to `headlines.csv`.

## Chosen News Site

- **BBC News** (`https://www.bbc.com/news`): Selected for its structured HTML. The scraper targets elements with classes like `gs-c-promo` for story containers, `gs-c-promo-heading` for headlines, and `gs-o-bullet__text` for dates. Handles pagination for multiple pages.

## Pagination Handling

The scraper supports fetching multiple pages (default: 3 pages) to gather more headlines efficiently.

## Output Format

- **Console Display**: Headlines are printed with date, URL, summary, and page number.
- **CSV Format**: `headline, date, URL, summary, page` (e.g., in `headlines.csv`).

## Production Features

- **Error Handling**: Robust try-catch blocks in scraper and frontend.
- **Loading States**: Visual feedback during fetches.
- **Environment Variables**: Configurable API URL via `.env`.
- **Responsive UI**: Modern card-based layout with hover effects.
- **Accessibility**: Proper semantic HTML and ARIA attributes.

## Notes

- Ensure the BBC News website structure hasn't changed, as scraping is dependent on HTML classes.
- The scraper does not use browser automation; it relies on HTTP requests and HTML parsing.
- For production, consider adding rate limiting, caching, and compliance with the site's robots.txt.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make changes and test.
4. Submit a pull request.

## License

This project is for educational purposes. Respect the terms of service of the scraped websites.
