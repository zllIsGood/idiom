/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-05 11:15:40 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-05 11:21:52
 */
class DailyHeroItem extends eui.ItemRenderer {

    private role1: eui.Image;
    private role2: eui.Image;
    private roleF: eui.Image;
    private roleHair: eui.Image;
    private exImg: eui.Image[] = []
    private isUpLv = true

    public constructor() {
        super();
        this.skinName = "RoleItemSkin";
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        this.role2.addEventListener(egret.Event.COMPLETE, this.onComplete, this)
    }

    private onComplete() {
        // console.log('RoleItem role2:' + this.role2.source, this.role2.texture)
        this.playTw()
    }

    protected dataChanged() {
        this.clearExImg()
        let data = this.data
        // console.log('RoleItem:' + data)
        if (data == null || data == '') {
            return
        }

        let body = data.bodyImg
        let head = data.headImg
        if (this.isUpLv) {
            body = data.bodyImg2
            head = data.headImg2
        }
        this.role1.source = body
        this.role2.source = head
        if (data.normalImg) {
            this.roleF.source = this.isUpLv ? data.normalImg2 : data.normalImg
        }
        if (data.hairImg) {
            if (!this.roleHair) {
                this.roleHair = new eui.Image()
                this.addChildAt(this.roleHair, 0)
            }
            this.roleHair.source = this.isUpLv ? data.hairImg2 : data.hairImg
        }
        this.playTw()
    }

    public playTw() {
        let data = this.data
        egret.Tween.removeTweens(this)
        this.role2.rotation = 0
        if (!this.role2.texture) {
            return
        }


        let ob = this.isUpLv ? data.data2 : data.data
        if (ob.extraParts) {
            let item = new eui.Image()
            item.source = ob.extraParts.img
            item.y = ob.bodyY
            item.horizontalCenter = 0
            this.addChild(item)
            this.exImg.push(item)
            DisplayUtils.setScale(item, ob.scale)
        }
        if (ob.exParts) {
            for (let part of ob.exParts) {
                let item = new eui.Image()
                item.source = part.img
                item.y = ob.bodyY
                item.horizontalCenter = 0
                this.addChild(item)
                this.exImg.push(item)
                DisplayUtils.setScale(item, ob.scale)
            }
        }
        this.role1.y = ob.bodyY

        this.role2.y = ob.bodyY + ob.headY + ob.headH
        this.role2.anchorOffsetY = ob.headH
        this.role2.anchorOffsetX = this.role2.width / 2
        if (data.normalImg) {
            this.roleF.y = this.role2.y
            this.roleF.anchorOffsetY = this.role2.anchorOffsetY
            this.roleF.anchorOffsetX = this.role2.anchorOffsetX
            this.roleF.rotation = 0
        }
        if (data.hairImg && this.roleHair) {
            this.roleHair.y = this.role2.y
            this.roleHair.anchorOffsetY = this.role2.anchorOffsetY
            this.roleHair.anchorOffsetX = this.role2.anchorOffsetX
            this.roleHair.rotation = 0
            this.roleHair.x = this.width / 2
            DisplayUtils.setScale(this.roleHair, ob.scale)
        }

        DisplayUtils.setScale(this.role1, ob.scale)
        DisplayUtils.setScale(this.role2, ob.scale)
        DisplayUtils.setScale(this.roleF, ob.scale)

        let tw = egret.Tween.get(this, { loop: true, onChange: this.twChange, onChangeObj: this })
        this.twN = 0
        tw.to({ twN: 1 }, 500)
            .to({ twN: 0 }, 500)
            .to({ twN: -1 }, 500)
            .to({ twN: 0 }, 500)
    }
    private twN = 0
    private twChange() {
        this.role2.rotation = 5 * this.twN
        if (this.data.normalImg) {
            this.roleF.rotation = 5 * this.twN
        }
        if (this.data.hairImg) {
            this.roleHair.rotation = 5 * this.twN
        }
    }

    private clearExImg() {
        if (this.exImg) {
            for (let item of this.exImg) {
                DisplayUtils.removeFromParent(item)
            }
        }
        this.exImg = []
    }

    public close(...param: any[]): void {
        this.role2.removeEventListener(egret.TouchEvent.COMPLETE, this.onComplete, this)
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        egret.Tween.removeTweens(this)
        this.clearExImg()
    }

}