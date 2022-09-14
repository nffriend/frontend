// 这些是用户会输入的URL格式
const urls = {
  twitter_profile: "https://twitter.com/${username}",
  twitter_tweet: "https://twitter.com/${username}/status/${tweetId}",
  tiktok_profile: "https://www.tiktok.com/@${username}",
  tiktok_video: "https://www.tiktok.com/@${username}/video/${videoId}",
  pinterest: "https://www.pinterest.com/${username}",
  vimeo: "https://vimeo.com/${videoId}",
  youtube: "https://www.youtube.com/watch?v=${videoId}",
  spotify: "https://open.spotify.com/track/${musicId}",
  twitch: "https://www.twitch.tv/${channelId}",
  kickstarter: "https://www.kickstarter.com/projects/${projectId}/${projectName}",
  opensea: "https://opensea.io/assets/${chainName}/${address}/${tokenId}",
  rss3: "https://rss.app/feed/${feedId}/embed",
  sky001: "https://sky001-1300260371.cos.ap-hongkong.myqcloud.com/game/index.html?roomId=${roomId}&wallet=${wallet}",
  nftworlds: "https://www.nftworlds.com/${worldId}",
  shil: "https://shil.me/${username}",
  voxels: "https://www.voxels.com/play?coords=${coords}",
  google_doc: "https://docs.google.com/presentation/d/e/${id}/pub?start=${start}&loop=${loop}&delayms=${delayms}"
};

export default urls;

{
  /**1.twitter 用户*/
}
{
  /** https://twitter.com/opensea **/
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://twitter.com/opensea"
      srcDoc="<a class='twitter-timeline' href=' '>Tweets by opensea</ a>
<script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>"
    ></iframe> */
}

{
  /**2.twitter 推文*/
}
{
  /** https://twitter.com/opensea/status/1554218430592479232 **/
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://twitter.com/opensea/status/1554218430592479232"
      srcDoc="<blockquote class='twitter-tweet'>&amp;mdash; OpenSea < a href='https://twitter.com/opensea/status/1554218430592479232?ref_src=twsrc%5Etfw'>(@opensea)</ a></blockquote><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>"
    ></iframe> */
}

{
  /**3.tiktok 视频*/
}
{
  /** https://www.tiktok.com/@moena315/video/7128687769613847810 **/
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://www.tiktok.com/@moena315/video/7128687769613847810"
      srcDoc="<blockquote class='tiktok-embed' cite='https://www.tiktok.com/@moena315/video/7128687769613847810' data-video-id='7128687769613847810' style='max-width: 605px;min-width: 325px;'><section> <a target='_blank' title='@moena315' href='https://www.tiktok.com/@moena315'>@moena315</ a></section></blockquote>
      <script async src='https://www.tiktok.com/embed.js'></script>"
    ></iframe> */
}

{
  /**4.tiktok 个人页面*/
}
{
  /** https://www.tiktok.com/@moena315 **/
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: '500px' }}
      data-tweet-url="https://www.tiktok.com/@moena315"
      srcDoc="<blockquote class='tiktok-embed' cite='https://www.tiktok.com/@moena315' data-unique-id='moena315'  data-embed-type='creator' style='max-width: 750px; min-width: 250px;'<section> <a target='_blank' href='https://www.tiktok.com/@moena315?refer=creator_embed'>@moena315</ a> </section></blockquote> <script async src='https://www.tiktok.com/embed.js'></script>"
    ></iframe> */
}

{
  /**5.pinterest 个人页面*/
}
{
  /** https://www.pinterest.com/whats_paper **/
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://twitter.com/opensea"
      srcDoc="<a data-pin-do='embedUser' data-pin-board-width='1200' data-pin-scale-height='300' data-pin-scale-width='80' href='https://www.pinterest.com/whats_paper/'></ a><script async defer src='//assets.pinterest.com/js/pinit.js'></script>"
    ></iframe> */
}

{
  /**6.vimeo 视频*/
}
{
  /** 视频链接:https://vimeo.com/733991527;
   * GET请求https://vimeo.com/api/oembed.json?url={video_url}获取视频信息
   * **/
}
{
  /* <iframe
      src="https://player.vimeo.com/video/733991527?h=20d386e47b app_id=122963"
      style={{ border: "none", width: "100%", height: 350 }}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      title="">
      </iframe> */
}

{
  /**7.youtube 视频*/
}
{
  /** https://www.youtube.com/watch?v=2rye4u-cCNk **/
}
{
  /* <iframe
      style={{ border: "none", width: "50%", height: 350 }}
     src="https://www.youtube.com/embed/2rye4u-cCNk"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */
}

{
  /**8.spotify 音乐*/
}
{
  /* https://open.spotify.com/track/2UscVwaSo0fbaX5QxVgqH8?si=c7945a49e4f44e4d */
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
     src="https://open.spotify.com/embed/track/${musicId}?utm_source=generator"
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */
}

