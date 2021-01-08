/*
 * @Author: zhoulanglang 
 * @Date: 2020-08-26 17:30:19 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-08-26 18:01:26
 */
class WordSpellItem extends eui.ItemRenderer {

    private lab1: eui.Label;
    private lab2: eui.Label;
    public data: { word: string, spell: string, }

    public constructor() {
        super();
        this.skinName = "wordSpellItemSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
    }

    protected dataChanged() {
        let data = this.data
        this.lab1.text = data.spell
        this.lab2.text = data.word
    }

    // private onClick() {

    // }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
    }

}