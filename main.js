document.addEventListener("readystatechange", function(event) {
    "use strict";
    if (document.readyState === "complete") {
        console.log("ready");
        window.container = document.getElementById("main-container");
        window.spriteImage = document.getElementById("stretch");
        window.canvas = document.createElement("canvas");
        window.canvasContext = canvas.getContext("2d");
        canvas.setAttribute("id", "main-canvas");
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        container.appendChild(canvas);

        // drawing
        window.mydata = data;
        var frameNumber = 0;
        window.animationInterval = setInterval(function() {
            if (mydata.frames[frameNumber]) {
                this.canvas.width = this.canvas.width;
                drawFrame(frameNumber);
                frameNumber++;
            } else {
                clearInterval(window.animationInterval);
            }
        }, 50);
    }
});

var drawFrame = function(frameNumber) {
    var frameData = mydata.frames[frameNumber];
    var mainInstances = mydata.instances;
    var frameSubInstances = frameData.instances;

    frameSubInstances.forEach(function(frameInstance) {
        // console.info(frameInstance);
        var instanceData = {};
        var instance = mainInstances[frameInstance.instanceIndex];
        instanceData.sx = instance.x;
        instanceData.sy = instance.y;
        instanceData.sWidth = instance.width;
        instanceData.sHeight = instance.height;
        instanceData.dx = 0; //frameInstance.translate[0];
        instanceData.dy = 0; //frameInstance.translate[1];
        instanceData.dWidth = instanceData.sWidth;
        instanceData.dHeight = instanceData.sHeight;
        var rotation = frameInstance.rotation;
        canvasContext.save();
        canvasContext.translate(frameInstance.translate[0], frameInstance.translate[1]);
        canvasContext.scale(frameInstance.scale[0], frameInstance.scale[1]);
        canvasContext.rotate(rotation);
        drawImage(instanceData);
        canvasContext.restore();
    })
}

var drawImage = function(instance) {
    var img = spriteImage;
    var sx = instance.sx;
    var sy = instance.sy;
    var sWidth = instance.sWidth;
    var sHeight = instance.sHeight;
    var dx = instance.dx;
    var dy = instance.dy;
    var dWidth = instance.dWidth;
    var dHeight = instance.dHeight;
    canvasContext.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}
