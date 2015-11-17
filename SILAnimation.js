window.SILAnimation = (function() {
    "use strict";
    var mainHeight = 600,
        mainWidth = 800;

    function SILAnimation(options) {
        this.containerId = options.containerId;
        this.imageId = options.imageId;
        this.silData = options.silData;
        // this.frameHeight = options.frameHeight;
        // this.frameWidth = options.frameWidth;
        this.currentFrame = options.currentFrame || 0;
        // this.noOfFrames = options.noOfFrames;
        // this.intervalTime = options.intervalTime || 100;
        // this.repeat = options.repeat || false;
        // this.vertical = options.vertical || true;
        // this.fOnComplete = options.fOnComplete;
        // this.context = options.context;
        this.container = null;
        this.spriteImage = null;
        this.canvas = null;
        this.canvasContext = null;
        this.animationInterval = null;

        this.scaleXFactor = null;
        this.scaleYFactor = null;
        this.intervalTime = null;
    }

    SILAnimation.prototype.init = function() {
        this.container = document.getElementById(this.containerId);
        this.spriteImage = document.getElementById(this.imageId);
        this.canvas = document.createElement("canvas");
        this.canvasContext = this.canvas.getContext("2d");
        this.canvas.setAttribute("id", this.containerId + "-canvas");
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.container.appendChild(this.canvas);

        this.setIntervalTime();

        // this.drawImage(this.currentFrame);
        // var self = this;
        // window.addEventListener("resize", function(event) {
        //     self.onWindowResize(event);
        // });
        this.populateScaleFactors();
        var self = this;
        window.addEventListener("resize", function(event) {
            self.onWindowResize(event);
        });
        this.drawFrame(this.currentFrame);
    };

    SILAnimation.prototype.setIntervalTime = function() {
        var frameRate = this.silData.frameRate,
            noOfFrames = this.silData.frames.length,
            totalTime = noOfFrames / frameRate * 1000;
        this.intervalTime = totalTime / noOfFrames;
    };

    SILAnimation.prototype.populateScaleFactors = function() {
        this.scaleXFactor = this.container.clientWidth / mainWidth;
        this.scaleYFactor = this.container.clientHeight / mainHeight;
    };

    // SILAnimation.prototype.drawImage = function(currentFrame) {
    //     // console.log(currentFrame);
    //     var img = this.spriteImage;
    //     var sx = 0;
    //     var sy = currentFrame * this.frameHeight;
    //     var sWidth = this.frameWidth;
    //     var sHeight = this.frameHeight;
    //     var dx = 0;
    //     var dy = 0;
    //     var dWidth = this.container.clientWidth;
    //     var dHeight = this.container.clientHeight;
    //     this.canvasContext.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    // };
    SILAnimation.prototype.drawImage = function(instance) {
        var img = this.spriteImage,
            sx = instance.sx,
            sy = instance.sy,
            sWidth = instance.sWidth,
            sHeight = instance.sHeight,
            dx = instance.dx,
            dy = instance.dy,
            dWidth = instance.dWidth,
            dHeight = instance.dHeight;
        this.canvasContext.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    SILAnimation.prototype.drawFrame = function(frameNumber) {
        var frameData = this.silData.frames[frameNumber],
            mainInstances = this.silData.instances,
            frameSubInstances = frameData.instances,
            self = this;

        frameSubInstances.forEach(function(frameInstance) {
            // console.info(frameInstance);
            var instanceData = {},
                rotation,
                instance = mainInstances[frameInstance.instanceIndex];
            instanceData.sx = instance.x;
            instanceData.sy = instance.y;
            instanceData.sWidth = instance.width;
            instanceData.sHeight = instance.height;
            instanceData.dx = 0; //frameInstance.translate[0];
            instanceData.dy = 0; //frameInstance.translate[1];
            instanceData.dWidth = instanceData.sWidth;
            instanceData.dHeight = instanceData.sHeight;
            rotation = frameInstance.rotation;
            self.canvasContext.save();
            self.canvasContext.translate(frameInstance.translate[0] * self.scaleXFactor, frameInstance.translate[1] * self.scaleYFactor);
            self.canvasContext.scale(frameInstance.scale[0] * self.scaleXFactor, frameInstance.scale[1] * self.scaleYFactor);
            self.canvasContext.rotate(rotation);
            self.drawImage(instanceData);
            self.canvasContext.restore();
        })
    }

    SILAnimation.prototype.startBgSequence = function() {
        // var self = this;
        // this.animationInterval = window.setInterval(function() {
        //     self.currentFrame++;
        //     if (self.currentFrame === (self.noOfFrames)) {
        //         if (self.repeat) {
        //             self.currentFrame = 0;
        //         } else {
        //             self.currentFrame--;
        //             self.stopBgSequence();
        //             self.fOnComplete.call(self.context);
        //             self.removeCanvas();
        //             return;
        //         }
        //     }
        //     // console.log("currentFrame: " + currentFrame);
        //     self.clearCanvas();
        //     self.drawImage(self.currentFrame);
        // }, this.intervalTime);
        var self = this;
        window.animationInterval = setInterval(function() {
            if (self.silData.frames[self.currentFrame]) {
                // self.canvas.width = self.canvas.width;
                self.clearCanvas();
                self.drawFrame(self.currentFrame);
                self.currentFrame++;
            } else {
                clearInterval(window.animationInterval);
            }
        }, this.intervalTime);
    };

    // SILAnimation.prototype.goToFrame = function(frameNumber) {
    //     if (frameNumber < 1 || frameNumber > this.noOfFrames) {
    //         console.warn("Invalid frameNumber");
    //         return;
    //     }
    //     frameNumber--;
    //     this.clearCanvas();
    //     this.currentFrame = frameNumber;
    //     this.drawImage(frameNumber);
    // }

    SILAnimation.prototype.onWindowResize = function(event) {
        this.populateScaleFactors();
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.drawFrame(this.currentFrame - 1);
    };

    // SILAnimation.prototype.updateCanvasDimensions = function() {
    //     this.canvas.width = this.container.clientWidth;
    //     this.canvas.height = this.container.clientHeight;
    //     this.drawImage(this.currentFrame);
    // };

    SILAnimation.prototype.clearCanvas = function() {
        this.canvas.width = this.canvas.width;
    }

    SILAnimation.prototype.stopBgSequence = function() {
        window.clearInterval(this.animationInterval);
    };

    SILAnimation.prototype.removeCanvas = function() {
        this.container.removeChild(this.canvas);
    };

    return SILAnimation;
})();
