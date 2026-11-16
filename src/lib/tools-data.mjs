/**
 * tools-data.mjs — curated SOFTWARE TOOL links for non-programmers.
 *
 * This is the single source of truth for the "实用软件" chapter. Unlike skills,
 * these entries point at official sites (or their source repo). Every link is
 * hand-picked and verified at authoring time.
 *
 * Fields:
 *   name, desc, url, cat, sub, platforms[], license, tags[], repo?
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

const T = (name, desc, url, cat, sub, platforms, license, tags = [], repo = '') =>
  ({ name, desc, url, cat, sub, platforms, license, tags, repo });

export const TOOLS = [
  /* ============================ 网络代理 ================================ */
  // 桌面客户端
  T('Clash Verge Rev', '最流行的 Clash 图形客户端（Verge 续作），规则分流、订阅管理、TUN 模式开箱即用。', 'https://github.com/clash-verge-rev/clash-verge-rev', 'tool-net', 'net-desktop', ['Windows', 'macOS', 'Linux'], '开源免费', ['Clash', 'Mihomo', 'TUN'], 'clash-verge-rev/clash-verge-rev'),
  T('Mihomo Party', 'Mihomo 官方图形客户端，配置导入与节点管理简洁直观。', 'https://github.com/MetaCubeX/mihomo-party', 'tool-net', 'net-desktop', ['Windows', 'macOS', 'Linux'], '开源免费', ['Clash', '官方'], 'MetaCubeX/mihomo-party'),
  T('NekoRay', '轻量多协议代理客户端，支持 Xray / sing-box 内核，适合新手。', 'https://github.com/MatsuriDayo/NekoRay', 'tool-net', 'net-desktop', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['Xray', '多协议'], 'MatsuriDayo/NekoRay'),
  T('v2rayN', 'Windows 上老牌 Xray 图形客户端，协议支持全面、社区文档丰富。', 'https://github.com/2dust/v2rayN', 'tool-net', 'net-desktop', ['Windows'], '开源免费', ['Xray', '老牌'], '2dust/v2rayN'),
  T('Clash Nyanpasu', '基于 Clash 内核的现代客户端，界面清爽、多语言支持。', 'https://github.com/Clash-Nyanpasu/clash-nyanpasu', 'tool-net', 'net-desktop', ['Windows', 'macOS', 'Linux'], '开源免费', ['Clash', '多语言'], 'Clash-Nyanpasu/clash-nyanpasu'),
  // iOS
  T('Stash', 'iOS 上最受欢迎的 Clash 内核客户端，规则分流与 MITM 功能完整。', 'https://stash.ws/', 'tool-net', 'net-ios', ['iOS'], '付费', ['Clash', 'iOS 必备']),
  T('Shadowrocket', 'iOS 经典规则代理工具（俗称小火箭），App Store 可直接购买。', 'https://apps.apple.com/cn/app/shadowrocket/id932747118', 'tool-net', 'net-ios', ['iOS'], '付费', ['规则代理', 'App Store']),
  T('Surge', 'iOS / macOS 专业网络工具，功能强大、稳定性高。', 'https://nssurge.com/', 'tool-net', 'net-ios', ['iOS', 'macOS'], '付费', ['专业', '规则引擎']),
  // Android
  T('Clash Meta for Android', 'Mihomo 内核的 Android 客户端，规则、TUN 与订阅管理齐全。', 'https://github.com/MetaCubeX/ClashAndroid', 'tool-net', 'net-android', ['Android'], '开源免费', ['Clash', 'Mihomo'], 'MetaCubeX/ClashAndroid'),
  T('FlClash', '基于 Mihomo 的安卓客户端，Material You 设计、限速与场景模式实用。', 'https://github.com/chen08209/FlClash', 'tool-net', 'net-android', ['Android'], '开源免费', ['Mihomo', 'Material You'], 'chen08209/FlClash'),
  // 跨平台核心
  T('Mihomo (Clash Meta)', 'Clash Meta 内核，支持更多协议与 TUN，是众多客户端的底层。', 'https://github.com/MetaCubeX/mihomo', 'tool-net', 'net-core', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['内核', '多协议'], 'MetaCubeX/mihomo'),
  T('sing-box', '新一代通用代理平台，协议支持极广，可当内核也可独立运行。', 'https://github.com/SagerNet/sing-box', 'tool-net', 'net-core', ['Windows', 'macOS', 'Linux', 'Android', 'iOS'], '开源免费', ['内核', '多协议'], 'SagerNet/sing-box'),
  T('Clash', '经典 Clash 内核，规则分流的奠基者，生态资料最多。', 'https://github.com/Dreamacro/clash', 'tool-net', 'net-core', ['Windows', 'macOS', 'Linux'], '开源免费', ['内核', '经典'], 'Dreamacro/clash'),

  /* ============================== 浏览器 ================================ */
  // 主流浏览器
  T('Google Chrome', '全球份额第一的浏览器，扩展生态最全、同步稳定。', 'https://www.google.com/chrome/', 'tool-browser', 'browser-main', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['主流', '扩展生态']),
  T('Microsoft Edge', 'Windows 内置浏览器，Chromium 内核，资源占用与 PDF 阅读体验好。', 'https://www.microsoft.com/edge', 'tool-browser', 'browser-main', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['内置', 'Chromium']),
  T('Mozilla Firefox', '非 Chromium 内核的开源浏览器，隐私保护与自定义能力强。', 'https://www.mozilla.org/zh-CN/firefox/new/', 'tool-browser', 'browser-main', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['开源', '隐私']),
  T('Safari', '苹果生态原生浏览器，能效与隐私保护优秀。', 'https://www.apple.com/safari/', 'tool-browser', 'browser-main', ['macOS', 'iOS'], '免费', ['苹果生态', '省电']),
  T('夸克浏览器', '国内轻量浏览器，AI 搜索、网盘与扫描功能集成度高。', 'https://quark.sm.cn/', 'tool-browser', 'browser-main', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['国产', 'AI 搜索']),
  // 隐私浏览器
  T('Brave', '内置广告与追踪拦截的 Chromium 浏览器，速度快、隐私友好。', 'https://brave.com/', 'tool-browser', 'browser-privacy', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['广告拦截', '隐私']),
  T('LibreWolf', 'Firefox 的隐私强化分支，默认禁用遥测、预置反追踪。', 'https://librewolf.net/', 'tool-browser', 'browser-privacy', ['Windows', 'macOS', 'Linux'], '开源免费', ['Firefox', '隐私强化']),
  T('Tor Browser', '通过 Tor 网络匿名访问，隐私研究用途。', 'https://www.torproject.org/', 'tool-browser', 'browser-privacy', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['匿名', 'Tor']),
  T('Vivaldi', '高度可定制的浏览器，标签页管理与垂直侧栏非常强大。', 'https://vivaldi.com/', 'tool-browser', 'browser-privacy', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['可定制', '标签管理']),
  // 扩展
  T('uBlock Origin', '最高效的广告与追踪拦截扩展，内存占用极低。', 'https://github.com/gorhill/uBlock', 'tool-browser', 'browser-ext', ['Extension'], '开源免费', ['广告拦截', '必备插件'], 'gorhill/uBlock'),
  T('Tampermonkey 油猴', '用户脚本管理器，装脚本即可给任意网页加功能。', 'https://www.tampermonkey.net/', 'tool-browser', 'browser-ext', ['Extension', 'Android'], '免费增值', ['用户脚本', '神器']),
  T('沉浸式翻译', '网页双语对照翻译扩展，支持多家翻译引擎，阅读外文必备。', 'https://immersivetranslate.com/', 'tool-browser', 'browser-ext', ['Extension', 'iOS', 'Android'], '免费增值', ['翻译', '双语对照']),
  T('Bitwarden 扩展', '开源密码管理器的浏览器插件，自动填充与跨设备同步。', 'https://bitwarden.com/', 'tool-browser', 'browser-ext', ['Extension', 'Windows', 'macOS', 'iOS', 'Android'], '开源免费', ['密码管理', '自动填充']),

  /* ============================== 办公协作 ============================== */
  // 办公套件
  T('WPS Office', '国产办公套件，文字/表格/演示/ETF 全支持，兼容 Microsoft Office。', 'https://www.wps.cn/', 'tool-office', 'office-suite', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['国产', 'Office 兼容']),
  T('LibreOffice', '完全免费的开源办公套件，文档格式兼容良好。', 'https://www.libreoffice.org/', 'tool-office', 'office-suite', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', 'Office 兼容']),
  T('ONLYOFFICE Desktop Editors', '开源办公套件，对 OOXML 格式兼容性出色。', 'https://www.onlyoffice.com/', 'tool-office', 'office-suite', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', 'OOXML']),
  // 团队协作
  T('飞书', '字节跳动的企业协作平台：即时沟通、文档、日历、多维表格一体。', 'https://www.feishu.cn/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '多维表格']),
  T('钉钉', '阿里旗下企业协同平台，考勤审批与组织管理完善。', 'https://www.dingtalk.com/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '企业协同']),
  T('企业微信', '微信生态的企业沟通工具，可直连微信客户。', 'https://work.weixin.qq.com/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['微信生态', '客户联系']),
  T('Notion', 'All-in-one 工作空间：笔记、数据库、项目与知识库自由搭建。', 'https://www.notion.so/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['知识库', '数据库']),
  T('Slack', '欧美团队主流沟通工具，频道式协作与集成生态丰富。', 'https://slack.com/', 'tool-office', 'office-collab', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['团队沟通', '海外']),
  // 文档笔记
  T('语雀', '阿里出品的知识文档平台，写作体验与知识库结构化能力强。', 'https://www.yuque.com/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '知识库']),
  T('腾讯文档', '在线协作文档，微信/QQ 账号直接用，多人实时编辑方便。', 'https://docs.qq.com/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '实时协作']),
  T('Obsidian', '本地 Markdown 双链笔记，插件生态极强，数据完全掌握在自己手里。', 'https://obsidian.md/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '免费增值', ['Markdown', '双链', '本地优先']),
  T('思源笔记 SiYuan', '国产开源块级双链笔记，本地优先、支持自托管同步。', 'https://b3log.org/siyuan/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['国产', '开源', '块级笔记']),
  T('Logseq', '开源大纲式双链笔记，本地 Markdown 文件兼容。', 'https://logseq.com/', 'tool-office', 'office-doc', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['大纲笔记', '开源']),

  /* ============================== 影音播放 ============================== */
  T('PotPlayer', 'Windows 上功能最强的本地视频播放器，格式与字幕支持极全。', 'https://potplayer.daum.net/', 'tool-media', 'media-player', ['Windows'], '免费', ['国产常用', '万能播放']),
  T('VLC media player', '跨平台开源播放器，几乎能播任何格式，还能串流。', 'https://www.videolan.org/vlc/', 'tool-media', 'media-player', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['开源', '万能播放']),
  T('IINA', 'macOS 原生设计的现代播放器，界面漂亮、手势操作顺手。', 'https://iina.io/', 'tool-media', 'media-player', ['macOS'], '开源免费', ['macOS', '原生体验'], 'iina/iina'),
  T('mpv', '极简高性能命令行播放器，脚本与配置可玩性极高。', 'https://mpv.io/', 'tool-media', 'media-player', ['Windows', 'macOS', 'Linux'], '开源免费', ['轻量', '高性能'], 'mpv-player/mpv'),
  T('网易云音乐', '国内主流音乐平台，歌单与评论社区氛围浓厚。', 'https://music.163.com/', 'tool-media', 'media-music', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '歌单']),
  T('QQ 音乐', '腾讯音乐平台，曲库全、绿钻权益体系成熟。', 'https://y.qq.com/', 'tool-media', 'media-music', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', '曲库']),
  T('Spotify', '全球主流流媒体音乐服务，推荐算法与播客内容丰富。', 'https://www.spotify.com/', 'tool-media', 'media-music', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['海外', '播客']),
  T('Apple Music', '苹果生态音乐服务，与 iOS / macOS 深度整合。', 'https://music.apple.com/', 'tool-media', 'media-music', ['macOS', 'iOS', 'Android', 'Web'], '付费', ['苹果生态', '无损']),

  /* ============================== 下载传输 ============================== */
  T('Motrix', '颜值与功能兼具的全平台下载器，支持 HTTP / BT / 磁力。', 'https://motrix.app/', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'Linux'], '开源免费', ['BT', '磁力'], 'agalwood/Motrix'),
  T('qBittorrent', '最受欢迎的开源 BT 客户端，无广告、功能完整。', 'https://www.qbittorrent.org/', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['BT', '无广告']),
  T('aria2', '命令行多协议下载工具，支持分段、BT 与 RPC 远程控制。', 'https://github.com/aria2/aria2', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['命令行', '多协议'], 'aria2/aria2'),
  T('Internet Download Manager', 'Windows 经典下载加速器，浏览器捕获与多线程下载强。', 'https://www.internetdownloadmanager.com/', 'tool-download', 'dl-manager', ['Windows'], '付费', ['下载加速', '经典']),
  T('迅雷', '国内老牌下载工具，冷门资源与网盘加速有优势。', 'https://www.xunlei.com/', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['国产', '冷门资源']),
  T('Free Download Manager', '开源跨平台下载管理器，支持 BT、种子与网站抓取。', 'https://www.freedownloadmanager.org/', 'tool-download', 'dl-manager', ['Windows', 'macOS', 'Linux', 'Android'], '免费增值', ['开源', '跨平台']),

  /* ============================== 文件管理 ============================== */
  T('7-Zip', '压缩率极高的开源压缩解压工具，Windows 装机必备。', 'https://www.7-zip.org/', 'tool-file', 'file-archive', ['Windows', 'Linux'], '开源免费', ['压缩', '装机必备']),
  T('Bandizip', '界面漂亮的压缩工具，多核解压快、乱码修复好。', 'https://www.bandisoft.com/bandizip/', 'tool-file', 'file-archive', ['Windows', 'macOS'], '免费增值', ['压缩', '高颜值']),
  T('PeaZip', '开源压缩管理器，支持格式多、隐私加密功能全。', 'https://peazip.github.io/', 'tool-file', 'file-archive', ['Windows', 'Linux'], '开源免费', ['开源', '多格式']),
  T('Everything', 'Windows 上秒级文件搜索神器，索引极小、速度无与伦比。', 'https://www.voidtools.com/', 'tool-file', 'file-search', ['Windows'], '免费', ['文件搜索', '神器']),
  T('Listary', '文件搜索与快速启动工具，与资源管理器深度整合。', 'https://www.listary.com/', 'tool-file', 'file-search', ['Windows'], '免费增值', ['搜索', '快速启动']),
  T('WizTree', '极快的磁盘空间分析器，几秒扫出大文件与文件夹占用。', 'https://www.diskanalyzer.com/', 'tool-file', 'file-search', ['Windows'], '免费增值', ['空间分析', '清理助手']),
  T('FreeFileSync', '开源文件同步与备份工具，对比直观、同步规则灵活。', 'https://freefilesync.org/', 'tool-file', 'file-sync', ['Windows', 'macOS', 'Linux'], '开源免费', ['备份', '同步']),
  T('Syncthing', '去中心化开源同步工具，设备间点对点同步，不经过第三方服务器。', 'https://syncthing.net/', 'tool-file', 'file-sync', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['P2P', '自托管'], 'syncthing/syncthing'),
  T('坚果云', '国内老牌同步网盘，稳定可靠、支持 WebDAV。', 'https://www.jianguoyun.com/', 'tool-file', 'file-sync', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['国产', 'WebDAV']),

  /* ============================== 系统增强 ============================== */
  T('Microsoft PowerToys', '微软官方 Windows 增强工具集：分屏、取色、批量重命名、快捷键管理。', 'https://github.com/microsoft/PowerToys', 'tool-system', 'sys-tune', ['Windows'], '开源免费', ['官方', '效率工具集'], 'microsoft/PowerToys'),
  T('Dism++', '国产 Windows 系统清理与优化工具，功能强大、体积小巧。', 'https://www.chuyu.me/', 'tool-system', 'sys-tune', ['Windows'], '免费', ['国产', '系统优化']),
  T('Winaero Tweaker', 'Windows 深度设置 tweak 工具，几百项隐藏开关一次配齐。', 'https://winaero.com/winaero-tweaker/', 'tool-system', 'sys-tune', ['Windows'], '免费', ['系统设置', '深度定制']),
  T('火绒安全', ' light 量国产杀毒软件，无广告、弹窗拦截效果好。', 'https://www.huorong.cn/', 'tool-system', 'sys-clean', ['Windows'], '免费', ['国产', '杀毒', '弹窗拦截']),
  T('Malwarebytes', '知名恶意软件查杀工具，可作二次扫描补充。', 'https://www.malwarebytes.com/', 'tool-system', 'sys-clean', ['Windows', 'macOS', 'Android', 'iOS'], '免费增值', ['反恶意软件', '二扫']),
  T('TreeSize Free', '直观的磁盘占用可视化工具，快速找出占空间大户。', 'https://www.jam-software.com/treesize_free', 'tool-system', 'sys-clean', ['Windows'], '免费', ['空间分析', '可视化']),

  /* ============================== 密码隐私 ============================== */
  T('Bitwarden', '开源密码管理器，全平台同步、可自托管，免费版就够用。', 'https://bitwarden.com/', 'tool-privacy', 'pass-mgr', ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Extension', 'Web'], '开源免费', ['密码管理', '自托管']),
  T('1Password', '体验极佳的商业密码管理器，家庭/团队共享做得好。', 'https://1password.com/', 'tool-privacy', 'pass-mgr', ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Extension'], '付费', ['密码管理', '团队协作']),
  T('KeePass', '完全离线的开源密码库，本地加密数据库、插件生态丰富。', 'https://keepass.info/', 'tool-privacy', 'pass-mgr', ['Windows', 'macOS', 'Linux', 'Android'], '开源免费', ['离线', '开源']),
  T('Gpg4win', 'Windows 上的 GPG 加密套件，邮件与文件加密签名。', 'https://www.gpg4win.org/', 'tool-privacy', 'pass-priv', ['Windows'], '开源免费', ['加密', 'GPG']),
  T('Proton Mail', '端到端加密的瑞士邮箱服务，隐私邮件首选。', 'https://proton.me/mail', 'tool-privacy', 'pass-priv', ['Web', 'iOS', 'Android'], '免费增值', ['邮箱', '端到端加密']),

  /* ============================== 图片工具 ============================== */
  T('Snipaste', '经典截图 + 贴图工具，截完可钉在屏幕上对照，效率神器。', 'https://www.snipaste.com/', 'tool-image', 'img-capture', ['Windows', 'macOS'], '免费增值', ['截图', '贴图']),
  T('PixPin', '国产新锐截图工具，长截图、贴图、OCR 与标注一体。', 'https://pixpin.cn/', 'tool-image', 'img-capture', ['Windows'], '免费增值', ['国产', '长截图', 'OCR']),
  T('ShareX', '开源截图录屏与上传工具，自动化工作流极强。', 'https://getsharex.com/', 'tool-image', 'img-capture', ['Windows'], '开源免费', ['开源', '录屏'], 'ShareX/ShareX'),
  T('Flameshot', '开源跨平台截图工具，标注功能丰富、命令行友好。', 'https://flameshot.org/', 'tool-image', 'img-capture', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '标注'], 'flameshot-org/flameshot'),
  T('GIMP', '开源图像编辑器，功能接近 Photoshop，插件丰富。', 'https://www.gimp.org/', 'tool-image', 'img-edit', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '图像编辑']),
  T('Krita', '开源绘画与插画软件，笔刷系统强大，二次元创作友好。', 'https://krita.org/', 'tool-image', 'img-edit', ['Windows', 'macOS', 'Linux'], '开源免费', ['绘画', '插画']),
  T('Photopea', '浏览器里的在线 PS，直接打开 PSD/XD/Sketch 文件。', 'https://www.photopea.com/', 'tool-image', 'img-edit', ['Web'], '免费增值', ['在线', 'PSD']),
  T('remove.bg', '一键在线抠图去背景，证件照与素材处理省时。', 'https://www.remove.bg/', 'tool-image', 'img-edit', ['Web'], '免费增值', ['抠图', '在线']),

  /* ============================== AI 助手 =============================== */
  T('ChatGPT', 'OpenAI 官方对话助手，通用能力与插件生态领先。', 'https://chatgpt.com/', 'tool-ai', 'ai-chat', ['Web', 'Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['对话', 'OpenAI']),
  T('Claude', 'Anthropic 官方助手，长文本写作、代码与分析表现出色。', 'https://claude.ai/', 'tool-ai', 'ai-chat', ['Web', 'Windows', 'macOS', 'iOS', 'Android'], '免费增值', ['对话', '长文本']),
  T('DeepSeek', '国产开源大模型对话助手，推理能力强、免费好用。', 'https://www.deepseek.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android', 'Windows', 'macOS'], '免费', ['国产', '推理']),
  T('通义千问', '阿里通义大模型对话入口，中文场景与办公集成好。', 'https://tongyi.aliyun.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android'], '免费', ['国产', '阿里']),
  T('Kimi', '擅长超长文本阅读与资料整理的国产 AI 助手。', 'https://www.kimi.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android', 'Windows', 'macOS'], '免费增值', ['国产', '长文本']),
  T('豆包', '字节跳动旗下 AI 助手，多模态与日常问答体验亲切。', 'https://www.doubao.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android', 'Windows', 'macOS'], '免费', ['国产', '多模态']),
  T('Google Gemini', '谷歌多模态 AI 助手，与搜索和 Google 生态深度整合。', 'https://gemini.google.com/', 'tool-ai', 'ai-chat', ['Web', 'iOS', 'Android'], '免费增值', ['多模态', '谷歌']),
  T('秘塔 AI 搜索', '无广告 AI 搜索，结构化输出带来源，查资料高效。', 'https://metaso.cn/', 'tool-ai', 'ai-chat', ['Web'], '免费增值', ['国产', 'AI 搜索']),
  T('Midjourney', '顶级 AI 绘画工具，艺术表现力强，Discord 内使用。', 'https://www.midjourney.com/', 'tool-ai', 'ai-image', ['Web', 'Extension'], '付费', ['AI 绘画', '艺术']),
  T('即梦 AI', '字节旗下 AI 绘画与视频生成平台，中文提示词友好。', 'https://jimeng.jianying.com/', 'tool-ai', 'ai-image', ['Web', 'iOS', 'Android'], '免费增值', ['国产', 'AI 绘画', '视频']),
  T('Stable Diffusion WebUI', '本地部署的开源 AI 绘画工作台，模型与插件生态最大。', 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', 'tool-ai', 'ai-image', ['Windows', 'macOS', 'Linux'], '开源免费', ['开源', '本地绘画'], 'AUTOMATIC1111/stable-diffusion-webui'),
  T('Gamma', '用 AI 一句话生成演示文稿、文档与网页，排版精美。', 'https://gamma.app/', 'tool-ai', 'ai-office', ['Web'], '免费增值', ['PPT', 'AI 生成']),
  T('讯飞听见', '语音转文字与会议纪要工具，中文识别准确率高。', 'https://www.iflyrec.com/', 'tool-ai', 'ai-office', ['Web', 'iOS', 'Android'], '免费增值', ['国产', '语音转写']),
  T('秘塔写作猫', '中文写作校对与润色工具，错别字、语病与风格一把抓。', 'https://xiezuocat.com/', 'tool-ai', 'ai-office', ['Web', 'Extension'], '免费增值', ['国产', '中文校对']),

  /* ============================== 翻译词典 ============================== */
  T('沉浸式翻译', '双语对照网页翻译扩展，支持 DeepL / OpenAI 多引擎，阅读外文神器。', 'https://immersivetranslate.com/', 'tool-translate', 'tr-tool', ['Extension', 'iOS', 'Android'], '免费增值', ['双语对照', '阅读']),
  T('DeepL Translate', '翻译质量业内领先的神经机器翻译，文档翻译也支持。', 'https://www.deepl.com/translator', 'tool-translate', 'tr-tool', ['Web', 'Windows', 'macOS', 'iOS', 'Android', 'Extension'], '免费增值', ['高质量', '文档翻译']),
  T('有道翻译', '网易旗下翻译工具，词典、文档与截图翻译齐全。', 'https://fanyi.youdao.com/', 'tool-translate', 'tr-tool', ['Web', 'Windows', 'macOS', 'iOS', 'Android', 'Extension'], '免费增值', ['国产', '词典']),
  T('Google 翻译', '支持语种最多的免费翻译服务，网页与 App 都好用。', 'https://translate.google.com/', 'tool-translate', 'tr-tool', ['Web', 'iOS', 'Android'], '免费', ['多语种', '免费']),
  T('Bob', 'macOS 上优雅的翻译与 OCR 工具，可自定义各类翻译服务。', 'https://bobtranslate.com/', 'tool-translate', 'tr-tool', ['macOS'], '付费', ['macOS', 'OCR']),
  T('彩云小译', '国产双语对照翻译网站与浏览器插件，论文阅读友好。', 'https://fanyi.caiyunapp.com/', 'tool-translate', 'tr-tool', ['Web', 'Extension', 'iOS'], '免费增值', ['国产', '双语对照']),

  /* ============================== 通讯社交 ============================== */
  T('微信', '国内必备即时通讯与生活工具，联系人覆盖最广。', 'https://weixin.qq.com/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['国民应用', '必备']),
  T('QQ', '腾讯经典即时通讯，文件传输、群与相册功能丰富。', 'https://im.qq.com/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'iOS', 'Android'], '免费', ['经典', '文件传输']),
  T('Telegram', '速度快、隐私好的国际即时通讯，频道与群组生态丰富。', 'https://telegram.org/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Web'], '免费', ['国际', '隐私']),
  T('Discord', '海外社区与游戏语音主流平台，服务器频道结构清晰。', 'https://discord.com/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'iOS', 'Android', 'Web'], '免费增值', ['社区', '语音']),
  T('Signal', '端到端加密的开源通讯工具，隐私通信首选。', 'https://signal.org/', 'tool-chat', 'chat-im', ['Windows', 'macOS', 'iOS', 'Android'], '开源免费', ['加密', '开源']),

  /* ============================ 编程入门工具 ============================ */
  T('Visual Studio Code', '微软出品的代码编辑器，扩展生态最全，编程入门首选。', 'https://code.visualstudio.com/', 'tool-devstart', 'dev-editor', ['Windows', 'macOS', 'Linux'], '免费', ['编辑器', '入门首选']),
  T('Cursor', 'AI 原生代码编辑器，对话式改代码、补全体验出色。', 'https://cursor.com/', 'tool-devstart', 'dev-editor', ['Windows', 'macOS', 'Linux'], '免费增值', ['AI 编辑器', '热门']),
  T('Trae', '字节旗下免费 AI IDE，中文体验友好、内置多种模型。', 'https://www.trae.ai/', 'tool-devstart', 'dev-editor', ['Windows', 'macOS'], '免费', ['国产', 'AI IDE']),
  T('WebStorm', 'JetBrains 前端开发 IDE，重构与智能提示专业。', 'https://www.jetbrains.com/webstorm/', 'tool-devstart', 'dev-editor', ['Windows', 'macOS', 'Linux'], '付费', ['IDE', '前端']),
  T('Git', '版本控制必备工具，配合 GitHub / Gitee 管理代码历史。', 'https://git-scm.com/', 'tool-devstart', 'dev-env', ['Windows', 'macOS', 'Linux'], '开源免费', ['版本控制', '必备']),
  T('Node.js', 'JavaScript 运行时，前端工具链与脚本开发的基础。', 'https://nodejs.org/', 'tool-devstart', 'dev-env', ['Windows', 'macOS', 'Linux'], '开源免费', ['运行时', '前端基础']),
  T('Python', '语法简单的通用编程语言，数据分析与 AI 入门首选。', 'https://www.python.org/', 'tool-devstart', 'dev-env', ['Windows', 'macOS', 'Linux', 'iOS', 'Android'], '开源免费', ['编程语言', 'AI']),
  T('Docker Desktop', '容器内运行环境，一条命令起数据库/服务，避免环境折腾。', 'https://www.docker.com/products/docker-desktop/', 'tool-devstart', 'dev-env', ['Windows', 'macOS', 'Linux'], '免费增值', ['容器', '环境管理']),
  T('DBeaver', '免费开源数据库管理工具，可视化查看与编写 SQL。', 'https://dbeaver.io/', 'tool-devstart', 'dev-db', ['Windows', 'macOS', 'Linux'], '开源免费', ['数据库', 'SQL']),
  T('Navicat', '老牌数据库管理客户端，界面漂亮、导入导出与同步方便。', 'https://www.navicat.com/', 'tool-devstart', 'dev-db', ['Windows', 'macOS', 'Linux'], '付费', ['数据库', '商业软件']),
  T('TablePlus', '现代数据库客户端，多数据库支持、原生体验好。', 'https://tableplus.com/', 'tool-devstart', 'dev-db', ['Windows', 'macOS', 'Linux'], '免费增值', ['数据库', '高颜值']),
];