{
  /**9.gleam 失败, 系统限制只能linktree */
}
{
  /* <iframe
      id="GleamEmbedy7dSm"
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://gleam.io/y7dSm/nff-prea-entry-nft-usdt-raffle"
      srcDoc="<a class='e-widget no-button' href='https://gleam.io/y7dSm/nff-prea-entry-nft-usdt-raffle'>Powered by Gleam</ a><script async src='https://js.gleam.io/e.js' charset='utf-8' type='text/javascript'></script>"
    ></iframe> */
}

{
  /**10.twitch 直播 */
}
{
  /** https://www.twitch.tv/bananaoflegend **/
}
{
  /* <iframe
      src="https://player.twitch.tv?channel=bananaoflegend&parent=localhost&referrer=about:srcdoc"
      style={{ border: "none", width: 620, height: 380 }}
      allowFullScreen
      scrolling="no"
    >
    </iframe> */
}

{
  /**11.kickstarter 众筹 */
}
{
  /** https://www.kickstarter.com/projects/101354195/brooklyn-labyrinth-returns-this-fall-to-the-chain **/
}
{
  /** 读取了cookie, 需要用户开启浏览器设置允许 **/
}
{
  /* <iframe
    src="https://www.kickstarter.com/projects/101354195/brooklyn-labyrinth-returns-this-fall-to-the-chain/widget/video.html"
    style={{ border: "none", width: '100%', height: 380 }}
    scrolling="no"
    ></iframe> */
}

{
  /**12.shopify 商品售卖 ??? */
}

{
  /** 13. uniswap **/
}
{
  /** 读取了cookie, 需要用户开启浏览器设置允许 **/
}
{
  /* <iframe
      src="https://app.uniswap.org/"
      height="660px"
      width="100%"
      style={{border: 0,
        margin: '0 auto',
        display: 'block',
        borderRadius: 10,
        maxWidth: 600,
        minWidth: 300}}
    /> */
}

{
  /** 14.web3 小组件 */
}
{
  /** https://www.coingecko.com/en/widgets **/
}
{
  /* <iframe
      style={{ border: "none", width: '100%', height: 450 }}
      data-tweet-url="https://www.coingecko.com/en/widgets/coin_heatmap_widget"
      srcDoc="<script src='https://widgets.coingecko.com/coingecko-coin-heatmap-widget.js'></script><coingecko-coin-heatmap-widget  height='500' locale='en'></coingecko-coin-heatmap-widget>"
    ></iframe> */
}

{
  /** 15.CMC */
}
{
  /** https://coinmarketcap.com/zh/widget/price-marquee/ */
}
{
  /* <iframe
      style={{ border: "none", width: '100%', height: 350 }}
      data-tweet-url="https://coinmarketcap.com/zh/widget/price-marquee/"
      srcDoc="<script type='text/javascript' src='https://files.coinmarketcap.com/static/widget/coinMarquee.js'></script><div id='coinmarketcap-widget-marquee' coins='1,1027,1839,4195,3897' currency='USD' theme='light' transparent='false' show-symbol-logo='true'></div>"
    ></iframe> */
}

{
  /** 16.opensea Single NFTs */
}
{
  /** https://opensea.io/assets/ethereum/0x1301566b3cb584e550a02d09562041ddc4989b91/28 */
}
{
  /* <iframe
      style={{ border: "none", width: '100%', height: 350, transform: 'scale(1.5)', marginTop: 80 }}
      data-tweet-url="https://opensea.io/assets/ethereum/0x1301566b3cb584e550a02d09562041ddc4989b91/28"
      srcDoc="<nft-card
      contractAddress='0x1301566b3cb584e550a02d09562041ddc4989b91'
      tokenId='28'>
      </nft-card>
      <script src='https://unpkg.com/embeddable-nfts/dist/nft-card.min.js'></script>"
    /> */
}

{
  /** 17.opensea collection NFTs  失败, X-Frame-Options deny*/
}
{
  /** https://opensea.io/collection/best-creature */
}
{
  /* <iframe src='https://opensea.io/collection/best-creature?embed=true'
      width='100%'
      height='100%'
      frameBorder='0'
      allowFullScreen/> */
}

{
  /** 18.cryptohopper */
}
{
  /** https://www.cryptohopper.com/website-widgets **/
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://www.cryptohopper.com/website-widgets"
      srcDoc="<div class='cryptohopper-web-widget' data-id='5' data-news_count='5'></div><script src='https://www.cryptohopper.com/widgets/js/script'></script>"
    /> */
}

