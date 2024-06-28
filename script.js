async function fetchNews() {
    const query = document.getElementById('category').value;
    const country = document.getElementById('country').value;
    const apiKey = '125e5c920909476fbe320bf67776b0cd'; // Replace with your news API key
    const url = `https://newsapi.org/v2/top-headlines?q=${query}&country=${country}&apiKey=${apiKey}`;

    console.log('Fetching news for query:', query);
    console.log('URL:', url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Data fetched:', data);
        displayNews(data.articles);
    } 
    catch (error) {
        console.error('Error:', error);
        displayError('An error occurred while fetching the news.');
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = '';
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news found.</p>';
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

function displayError(message) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = `<p>${message}</p>`;
}
