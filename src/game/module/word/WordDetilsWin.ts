/* 单词信息界面
 * @Author: zhoualnglang 
 * @Date: 2020-04-02 16:22:33 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-08-26 18:08:13
 */
class WordDetilsWin extends BaseEuiView {

    private errBtn: BaseBtn;
    private btnL: BaseBtn;
    private btnR: BaseBtn;
    private closeBtn: BaseBtn;
    private content: eui.Label;
    private labL: eui.Label;
    private labR: eui.Label;
    private spellItem0: WordSpellItem;
    private spellItem1: WordSpellItem;
    private spellItem2: WordSpellItem;
    private spellItem3: WordSpellItem;

    private data: {
        word,
        from: WordDetilsOpenType,
        source,
        wid?
    }
    private wordDate

    constructor() {
        super();
        this.skinName = `WordDetilsSkin`;
    }

    public initUI(): void {
        super.initUI();
    }

    public open(...param: any[]): void {
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.errBtn, this.onClick);
        this.addTouchEvent(this.btnL, this.onClick);
        this.addTouchEvent(this.btnR, this.onClick);
        this.observe(WordModel.ins().postAdd, this.upView)
        this.observe(WordModel.ins().postErr, this.upErr)

        this.data = param[0]
        this.upView()
        this.upErr()
        this.upShare()
        // AdService.createBannerAd(Ad.dialogBanner)
        App.ins().playBannerAd(Ad.dialogBanner)
    }

    private upShare() {
        let bool = WordModel.ins().isShowShare()
        if (bool) {
            this.labR.visible = true
            this.btnR.visible = true
        }
        else {
            this.labR.visible = false
            this.btnR.visible = false
        }
    }

    private async upView() {
        let data = this.data
        let wordDate
        let left: string
        if (data.from == WordDetilsOpenType.fromPlay) {
            wordDate = await WordModel.ins().getWord(data.word)
            this.btnL.icon = WordModel.ins().isAddBook(data.word) ? 'added_glossary_btn_png' : 'add_glossary_btn_png'
            this.btnL.touchEnabled = !WordModel.ins().isAddBook(data.word)
            left = '随时复习'
        }
        else if (data.from == WordDetilsOpenType.fromBook1) {
            this.btnL.icon = 'mastered_btn_png'
            wordDate = WordModel.ins().getBookWord(0, data.wid).wordStock
            left = '加入已掌握'
        }
        else if (data.from == WordDetilsOpenType.fromBook2) {
            this.btnL.icon = 'unmaster_btn_png'
            wordDate = WordModel.ins().getBookWord(1, data.wid).wordStock
            left = '加入未掌握'
        }

        this.labL.text = left
        console.log(wordDate)
        this.wordDate = wordDate

        this.content.text = wordDate.meaning

        let spells = wordDate.spell as string
        spells = spells.replace(/\sn/, ' ')
        let sarr = spells.split(' ')
        for (let i = 0; i < 4; i++) {
            let obj = {
                word: wordDate.word[i],
                spell: sarr[i],
            }
            this['spellItem' + i].data = obj
        }
    }

    private upErr() {
        let bool = WordModel.ins().isReportErr(this.data.word)
        if (bool) {
            this.errBtn.enabled = false
            this.errBtn.icon = 'word_errored_png'
        }
        else {
            this.errBtn.enabled = true
            this.errBtn.icon = 'word_error_png'
        }
    }

    public close(...param: any[]): void {
        // this.removeTouchEvent(this.closeBtn, this.onClick);
        // this.removeObserve();
        this.data = null
        App.ins().destoryBanner()
    }

    /**点击 */
    private async onClick(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.errBtn:
                WordModel.ins().reportErrWord(this.data.word)
                break;
            case this.closeBtn:
                ViewManager.ins().close(this)
                break;
            case this.btnL:
                if (this.data.from == WordDetilsOpenType.fromPlay) {
                    WordModel.ins().addWord(this.data.word)
                }
                else if (this.data.from == WordDetilsOpenType.fromBook1) {
                    let win = await WordModel.ins().changeWordState(this.data.wid, 1)
                    if (win) {
                        this.data.from = WordDetilsOpenType.fromBook2
                        this.upView()
                    }
                }
                else if (this.data.from == WordDetilsOpenType.fromBook2) {
                    let win = await WordModel.ins().changeWordState(this.data.wid, 0)
                    if (win) {
                        this.data.from = WordDetilsOpenType.fromBook1
                        this.upView()
                    }
                }
                break;
            case this.btnR:
                let query = JSON.stringify({ share: true })
                wx.shareAppMessage({
                    title: this.data.word,
                    query: query,
                    imageUrl: GlobalConfig.shareImgUrl,
                    success: function (res) {
                        console.log('拉起分享 成功');
                        console.log(res);
                    },
                    fail: function (res) {
                        console.log('拉起分享 失败');
                        console.log(res);
                    }
                });
                break;
        }
    }

}
ViewManager.ins().reg(WordDetilsWin, LayerManager.UI_Popup);
/**打开单词界面类型*/
const enum WordDetilsOpenType {
    fromPlay = 1, //从闯关进入
    fromBook1,
    fromBook2,
}
window["WordDetilsWin"] = WordDetilsWin;