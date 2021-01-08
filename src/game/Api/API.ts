/* 接口
 * @Author: zhoualnglang 
 * @Date: 2020-03-31 19:25:45 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-04-29 17:38:48
 */
class Api {
    /*广告配置*/
    public static AD_CONFIG = "/user/ad/getAdConfig";

    // 用户
    public static USER_LOGIN = "/idiom/user/login";
    public static USER_GET_USER_DATA = "/idiom/user/getUserData";
    public static USER_WATCH_AD = "/idiom/user/watchAd";
    public static USER_WATCH_ADV2 = "/idiom/user/watchAdV2";  //{"watchAdType":1} 0=加体力，1=加提示
    public static USER_SHARE_VIDEO = "/idiom/user/shareVideo";
    public static USER_SHARE_PROGRAM = "/idiom/user/shareProgram";
    public static USER_LOGIN_AWARD = "/idiom/user/loginAward";
    public static USER_REFRESH = "/idiom/user/refresh";

    // 关卡相关
    public static STAGE_PLAY = "/idiom/stage/play"; //闯关
    public static STAGE_FINSH = "/idiom/stage/finish";
    public static STAGE_TIPS = "/idiom/stage/tips";
    public static STAGE_WORD = "/idiom/dict/query";//"/idiom/stage/queryWord";
    public static STAGE_NEXTUPGRADE = "/idiom/stage/nextUpGrade";

    //主角
    public static PERSION_UPPERSION = "/idiom/person/upgradePerson";
    public static PERSION_GET = "/idiom/person/getPerson";
    public static PERSION_PAGE = "/idiom/person/pagePerson";

    //房子
    public static HOUSE_UP = "/idiom/house/upgradeHouse";
    public static HOUSE_GET = "/idiom/house/getHouse";
    public static HOUSE_PAGE = "/idiom/house/pageHouse";

    //招贤
    public static HERO = "/idiom/sage/recruit";
    public static HERO_GET = "/idiom/sage/getSage";
    public static HERO_PAGE = "/idiom/sage/pageSage";
    public static HERO_LIST = "/idiom/sage/listSage";
    public static HERO_GROUP_AWARD = "/idiom/sage/drawSageReward";
    public static HERO_GROUP_HASAWARD = "/idiom/sage/getHasDraw";
    public static HERO_UP_LEVEL = "/idiom/sage/upgrade";
    public static HERO_DAILY = "/idiom/sage/dailyRecruit";

    //词典
    // public static WORD_QUERY = "/idiom/dict/query";
    public static WORD_ADD = "/idiom/wordBook/add";
    public static WORD_CHANGESTATE = "/idiom/wordBook/changeState";
    public static WORD_LIST = "/idiom/wordBook/list";
    public static WORD_DETAIL = "/idiom/wordBook/detail";
    public static WORD_ERR = "/idiom/wordBook/wrongWord";

    //h5积分换体力
    public static EXCHANGE_ENERGY = "/idiom/user/exchangeEnergy";
}
window["Api"] = Api;