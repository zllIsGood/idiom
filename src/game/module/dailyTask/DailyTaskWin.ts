/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-04 18:22:55 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-05 11:26:34
 */
class DailyTaskWin extends BaseEuiView {

    private homeBtn: BaseBtn;
    private btn: BaseBtn;
    private curLab: eui.Label
    private lab: eui.Label
    private LHero: DailyHeroItem
    private RHero: DailyHeroItem

    constructor() {
        super();
        this.skinName = `DailyTaskSkin`;
    }

    public initUI(): void {
        super.initUI();
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.homeBtn, this.onClick);
        this.addTouchEvent(this.btn, this.onClick);

        this.upView()
    }

    private upView() {
        let cur = 15
        let all = 20
        let str = `<font  color=0xF59D25>${cur}</font>/${all}  题`
        this.curLab.textFlow = new egret.HtmlTextParser().parser(str)

        let c = 3
        this.lab.text = `（今日还有${c}次挑战机会）`

        let i = 1, j = 2
        this.LHero.data = HeroModel.ins().getCfgById(i)
        this.RHero.data = HeroModel.ins().getCfgById(j)
    }


    public close(...param: any[]): void {

    }

    /**点击 */
    private onClick(e: egret.TouchEvent): void {
        switch (e.currentTarget) {
            case this.homeBtn:
                ViewManager.ins().close(this)
                break;
            case this.btn:
                //
                break;

        }
    }

}
ViewManager.ins().reg(DailyTaskWin, LayerManager.UI_Popup);