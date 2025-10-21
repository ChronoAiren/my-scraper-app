# Fetch and Show Latest News Headlines

A production-level React application that scrapes and displays the latest headlines from any news website. Users can input a custom URL (BBC as default) and specify the number of pages to scrape, with robust error handling and modern UI.

## Project Structure

- `scraper.js`: Node.js script to scrape news headlines using Axios and Cheerio.
- `server.js`: Express server to provide API endpoints for the React app.
- `src/App.jsx`: React component to display headlines with loading states, error handling, and user inputs.
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

3. **Fetch headlines**: Enter a news site URL (default: BBC News), specify pages, and click "Fetch Headlines".

## Running the Scraper Directly

To run the scraper as a standalone script and save to CSV:
```
npm run scrape
```
This will fetch headlines from the default site (BBC) for 3 pages.

## Custom Scraping

- **Default Site**: BBC News (`https://www.bbc.com/news`).
- **User Input**: Enter any news site URL in the app. Note: The scraper is optimized for BBC's HTML structure; other sites may require code adjustments for accurate extraction.
- **Pagination**: Specify the number of pages to scrape (default: 1).

## Output Format

- **Console Display**: Headlines are printed with date, URL, summary, and page number.
- **CSV Format**: `headline, date, URL, summary, page` (e.g., in `headlines.csv`).

## Production Features

- **Error Handling**: Robust try-catch blocks in scraper and frontend.
- **Loading States**: Visual feedback during fetches.
- **Environment Variables**: Configurable API URL via `.env`.
- **Responsive UI**: Modern card-based layout with hover effects.
- **Accessibility**: Proper semantic HTML and ARIA attributes.
- **Flexibility**: User can input custom URLs for different news sites.

## Notes

- The scraper is designed for BBC News but allows custom URLs. For other sites, HTML selectors may need updating in `scraper.js`.
- Ensure the target website allows scraping and complies with robots.txt.
- The scraper does not use browser automation; it relies on HTTP requests and HTML parsing.
- For production, consider adding rate limiting, caching, and compliance with site terms.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make changes and test.
4. Submit a pull request.

## License

This project is for educational purposes. Respect the terms of service of the scraped websites.
