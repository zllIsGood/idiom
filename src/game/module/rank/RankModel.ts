/*
 * @Author: zhoualnglang 
 * @Date: 2020-04-18 16:33:34 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-04-24 11:05:57
 */
class RankModel extends BaseClass {

    public static ins(): RankModel {
        return super.ins();
    }

    public constructor() {
        super();
    }

    private isdisplay = false
    private bitmap: egret.DisplayObject
    private btn: eui.Group
    private bg: eui.Image
    private rankingListMask: egret.Shape
    public init() {
        //加载资源
        const platform: any = window.platform;
        if (Main.gamePlatform != Main.platformTT || !platform || !platform.openDataContext) {
            return
        }
        platform.openDataContext.postMessage({
            command: 'loadRes'
        });
    }

    public isExist() {
        return Main.gamePlatform == Main.platformTT
    }

    /**设置关卡排行*/
    public setData(score: number) {
        if (!this.isExist()) {
            return
        }
        wx.setUserGroup({
            groupId: "rank",
            success(res) {
                // console.log(res);
                const data = {
                    ttgame: {
                        score: score, //1
                        update_time: DateUtil.getUnixtime()//1513080573
                    },
                };

                wx.setUserCloudStorage({
                    KVDataList: [
                        // key 需要在开发者后台配置，且配置为排行榜标识后，data 结构必须符合要求，否则会 set 失败
                        { key: "score", value: JSON.stringify(data) }
                    ],
                    success(res) {
                        // console.log(res);
                    },
                    fail(e) {
                        console.log("获取数据失败");
                    }
                });
                // console.log('RankModel:', data)
            },
            fail(e) {
                console.log("获取数据失败");
            }
        });
    }

    public async show() {
        // await TimerManager.ins().deleyPromisse(3000)
        // console.log('点击btnClose按钮');
        let platform: any = window.platform;
        if (this.isdisplay) {
            App.ins().destoryBanner()
            this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show, this)
            DisplayUtils.removeFromParent(this.btn)
            DisplayUtils.removeFromParent(this.bitmap)
            DisplayUtils.removeFromParent(this.rankingListMask)
            DisplayUtils.removeFromParent(this.bg)
            this.isdisplay = false;
            platform.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                text: 'hello',
                year: (new Date()).getFullYear(),
                command: "close"
            });
        } else {
            // AdService.createBannerAd(Ad.dialogBanner)
            App.ins().playBannerAd(Ad.dialogBanner)
            let stage = StageUtils.ins().getStage()
            let parent = StageUtils.ins().getUIStage()

            //处理遮罩，避免开放数据域事件影响主域。
            this.rankingListMask = new egret.Shape();
            this.rankingListMask.graphics.beginFill(0x000000, 1);
            this.rankingListMask.graphics.drawRect(0, 0, stage.width, stage.height);
            this.rankingListMask.graphics.endFill();
            this.rankingListMask.alpha = 0.5;
            this.rankingListMask.touchEnabled = true;
            parent.addChild(this.rankingListMask);

            this.bg = new eui.Image()
            this.bg.source = 'bg_tc_png'
            this.bg.scale9Grid = new egret.Rectangle(190, 155, 282, 15)
            this.bg.width = 702
            this.bg.height = 915
            this.bg.verticalCenter = -25
            this.bg.horizontalCenter = 0
            parent.addChild(this.bg)

            this.bitmap = platform.openDataContext.createDisplayObject(null, stage.stageWidth, stage.stageHeight);
            parent.addChild(this.bitmap);

            // this.btn = new BaseBtn()
            // this.btn.skinName = 'BaseBtnSkin'
            // this.btn.verticalCenter = (82 + 33) - 1334 / 2
            // this.btn.horizontalCenter = 750 - 36 - 33 - 375
            // this.btn.icon = "dialog_close_btn_png"

            this.btn = new eui.Group()
            this.btn.width = 80
            this.btn.height = 80
            this.btn.verticalCenter = -378 - 25
            this.btn.right = 30
            parent.addChild(this.btn)
            this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show, this)

            //主域向子域发送自定义消息
            platform.openDataContext.postMessage({
                isDisplay: this.isdisplay,
                text: 'hello',
                year: (new Date()).getFullYear(),
                command: "open"
            });
            //主要示例代码结束            
            this.isdisplay = true;
        }

    }
}


window["RankModel"] = RankModel;