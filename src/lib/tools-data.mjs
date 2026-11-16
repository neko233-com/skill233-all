/**
 * tools-data.mjs — curated SOFTWARE TOOL links for non-programmers.
 *
 * Single source of truth for the "实用软件" chapter. Every link is hand-picked.
 * Fields: name, desc, url, cat, sub, platforms[], license, tags[], repo?, docs?, alts[]
 *   docs — where to read the official docs / tutorial / help center
 *   alts — names of alternative tools (resolved to links at build time)
 *
 * Platform codes: Windows / macOS / Linux / iOS / Android / Web / Extension
 * License values: 开源免费 | 免费 | 免费增值 | 付费
 */
export const PLATFORM_LABELS = {
  Windows: 'Windows', macOS: 'macOS', Linux: 'Linux',
  iOS: 'iOS', Android: 'Android', Web: 'Web', Extension: '浏览器扩展',
};

/** Search aliases so "电脑/手机/插件" find the right tools. */
export const PLATFORM_ALIASES = {
  Windows: ['电脑', 'PC'], macOS: ['苹果电脑', 'Mac'], Linux: ['Linux'],
  iOS: ['苹果手机', 'iPhone', 'iPad'], Android: ['安卓'],
  Web: ['网页', '在线'], Extension: ['插件', '扩展'],
};

// name, desc, url, cat, sub, platforms, license, tags, repo, docs, alts
const T = (name, desc, url, cat, sub, platforms, license, tags = [], repo = '', docs = '', alts = []) =>
  ({ name, desc, url, cat, sub, platforms, license, tags, repo, docs, alts });

