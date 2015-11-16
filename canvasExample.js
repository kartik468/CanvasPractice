var RunBgSequence = (function() {
    "use strict";

    function RunBgSequence(options) {
        this.containerId = options.containerId;
        this.imageId = options.imageId;
        this.frameHeight = options.frameHeight;
        this.frameWidth = options.frameWidth;
        this.currentFrame = options.currentFrame || 0;
        this.noOfFrames = options.noOfFrames;
        this.intervalTime = options.intervalTime || 100;
        this.repeat = options.repeat || false;
        this.vertical = options.vertical || true;
        this.fOnComplete = options.fOnComplete;
        this.context = options.context;
        this.container = null;
        this.spriteImage = null;
        this.canvas = null;
        this.canvasContext = null;
        this.animationInterval = null;
    }

    RunBgSequence.prototype.init = function() {
        this.container = document.getElementById(this.containerId);

        this.spriteImage = document.getElementById(this.imageId);

        this.canvas = document.createElement("canvas");
        this.canvasContext = this.canvas.getContext("2d");
        this.canvas.setAttribute("id", this.containerId + "-canvas");
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.container.appendChild(this.canvas);

        this.drawImage(this.currentFrame);
        var self = this;
        window.addEventListener("resize", function(event) {
            self.onWindowResize(event);
        });
    };

    RunBgSequence.prototype.drawImage = function(currentFrame) {
        // console.log(currentFrame);
        var img = this.spriteImage;
        var sx = 0;
        var sy = currentFrame * this.frameHeight;
        var sWidth = this.frameWidth;
        var sHeight = this.frameHeight;
        var dx = 0;
        var dy = 0;
        var dWidth = this.container.clientWidth;
        var dHeight = this.container.clientHeight;
        this.canvasContext.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    };

    RunBgSequence.prototype.startBgSequence = function() {
        var self = this;
        this.animationInterval = window.setInterval(function() {
            self.currentFrame++;
            if (self.currentFrame === (self.noOfFrames)) {
                if (self.repeat) {
                    self.currentFrame = 0;
                } else {
                    self.currentFrame--;
                    self.stopBgSequence();
                    self.fOnComplete.call(self.context);
                    self.removeCanvas();
                    return;
                }
            }
            // console.log("currentFrame: " + currentFrame);
            self.clearCanvas();
            self.drawImage(self.currentFrame);
        }, this.intervalTime);
    };

    RunBgSequence.prototype.goToFrame = function(frameNumber) {
        if (frameNumber < 1 || frameNumber > this.noOfFrames) {
            console.warn("Invalid frameNumber");
            return;
        }
        frameNumber--;
        this.clearCanvas();
        this.currentFrame = frameNumber;
        this.drawImage(frameNumber);
    }

    RunBgSequence.prototype.onWindowResize = function(event) {
        this.updateCanvasDimensions();
    };

    RunBgSequence.prototype.updateCanvasDimensions = function() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.drawImage(this.currentFrame);
    };

    RunBgSequence.prototype.clearCanvas = function() {
        this.canvas.width = this.container.clientWidth;
    }

    RunBgSequence.prototype.stopBgSequence = function() {
        window.clearInterval(this.animationInterval);
    };

    RunBgSequence.prototype.removeCanvas = function() {
        this.container.removeChild(this.canvas);
    };

    return RunBgSequence;
})();
