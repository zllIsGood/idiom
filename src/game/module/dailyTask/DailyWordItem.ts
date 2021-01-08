/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-05 10:36:19 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-05 10:39:35
 */
class DailyWordItem extends eui.ItemRenderer {

    private lab: eui.Label;

    public data

    public constructor() {
        super();
        this.skinName = "DailyWordItemSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        // this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    protected dataChanged() {
        this.lab.text = this.data
    }

    // private onClick(e: egret.TouchEvent): void {
    //     switch (e.currentTarget) {
    //         case this.btn:

    //             break;
    //     }
    // }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        // this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

}