{
  /** 19.rss3 */
}
{
  /** https://rss.app/feed/tUGNP9ZH7RTVRH0s/embed?tab=wall **/
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://rss.app/feed/tUGNP9ZH7RTVRH0s/embed?tab=list"
      srcDoc="<rssapp-list id='tUGNP9ZH7RTVRH0s'></rssapp-list><script src='https://widget.rss.app/v1/list.js' type='text/javascript' async></script>"
    /> */
}

{
  /** 20.cryptorank */
}
{
  /** https://cryptorank.io/widgets/marquee **/
}
<iframe
  style={{ border: "none", width: "100%", height: 350 }}
  data-tweet-url="https://cryptorank.io/ieo-platforms-roi"
  srcDoc="<div class='cr-widget' data-api-url: https://api.cryptorank.io data-site-url: https://cryptorank.io
      data-currency='USD' data-type='all' data-roi='both' data-sort='ROI' style='width: 100%; height: 750px;'><a target='_blank' rel='noopener' href='https://cryptorank.io/ieo-platforms-roi'>IEO Returns by Cryptorank</ a></div><script src='https://cryptorank.io/widget/ieo-roi.js'></script>"
/>;

{
  /** 21.cointelegraph 接入失败 */
}
{
  /** https://cointelegraph.com/widgets **/
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://cointelegraph.com/news-widget"
      srcDoc="<div class='ct-widget-container'/><script async src='https://cointelegraph.com/news-widget' data-ct-widget-limit='10' data-ct-widget-theme='light' data-ct-widget-size='medium' data-ct-widget-language='en'></script>"
    /> */
}

{
  /** 22.medium失败 */
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://sabesan96.medium.com/"
      srcDoc="<div id='retainable-rss-embed'
      data-rss='https://medium.com/feed/@sabesan96'
      data-maxcols='3'
      data-layout='grid'
      data-poststyle='inline'
      data-readmore='Read the rest'
      data-buttonclass='btn btn-primary'
      data-offset='-100'></div><script src='https://www.retainable.io/assets/retainable/rss-embed/retainable-rss-embed.js'></script>"
    /> */
}
{
  /* <iframe
      style={{ border: "none", width: "100%", height: 350 }}
      data-tweet-url="https://medium.datadriveninvestor.com/embed-medium-as-a-blog-on-your-site-54a1b49cbe16"
      srcDoc="<script async src='https://static.medium.com/embed.js'></script><a class='m-story' href='https://medium.datadriveninvestor.com/embed-medium-as-a-blog-on-your-site-54a1b49cbe16'>Medium</ a>"
    /> */
}

{
  /** 23. 我的大楼 */
}
{
  /** https://sky001-1300260371.cos.ap-hongkong.myqcloud.com/game/index.html?roomId=83&wallet=0x4efae248067e7bee1c66113632ec01d08deeecd5&owned=0&owner=0xc2f1bcc16bf17a4261cebbba7cc0a60eed4d76e3&layout=10015&sign=0xad50778147c7036dfe27b5a4438df8b0490a26c8caab6315807f4774b169ccca25df7abf2794c2d7a5be598f8460bb1a097abd310c2186a9373a5bd66ebdb8aa1c */
}

{
  /* <iframe src='https://sky001-1300260371.cos.ap-hongkong.myqcloud.com/game/index.html?roomId=83&wallet=0x4efae248067e7bee1c66113632ec01d08deeecd5&owned=0&owner=0xc2f1bcc16bf17a4261cebbba7cc0a60eed4d76e3&layout=10015&sign=0xad50778147c7036dfe27b5a4438df8b0490a26c8caab6315807f4774b169ccca25df7abf2794c2d7a5be598f8460bb1a097abd310c2186a9373a5bd66ebdb8aa1c'
      width='100%'
      height='100%'
      frameBorder='0'
      allowFullScreen/> */
}

{
  /** 24. nftworlds */
}
{
  /** https://www.nftworlds.com/6698 **/
}
{
  /* <iframe src='https://www.nftworlds.com/6698'
      width='100%'
      height='100%'
      frameBorder='0'
      allowFullScreen/> */
}

{
  /** 25. instagram 失败*/
}

{
  /** 26. raritysniper */
}
{
  /* <iframe src='https://raritysniper.com/nft-drops-calendar'
      style={{ border: 'none', width: 1520, height: 600, position: 'absolute', left: -300, top: -250, bottom: -180 }}
      allowFullScreen/> */
}

{
  /** 27. voxels */
}
{
  /** https://www.voxels.com/play?coords=NE@8E,16N,3.5U 需要在线测试*/
}
{
  /* <iframe
      src="https://www.voxels.com/play?coords=E@842E,215S,3.5U"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      data-v-2b90988e=""
      style={{ border: "none", width: "100%", height: 350 }}
      /> */
}

{
  /** 28. shil */
}
{
  /* <iframe
      src="https://shil.me/BeardedDonut"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      style={{ border: 'none', width: 1400, height: 800, position: 'absolute', left: -100, top: -400}}
      /> */
}
