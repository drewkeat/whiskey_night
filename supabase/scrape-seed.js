import axios from "axios";

const initialURLs = [
  "https://distiller.com/spirits/michter-s-20-year-kentucky-straight-bourbon-2021-release",
  "https://distiller.com/spirits/teeling-single-grain-whiskey"
];

const runScrape = async (url) => {
  const data = JSON.stringify({
    url: url
  });

  try {
    const res = await axios.post('http://127.0.0.1:54321/functions/v1/scrape-whiskey', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SERVICE_ROLE}`
      }
    });
    
    // Handle the response as needed
    console.log('Response:', res.data);
  } catch (error) {
    console.error('Error during scraping:', error.message);
  }
};

initialURLs.forEach(url => runScrape(url));
