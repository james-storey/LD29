
// group
// graphic
// text
//

var Thought = function(x, y, name, style) {
    var that = {}

    // groups are added to the world
    var group = game.add.group(undefined, name + "_thought_grp");
    var graphic = game.add.graphics(x, y);

    style = style || { font: "12pt uni_05_53", fill: "#000000", align: "center" };
    var text = game.add.text(x, y, "", style);
    text.wordWrap = true;
    text.wordWrapWidth = 240;

    group.add(graphic);
    group.add(text);

    var stream = null;

    var redraw = function() {
        var w = text.width;
        var h = text.height;
        var pad = pad || 10;

        graphic.clear();
        graphic.beginFill(0xFFFFFF);
        graphic.drawRect(-pad, -pad, w + pad * 2, h + pad * 2);
        graphic.endFill();
    }

    var move = function(x, y) {
        text.x = x;
        text.y = y;

        graphic.position.x = x;
        graphic.position.y = y;

        redraw();
    }

    var hide = function() {
        visible = false;
        text.visible = false;
        graphic.clear();
    }

    var show = function() {
        visible = true;
        text.visible = true;
    }

    var load = function(name, storyline) {
        storyline = storyline || "script";
        stream = ThoughtStream(name, storyline);
        that.stream = stream;
    }

    hide();

    that.group = group;
    that.graphic = graphic;
    that.text = text;
    that.stream = stream;

    that.redraw = redraw;
    that.hide = hide;
    that.show = show;
    that.load = load;
    that.move = move;

    return that;
}
