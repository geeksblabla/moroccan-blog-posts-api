const Parser = require("rss-parser");

const parser = new Parser();

// initial  data state
// use Global vars will help cache the result in the netlify function
const data = {
  total_count: 0,
  lastUpdate: new Date(),
  posts: [],
};

exports.handler = async function (event) {
  if (!process.env.RSS_URL) {
    const msg = `
    RSS URL  missing.
    `;
    console.error(msg);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg }),
    };
  }

  const limit = parseInt(event.queryStringParameters.limit || 20);
  const offset = parseInt(event.queryStringParameters.offset || 0);
  const currentTime = new Date();
  const diff = currentTime - data.lastUpdate;
  const reFetch = data.posts.length === 0 || diff > 86400; // fetch RSS only if data is empty or last fetch is More than one day

  try {
    if (reFetch) {
      const p = await getPosts();
      data.lastUpdate = currentTime;
      data.total_count = p.length;
      data.posts = p;
    }
    const posts = data.posts.slice(offset, offset + limit);

    return {
      statusCode: 200,
      body: JSON.stringify({ ...data, posts }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};

const getPosts = async () => {
  const feed = await parser.parseURL(RSS_URL);
  return feed.items.map(normalizePost);
};

const normalizePost = (post) => {
  const title = post.title;
  const creator =
    post.creator ||
    post.link.replace(/(https?:\/\/)?(www.)?/i, "").split("/")[0];
  const date = new Intl.DateTimeFormat("en-US").format(new Date(post.pubDate));
  const link = post.link || "#";
  return { title, creator, date, link };
};
