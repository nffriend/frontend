const api = {
    // chain
    timeLine: '/public/chain/timeline', // 获取链上最近交易记录
    myActivity: '/public/chain/statistics', // 按年，月 统计链上交易记录
    myNft: '/public/chain/mynft', // 我的nft
    balance: '/public/chain/balance', // 余额
    actives: '/public/chain/recently_actives', // 最近交互合约

    // account
    login: '/public/account/login', // 用户登录，换取token
    getUserInfoPublic: '/public/account/info', // get 只需要account 获取用户信息
    getUserInfo: '/account/info', // get 获取用户信息 需要token
    setUserInfo: '/account/info', // post 设置用户信息 需要token
    postInvitationCode: '/account/set_invitation_code', // 提交邀请码
    postInvitationAddress: '/account/set_invitation_address', // 提交邀请码地址
    getInvitationCodes: '/account/invitation_codes', // 获取我的邀请码
    getAddressMenu: '/public/aduser', // 获取左侧边栏推广用户地址
    getInvitedUsers: '/account/invited_users', // 获取被我邀请的用户

    // relation
    getFollowers: '/public/relation/followers', // 获取粉丝列表
    getFollowing: '/public/relation/following', // 获取关注列表
    relation: '/relation/relation', // 查询当前用户与指定account的关系，是否是已关注
    postFollow: '/relation/follow', // 关注某人
    postUnfollow: '/relation/unfollow', // 取消关注某人

    // visitor
    getVisitors: '/public/visitor/visitors', // 获取最近访问者列表
    getRespondents: '/public/visitor/respondents', // 获取最近访问过哪些人

    // kv
    getKv: '/public/kv', // 读取配置
    postKv: '/kv', // 保存配置
    delKv: '/kv', // 删除配置

    // LivePhoto
    getPhotos: '/public/live_photo_v2/photos',
    postPhotos: '/live_photo_v2/photos',
    deletePhotos: '/live_photo/photo',

    // MessageBoard
    getMessages: '/public/message_board/messages', // 读取message
    postMessages: '/message_board/message', // 留言
    deleteMessage: '/message_board/message', // 删除留言
    

    //积分
    getScore: '/public/pass_point/points', // 获取积分
    postScore: '/pass_point/point', // 收取积分

    // HeadFigure
    getFigure: '/public/head_figure/figure', // 获取my nft
    postFigure: '/head_figure/figure', // 设置nft
    deleteFigure: '/head_figure/figure', // 删除nft

    // my collection
    getCollections: '/public/my_collection/collections', // 读取collection
    postCollections: '/my_collection/collections', // 保存collection

    // AnimationPhoto
    getAniPhotos: '/public/animation_photo/photos',
    postAniPhotos: '/animation_photo/photo',
    deleteAniPhotos: '/animation_photo/photo',

    // Statistics
    getStatistics: '/public/statistics/platform_statistics',

    // Explorer
    getTopVisitors: '/public/explore/top_visitors', // 热门空间
    getLatest: '/public/explore/latest', // 最新空间
    getRandomSpace: '/public/explore/random', // 随机

    //iframe
    widgets: '/public/widgets',
    hot_widgets: '/public/hot_widgets'

}

export default api;