local _ENV = require("castl.runtime");
Player = cc.ComponentJS:extend(_obj({
["generateProjectile"] = (function (this, x, y)
local realMoveDuration,velocity,length,offRealY,offRealX,realDest,realY,ratio,realX,contentSize,offY,offX,posY,posX,visibleOrigin,winSize,scriptComponent,projectile;
projectile = _new(cc.Sprite,"components/Projectile.png",cc:rect(0,0,20,20));
scriptComponent = _new(cc.ComponentJS,"src/ComponentTest/projectile.js");
projectile:addComponent(scriptComponent);
this:getOwner():getParent():addChild(projectile);
winSize = cc.director:getVisibleSize();
visibleOrigin = cc.director:getVisibleOrigin();
projectile:setPosition(cc:p((_addNum2(visibleOrigin.x,20)),(_addNum2(visibleOrigin.y,(winSize.height / 2)))));
posX = projectile:getPositionX();
posY = projectile:getPositionY();
offX = (x - posX);
offY = (y - posY);
if (_le(offX,0)) then
do return end
end

contentSize = projectile:getContentSize();
realX = (_addNum2((_add(visibleOrigin.x,winSize.width)),(contentSize.width / 2)));
ratio = (offY / offX);
realY = (_addNum1((realX * ratio),posY));
realDest = cc:p(realX,realY);
offRealX = (realX - posX);
offRealY = (realY - posY);
length = Math:sqrt(((offRealX * offRealX) + (offRealY * offRealY)));
velocity = 960;
realMoveDuration = (length / velocity);
projectile:runAction(cc:moveTo(realMoveDuration,realDest));
end),
["onEnter"] = (function (this)
local owner;
owner = this:getOwner();
owner.playerComponent = this;
cc.eventManager:addListener(_obj({
["event"] = cc.EventListener["TOUCH_ALL_AT_ONCE"],
["onTouchesEnded"] = (function (this, touches, event)
local location,target;
target = event:getCurrentTarget();
if _bool(target.playerComponent) then
location = touches[0]:getLocation();
target.playerComponent:generateProjectile(location.x,location.y);
jsb.AudioEngine:play2d("pew-pew-lei.wav");
end

end)
}),owner);
end)
}));