var myGameArea = {
    canvas : document.createElement('canvas'),
    start : function () {
        this.canvas.width = 480;
        this.canvas.heigth = 270;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}
function startGame() {
    myGameArea.start();
}