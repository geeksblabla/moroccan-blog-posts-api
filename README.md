## Moroccan Blogs API

A Simple API to collect Blog Posts from moroccan developers Community.

> This Project is based on blogs RSS feeds.

> we are combining RSS feeds from [`awesome-morocco blogs section`](https://github.com/DevC-Casa/awesome-morocco#blogs)

> To add your posts, Make sure to add your Blog to [`awesome-morocco`](https://github.com/DevC-Casa/awesome-morocco) blogs with a valid RSS feed.

## Demo

=>

## Get Started

Get Latest Blog Posts

```js
try {
  const data = await fetch(RSS_URL);
  const feed = await data.json();
} catch (error) {
  console.log(error);
}
```

Result :

```json
{
  "total_count": 120,
  "lastUpdate": "2020-07-14T22:47:02.713Z",
  "posts": [
    {
      "title": "The green presence dot",
      "creator": "Ahmed",
      "date": "6/29/2020",
      "link": "https://elazzabi.com/2020/06/29/,the-green-presence-dot/"
    }
  ]
}
```

`total_count` : Total number of blog posts we have in the database (not really)

`lastUpdate` : Last time we fetched RSS feeds

- The API will return the latest 20 posts by default.
- You can use `offset` and `limit` to fetch more

```js
const data = await fetch(`${RSS_URL}?offset=10&limit=20`);
```
