// // This is an example to compile
// function renderCurve() {
//     // @number
//     for (var a = 1, b = 10; a * b; a++, b--)
//         console.log(new Array(a * b).join('*'));
// }
// renderCurve();
//
//
//
// function a(){
//
//   this.b="aa";
// }
// b=new cc.Menu("aha");
// console.log("ok",JSON.stringify(new a()));
// player.js
Player = cc.ComponentJS.extend({
    generateProjectile: function (x, y) {
        var projectile = new cc.Sprite("components/Projectile.png", cc.rect(0, 0, 20, 20));
        var scriptComponent = new cc.ComponentJS("src/ComponentTest/projectile.js");
        projectile.addComponent(scriptComponent);
        this.getOwner().getParent().addChild(projectile);

        // set position
        var winSize = cc.director.getVisibleSize();
        var visibleOrigin = cc.director.getVisibleOrigin();
        projectile.setPosition(cc.p(visibleOrigin.x + 20, visibleOrigin.y + winSize.height/2));

        // run action
        var posX = projectile.getPositionX();
        var posY = projectile.getPositionY();
        var offX = x - posX;
        var offY = y - posY;

        if (offX <= 0) {
            return;
        }

        var contentSize = projectile.getContentSize();
        var realX = visibleOrigin.x + winSize.width + contentSize.width/2;
        var ratio = offY / offX;
        var realY = (realX * ratio) + posY;
        var realDest = cc.p(realX, realY);

        var offRealX = realX - posX;
        var offRealY = realY - posY;
        var length = Math.sqrt((offRealX * offRealX) + (offRealY * offRealY));
        var velocity = 960;
        var realMoveDuration = length / velocity;

        projectile.runAction(cc.moveTo(realMoveDuration, realDest));
    },

    onEnter: function() {
        var owner = this.getOwner();
        owner.playerComponent = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function (touches, event) {
                var target = event.getCurrentTarget();
                if (target.playerComponent) {
                    var location = touches[0].getLocation();
                    target.playerComponent.generateProjectile(location.x, location.y);
                    jsb.AudioEngine.play2d("pew-pew-lei.wav");
                }
            }
        }, owner);
    }
});