export const TOOLS = [
  /* ============================ 网络代理 ================================ */
  // 桌面客户端
  T('Clash Verge Rev', '最流行的 Clash 图形客户端（Verge 续作），规则分流、订阅管理、TUN 模式开箱即用。', 'https://github.com/clash-verge-rev/clash-verge-rev', 'tool-net', 'net-desktop', ['Windows', 'macOS', 'Linux'], '开源免费', ['Clash', 'Mihomo', 'TUN'], 'clash-verge-rev/clash-verge-rev', 'https://clash-verge-rev.github.io/', ['Mihomo Party', 'Clash Nyanpasu', 'NekoRay', 'v2rayN']),
  T('Mihomo Party', 'Mihomo 官方图形客户端，配置导入与节点管理简洁直观。', 'https://github.com/MetaCubeX/mihomo-party', 'tool-net', 'net-desktop', ['Windows', 'macOS', 'Linux'], '开源免费', ['Clash', '官方'], 'MetaCubeX/mihomo-party', 'https://github.com/MetaCubeX/mihomo-party#readme', ['Clash Verge Rev', 'Clash Nyanpasu', 'NekoRay']),
  T('NekoRay', '轻量多协议代理客户端，支持 Xray / sing-box 内核，适合新手。', 'https://github.com/MatsuriDayo/NekoRay', 'tool-net', 'net-desktop', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['Xray', '多协议'], 'MatsuriDayo/NekoRay', 'https://github.com/MatsuriDayo/NekoRay/wiki', ['v2rayN', 'Clash Verge Rev', 'NekoBox']),
  T('v2rayN', 'Windows 上老牌 Xray 图形客户端，协议支持全面、社区文档丰富。', 'https://github.com/2dust/v2rayN', 'tool-net', 'net-desktop', ['Windows'], '开源免费', ['Xray', '老牌'], '2dust/v2rayN', 'https://github.com/2dust/v2rayN/wiki', ['NekoRay', 'Clash Verge Rev', 'v2rayNG']),
  T('Clash Nyanpasu', '基于 Clash 内核的现代客户端，界面清爽、多语言支持。', 'https://github.com/Clash-Nyanpasu/clash-nyanpasu', 'tool-net', 'net-desktop', ['Windows', 'macOS', 'Linux'], '开源免费', ['Clash', '多语言'], 'Clash-Nyanpasu/clash-nyanpasu', 'https://clash-nyanpasu.github.io/', ['Clash Verge Rev', 'Mihomo Party']),
  T('NekoBox', 'NekoRay 作者的另一款多协议客户端，界面现代、移动端体验好。', 'https://github.com/MatsuriDayo/NekoBoxForAndroid', 'tool-net', 'net-desktop', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['Xray', 'sing-box'], 'MatsuriDayo/NekoBoxForAndroid', 'https://github.com/MatsuriDayo/NekoBoxForAndroid#readme', ['NekoRay', 'Clash Verge Rev']),
  // iOS
  T('Stash', 'iOS 上最受欢迎的 Clash 内核客户端，规则分流与 MITM 功能完整。', 'https://stash.ws/', 'tool-net', 'net-ios', ['iOS'], '付费', ['Clash', 'iOS 必备'], '', 'https://stash.ws/guide/', ['Shadowrocket', 'Surge']),
  T('Shadowrocket', 'iOS 经典规则代理工具（俗称小火箭），App Store 可直接购买。', 'https://apps.apple.com/cn/app/shadowrocket/id932747118', 'tool-net', 'net-ios', ['iOS'], '付费', ['规则代理', 'App Store'], '', 'https://apps.apple.com/cn/app/shadowrocket/id932747118', ['Stash', 'Surge']),
  T('Surge', 'iOS / macOS 专业网络工具，功能强大、稳定性高。', 'https://nssurge.com/', 'tool-net', 'net-ios', ['iOS', 'macOS'], '付费', ['专业', '规则引擎'], '', 'https://manual.nssurge.com/', ['Stash', 'Shadowrocket']),
  // Android
  T('Clash Meta for Android', 'Mihomo 内核的 Android 客户端，规则、TUN 与订阅管理齐全。', 'https://github.com/MetaCubeX/ClashAndroid', 'tool-net', 'net-android', ['Android'], '开源免费', ['Clash', 'Mihomo'], 'MetaCubeX/ClashAndroid', 'https://github.com/MetaCubeX/ClashAndroid/wiki', ['FlClash', 'Clash Verge Rev', 'NekoBox']),
  T('FlClash', '基于 Mihomo 的安卓客户端，Material You 设计、限速与场景模式实用。', 'https://github.com/chen08209/FlClash', 'tool-net', 'net-android', ['Android'], '开源免费', ['Mihomo', 'Material You'], 'chen08209/FlClash', 'https://github.com/chen08209/FlClash#readme', ['Clash Meta for Android', 'NekoBox']),
  T('v2rayNG', 'Android 上老牌 v2ray/Xray 客户端，协议全、资料多。', 'https://github.com/2dust/v2rayNG', 'tool-net', 'net-android', ['Android'], '开源免费', ['Xray', '老牌'], '2dust/v2rayNG', 'https://github.com/2dust/v2rayNG/wiki', ['NekoBox', 'Clash Meta for Android']),
  T('NekoBox Android', 'NekoBox 的安卓版，支持 Xray / sing-box / Trojan-Go 多内核。', 'https://github.com/MatsuriDayo/NekoBoxForAndroid', 'tool-net', 'net-android', ['Android'], '开源免费', ['Xray', 'sing-box'], 'MatsuriDayo/NekoBoxForAndroid', 'https://github.com/MatsuriDayo/NekoBoxForAndroid#readme', ['v2rayNG', 'Clash Meta for Android']),
  // 跨平台核心
  T('Mihomo (Clash Meta)', 'Clash Meta 内核，支持更多协议与 TUN，是众多客户端的底层。', 'https://github.com/MetaCubeX/mihomo', 'tool-net', 'net-core', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['内核', '多协议'], 'MetaCubeX/mihomo', 'https://wiki.metacubex.one/', ['sing-box', 'Clash']),
  T('sing-box', '新一代通用代理平台，协议支持极广，可当内核也可独立运行。', 'https://github.com/SagerNet/sing-box', 'tool-net', 'net-core', ['Windows', 'macOS', 'Linux', 'Android', 'iOS'], '开源免费', ['内核', '多协议'], 'SagerNet/sing-box', 'https://sing-box.sagernet.org/', ['Mihomo (Clash Meta)', 'Clash']),
  T('Clash', '经典 Clash 内核，规则分流的奠基者，生态资料最多。', 'https://github.com/Dreamacro/clash', 'tool-net', 'net-core', ['Windows', 'macOS', 'Linux'], '开源免费', ['内核', '经典'], 'Dreamacro/clash', 'https://github.com/Dreamacro/clash/wiki', ['Mihomo (Clash Meta)', 'sing-box']),

  /* ============================== 浏览器 ================================ */
  // 主流浏览器
  T('Google Chrome', '全球份额第一的浏览器，扩展生态最全、同步稳定。', 'https://www.google.com/chrome/', 'tool-browser', 'browser-main', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['主流', '扩展生态'], '', 'https://support.google.com/chrome/', ['Microsoft Edge', 'Mozilla Firefox', 'Brave']),
  T('Microsoft Edge', 'Windows 内置浏览器，Chromium 内核，资源占用与 PDF 阅读体验好。', 'https://www.microsoft.com/edge', 'tool-browser', 'browser-main', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['内置', 'Chromium'], '', 'https://support.microsoft.com/edge', ['Google Chrome', 'Mozilla Firefox', 'Vivaldi']),
  T('Mozilla Firefox', '非 Chromium 内核的开源浏览器，隐私保护与自定义能力强。', 'https://www.mozilla.org/zh-CN/firefox/new/', 'tool-browser', 'browser-main', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['开源', '隐私'], '', 'https://support.mozilla.org/zh-CN/', ['LibreWolf', 'Google Chrome', 'Brave']),
  T('Safari', '苹果生态原生浏览器，能效与隐私保护优秀。', 'https://www.apple.com/safari/', 'tool-browser', 'browser-main', ['macOS', 'iOS'], '免费', ['苹果生态', '省电'], '', 'https://support.apple.com/guide/safari/welcome/mac', ['Google Chrome', 'Microsoft Edge']),
  T('夸克浏览器', '国内轻量浏览器，AI 搜索、网盘与扫描功能集成度高。', 'https://quark.sm.cn/', 'tool-browser', 'browser-main', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['国产', 'AI 搜索'], '', 'https://quark.sm.cn/', ['Microsoft Edge', 'Google Chrome']),
  T('Opera', '内置免费 VPN 与侧栏信使的老牌浏览器，功能创新多。', 'https://www.opera.com/', 'tool-browser', 'browser-main', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['内置 VPN', '老牌'], '', 'https://help.opera.com/', ['Vivaldi', 'Google Chrome', 'Brave']),
  // 隐私浏览器
  T('Brave', '内置广告与追踪拦截的 Chromium 浏览器，速度快、隐私友好。', 'https://brave.com/', 'tool-browser', 'browser-privacy', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['广告拦截', '隐私'], '', 'https://support.brave.com/', ['LibreWolf', 'Mozilla Firefox', 'Tor Browser']),
  T('LibreWolf', 'Firefox 的隐私强化分支，默认禁用遥测、预置反追踪。', 'https://librewolf.net/', 'tool-browser', 'browser-privacy', ['Windows', 'macOS', 'Linux'], '开源免费', ['Firefox', '隐私强化'], '', 'https://librewolf.net/docs/faq/', ['Mozilla Firefox', 'Brave', 'Tor Browser']),
  T('Tor Browser', '通过 Tor 网络匿名访问，隐私研究用途。', 'https://www.torproject.org/', 'tool-browser', 'browser-privacy', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['匿名', 'Tor'], '', 'https://tb-manual.torproject.org/', ['Brave', 'LibreWolf']),
  T('Vivaldi', '高度可定制的浏览器，标签页管理与垂直侧栏非常强大。', 'https://vivaldi.com/', 'tool-browser', 'browser-privacy', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['可定制', '标签管理'], '', 'https://help.vivaldi.com/', ['Opera', 'Microsoft Edge']),
  // 扩展
  T('uBlock Origin', '最高效的广告与追踪拦截扩展，内存占用极低。', 'https://github.com/gorhill/uBlock', 'tool-browser', 'browser-ext', ['Extension'], '开源免费', ['广告拦截', '必备插件'], 'gorhill/uBlock', 'https://github.com/gorhill/uBlock/wiki', ['AdGuard AdBlocker']),
  T('AdGuard AdBlocker', '知名广告拦截扩展，过滤规则丰富、界面友好。', 'https://adguard.com/', 'tool-browser', 'browser-ext', ['Extension', 'Android', 'iOS'], '免费增值', ['广告拦截', '过滤'], '', 'https://kb.adguard.com/', ['uBlock Origin']),
  T('Tampermonkey 油猴', '用户脚本管理器，装脚本即可给任意网页加功能。', 'https://www.tampermonkey.net/', 'tool-browser', 'browser-ext', ['Extension', 'Android'], '免费增值', ['用户脚本', '神器'], '', 'https://www.tampermonkey.net/documentation.php', ['Violentmonkey']),
  T('Violentmonkey', '开源免费的用户脚本管理器，油猴的开源替代。', 'https://violentmonkey.github.io/', 'tool-browser', 'browser-ext', ['Extension'], '开源免费', ['用户脚本', '开源'], 'violentmonkey/violentmonkey', 'https://github.com/violentmonkey/violentmonkey/wiki', ['Tampermonkey 油猴']),
  T('沉浸式翻译', '网页双语对照翻译扩展，支持多家翻译引擎，阅读外文必备。', 'https://immersivetranslate.com/', 'tool-browser', 'browser-ext', ['Extension', 'iOS', 'Android'], '免费增值', ['翻译', '双语对照'], '', 'https://immersivetranslate.com/docs/', ['彩云小译', 'DeepL Translate']),
  T('Bitwarden 扩展', '开源密码管理器的浏览器插件，自动填充与跨设备同步。', 'https://bitwarden.com/', 'tool-browser', 'browser-ext', ['Extension', 'Windows', 'macOS', 'iOS', 'Android'], '开源免费', ['密码管理', '自动填充'], '', 'https://bitwarden.com/help/', ['1Password', 'KeePass']),
  T('Dark Reader', '一键为任意网站开启深色模式，护眼夜间浏览神器。', 'https://darkreader.org/', 'tool-browser', 'browser-ext', ['Extension'], '免费增值', ['深色模式', '护眼'], 'darkreader/darkreader', 'https://darkreader.org/help/', []),

  /* ============================== 办公协作 ============================== */
  // 办公套件
  T('WPS Office', '国产办公套件，文字/表格/演示/PDF 全支持，兼容 Microsoft Office。', 'https://www.wps.cn/', 'tool-office', 'office-suite', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['国产', 'Office 兼容'], '', 'https://www.wps.cn/help/', ['LibreOffice', 'ONLYOFFICE']),
  T('LibreOffice', '完全免费的开源办公套件，文档格式兼容良好。', 'https://www.libreoffice.org/', 'tool-office', 'office-suite', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', 'Office 兼容'], '', 'https://help.libreoffice.org/', ['WPS Office', 'ONLYOFFICE']),
  T('ONLYOFFICE Desktop Editors', '开源办公套件，对 OOXML 格式兼容性出色。', 'https://www.onlyoffice.com/', 'tool-office', 'office-suite', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', 'OOXML'], '', 'https://helpcenter.onlyoffice.com/', ['LibreOffice', 'WPS Office']),
  // 团队协作
  T('飞书', '字节跳动的企业协作平台：即时沟通、文档、日历、多维表格一体。', 'https://www.feishu.cn/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '多维表格'], '', 'https://www.feishu.cn/hc/', ['钉钉', '企业微信', 'Notion']),
  T('钉钉', '阿里旗下企业协同平台，考勤审批与组织管理完善。', 'https://www.dingtalk.com/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '企业协同'], '', 'https://www.dingtalk.com/help', ['飞书', '企业微信']),
  T('企业微信', '微信生态的企业沟通工具，可直连微信客户。', 'https://work.weixin.qq.com/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['微信生态', '客户联系'], '', 'https://work.weixin.qq.com/help', ['飞书', '钉钉']),
  T('Notion', 'All-in-one 工作空间：笔记、数据库、项目与知识库自由搭建。', 'https://www.notion.so/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['知识库', '数据库'], '', 'https://www.notion.com/help', ['Obsidian', '语雀', '思源笔记 SiYuan']),
  T('Slack', '欧美团队主流沟通工具，频道式协作与集成生态丰富。', 'https://slack.com/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['团队沟通', '海外'], '', 'https://slack.com/help', ['飞书', 'Discord']),
  // 文档笔记
  T('语雀', '阿里出品的知识文档平台，写作体验与知识库结构化能力强。', 'https://www.yuque.com/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '知识库'], '', 'https://www.yuque.com/help', ['Notion', '腾讯文档']),
  T('腾讯文档', '在线协作文档，微信/QQ 账号直接用，多人实时编辑方便。', 'https://docs.qq.com/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '实时协作'], '', 'https://docs.qq.com/desktop', ['语雀', '石墨文档']),
  T('石墨文档', '国产在线协作文档，界面简洁、多人编辑流畅。', 'https://shimo.im/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '在线协作'], '', 'https://shimo.im/help', ['腾讯文档', '语雀']),
  T('Obsidian', '本地 Markdown 双链笔记，插件生态极强，数据完全掌握在自己手里。', 'https://obsidian.md/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['Markdown', '双链', '本地优先'], '', 'https://help.obsidian.md/', ['思源笔记 SiYuan', 'Logseq', 'Notion']),
  T('思源笔记 SiYuan', '国产开源块级双链笔记，本地优先、支持自托管同步。', 'https://b3log.org/siyuan/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['国产', '开源', '块级笔记'], '', 'https://b3log.org/siyuan/', ['Obsidian', 'Logseq']),
  T('Logseq', '开源大纲式双链笔记，本地 Markdown 文件兼容。', 'https://logseq.com/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['大纲笔记', '开源'], '', 'https://docs.logseq.com/', ['Obsidian', '思源笔记 SiYuan']),

  /* ============================== 影音播放 ============================== */
  T('PotPlayer', 'Windows 上功能最强的本地视频播放器，格式与字幕支持极全。', 'https://potplayer.daum.net/', 'tool-media', 'media-player', ['Windows'], '免费', ['国产常用', '万能播放'], '', 'https://potplayer.daum.net/', ['VLC media player', 'mpv']),
  T('VLC media player', '跨平台开源播放器，几乎能播任何格式，还能串流。', 'https://www.videolan.org/vlc/', 'tool-media', 'media-player', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['开源', '万能播放'], '', 'https://docs.videolan.me/vlc-user/', ['PotPlayer', 'mpv', 'IINA']),
  T('IINA', 'macOS 原生设计的现代播放器，界面漂亮、手势操作顺手。', 'https://iina.io/', 'tool-media', 'media-player', ['macOS'], '开源免费', ['macOS', '原生体验'], 'iina/iina', 'https://iina.io/guide/', ['VLC media player', 'mpv']),
  T('mpv', '极简高性能命令行播放器，脚本与配置可玩性极高。', 'https://mpv.io/', 'tool-media', 'media-player', ['Windows', 'macOS', 'Linux'], '开源免费', ['轻量', '高性能'], 'mpv-player/mpv', 'https://mpv.io/manual/stable/', ['VLC media player', 'IINA']),
  T('哔哩哔哩', '国内知名视频社区，番剧、游戏、知识区内容丰富。', 'https://www.bilibili.com/', 'tool-media', 'media-stream', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '视频社区'], '', 'https://www.bilibili.com/', ['腾讯视频', '爱奇艺']),
  T('腾讯视频', '腾讯在线视频平台，影视剧与综艺内容丰富。', 'https://v.qq.com/', 'tool-media', 'media-stream', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '在线视频'], '', 'https://v.qq.com/', ['爱奇艺', '哔哩哔哩']),
  T('爱奇艺', '国内主流在线视频平台，自制剧与综艺资源丰富。', 'https://www.iqiyi.com/', 'tool-media', 'media-stream', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '在线视频'], '', 'https://www.iqiyi.com/', ['腾讯视频', '哔哩哔哩']),
  T('网易云音乐', '国内主流音乐平台，歌单与评论社区氛围浓厚。', 'https://music.163.com/', 'tool-media', 'media-music', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '歌单'], '', 'https://music.163.com/', ['QQ 音乐', '酷狗音乐']),
  T('QQ 音乐', '腾讯音乐平台，曲库全、绿钻权益体系成熟。', 'https://y.qq.com/', 'tool-media', 'media-music', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '曲库'], '', 'https://y.qq.com/', ['网易云音乐', '酷狗音乐']),
  T('酷狗音乐', '老牌音乐平台，曲库大、听歌识曲与 K 歌功能丰富。', 'https://www.kugou.com/', 'tool-media', 'media-music', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '曲库'], '', 'https://www.kugou.com/', ['QQ 音乐', '网易云音乐']),
  T('Spotify', '全球主流流媒体音乐服务，推荐算法与播客内容丰富。', 'https://www.spotify.com/', 'tool-media', 'media-music', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['海外', '播客'], '', 'https://support.spotify.com/', ['Apple Music', '网易云音乐']),
  T('Apple Music', '苹果生态音乐服务，与 iOS / macOS 深度整合。', 'https://music.apple.com/', 'tool-media', 'media-music', ['macOS', 'iOS', 'Android', 'Web'], '付费', ['苹果生态', '无损'], '', 'https://support.apple.com/apple-music', ['Spotify', 'QQ 音乐']),

  /* ============================== 下载传输 ============================== */
  T('Motrix', '颜值与功能兼具的全平台下载器，支持 HTTP / BT / 磁力。', 'https://motrix.app/', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'Linux'], '开源免费', ['BT', '磁力'], 'agalwood/Motrix', 'https://github.com/agalwood/Motrix/wiki', ['qBittorrent', 'Free Download Manager']),
  T('qBittorrent', '最受欢迎的开源 BT 客户端，无广告、功能完整。', 'https://www.qbittorrent.org/', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['BT', '无广告'], '', 'https://wiki.qbittorrent.org/', ['Motrix', 'Transmission']),
  T('Transmission', '轻量开源 BT 客户端，占用低、界面简洁，NAS 常用。', 'https://transmissionbt.com/', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'Linux'], '开源免费', ['BT', '轻量'], 'transmission/transmission', 'https://github.com/transmission/transmission/wiki', ['qBittorrent', 'Motrix']),
  T('aria2', '命令行多协议下载工具，支持分段、BT 与 RPC 远程控制。', 'https://github.com/aria2/aria2', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['命令行', '多协议'], 'aria2/aria2', 'https://aria2.github.io/manual/', ['Motrix', 'Internet Download Manager']),
  T('Internet Download Manager', 'Windows 经典下载加速器，浏览器捕获与多线程下载强。', 'https://www.internetdownloadmanager.com/', 'tool-download', 'dl-manager', ['Windows'], '付费', ['下载加速', '经典'], '', 'https://www.internetdownloadmanager.com/support.html', ['Free Download Manager', 'Motrix']),
  T('迅雷', '国内老牌下载工具，冷门资源与网盘加速有优势。', 'https://www.xunlei.com/', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['国产', '冷门资源'], '', 'https://www.xunlei.com/', ['Internet Download Manager', 'Motrix']),
  T('Free Download Manager', '开源跨平台下载管理器，支持 BT、种子与网站抓取。', 'https://www.freedownloadmanager.org/', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'Linux', 'Android'], '免费增值', ['开源', '跨平台'], '', 'https://www.freedownloadmanager.org/en-US/support.htm', ['Internet Download Manager', 'Motrix']),

  /* ============================== 文件管理 ============================== */
  T('7-Zip', '压缩率极高的开源压缩解压工具，Windows 装机必备。', 'https://www.7-zip.org/', 'tool-file', 'file-archive', ['Windows', 'Linux'], '开源免费', ['压缩', '装机必备'], '', 'https://7-zip.org/7z.html', ['Bandizip', 'PeaZip', 'WinRAR']),
  T('WinRAR', '老牌压缩工具，RAR 格式兼容最好，装机常见。', 'https://www.rarlab.com/', 'tool-file', 'file-archive', ['Windows', 'macOS', 'Linux'], '付费', ['压缩', 'RAR'], '', 'https://www.rarlab.com/technical.htm', ['7-Zip', 'Bandizip']),
  T('Bandizip', '界面漂亮的压缩工具，多核解压快、乱码修复好。', 'https://www.bandisoft.com/bandizip/', 'tool-file', 'file-archive', ['Windows', 'macOS'], '免费增值', ['压缩', '高颜值'], '', 'https://www.bandisoft.com/bandizip/help/', ['7-Zip', 'WinRAR']),
  T('PeaZip', '开源压缩管理器，支持格式多、隐私加密功能全。', 'https://peazip.github.io/', 'tool-file', 'file-archive', ['Windows', 'Linux'], '开源免费', ['开源', '多格式'], '', 'https://peazip.github.io/help.html', ['7-Zip', 'Bandizip']),
  T('Everything', 'Windows 上秒级文件搜索神器，索引极小、速度无与伦比。', 'https://www.voidtools.com/', 'tool-file', 'file-search', ['Windows'], '免费', ['文件搜索', '神器'], '', 'https://www.voidtools.com/support/', ['Listary', 'WizTree']),
  T('Listary', '文件搜索与快速启动工具，与资源管理器深度整合。', 'https://www.listary.com/', 'tool-file', 'file-search', ['Windows'], '免费增值', ['搜索', '快速启动'], '', 'https://www.listary.com/support.html', ['Everything']),
  T('WizTree', '极快的磁盘空间分析器，几秒扫出大文件与文件夹占用。', 'https://www.diskanalyzer.com/', 'tool-file', 'file-search', ['Windows'], '免费增值', ['空间分析', '清理助手'], '', 'https://www.diskanalyzer.com/', ['TreeSize Free', 'Everything']),
  T('FreeFileSync', '开源文件同步与备份工具，对比直观、同步规则灵活。', 'https://freefilesync.org/', 'tool-file', 'file-sync', ['Windows', 'macOS', 'Linux'], '开源免费', ['备份', '同步'], '', 'https://freefilesync.org/manual.php', ['Syncthing', '坚果云']),
  T('Syncthing', '去中心化开源同步工具，设备间点对点同步，不经过第三方服务器。', 'https://syncthing.net/', 'tool-file', 'file-sync', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['P2P', '自托管'], 'syncthing/syncthing', 'https://docs.syncthing.net/', ['FreeFileSync', '坚果云']),
  T('坚果云', '国内老牌同步网盘，稳定可靠、支持 WebDAV。', 'https://www.jianguoyun.com/', 'tool-file', 'file-sync', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', 'WebDAV'], '', 'https://help.jianguoyun.com/', ['Syncthing', '百度网盘']),
  T('FileZilla', '免费开源 FTP/SFTP 客户端，网站上传下载必备。', 'https://filezilla-project.org/', 'tool-file', 'file-transfer', ['Windows', 'macOS', 'Linux'], '开源免费', ['FTP', '上传'], '', 'https://wiki.filezilla-project.org/', []),

  /* ============================== 系统增强 ============================== */
  T('Microsoft PowerToys', '微软官方 Windows 增强工具集：分屏、取色、批量重命名、快捷键管理。', 'https://github.com/microsoft/PowerToys', 'tool-system', 'sys-tune', ['Windows'], '开源免费', ['官方', '效率工具集'], 'microsoft/PowerToys', 'https://learn.microsoft.com/windows/powertoys/', ['Dism++', 'Winaero Tweaker']),
  T('Dism++', '国产 Windows 系统清理与优化工具，功能强大、体积小巧。', 'https://www.chuyu.me/', 'tool-system', 'sys-tune', ['Windows'], '免费', ['国产', '系统优化'], '', 'https://www.chuyu.me/', ['Microsoft PowerToys', 'Winaero Tweaker']),
  T('Winaero Tweaker', 'Windows 深度设置 tweak 工具，几百项隐藏开关一次配齐。', 'https://winaero.com/winaero-tweaker/', 'tool-system', 'sys-tune', ['Windows'], '免费', ['系统设置', '深度定制'], '', 'https://winaero.com/winaero-tweaker/', ['Microsoft PowerToys']),
  T('火绒安全', '轻量国产杀毒软件，无广告、弹窗拦截效果好。', 'https://www.huorong.cn/', 'tool-system', 'sys-clean', ['Windows'], '免费', ['国产', '杀毒', '弹窗拦截'], '', 'https://www.huorong.cn/', ['Malwarebytes', 'Windows Defender']),
  T('Malwarebytes', '知名恶意软件查杀工具，可作二次扫描补充。', 'https://www.malwarebytes.com/', 'tool-system', 'sys-clean', ['Windows', 'macOS', 'Android', 'iOS'], '免费增值', ['反恶意软件', '二扫'], '', 'https://support.malwarebytes.com/', ['火绒安全', 'Windows Defender']),
  T('TreeSize Free', '直观的磁盘占用可视化工具，快速找出占空间大户。', 'https://www.jam-software.com/treesize_free', 'tool-system', 'sys-clean', ['Windows'], '免费', ['空间分析', '可视化'], '', 'https://www.jam-software.com/treesize_free', ['WizTree']),

  /* ============================== 密码隐私 ============================== */
  T('Bitwarden', '开源密码管理器，全平台同步、可自托管，免费版就够用。', 'https://bitwarden.com/', 'tool-privacy', 'pass-mgr', ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Extension', 'Web'], '开源免费', ['密码管理', '自托管'], '', 'https://bitwarden.com/help/', ['1Password', 'KeePass']),
  T('1Password', '体验极佳的商业密码管理器，家庭/团队共享做得好。', 'https://1password.com/', 'tool-privacy', 'pass-mgr', ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Extension'], '付费', ['密码管理', '团队协作'], '', 'https://support.1password.com/', ['Bitwarden', 'KeePass']),
  T('KeePass', '完全离线的开源密码库，本地加密数据库、插件生态丰富。', 'https://keepass.info/', 'tool-privacy', 'pass-mgr', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['离线', '开源'], '', 'https://keepass.info/help.html', ['Bitwarden', '1Password']),
  T('Microsoft Authenticator', '微软出品的二次验证码 App，也可作密码管理器。', 'https://www.microsoft.com/en-us/security/mobile-authenticator-app', 'tool-privacy', 'pass-2fa', ['iOS', 'Android'], '免费', ['2FA', '验证码'], '', 'https://support.microsoft.com/account-billing', ['Google Authenticator', 'Aegis Authenticator']),
  T('Google Authenticator', '谷歌二次验证器，生成动态验证码保护账号。', 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2', 'tool-privacy', 'pass-2fa', ['iOS', 'Android'], '免费', ['2FA', '谷歌'], '', 'https://support.google.com/accounts/answer/1066447', ['Microsoft Authenticator', 'Aegis Authenticator']),
  T('Aegis Authenticator', '开源免费的安卓 2FA 验证器，支持备份与加密。', 'https://github.com/beemdevelopment/Aegis', 'tool-privacy', 'pass-2fa', ['Android'], '开源免费', ['2FA', '开源'], 'beemdevelopment/Aegis', 'https://github.com/beemdevelopment/Aegis/wiki', ['Google Authenticator', 'Microsoft Authenticator']),
  T('Gpg4win', 'Windows 上的 GPG 加密套件，邮件与文件加密签名。', 'https://www.gpg4win.org/', 'tool-privacy', 'pass-priv', ['Windows'], '开源免费', ['加密', 'GPG'], '', 'https://www.gpg4win.org/documentation.html', ['Proton Mail']),
  T('Proton Mail', '端到端加密的瑞士邮箱服务，隐私邮件首选。', 'https://proton.me/mail', 'tool-privacy', 'pass-priv', ['Web', 'iOS', 'Android'], '免费增值', ['邮箱', '端到端加密'], '', 'https://proton.me/support', ['Gmail', 'Outlook']),

  /* ============================== 图片工具 ============================== */
  T('Snipaste', '经典截图 + 贴图工具，截完可钉在屏幕上对照，效率神器。', 'https://www.snipaste.com/', 'tool-image', 'img-capture', ['Windows', 'macOS'], '免费增值', ['截图', '贴图'], '', 'https://www.snipaste.com/documentation.html', ['PixPin', 'ShareX', 'Flameshot']),
  T('PixPin', '国产新锐截图工具，长截图、贴图、OCR 与标注一体。', 'https://pixpin.cn/', 'tool-image', 'img-capture', ['Windows'], '免费增值', ['国产', '长截图', 'OCR'], '', 'https://pixpin.cn/guide', ['Snipaste', 'ShareX']),
  T('ShareX', '开源截图录屏与上传工具，自动化工作流极强。', 'https://getsharex.com/', 'tool-image', 'img-capture', ['Windows'], '开源免费', ['开源', '录屏'], 'ShareX/ShareX', 'https://github.com/ShareX/ShareX/wiki', ['Flameshot', 'Snipaste']),
  T('Flameshot', '开源跨平台截图工具，标注功能丰富、命令行友好。', 'https://flameshot.org/', 'tool-image', 'img-capture', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '标注'], 'flameshot-org/flameshot', 'https://flameshot.org/docs/', ['ShareX', 'Snipaste']),
  T('GIMP', '开源图像编辑器，功能接近 Photoshop，插件丰富。', 'https://www.gimp.org/', 'tool-image', 'img-edit', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '图像编辑'], '', 'https://docs.gimp.org/', ['Krita', 'Photopea']),
  T('Krita', '开源绘画与插画软件，笔刷系统强大，二次元创作友好。', 'https://krita.org/', 'tool-image', 'img-edit', ['Windows', 'macOS', 'Linux'], '开源免费', ['绘画', '插画'], '', 'https://docs.krita.org/', ['GIMP', 'Photopea']),
  T('Photopea', '浏览器里的在线 PS，直接打开 PSD/XD/Sketch 文件。', 'https://www.photopea.com/', 'tool-image', 'img-edit', ['Web'], '免费增值', ['在线', 'PSD'], '', 'https://www.photopea.com/learn/', ['GIMP', 'Krita']),
  T('remove.bg', '一键在线抠图去背景，证件照与素材处理省时。', 'https://www.remove.bg/', 'tool-image', 'img-edit', ['Web'], '免费增值', ['抠图', '在线'], '', 'https://www.remove.bg/support', ['Photopea', '稿定设计']),

  /* ============================== AI 助手 =============================== */
  T('ChatGPT', 'OpenAI 官方对话助手，通用能力与插件生态领先。', 'https://chatgpt.com/', 'tool-ai', 'ai-chat', ['Web', 'Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['对话', 'OpenAI'], '', 'https://help.openai.com/', ['Claude', 'Google Gemini', 'DeepSeek']),
  T('Claude', 'Anthropic 官方助手，长文本写作、代码与分析表现出色。', 'https://claude.ai/', 'tool-ai', 'ai-chat', ['Web', 'Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['对话', '长文本'], '', 'https://support.anthropic.com/', ['ChatGPT', 'Kimi', 'Google Gemini']),
  T('DeepSeek', '国产开源大模型对话助手，推理能力强、免费好用。', 'https://www.deepseek.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android', 'Windows', 'macOS'], '免费', ['国产', '推理'], '', 'https://api-docs.deepseek.com/', ['通义千问', 'Kimi', '豆包']),
  T('通义千问', '阿里通义大模型对话入口，中文场景与办公集成好。', 'https://tongyi.aliyun.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android'], '免费', ['国产', '阿里'], '', 'https://help.aliyun.com/product/2400256.html', ['DeepSeek', '豆包', 'Kimi']),
  T('Kimi', '擅长超长文本阅读与资料整理的国产 AI 助手。', 'https://www.kimi.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android', 'Windows', 'macOS'], '免费增值', ['国产', '长文本'], '', 'https://www.kimi.com/', ['Claude', 'DeepSeek', '豆包']),
  T('豆包', '字节跳动旗下 AI 助手，多模态与日常问答体验亲切。', 'https://www.doubao.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android', 'Windows', 'macOS'], '免费', ['国产', '多模态'], '', 'https://www.doubao.com/', ['通义千问', 'DeepSeek', 'Kimi']),
  T('Google Gemini', '谷歌多模态 AI 助手，与搜索和 Google 生态深度整合。', 'https://gemini.google.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android'], '免费增值', ['多模态', '谷歌'], '', 'https://support.google.com/gemini/', ['ChatGPT', 'Claude']),
  T('Microsoft Copilot', '微软 AI 助手，深度集成 Windows / Office / Bing。', 'https://copilot.microsoft.com/', 'tool-ai', 'ai-chat', ['Web', 'Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['微软', '办公集成'], '', 'https://support.microsoft.com/copilot', ['ChatGPT', 'Google Gemini']),
  T('秘塔 AI 搜索', '无广告 AI 搜索，结构化输出带来源，查资料高效。', 'https://metaso.cn/', 'tool-ai', 'ai-chat', ['Web'], '免费增值', ['国产', 'AI 搜索'], '', 'https://metaso.cn/', ['Perplexity', 'Kimi']),
  T('Perplexity', '带来源引用的 AI 搜索引擎，查资料与事实核对好用。', 'https://www.perplexity.ai/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android'], '免费增值', ['AI 搜索', '引用'], '', 'https://www.perplexity.ai/hub', ['秘塔 AI 搜索', 'ChatGPT']),
  T('Midjourney', '顶级 AI 绘画工具，艺术表现力强，Discord 内使用。', 'https://www.midjourney.com/', 'tool-ai', 'ai-image', ['Web', 'Extension'], '付费', ['AI 绘画', '艺术'], '', 'https://docs.midjourney.com/', ['Stable Diffusion WebUI', '即梦 AI']),
  T('即梦 AI', '字节旗下 AI 绘画与视频生成平台，中文提示词友好。', 'https://jimeng.jianying.com/', 'tool-ai', 'ai-image', ['Web', 'iOS', 'Android'], '免费增值', ['国产', 'AI 绘画', '视频'], '', 'https://jimeng.jianying.com/', ['Midjourney', '通义万相']),
  T('通义万相', '阿里通义 AI 绘画与视频生成平台，中文创作友好。', 'https://tongyi.aliyun.com/wanxiang/', 'tool-ai', 'ai-image', ['Web'], '免费增值', ['国产', 'AI 绘画'], '', 'https://help.aliyun.com/product/2400256.html', ['即梦 AI', 'Midjourney']),
  T('Stable Diffusion WebUI', '本地部署的开源 AI 绘画工作台，模型与插件生态最大。', 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', 'tool-ai', 'ai-image', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '本地绘画'], 'AUTOMATIC1111/stable-diffusion-webui', 'https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki', ['Midjourney', 'ComfyUI']),
  T('ComfyUI', '节点式 Stable Diffusion 工作流工具，可控性极强、进阶首选。', 'https://github.com/comfyanonymous/ComfyUI', 'tool-ai', 'ai-image', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '节点工作流'], 'comfyanonymous/ComfyUI', 'https://github.com/comfyanonymous/ComfyUI/wiki', ['Stable Diffusion WebUI']),
  T('Gamma', '用 AI 一句话生成演示文稿、文档与网页，排版精美。', 'https://gamma.app/', 'tool-ai', 'ai-office', ['Web'], '免费增值', ['PPT', 'AI 生成'], '', 'https://help.gamma.app/', ['讯飞智文', 'WPS AI']),
  T('讯飞听见', '语音转文字与会议纪要工具，中文识别准确率高。', 'https://www.iflyrec.com/', 'tool-ai', 'ai-office', ['Web', 'iOS', 'Android'], '免费增值', ['国产', '语音转写'], '', 'https://www.iflyrec.com/', ['秘塔写作猫', '通义听悟']),
  T('秘塔写作猫', '中文写作校对与润色工具，错别字、语病与风格一把抓。', 'https://xiezuocat.com/', 'tool-ai', 'ai-office', ['Web', 'Extension'], '免费增值', ['国产', '中文校对'], '', 'https://xiezuocat.com/', ['讯飞听见', 'Grammarly']),

  /* ============================== 翻译词典 ============================== */
  T('沉浸式翻译', '双语对照网页翻译扩展，支持 DeepL / OpenAI 多引擎，阅读外文神器。', 'https://immersivetranslate.com/', 'tool-translate', 'tr-tool', ['Extension', 'iOS', 'Android'], '免费增值', ['双语对照', '阅读'], '', 'https://immersivetranslate.com/docs/', ['彩云小译', 'DeepL Translate']),
  T('DeepL Translate', '翻译质量业内领先的神经机器翻译，文档翻译也支持。', 'https://www.deepl.com/translator', 'tool-translate', 'tr-tool', ['Web', 'Windows', 'macOS', 'iOS', 'Android', 'Extension'], '免费增值', ['高质量', '文档翻译'], '', 'https://support.deepl.com/', ['Google 翻译', '有道翻译']),
  T('有道翻译', '网易旗下翻译工具，词典、文档与截图翻译齐全。', 'https://fanyi.youdao.com/', 'tool-translate', 'tr-tool', ['Web', 'Windows', 'macOS', 'iOS', 'Android', 'Extension'], '免费增值', ['国产', '词典'], '', 'https://fanyi.youdao.com/', ['Google 翻译', '彩云小译']),
  T('Google 翻译', '支持语种最多的免费翻译服务，网页与 App 都好用。', 'https://translate.google.com/', 'tool-translate', 'tr-tool', ['Web', 'iOS', 'Android'], '免费', ['多语种', '免费'], '', 'https://support.google.com/translate/', ['DeepL Translate', '有道翻译']),
  T('Bob', 'macOS 上优雅的翻译与 OCR 工具，可自定义各类翻译服务。', 'https://bobtranslate.com/', 'tool-translate', 'tr-tool', ['macOS'], '付费', ['macOS', 'OCR'], '', 'https://bobtranslate.com/guide/', ['沉浸式翻译', 'DeepL Translate']),
  T('彩云小译', '国产双语对照翻译网站与浏览器插件，论文阅读友好。', 'https://fanyi.caiyunapp.com/', 'tool-translate', 'tr-tool', ['Web', 'Extension', 'iOS'], '免费增值', ['国产', '双语对照'], '', 'https://fanyi.caiyunapp.com/', ['沉浸式翻译', '有道翻译']),

  /* ============================== 通讯社交 ============================== */
  T('微信', '国内必备即时通讯与生活工具，联系人覆盖最广。', 'https://weixin.qq.com/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['国民应用', '必备'], '', 'https://weixin.qq.com/', ['QQ', '企业微信']),
  T('QQ', '腾讯经典即时通讯，文件传输、群与相册功能丰富。', 'https://im.qq.com/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['经典', '文件传输'], '', 'https://im.qq.com/', ['微信', 'Telegram']),
  T('Telegram', '速度快、隐私好的国际即时通讯，频道与群组生态丰富。', 'https://telegram.org/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Web'], '免费', ['国际', '隐私'], '', 'https://telegram.org/faq', ['Signal', 'Discord']),
  T('Discord', '海外社区与游戏语音主流平台，服务器频道结构清晰。', 'https://discord.com/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['社区', '语音'], '', 'https://support.discord.com/', ['Telegram', 'Slack']),
  T('Signal', '端到端加密的开源通讯工具，隐私通信首选。', 'https://signal.org/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'iOS', 'Android'], '开源免费', ['加密', '开源'], '', 'https://support.signal.org/', ['Telegram', '微信']),

  /* ============================ 编程入门工具 ============================ */
  T('Visual Studio Code', '微软出品的代码编辑器，扩展生态最全，编程入门首选。', 'https://code.visualstudio.com/', 'tool-devstart', 'dev-editor', ['Windows', 'macOS', 'Linux'], '免费', ['编辑器', '入门首选'], '', 'https://code.visualstudio.com/docs', ['Cursor', 'Trae', 'WebStorm']),
  T('Cursor', 'AI 原生代码编辑器，对话式改代码、补全体验出色。', 'https://cursor.com/', 'tool-devstart', 'dev-editor', ['Windows', 'macOS', 'Linux'], '免费增值', ['AI 编辑器', '热门'], '', 'https://docs.cursor.com/', ['Trae', 'Visual Studio Code', 'Windsurf']),
  T('Trae', '字节旗下免费 AI IDE，中文体验友好、内置多种模型。', 'https://www.trae.ai/', 'tool-devstart', 'dev-editor', ['Windows', 'macOS'], '免费', ['国产', 'AI IDE'], '', 'https://docs.trae.ai/', ['Cursor', 'Visual Studio Code']),
  T('Windsurf', 'AI 原生 IDE，Flow 工作流擅长多文件协同编辑。', 'https://windsurf.com/', 'tool-devstart', 'dev-editor', ['Windows', 'macOS', 'Linux'], '免费增值', ['AI IDE', 'Flow'], '', 'https://docs.windsurf.com/', ['Cursor', 'Trae']),
  T('WebStorm', 'JetBrains 前端开发 IDE，重构与智能提示专业。', 'https://www.jetbrains.com/webstorm/', 'tool-devstart', 'dev-editor', ['Windows', 'macOS', 'Linux'], '付费', ['IDE', '前端'], '', 'https://www.jetbrains.com/help/webstorm/', ['Visual Studio Code', 'Cursor']),
  T('Git', '版本控制必备工具，配合 GitHub / Gitee 管理代码历史。', 'https://git-scm.com/', 'tool-devstart', 'dev-env', ['Windows', 'macOS', 'Linux'], '开源免费', ['版本控制', '必备'], '', 'https://git-scm.com/doc', ['GitHub Desktop', 'Sourcetree']),
  T('GitHub Desktop', 'Git 的图形界面客户端，可视化提交、分支与同步，新手友好。', 'https://desktop.github.com/', 'tool-devstart', 'dev-env', ['Windows', 'macOS'], '免费', ['Git 图形化', '新手友好'], '', 'https://docs.github.com/desktop', ['Git', 'Sourcetree']),
  T('Node.js', 'JavaScript 运行时，前端工具链与脚本开发的基础。', 'https://nodejs.org/', 'tool-devstart', 'dev-env', ['Windows', 'macOS', 'Linux'], '开源免费', ['运行时', '前端基础'], '', 'https://nodejs.org/en/learn', ['Python', 'Deno']),
  T('Python', '语法简单的通用编程语言，数据分析与 AI 入门首选。', 'https://www.python.org/', 'tool-devstart', 'dev-env', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['编程语言', 'AI'], '', 'https://docs.python.org/zh-cn/3/', ['Node.js']),
  T('Docker Desktop', '容器运行环境，一条命令起数据库/服务，避免环境折腾。', 'https://www.docker.com/products/docker-desktop/', 'tool-devstart', 'dev-env', ['Windows', 'macOS', 'Linux'], '免费增值', ['容器', '环境管理'], '', 'https://docs.docker.com/', ['Podman Desktop']),
  T('DBeaver', '免费开源数据库管理工具，可视化查看与编写 SQL。', 'https://dbeaver.io/', 'tool-devstart', 'dev-db', ['Windows', 'macOS', 'Linux'], '开源免费', ['数据库', 'SQL'], '', 'https://dbeaver.io/docs/', ['Navicat', 'TablePlus']),
  T('Navicat', '老牌数据库管理客户端，界面漂亮、导入导出与同步方便。', 'https://www.navicat.com/', 'tool-devstart', 'dev-db', ['Windows', 'macOS', 'Linux'], '付费', ['数据库', '商业软件'], '', 'https://www.navicat.com/en/support', ['DBeaver', 'TablePlus']),
  T('TablePlus', '现代数据库客户端，多数据库支持、原生体验好。', 'https://tableplus.com/', 'tool-devstart', 'dev-db', ['Windows', 'macOS', 'Linux'], '免费增值', ['数据库', '高颜值'], '', 'https://docs.tableplus.com/', ['DBeaver', 'Navicat']),
  T('Postman', 'API 调试与协作平台，接口测试、文档与自动化一站式。', 'https://www.postman.com/', 'tool-devstart', 'dev-api', ['Windows', 'macOS', 'Linux', 'Web'], '免费增值', ['API 调试', '接口测试'], '', 'https://learning.postman.com/', ['Apifox', 'Insomnia']),
  T('Apifox', '国产 API 一体化协作平台，接口文档、调试与 Mock 集成。', 'https://www.apifox.cn/', 'tool-devstart', 'dev-api', ['Windows', 'macOS', 'Linux', 'Web'], '免费增值', ['国产', 'API 调试'], '', 'https://www.apifox.cn/help/app/', ['Postman', 'Insomnia']),

  /* ============================== PDF 工具 ============================== */
  T('Adobe Acrobat Reader', 'PDF 官方阅读器，查看、注释与填写表单兼容最好。', 'https://www.adobe.com/acrobat/pdf-reader.html', 'tool-pdf', 'pdf-read', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['PDF 阅读', '官方'], '', 'https://helpx.adobe.com/acrobat.html', ['Foxit PDF Reader', 'PDF24 Creator']),
  T('Foxit PDF Reader', '轻快的 PDF 阅读与注释工具，启动快、功能全。', 'https://www.foxitsoftware.com/pdf-reader/', 'tool-pdf', 'pdf-read', ['Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['PDF 阅读', '轻量'], '', 'https://www.foxitsoftware.com/support/', ['Adobe Acrobat Reader', 'Okular']),
  T('PDF24 Creator', '免费 PDF 工具箱：合并、拆分、压缩、转 Word 全都有。', 'https://www.pdf24.org/', 'tool-pdf', 'pdf-read', ['Windows'], '免费', ['PDF 工具箱', '免费'], '', 'https://www.pdf24.org/en/faq/', ['Smallpdf', 'ILovePDF']),
  T('Okular', '开源 PDF 与文档查看器，注释与表单支持好（KDE 出品）。', 'https://okular.kde.org/', 'tool-pdf', 'pdf-read', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', 'PDF 阅读'], '', 'https://docs.kde.org/', ['Adobe Acrobat Reader', 'Foxit PDF Reader']),
  T('Smallpdf', '在线 PDF 处理瑞士军刀：转换、压缩、编辑、签名。', 'https://smallpdf.com/', 'tool-pdf', 'pdf-convert', ['Web'], '免费增值', ['在线', 'PDF 转换'], '', 'https://smallpdf.com/helpcenter', ['ILovePDF', 'PDF24 Creator']),
  T('ILovePDF', '在线 PDF 处理工具，合并拆分、压缩转格式一站式。', 'https://www.ilovepdf.com/', 'tool-pdf', 'pdf-convert', ['Web'], '免费增值', ['在线', 'PDF 转换'], '', 'https://www.ilovepdf.com/help', ['Smallpdf', 'PDF24 Creator']),
  T('PDF Arranger', '开源 PDF 页面合并、拆分与重排工具。', 'https://github.com/pdfarranger/pdfarranger', 'tool-pdf', 'pdf-convert', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', 'PDF 拆分'], 'pdfarranger/pdfarranger', 'https://github.com/pdfarranger/pdfarranger#readme', ['PDF24 Creator', 'Smallpdf']),

  /* ============================== OCR / 扫描 ============================= */
  T('Umi-OCR', '免费开源离线 OCR 工具，批量截图识别、文字提取速度快。', 'https://github.com/hiroi-sora/Umi-OCR', 'tool-ocr', 'ocr-tool', ['Windows', 'Linux'], '开源免费', ['离线 OCR', '免费'], 'hiroi-sora/Umi-OCR', 'https://github.com/hiroi-sora/Umi-OCR/wiki', ['PaddleOCR', 'Tesseract']),
  T('PaddleOCR', '百度开源 OCR 引擎，中英文识别准确、支持多语言。', 'https://github.com/PaddlePaddle/PaddleOCR', 'tool-ocr', 'ocr-tool', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '中文识别'], 'PaddlePaddle/PaddleOCR', 'https://paddleocr.readthedocs.io/', ['Umi-OCR', 'Tesseract']),
  T('Tesseract OCR', '最经典的开源 OCR 引擎，支持上百种语言。', 'https://github.com/tesseract-ocr/tesseract', 'tool-ocr', 'ocr-tool', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '多语言'], 'tesseract-ocr/tesseract', 'https://github.com/tesseract-ocr/tesseract/blob/main/doc/', ['PaddleOCR', 'Umi-OCR']),
  T('ABBYY FineReader', '老牌商业 OCR 软件，版面还原与识别精度业内领先。', 'https://www.abbyy.com/finereader/', 'tool-ocr', 'ocr-tool', ['Windows', 'macOS'], '付费', ['商业 OCR', '高精度'], '', 'https://support.abbyy.com/', ['PaddleOCR', 'Umi-OCR']),
  T('白描', '国产 OCR 工具，图片/截图转文字、表格识别体验好。', 'https://www.baimiaoapp.com/', 'tool-ocr', 'ocr-tool', ['Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['国产', '图片转文字'], '', 'https://www.baimiaoapp.com/', ['Umi-OCR', '扫描全能王']),
  T('扫描全能王 CamScanner', '手机扫描 App，拍照生成 PDF、证件扫描与 OCR。', 'https://www.camscanner.com/', 'tool-ocr', 'ocr-scan', ['iOS', 'Android', 'Web'], '免费增值', ['手机扫描', 'PDF'], '', 'https://www.camscanner.com/help', ['白描', 'Adobe Scan']),

  /* ============================== 录屏 / 直播 =========================== */
  T('OBS Studio', '免费开源录屏与直播推流软件，功能专业、主播标配。', 'https://obsproject.com/', 'tool-record', 'record-live', ['Windows', 'macOS', 'Linux'], '开源免费', ['直播', '录屏'], 'obsproject/obs-studio', 'https://obsproject.com/wiki/', ['Streamlabs', 'Bandicam']),
  T('Streamlabs Desktop', '基于 OBS 的直播工具，内置主题、警报与打赏集成。', 'https://streamlabs.com/', 'tool-record', 'record-live', ['Windows', 'macOS'], '免费增值', ['直播', '主题'], '', 'https://support.streamlabs.com/', ['OBS Studio']),
  T('Bandicam', '老牌游戏录屏软件，高清录制、性能占用低。', 'https://www.bandicam.com/', 'tool-record', 'record-tool', ['Windows'], '免费增值', ['录屏', '游戏'], '', 'https://www.bandicam.com/support/', ['OBS Studio', 'ShareX']),
  T('ShareX', '开源截图录屏与上传工具，自动化工作流极强。', 'https://getsharex.com/', 'tool-record', 'record-tool', ['Windows'], '开源免费', ['开源', '录屏'], 'ShareX/ShareX', 'https://github.com/ShareX/ShareX/wiki', ['OBS Studio', 'Bandicam']),
  T('Loom', '浏览器录屏工具，录制带摄像头的小视频分享给同事，团队协作好用。', 'https://www.loom.com/', 'tool-record', 'record-tool', ['Web', 'Windows', 'macOS', 'Extension'], '免费增值', ['录屏分享', '协作'], '', 'https://support.loom.com/', ['OBS Studio', 'Bandicam']),

  /* ============================== 远程控制 ============================== */
  T('RustDesk', '开源远程桌面工具，可自建服务器，TeamViewer 的开源替代。', 'https://rustdesk.com/', 'tool-remote', 'remote-tool', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['开源', '自建服务器'], 'rustdesk/rustdesk', 'https://rustdesk.com/docs/', ['TeamViewer', 'AnyDesk', 'ToDesk']),
  T('TeamViewer', '老牌远程控制软件，穿透能力强、跨平台支持全。', 'https://www.teamviewer.com/', 'tool-remote', 'remote-tool', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['远程桌面', '老牌'], '', 'https://www.teamviewer.com/support/', ['AnyDesk', 'RustDesk', 'ToDesk']),
  T('AnyDesk', '轻快的远程桌面工具，连接稳定、占用低。', 'https://anydesk.com/', 'tool-remote', 'remote-tool', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['远程桌面', '轻量'], '', 'https://support.anydesk.com/', ['TeamViewer', 'RustDesk']),
  T('ToDesk', '国产远程控制工具，国内连接速度快、操作简洁。', 'https://www.todesk.com/', 'tool-remote', 'remote-tool', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['国产', '远程桌面'], '', 'https://www.todesk.com/help', ['向日葵', 'TeamViewer', 'RustDesk']),
  T('向日葵', '国产远程控制与远程办公工具，设备绑定与开机唤醒方便。', 'https://sunlogin.oray.com/', 'tool-remote', 'remote-tool', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['国产', '远程唤醒'], '', 'https://service.oray.com/', ['ToDesk', 'TeamViewer']),
  T('Parsec', '主打低延迟远程游戏与高性能远程桌面。', 'https://parsec.app/', 'tool-remote', 'remote-tool', ['Windows', 'macOS', 'Linux', 'Android'], '免费增值', ['低延迟', '远程游戏'], '', 'https://support.parsec.app/', ['TeamViewer', 'AnyDesk']),

  /* ========================== 思维导图 / 白板 =========================== */
  T('XMind', '颜值与功能兼备的思维导图软件，模板丰富、跨平台。', 'https://xmind.com/', 'tool-mind', 'mind-map', ['Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['思维导图', '高颜值'], '', 'https://xmind.com/support/', ['MindMaster', 'FreeMind']),
  T('MindMaster 亿图脑图', '国产思维导图工具，模板多、兼容性好。', 'https://www.edrawsoft.cn/mindmaster/', 'tool-mind', 'mind-map', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '思维导图'], '', 'https://www.edrawsoft.cn/support/', ['XMind', 'FreeMind']),
  T('FreeMind', '经典开源思维导图软件，轻量、跨平台。', 'https://freemind.sourceforge.net/', 'tool-mind', 'mind-map', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '思维导图'], '', 'https://freemind.sourceforge.net/wiki/', ['XMind', 'MindMaster']),
  T('Excalidraw', '开源在线手绘风白板，画流程图、草图与架构图轻松。', 'https://excalidraw.com/', 'tool-mind', 'mind-board', ['Web'], '开源免费', ['在线白板', '手绘风'], 'excalidraw/excalidraw', 'https://github.com/excalidraw/excalidraw/wiki', ['Miro', 'boardmix']),
  T('Miro', '知名在线协作白板，头脑风暴、看板与设计协作一体。', 'https://miro.com/', 'tool-mind', 'mind-board', ['Web', 'Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['在线白板', '协作'], '', 'https://help.miro.com/', ['Excalidraw', 'boardmix']),
  T('boardmix 博思白板', '国产在线白板，无限画布、脑图与文档一体。', 'https://boardmix.cn/', 'tool-mind', 'mind-board', ['Web', 'Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['国产', '在线白板'], '', 'https://boardmix.cn/help', ['Miro', 'Excalidraw']),

  /* ============================== 网盘 / 云存储 ========================= */
  T('百度网盘', '国内用户量最大的网盘，资源分享与大文件存储常用。', 'https://pan.baidu.com/', 'tool-cloud', 'cloud-drive', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '网盘'], '', 'https://pan.baidu.com/help', ['阿里云盘', '夸克网盘']),
  T('阿里云盘', '阿里旗下网盘，下载不限速、界面清爽。', 'https://www.alipan.com/', 'tool-cloud', 'cloud-drive', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '不限速'], '', 'https://www.alipan.com/', ['百度网盘', '夸克网盘']),
  T('夸克网盘', '夸克浏览器旗下网盘，AI 扫描与资源空间整合。', 'https://pan.quark.cn/', 'tool-cloud', 'cloud-drive', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '网盘'], '', 'https://pan.quark.cn/', ['百度网盘', '阿里云盘']),
  T('Google Drive', '谷歌云盘，与 Docs / Gmail 深度整合，协作方便。', 'https://drive.google.com/', 'tool-cloud', 'cloud-drive', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['海外', '协作'], '', 'https://support.google.com/drive/', ['OneDrive', 'Dropbox']),
  T('OneDrive', '微软云盘，与 Windows / Office 深度整合。', 'https://www.microsoft.com/microsoft-365/onedrive/', 'tool-cloud', 'cloud-drive', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['微软', '办公集成'], '', 'https://support.microsoft.com/onedrive', ['Google Drive', 'Dropbox']),
  T('Dropbox', '老牌云盘，文件同步稳定、共享链接好用。', 'https://www.dropbox.com/', 'tool-cloud', 'cloud-drive', ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Web'], '免费增值', ['海外', '同步'], '', 'https://help.dropbox.com/', ['Google Drive', 'OneDrive']),
  T('MEGA', '加密云盘，免费空间大、端到端加密。', 'https://mega.nz/', 'tool-cloud', 'cloud-drive', ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Web'], '免费增值', ['加密', '大空间'], '', 'https://help.mega.nz/', ['Dropbox', 'Google Drive']),
  T('rclone', '命令行云盘管理工具，支持数十种云存储同步与挂载。', 'https://rclone.org/', 'tool-cloud', 'cloud-client', ['Windows', 'macOS', 'Linux'], '开源免费', ['命令行', '多网盘'], '', 'https://rclone.org/docs/', ['FreeFileSync', 'Syncthing']),
  T('alist', '开源网盘聚合工具，把各种网盘挂载成一个统一列表。', 'https://github.com/alist-org/alist', 'tool-cloud', 'cloud-client', ['Windows', 'macOS', 'Linux', 'Web'], '开源免费', ['开源', '网盘聚合'], 'alist-org/alist', 'https://alist.nn.ci/guide/', ['rclone']),

  /* ============================== 阅读 / 电子书 ========================= */
  T('微信读书', '微信生态阅读 App，社交化读书、书单与划线笔记方便。', 'https://weread.qq.com/', 'tool-read', 'read-app', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '社交阅读'], '', 'https://weread.qq.com/', ['掌阅', 'Kindle']),
  T('掌阅 iReader', '老牌电子书阅读 App，书城资源丰富、排版舒适。', 'https://www.ireader.com.cn/', 'tool-read', 'read-app', ['iOS', 'Android'], '免费增值', ['国产', '电子书'], '', 'https://www.ireader.com.cn/', ['微信读书', 'Kindle']),
  T('Kindle App', '亚马逊电子书阅读器 App，匹配 Kindle 书城与同步。', 'https://www.amazon.com/kindle', 'tool-read', 'read-app', ['iOS', 'Android', 'Web'], '免费', ['亚马逊', '电子书'], '', 'https://www.amazon.com/gp/help/customer/display.html', ['微信读书', '掌阅']),
  T('Calibre', '开源电子书管理工具，格式转换、整理书架与推送阅读器。', 'https://calibre-ebook.com/', 'tool-read', 'read-mgr', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '电子书管理'], '', 'https://manual.calibre-ebook.com/', ['Sigil']),
  T('Sigil', '开源 EPUB 电子书编辑器，制作与修改电子书。', 'https://sigil-ebook.com/', 'tool-read', 'read-mgr', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', 'EPUB 编辑'], '', 'https://github.com/Sigil-Ebook/Sigil/wiki', ['Calibre']),

  /* ============================== 日程 / 待办 =========================== */
  T('滴答清单', '国人常用的待办与日程管理 App，清单、番茄钟与日历一体。', 'https://dida365.com/', 'tool-time', 'time-task', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '待办清单'], '', 'https://dida365.com/help', ['Microsoft To Do', 'Things 3']),
  T('Microsoft To Do', '微软免费待办清单，与 Outlook / Office 同步。', 'https://todo.microsoft.com/', 'tool-time', 'time-task', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费', ['微软', '待办清单'], '', 'https://support.microsoft.com/todo', ['滴答清单', 'Google Tasks']),
  T('Google 日历', '谷歌日历，日程规划、共享日历与提醒。', 'https://calendar.google.com/', 'tool-time', 'time-task', ['iOS', 'Android', 'Web'], '免费', ['海外', '日历'], '', 'https://support.google.com/calendar/', ['Microsoft To Do', '飞书日历']),
  T('Forest 专注森林', '番茄钟式专注 App，种树养成戒手机习惯。', 'https://www.forestapp.cc/', 'tool-time', 'time-focus', ['iOS', 'Android', 'Extension'], '付费', ['专注', '番茄钟'], '', 'https://www.forestapp.cc/help/', ['番茄 ToDo']),
  T('番茄 ToDo', '国产番茄钟与专注管理 App，自习与工作安排好用。', 'https://www.fqtodo.cn/', 'tool-time', 'time-focus', ['iOS', 'Android'], '免费增值', ['国产', '番茄钟'], '', 'https://www.fqtodo.cn/', ['Forest 专注森林']),

  /* ================ neko233 专用软件（自研，代替主流工具） ================ */
  // 网络 / 代理
  T('proxysss', 'neko233 自研可编程代理网关：TCP / UDP / HTTP 全支持，可用 TypeScript / JavaScript 编写业务规则，代替 Nginx 做流量入口与转发。', 'https://github.com/neko233-com/proxysss', 'tool-neko', 'neko-net', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '代理网关', '代替 Nginx', '可编程规则'], 'neko233-com/proxysss', 'https://github.com/neko233-com/proxysss#readme', ['Nginx', 'Caddy', 'Mihomo (Clash Meta)']),
  T('netflow', '原生 Go + Mihomo 桌面代理客户端（开发预览），规则分流与节点管理一体，代替 Clash Verge Rev。', 'https://github.com/neko233-com/netflow', 'tool-neko', 'neko-net', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'Mihomo', '代替 Clash Verge'], 'neko233-com/netflow', 'https://github.com/neko233-com/netflow#readme', ['Clash Verge Rev', 'Mihomo Party', 'NekoRay']),
  T('clash-go', 'Windows 优先的原生 Rust + GPUI Mihomo 客户端，附 Agent CLI，代替 Clash for Windows。', 'https://github.com/neko233-com/clash-go', 'tool-neko', 'neko-net', ['Windows'], '开源免费', ['自研', 'Rust', 'Mihomo 客户端'], 'neko233-com/clash-go', 'https://github.com/neko233-com/clash-go#readme', ['Clash Verge Rev', 'netflow', 'Mihomo Party']),
  T('vpn233-all', '自建代理订阅、服务商部署与本地代理工具套件，一条龙搞定分享与部署。', 'https://github.com/neko233-com/vpn233-all', 'tool-neko', 'neko-net', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '自建订阅', '服务商部署'], 'neko233-com/vpn233-all', 'https://github.com/neko233-com/vpn233-all#readme', ['proxysss', 'netflow', 'clash-go']),
  T('acme233', 'Go 编写的 ACME 证书签发与管理工具，轻量好部署，代替 certbot。', 'https://github.com/neko233-com/acme233', 'tool-neko', 'neko-net', ['Windows', 'macOS', 'Linux'], '免费', ['自研', 'ACME', '证书', '代替 certbot'], 'neko233-com/acme233', 'https://github.com/neko233-com/acme233#readme', ['certbot', 'proxysss', 'Caddy']),
  T('netdebug', '隐私优先的跨平台网络诊断 CLI，连通性、延迟与路由排查一把抓，代替 ping / traceroute 组合。', 'https://github.com/neko233-com/netdebug', 'tool-neko', 'neko-net', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '网络诊断', 'CLI'], 'neko233-com/netdebug', 'https://github.com/neko233-com/netdebug#readme', ['ping', 'traceroute', 'acme233']),
  T('openremote', '开源可自建远程桌面，RustDesk 风格中继核心 + 一条命令部署，代替 TeamViewer。', 'https://github.com/neko233-com/openremote', 'tool-neko', 'neko-net', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '远程桌面', '自建', '代替 TeamViewer'], 'neko233-com/openremote', 'https://github.com/neko233-com/openremote#readme', ['RustDesk', 'TeamViewer', 'ToDesk']),
  T('ssh-gui-by-neko233', '全平台原生 SSH 图形客户端，会话管理与连接体验简洁，代替 Xshell。', 'https://github.com/neko233-com/ssh-gui-by-neko233', 'tool-neko', 'neko-net', ['Windows', 'macOS', 'Linux'], '免费', ['自研', 'SSH', '代替 Xshell'], 'neko233-com/ssh-gui-by-neko233', 'https://github.com/neko233-com/ssh-gui-by-neko233#readme', ['Xshell', 'catsh', 'nekossh']),
  // 开发 / 编译
  T('git-next', '实验性自包含 Git 兼容客户端：原生 SSH、实测性能与清晰兼容策略，代替 Git CLI。', 'https://github.com/neko233-com/git-next', 'tool-neko', 'neko-dev', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'Git 兼容', '原生 SSH', '代替 Git'], 'neko233-com/git-next', 'https://github.com/neko233-com/git-next#readme', ['Git', 'GitHub Desktop', 'gitsss']),
  T('git-terminal', '为 git-next 打造的原生多标签终端（Rust + GPUI），代替 Git Bash。', 'https://github.com/neko233-com/git-terminal', 'tool-neko', 'neko-dev', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'Git 终端', 'GPUI'], 'neko233-com/git-terminal', 'https://github.com/neko233-com/git-terminal#readme', ['Git Bash', 'winshell', 'git-next']),
  T('gitsss', '自托管的轻量协作与交付平台，聚焦代码托管与发布流程，代替 GitHub / GitLab 自建实例。', 'https://github.com/neko233-com/gitsss', 'tool-neko', 'neko-dev', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '代码托管', '自托管', '代替 GitLab'], 'neko233-com/gitsss', 'https://github.com/neko233-com/gitsss#readme', ['GitHub', 'GitLab', 'gitea233-cli']),
  T('buildworld', '自托管 CI/CD 服务器，构建流水线、自动化与部署一体，代替 Jenkins。', 'https://github.com/neko233-com/buildworld', 'tool-neko', 'neko-dev', ['Windows', 'macOS', 'Linux'], '免费', ['自研', 'CI/CD', '代替 Jenkins', '流水线'], 'neko233-com/buildworld', 'https://github.com/neko233-com/buildworld#readme', ['Jenkins', 'GitLab CI', 'server-task-scheduler']),
  T('cnext', 'Go 1.26 编写的新一代 C/C++ 编译器：易维护、跨平台一致、一键安装，代替 GCC / Clang。', 'https://github.com/neko233-com/cnext', 'tool-neko', 'neko-dev', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'C/C++ 编译器', '代替 GCC'], 'neko233-com/cnext', 'https://github.com/neko233-com/cnext#readme', ['GCC', 'Clang', 'cnext-cloud']),
  T('winshell', 'Rust + GPUI 原生多标签终端，独立 Bash、多语言 UI 与实时状态，代替 Windows Terminal。', 'https://github.com/neko233-com/winshell', 'tool-neko', 'neko-dev', ['Windows', 'macOS'], '开源免费', ['自研', '终端', 'GPUI', '多标签'], 'neko233-com/winshell', 'https://github.com/neko233-com/winshell#readme', ['Windows Terminal', 'git-terminal', 'catsh']),
  T('gocode', 'Go 1.27 原生编辑器，VS Code 风格工作台 + godesktop 驱动，代替 VS Code 写 Go。', 'https://github.com/neko233-com/gocode', 'tool-neko', 'neko-dev', ['Windows', 'macOS'], '开源免费', ['自研', 'Go 编辑器', '代替 VS Code'], 'neko233-com/gocode', 'https://github.com/neko233-com/gocode#readme', ['Visual Studio Code', 'Cursor', 'rcode']),
  T('rcode', '基于 rdesktop 的 Rust 编辑器，VS Code 风格界面，轻量原生体验，代替 VS Code。', 'https://github.com/neko233-com/rcode', 'tool-neko', 'neko-dev', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'Rust 编辑器', '代替 VS Code'], 'neko233-com/rcode', 'https://github.com/neko233-com/rcode#readme', ['Visual Studio Code', 'gocode', 'Zed']),
  T('codets', '纯 Rust 的 JavaScript / TypeScript 引擎，原生支持 TS，可嵌入任意应用，代替 Node.js 嵌入式运行时。', 'https://github.com/neko233-com/codets', 'tool-neko', 'neko-dev', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'JS/TS 引擎', 'Rust', '嵌入式'], 'neko233-com/codets', 'https://github.com/neko233-com/codets#readme', ['Node.js', 'Deno', 'Bun']),
  T('gitea233-cli', 'Agent 优先的 Gitea 服务管理 CLI，仓库、成员与运维操作命令行化，代替 Gitea Web 后台。', 'https://github.com/neko233-com/gitea233-cli', 'tool-neko', 'neko-dev', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'Gitea', 'CLI', 'Agent 优先'], 'neko233-com/gitea233-cli', 'https://github.com/neko233-com/gitea233-cli#readme', ['gitsss', 'GitHub CLI', 'git-next']),
  // 运维 / 数据
  T('mydb', 'Rust 编写的 MySQL 8.x 兼容数据库，可平替接入、性能更高，代替 MySQL。', 'https://github.com/neko233-com/mydb', 'tool-neko', 'neko-ops', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'MySQL 兼容', '数据库', 'Rust'], 'neko233-com/mydb', 'https://github.com/neko233-com/mydb#readme', ['MySQL', 'localdb', 'dbproxy233']),
  T('localdb', '多平台嵌入式数据库，SQLite 替代方案，提供 C / C++ / Rust / Go / Swift / Kotlin 等绑定。', 'https://github.com/neko233-com/localdb', 'tool-neko', 'neko-ops', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['自研', '嵌入式数据库', '代替 SQLite'], 'neko233-com/localdb', 'https://github.com/neko233-com/localdb#readme', ['SQLite', 'mydb', 'localdb-cli']),
  T('dbbackup233', '轻量数据库备份 CLI，配置简单、便于定时任务编排，代替手写 mysqldump 脚本。', 'https://github.com/neko233-com/dbbackup233', 'tool-neko', 'neko-ops', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '数据库备份', 'CLI'], 'neko233-com/dbbackup233', 'https://github.com/neko233-com/dbbackup233#readme', ['mysqldump', 'pg_dump', 'rsync233']),
  T('rsync233', 'Go 实现的跨平台 rsync，文件同步传输不依赖系统环境，代替 rsync。', 'https://github.com/neko233-com/rsync233', 'tool-neko', 'neko-ops', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '文件同步', '跨平台', '代替 rsync'], 'neko233-com/rsync233', 'https://github.com/neko233-com/rsync233#readme', ['rsync', 'FreeFileSync', 'Syncthing']),
  T('nekosearch', 'Rust 自建搜索服务器：默认单机、可集群水平扩展、注册中心管理爬虫执行器，代替 Elasticsearch。', 'https://github.com/neko233-com/nekosearch', 'tool-neko', 'neko-ops', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '搜索引擎', '自建', '代替 Elasticsearch'], 'neko233-com/nekosearch', 'https://github.com/neko233-com/nekosearch#readme', ['Elasticsearch', 'Algolia', 'graphify233']),
  T('metrics233-all', '单机指标采集 + SQLite 存储 + Grafana 风格面板，一个 Go 二进制搞定监控，代替 Prometheus + Grafana。', 'https://github.com/neko233-com/metrics233-all', 'tool-neko', 'neko-ops', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '指标监控', '自托管', '代替 Grafana'], 'neko233-com/metrics233-all', 'https://github.com/neko233-com/metrics233-all#readme', ['Prometheus', 'Grafana', 'Sentinel233']),
  T('Sentinel233', '存储 + 指标 UI，类似 Prometheus Agent + Grafana 的轻量组合。', 'https://github.com/neko233-com/Sentinel233', 'tool-neko', 'neko-ops', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '可观测', '指标 UI'], 'neko233-com/Sentinel233', 'https://github.com/neko233-com/Sentinel233#readme', ['metrics233-all', 'Prometheus', 'Grafana']),
  T('server-task-scheduler', '分布式任务调度与派发中心（XXL-JOB 思路）：自动注册 worker、集中管理任务，代替 XXL-JOB。', 'https://github.com/neko233-com/server-task-scheduler', 'tool-neko', 'neko-ops', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '任务调度', '分布式', '代替 XXL-JOB'], 'neko233-com/server-task-scheduler', 'https://github.com/neko233-com/server-task-scheduler#readme', ['XXL-JOB', 'buildworld', 'Cron']),
  T('linuxsafe', 'Linux 安全 agent：自动化威胁检测、调查与修复，代替重型 HIDS。', 'https://github.com/neko233-com/linuxsafe', 'tool-neko', 'neko-ops', ['Linux'], '免费', ['自研', 'Linux 安全', '威胁检测'], 'neko233-com/linuxsafe', 'https://github.com/neko233-com/linuxsafe#readme', ['OSSEC', 'banhack233', 'Wazuh']),
  T('banhack233', '主机防护：更安全的 SSH 口令防御、办公白名单、审计、保活与中英文告警，代替 fail2ban。', 'https://github.com/neko233-com/banhack233', 'tool-neko', 'neko-ops', ['Linux', 'Windows'], '免费', ['自研', 'SSH 防护', '代替 fail2ban', '审计'], 'neko233-com/banhack233', 'https://github.com/neko233-com/banhack233#readme', ['fail2ban', 'linuxsafe', 'jumpserver233']),
  T('jumpserver233', '面向 Agent 时代的轻量堡垒机：安全、小巧、易部署，代替 JumpServer。', 'https://github.com/neko233-com/jumpserver233', 'tool-neko', 'neko-ops', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '堡垒机', '代替 JumpServer', 'Agent'], 'neko233-com/jumpserver233', 'https://github.com/neko233-com/jumpserver233#readme', ['JumpServer', 'uniops', 'banhack233']),
  // 桌面效率
  T('ihub', '极速可扩展桌面命令中枢：本地搜索 + 插件体系，代替 Raycast / Alfred。', 'https://github.com/neko233-com/ihub', 'tool-neko', 'neko-desk', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '命令面板', '插件', '代替 Raycast'], 'neko233-com/ihub', 'https://github.com/neko233-com/ihub#readme', ['Raycast', 'Alfred', 'Listary']),
  T('filespace233-windows', 'WinUI 3 高性能文件工作区，面向重度 Windows 用户，代替 Everything + 资源管理器。', 'https://github.com/neko233-com/filespace233-windows', 'tool-neko', 'neko-desk', ['Windows'], '开源免费', ['自研', '文件管理', 'WinUI 3'], 'neko233-com/filespace233-windows', 'https://github.com/neko233-com/filespace233-windows#readme', ['Everything', 'Listary', 'WizTree']),
  T('Wallpaper233', 'Windows 原生动态壁纸工具，无需 Steam 依赖，代替 Wallpaper Engine。', 'https://github.com/neko233-com/Wallpaper233', 'tool-neko', 'neko-desk', ['Windows'], '开源免费', ['自研', '动态壁纸', '代替 Wallpaper Engine'], 'neko233-com/Wallpaper233', 'https://github.com/neko233-com/Wallpaper233#readme', ['Wallpaper Engine', 'ihub', 'SystemMonitorX']),
  T('translator233', '本地翻译桌面应用与 CLI，面向 Agent 可调用，代替 DeepL 桌面客户端。', 'https://github.com/neko233-com/translator233', 'tool-neko', 'neko-desk', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '本地翻译', 'CLI', 'Agent'], 'neko233-com/translator233', 'https://github.com/neko233-com/translator233#readme', ['DeepL Translate', '沉浸式翻译', 'Bob']),
  T('mdx', 'Windows / macOS Markdown 桌面工作台，专注写作与文件管理，代替 Typora。', 'https://github.com/neko233-com/mdx', 'tool-neko', 'neko-desk', ['Windows', 'macOS'], '开源免费', ['自研', 'Markdown', '代替 Typora', '桌面端'], 'neko233-com/mdx', 'https://github.com/neko233-com/mdx#readme', ['Typora', 'markdown233', 'Obsidian']),
  T('markdown233', 'Vite + Tauri 跨平台 Markdown 编辑器，体验对齐 Typora，代替 Typora。', 'https://github.com/neko233-com/markdown233', 'tool-neko', 'neko-desk', ['Windows', 'macOS', 'Linux'], '免费', ['自研', 'Markdown 编辑器', 'Tauri'], 'neko233-com/markdown233', 'https://github.com/neko233-com/markdown233#readme', ['Typora', 'mdx', 'Obsidian']),
  T('SystemMonitorX', 'Rust + GPUI 原生系统监控与任务管理器，进程、GPU / DX12 硬件信息稳定展示，代替任务管理器。', 'https://github.com/neko233-com/SystemMonitorX', 'tool-neko', 'neko-desk', ['Windows'], '开源免费', ['自研', '系统监控', 'GPUI', '任务管理器'], 'neko233-com/SystemMonitorX', 'https://github.com/neko233-com/SystemMonitorX#readme', ['Windows 任务管理器', 'WizTree', 'Dism++']),
  T('reinstall233-windows', 'Windows 重装 + 分盘工具（Go Wails V3 + React），原生 CLI 可供 Agent 调用，代替 DiskGenius。', 'https://github.com/neko233-com/reinstall233-windows', 'tool-neko', 'neko-desk', ['Windows'], '免费', ['自研', '重装系统', '分盘', 'Agent CLI'], 'neko233-com/reinstall233-windows', 'https://github.com/neko233-com/reinstall233-windows#readme', ['DiskGenius', 'Dism++', 'WinDownloader233']),
  T('AndroidSimulator233', '开源安卓模拟器，MuMu 替代方案，轻量可定制。', 'https://github.com/neko233-com/AndroidSimulator233', 'tool-neko', 'neko-desk', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '安卓模拟器', '代替 MuMu'], 'neko233-com/AndroidSimulator233', 'https://github.com/neko233-com/AndroidSimulator233#readme', ['MuMu 模拟器', 'BlueStacks', 'UnityStarter']),
  T('UnityStarter', 'Unity Hub 与团结 Hub 二合一轻量管理器：项目管理、安装、多语言下载与发布，代替 Unity Hub。', 'https://github.com/neko233-com/UnityStarter', 'tool-neko', 'neko-desk', ['Windows', 'macOS'], '开源免费', ['自研', 'Unity Hub', '代替 Unity Hub', '游戏开发'], 'neko233-com/UnityStarter', 'https://github.com/neko233-com/UnityStarter#readme', ['Unity Hub', 'AndroidSimulator233', 'WinDownloader233']),
  T('WinDownloader233', '游戏开发工具一键安装管理器（winget 驱动），新机环境搭建省事，代替手动逐个安装。', 'https://github.com/neko233-com/WinDownloader233', 'tool-neko', 'neko-desk', ['Windows'], '免费', ['自研', '工具安装', '游戏开发', 'winget'], 'neko233-com/WinDownloader233', 'https://github.com/neko233-com/WinDownloader233#readme', ['winget', 'UnityStarter', 'reinstall233-windows']),
  // 媒体 / 创作
  T('web2video', 'HTML 转 MP4 生产级 CLI（Go + HyperFrames），用网页做视频，代替录屏 + 剪辑流程。', 'https://github.com/neko233-com/web2video', 'tool-neko', 'neko-media', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'HTML 转视频', 'CLI', 'MP4'], 'neko233-com/web2video', 'https://github.com/neko233-com/web2video#readme', ['OBS Studio', 'FFmpeg', 'archanim']),
  T('ai-music-enhancer', '离线 AI 音频增强：Rust CLI + WebAssembly 工作台，默认本地 CPU AudioSR，代替在线音频修复。', 'https://github.com/neko233-com/ai-music-enhancer', 'tool-neko', 'neko-media', ['Windows', 'macOS', 'Linux', 'Web'], '开源免费', ['自研', '音频增强', '离线 AI', 'WASM'], 'neko233-com/ai-music-enhancer', 'https://github.com/neko233-com/ai-music-enhancer#readme', ['Adobe Audition', '在线降噪', 'image-cli']),
  T('image-cli', '图片优化 / 转换 / 修复 CLI，批处理和自动化友好，代替 ImageMagick 常用流程。', 'https://github.com/neko233-com/image-cli', 'tool-neko', 'neko-media', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '图片处理', 'CLI', '批处理'], 'neko233-com/image-cli', 'https://github.com/neko233-com/image-cli#readme', ['ImageMagick', 'Squoosh', 'ai-music-enhancer']),
  T('archanim', '纯 Go 架构动画图生成，面向人和 Agent 表达系统结构，代替手工制作动图。', 'https://github.com/neko233-com/archanim', 'tool-neko', 'neko-media', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '架构图', '动画', 'Agent'], 'neko233-com/archanim', 'https://github.com/neko233-com/archanim#readme', ['Excalidraw', 'Miro', 'web2video']),
  T('MarkdownX', '交互式书籍工具：Markdown + DocxXML + Canvas / HTML 实验，一个 .mdxb 打包桌面阅读，代替静态 Markdown 站点。', 'https://github.com/neko233-com/MarkdownX', 'tool-neko', 'neko-media', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '交互式书籍', 'Markdown', '桌面阅读'], 'neko233-com/MarkdownX', 'https://github.com/neko233-com/MarkdownX#readme', ['Typora', 'mdx', 'Calibre']),
  // AI / Agent
  T('acdesktop', '为 AI Agent 提供可靠的桌面操作能力：看屏幕、点击与操作应用，代替闭源 Computer Use 方案。', 'https://github.com/neko233-com/acdesktop', 'tool-neko', 'neko-agent', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'Agent 桌面操作', 'Computer Use'], 'neko233-com/acdesktop', 'https://github.com/neko233-com/acdesktop#readme', ['dsh-desktop', 'deepseekx', 'computer-use']),
  T('deepseekx', 'DeepSeek Harness 桥接层：一行命令傻瓜式下载 + 配置，全平台开箱即用（Rust 实现）。', 'https://github.com/neko233-com/deepseekx', 'tool-neko', 'neko-agent', ['Windows', 'macOS', 'Linux'], '免费', ['自研', 'DSH', '一键安装', 'Rust'], 'neko233-com/deepseekx', 'https://github.com/neko233-com/deepseekx#readme', ['dsh-desktop', 'acdesktop', 'Cursor']),
  T('dsh-desktop', 'DeepSeek 优先的 Rust 桌面外壳，把 Harness 变成开箱即用的桌面应用。', 'https://github.com/neko233-com/dsh-desktop', 'tool-neko', 'neko-agent', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', 'DSH 桌面端', 'Rust'], 'neko233-com/dsh-desktop', 'https://github.com/neko233-com/dsh-desktop#readme', ['deepseekx', 'acdesktop', 'Visual Studio Code']),
  T('codegraph233', '面向游戏项目的 AST GraphRAG MCP Server：C# / Go 代码图 + prefab / 场景 / shader / 配置表，代替手工建图谱。', 'https://github.com/neko233-com/codegraph233', 'tool-neko', 'neko-agent', ['Windows', 'macOS', 'Linux'], '开源免费', ['自研', '代码图谱', 'MCP', 'GraphRAG'], 'neko233-com/codegraph233', 'https://github.com/neko233-com/codegraph233#readme', ['graphify233', 'deepseekx', 'acdesktop']),
  T('graphify233', 'Go 1.27 重写的高性能知识图谱构建器，零依赖、速度快，代替 Python 版 Graphify。', 'https://github.com/neko233-com/graphify233', 'tool-neko', 'neko-agent', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '知识图谱', 'Go', '零依赖'], 'neko233-com/graphify233', 'https://github.com/neko233-com/graphify233#readme', ['codegraph233', 'nekosearch', 'Obsidian']),
  T('redlens', '红队漏洞扫描与报告工具，面向授权测试的流程化输出，代替商业漏扫。', 'https://github.com/neko233-com/redlens', 'tool-neko', 'neko-agent', ['Windows', 'macOS', 'Linux'], '免费', ['自研', '红队', '漏洞扫描', '安全报告'], 'neko233-com/redlens', 'https://github.com/neko233-com/redlens#readme', ['linuxsafe', 'banhack233', 'Nessus']),
];
