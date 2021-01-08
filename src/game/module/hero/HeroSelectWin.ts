/* 招募
 * @Author: zhoualnglang 
 * @Date: 2020-04-03 18:39:56 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-06-20 16:15:23
 */
class HeroSelectWin extends BaseEuiView {

    private zhiImg: eui.Image;
    private Limg: eui.Image;
    private Rimg: eui.Image;
    private LHit: eui.Image;
    private RHit: eui.Image;
    private btn: BaseBtn;
    private isDaily = false

    constructor() {
        super();
        this.skinName = `HeroSelectSkin`;
    }

    public initUI(): void {
        super.initUI();
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.btn, this.onClick);
        this.isDaily = param[0] ? true : false

        this.upView()
    }

    private upView() {
        this.zhiImg.rotation = 0
        this.Limg.rotation = -45
        this.Rimg.rotation = 45
        this.btn.visible = true
        this.LHit.visible = false
        this.RHit.visible = false
    }

    private twN = 0
    private start() {
        this.btn.visible = false

        this.twN = 0
        let tw = egret.Tween.get(this, { loop: false, onChange: this.twChange, onChangeObj: this })
        tw.to({ twN: 1 }, 300).call(this.playHit, this).to({ twN: 0 }, 200).call(this.playCircle, this)
    }
    private twChange() {
        this.Limg.rotation = -45 + 45 * this.twN
        this.Rimg.rotation = 45 + -45 * this.twN
    }

    private playCircle() {
        let dn = 5 + 3 * Math.random() << 0
        let r = dn * 360 + 5 //+ (36 * Math.random() << 0) * 10

        let data = this.opendata.award
        if (data.awardType == 0) {//体力
            r += (10 + 26 * Math.random() << 0) * 10
        }
        else if (data.awardType == 1) { // 减少cd
            r += (10 * Math.random() << 0) * 10
        }
        else if (data.awardType == 2) { //招贤
            r += (10 * Math.random() << 0) * 10
        }

        let tw = egret.Tween.get(this.zhiImg)
        tw.to({ rotation: r }, r / 360 * 300).call(this.finish, this)
    }

    private playHit() {
        this.LHit.visible = true
        this.RHit.visible = true
        DisplayUtils.setScale(this.LHit, 0)
        DisplayUtils.setScale(this.RHit, 0)
        this.LHit.alpha = 1
        this.RHit.alpha = 1

        let tw = egret.Tween.get(this.LHit)
        tw.to({ scaleX: 1, scaleY: 1 }, 300).to({ alpha: 0 }, 200).call(() => {
            this.LHit.visible = false
        }, this)
        let tw2 = egret.Tween.get(this.RHit)
        tw2.to({ scaleX: 1, scaleY: 1 }, 300).to({ alpha: 0 }, 200).call(() => {
            this.RHit.visible = false
        }, this)
    }

    public close(...param: any[]): void {
        egret.Tween.removeTweens(this.LHit)
        egret.Tween.removeTweens(this.RHit)
        egret.Tween.removeTweens(this)
    }

    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.btn:
                this.select()
                // this.start()
                break;
        }
    }

    private async select() {
        let data
        if (this.isDaily) {
            data = await HeroModel.ins().heroDaily()
            if (data == null) {
                wx.showToast({ icon: 'none', title: "今日次数不足" })
                return ViewManager.ins().close(this)
            }
        }
        else {
            data = await HeroModel.ins().hero()
        }
        this.opendata = data
        this.start()
    }

    private opendata
    private finish() {
        ViewManager.ins().open(HeroResultWin, this.opendata)
    }

}
ViewManager.ins().reg(HeroSelectWin, LayerManager.UI_Popup);
window["HeroSelectWin"] = HeroSelectWin;