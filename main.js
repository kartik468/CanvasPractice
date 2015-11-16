var options = {
    "containerId": "main",
    "imageId": "sprite",
    "frameHeight": 267,
    "frameWidth": 435,
    "currentFrame": 0,
    "noOfFrames": 46,
    "intervalTime": 100,
    "repeat": true,
    "vertical": true,
};

// var containerOneOptions = {
//     "containerId": "container-1",
//     "imageId": "sprite",
//     "frameHeight": 82,
//     "frameWidth": 161,
//     "currentFrame": 0,
//     "noOfFrames": 12,
//     "intervalTime": 100,
//     "repeat": true,
//     "vertical": true,
// };
// var containerTwoOptions = {
//     "containerId": "container-2",
//     "imageId": "sprite",
//     "frameHeight": 82,
//     "frameWidth": 161,
//     "currentFrame": 0,
//     "noOfFrames": 12,
//     "intervalTime": 100,
//     "repeat": true,
//     "vertical": true,
// };
// var containerThreeOptions = {
//     "containerId": "container-3",
//     "imageId": "sprite",
//     "frameHeight": 82,
//     "frameWidth": 161,
//     "currentFrame": 0,
//     "noOfFrames": 12,
//     "intervalTime": 100,
//     "repeat": false,
//     "vertical": true,
// };

document.addEventListener("readystatechange", function(event) {
    "use strict";
    // console.info("readyState: " + document.readyState);
    // console.info("type: " + event.type);
    // console.info("eventPhase: " + EVENT[event.eventPhase]);
    if (document.readyState === "complete") {
        window.bgSequence = new RunBgSequence(options);
        bgSequence.init();
        bgSequence.startBgSequence();

        // window.containerOneSequence = new RunBgSequence(containerOneOptions);
        // containerOneSequence.init();
        // containerOneSequence.startBgSequence();

        // window.containerTwoSequence = new RunBgSequence(containerTwoOptions);
        // containerTwoSequence.init();
        // containerTwoSequence.startBgSequence();

        // window.containerThreeSequence = new RunBgSequence(containerThreeOptions);
        // containerThreeSequence.init();
        // containerThreeSequence.startBgSequence();

    }
});
