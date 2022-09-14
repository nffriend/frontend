interface Props {
  params: string[];
  url: string;
  srcDoc?: string;
  css?: string;
  cookie?: boolean;
}
const iframeConfig = {
  twitter_profile: {
    params: ['username'],
    url: "https://twitter.com/${username}",
    srcDoc: "<a class='twitter-timeline' href='https://twitter.com/${username}?ref_src=twsrc%5Etfw'>Tweets by ${username}</a><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>"
  },
  twitter_tweet: {
    params: ['username', 'tweetId'],
    url: "https://twitter.com/${username}/status/${tweetId}",
    srcDoc: "<blockquote class='twitter-tweet'>&amp;mdash; ${username} <a href='https://twitter.com/${username}/status/${tweetId}?ref_src=twsrc%5Etfw'>(@${username})</a></blockquote><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>"
  },
  tiktok_profile: {
    params: ['username'],
    url: "https://www.tiktok.com/@${username}",
    srcDoc: "<blockquote class='tiktok-embed' cite='https://www.tiktok.com/${username}' data-unique-id='${username}'  data-embed-type='creator' style='max-width: 750px; min-width: 250px;'<section> <a target='_blank' href='https://www.tiktok.com/@${username}?refer=creator_embed'>@${username}</a> </section></blockquote> <script async src='https://www.tiktok.com/embed.js'></script>"
  },
  tiktok_video: {
    params: ['username', 'videoId'],
    url: "https://www.tiktok.com/@${username}/video/${videoId}",
    srcDoc: "<blockquote class='tiktok-embed' cite='https://www.tiktok.com/@${username}/video/${videoId}' data-video-id='${videoId}' style='max-width: 605px;min-width: 250px;'><section> <a target='_blank' title='@${username}' href='https://www.tiktok.com/@${username}'>@${username}</a></section></blockquote><script async src='https://www.tiktok.com/embed.js'></script>"
  },
  pinterest: {
    params: ['username', 'width', 'height'],
    url: "https://www.pinterest.com/${username}",
    srcDoc: "<a data-pin-do='embedUser' data-pin-board-width='${width}' data-pin-scale-height='${height}' data-pin-scale-width='80' href='https://www.pinterest.com/${username}/'></a><script async defer src='//assets.pinterest.com/js/pinit.js'></script>",
  },
  vimeo: {
    params: ['videoId', 'h', 'app_id'],
    url: "https://player.vimeo.com/video/${videoId}?h=${h} app_id=${app_id}",
  },
  youtube: {
    params: ['videoId'],
    url: "https://www.youtube.com/embed/${videoId}",
  },
  spotify: {
    params: ['musicId'],
    url: "https://open.spotify.com/embed/track/${musicId}?utm_source=generator",
  },
  twitch: {
    params: ['channelId'],
    url: "https://player.twitch.tv/?channel=${channelId}&parent=nffriend.com&referrer=about:srcdoc",
  },
  kickstarter: {
    params: ['projectId', 'projectName'],
    cookie: true,
    url: "https://www.kickstarter.com/projects/${projectId}/${projectName}/widget/video.html",
  },
  uniswap: {
    params: [],
    cookie: true,
    url: "https://app.uniswap.org/",
  },
  opensea: {
    params: ["chainName", "address", "tokenId"],
    url: "https://opensea.io/assets/${chainName}/${address}/${tokenId}",
    srcDoc: "<nft-card contractAddress='${address}' tokenId='${tokenId}'></nft-card><script src='https://unpkg.com/embeddable-nfts/dist/nft-card.min.js'></script>",
  },
  rss3: {
    params: ["feedId"],
    url: "https://rss3.app/feed/${feedId}",
    srcDoc: "<rssapp-list id='${feedId}'></rssapp-list><script src='https://widget.rss.app/v1/list.js' type='text/javascript' async></script>",
  },
  myqcloud: {
    params: ["roomId", "wallet"],
    url: "https://sky001-1300260371.cos.ap-hongkong.myqcloud.com/game/index.html?roomId=83&wallet=0x4efae248067e7bee1c66113632ec01d08deeecd5&owned=0&owner=0xc2f1bcc16bf17a4261cebbba7cc0a60eed4d76e3&layout=10015&sign=0xad50778147c7036dfe27b5a4438df8b0490a26c8caab6315807f4774b169ccca25df7abf2794c2d7a5be598f8460bb1a097abd310c2186a9373a5bd66ebdb8aa1c",
  },
  nftworlds: {
    params: ["worldId"],
    url: "https://www.nftworlds.com/${worldId}",
  },
  raritysniper: {
    params: [],
    url: "https://raritysniper.com/nft-drops-calendar",
    css: "border: 'none'; width: '1520px'; height: '600px'; position: 'absolute'; left: '-300px'; top: '-250px', bottom: '-180px';"
  },
  shil: {
    params: ["username"],
    url: "https://shil.me/${username}",
    css: "border: 'none'; width: '1400px'; height: '800px'; position: 'absolute'; left: '-100px'; top: '-400px';"
  },
  voxels: {
    params: ["coords"],
    url: "https://voxels.io/play?coords=${coords}",
  },
  CMC_marquee: {
    params: [],
    url: "https://coinmarketcap.com/zh/widget/price-marquee/",
    srcDoc: "<script type='text/javascript' src='https://files.coinmarketcap.com/static/widget/coinMarquee.js'></script><div id='coinmarketcap-widget-marquee' coins='1,1027,1839,4195,3897' currency='USD' theme='light' transparent='false' show-symbol-logo='true'></div>"
  },
  CH_news: {
    params: [],
    url: "https://www.cryptohopper.com/website-widgets",
    srcDoc: "<div class='cryptohopper-web-widget' data-id='5' data-news_count='5'></div><script src='https://www.cryptohopper.com/widgets/js/script'></script>"
  },
  CG_heatmap: {
    params: [],
    url: "https://www.coingecko.com/en/widgets/coin_heatmap_widget",
    srcDoc: "<script src='https://widgets.coingecko.com/coingecko-coin-heatmap-widget.js'></script><coingecko-coin-heatmap-widget  height='500' locale='en'></coingecko-coin-heatmap-widget>"
  },
  CR_chart: {
    params: [],
    url: "https://cryptorank.io/widgets/ieo-roi",
    srcDoc: "<div class='cr-widget' data-api-url: https://api.cryptorank.io data-site-url: https://cryptorank.io data-currency='USD' data-type='all' data-roi='both' data-sort='ROI' style='width: 100%; height: 750px;'><a target='_blank' rel='noopener' href='https://cryptorank.io/ieo-platforms-roi'>IEO Returns by Cryptorank</a></div><script src='https://cryptorank.io/widget/ieo-roi.js'></script>"
  }
}

export default iframeConfig;