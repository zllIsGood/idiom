/*
 * @Author: zhoualnglang 
 * @Date: 2020-04-02 20:19:44 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-04-03 16:47:47
 */
class HeroItem extends eui.ItemRenderer {

    private lab: eui.Label;
    private checkbox: eui.CheckBox;
    private img: eui.Image;
    private bg: eui.Image;
    private grp0: eui.Group;
    private grp1: eui.Group;
    private grp2: eui.Group;
    private red: eui.Image;
    private img3: eui.Image;
    private lab1: eui.Label;
    private lab2: eui.Label;
    private lab0: eui.Label;

    private mc: MovieClip
    private roleScale: number

    public constructor() {
        super();
        this.skinName = "HeroItemSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.img.addEventListener(egret.Event.COMPLETE, this.onComplete, this)
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        if (this.currentState != 'mini') {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
        }
    }
    private onComplete() {
        let w = 150, h = 200
        let tw = this.img.width
        let th = this.img.height
        let scale = 1
        if (tw / th > w / h) {
            scale = w / tw
        }
        else {
            scale = h / th
        }
        this.roleScale = scale
        DisplayUtils.setScale(this.img, this.roleScale)
    }

    protected dataChanged() {
        let data = this.data
        if (!data) {
            return
        }
        this.lab.text = data.name

        let isUpLevel = HeroModel.ins().getIsUpLevel(data.id) //是否升级了
        let cfg = isUpLevel ? data.data2 : data.data
        let has = HeroModel.ins().getIsUnlock(data.id) //是否拥有
        if (has) {
            this.img.source = cfg.fullImg
        }
        else {
            this.img.source = cfg.outlineImg
        }

        this.checkbox.selected = !HeroModel.ins().isHide(data.id)

        if (this.currentState == 'mini') {
            this.grp0.visible = false
            this.grp1.visible = false
            this.grp2.visible = false
            this.red.visible = false
            this.lab0.visible = false
            return
        }

        this.grp0.visible = has
        this.grp1.visible = false
        this.grp2.visible = false
        this.red.visible = false
        if (has && isUpLevel) {
            this.lab0.text = '2级'
        }
        else if (has && !isUpLevel) {
            this.grp1.visible = true
            this.lab0.text = '1级'

            let herodata = HeroModel.ins().getHeroData(data.id)
            let count = herodata.count == null ? 0 : herodata.count
            let maxcount = Main.energyConfig.sageUpgradeCount == null ? 3 : Main.energyConfig.sageUpgradeCount

            if (count >= maxcount) {
                let str = `<font  color=0x1AAA06>${count}</font>/${maxcount}\n`
                this.lab1.textFlow = new egret.HtmlTextParser().parser(str)

                this.red.visible = true
                this.grp2.visible = true
                this.canUp()
            }
            else {
                let str = `<font  color=0xff0000>${count}</font>/${maxcount}\n`
                this.lab1.textFlow = new egret.HtmlTextParser().parser(str)
            }
        }
        else {
            this.lab0.text = ''
        }

        if (this.img.texture != null || this.roleScale != null) {
            this.onComplete()
        }
    }

    private canUp() {
        if (!this.mc) {
            this.mc = new MovieClip()
        }
        else {
            DisplayUtils.removeFromParent(this.mc)
        }
        this.grp2.addChild(this.mc)
        let cfg = GlobalConfig.getHeroUp()
        this.mc.x = cfg.x
        this.mc.y = cfg.y
        this.mc.playFile(App.ins().getResRoot() + cfg.url, -1)
    }

    private onClick(e: egret.TouchEvent) {
        if (e.target == this.checkbox) {
            console.log(e.target, this.checkbox.selected, this.data.id)
            let hide = !this.checkbox.selected
            let ret = HeroModel.ins().setHideOrShow(this.data.id, hide)
            if (hide && !ret) {
                this.checkbox.selected = true
                wx.showToast({ icon: 'none', title: `至少显示一个人物` })
            }
            return
        }
        if (e.target == this.lab2 || e.target == this.grp2) {
            // console.log('HeroItem:', e)
            HeroModel.ins().upLevel(this.data.id)
            return
        }
        ViewManager.ins().open(HeroInformationWin, this.data)
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.img.removeEventListener(egret.TouchEvent.COMPLETE, this.onComplete, this)
        DisplayUtils.removeFromParent(this.mc)
        this.mc = null
        this.roleScale = null
    }

}
window["HeroItem"] = HeroItem;