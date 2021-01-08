/*
 * @Author: zhoulanglang 
 * @Date: 2020-09-03 18:27:46 
 * @Last Modified by: zhoulanglang
 * @Last Modified time: 2020-09-05 12:32:01
 */
class HomeMC extends eui.Component {

    xyData = { sx: 375, sy: 1050, tx: 375, ty: 350 }
    public constructor() {
        super();
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this);
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
        this.width = 750
        this.height = 1334
        this.verticalCenter = 0
        this.horizontalCenter = 0
    }

    public childrenCreated(): void {
        super.childrenCreated();
    }

    public open(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.open, this)
        this.upDate2()
    }

    private upDate2() {
        this.shp = new egret.Shape();
        this.addChild(this.shp);
        this.shp.graphics.beginFill(this.drawColor, 1)
        this.shp.graphics.drawRect(5, 0, 30, 10)
        this.shp.graphics.endFill()
        this.shp.graphics.beginFill(this.drawColor, 1)
        this.shp.graphics.drawCircle(5, 5, 5)
        this.shp.graphics.endFill()
        this.shp.graphics.beginFill(this.drawColor, 1)
        this.shp.graphics.drawCircle(35, 5, 5)
        this.shp.graphics.endFill()
        this.shp.width = 40
        this.shp.height = 10
        this.shp.anchorOffsetX = 20
        this.shp.anchorOffsetY = 5
        this.shp.rotation = MathUtils.getAngle(MathUtils.getRadian2(this.xyData.sx, this.xyData.sy, this.xyData.tx, this.xyData.ty))
        this.shp.x = this.xyData.sx
        this.shp.y = this.xyData.sy

        let tw = egret.Tween.get(this.shp)
        tw.to({ y: this.xyData.ty + 20, x: this.xyData.tx }, 500).call(() => {
            DisplayUtils.removeFromParent(this.shp)
            this.shp = null
            this.upDate()
        }, this)
    }
    private shp: egret.Shape

    private upDate() {
        this.arr = []
        let ran = MathUtils.limitInteger(50, 60)
        for (let i = 0; i < ran; i++) {
            let cir = new Circle()
            cir.x = this.xyData.tx
            cir.y = this.xyData.ty
            let rotation = Math.random() * 360
            cir.vx = Math.cos(rotation) * cir.v
            cir.vy = Math.sin(rotation) * cir.v
            this.arr.push(cir)
        }
        TimerManager.ins().doFrame(1, 0, this.loop, this)
    }

    private shps: egret.Shape[] = []
    private arr: Circle[] = []
    public drawColor = 0x09f7ce // 0x66f907// 0xf9f9f2
    private loop() {
        if (this.arr[0].alpha < 0.1) {
            TimerManager.ins().remove(this.loop, this)
            DisplayUtils.removeFromParent(this)
            return
        }

        for (let i = this.shps.length - 1; i >= 0; i--) {
            let item = this.shps[i]
            if (item.alpha < 0.01) {
                DisplayUtils.removeFromParent(item)
                this.shps.splice(i, 1)
            }
            item.alpha *= 0.85
        }

        let shp: egret.Shape = new egret.Shape();
        this.addChild(shp);
        shp.alpha = 1
        this.shps.push(shp)

        shp.graphics.clear()
        let alpha = this.arr[0].alpha
        for (let item of this.arr) {
            shp.graphics.beginFill(this.drawColor, alpha)
            shp.graphics.drawCircle(item.x, item.y, 5)
            shp.graphics.endFill()
        }
        for (let item of this.arr) {
            item.vy = item.vy + item.g
            item.x = item.x + item.vx
            item.y = item.y + item.vy
            item.alpha = item.alpha * 0.95
        }
    }

    public close(...param: any[]): void {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.close, this);
    }
}

class Circle {
    x: number = 375
    y: number = 350
    g: number = 0.05
    vx: number
    vy: number
    v: number = 3
    alpha: number = 1
}