
function ThoughtStream(name, storyline, start_index) {
    var that = {};

    var index = start_index || 0;
    var json = game.cache.getJSON('thoughts');

    if (storyline === "to") {
        // not implemented yet.
        // this feature is for characters talking "to" one another
        // we can fix/implement it after the main script works
        return undefined;
    }
    // thoughts.json -> .name.storyline[index]
    storyline = storyline || "script";

    var stream;
    if (json.hasOwnProperty(name) && json[name].hasOwnProperty(storyline)) {
        stream = json[name][storyline];
        console.log(stream[0]);
    }
    else {
        stream = null;
        return null;
    }

    var getAt = function(at_index) {
        if (at_index > stream.length - 1 || at_index < 0) {
            console.log("Bad index request for thoughts."+ name + "." + storyline +
                "[" + at_index + "]");
            return "";
        }
        return stream[at_index];
    }

    var getNext = function() {
        if (that.index > stream.length - 1) {
            console.log("Stream exhausted for", name)
            return "";
        }
        // get's the current index and increments the story head
        // is that odd behaviour?
        return stream[that.index++];
    }

    that.index = index;
    that.json = json;
    that.storyline = storyline;

    that.getAt = getAt;
    that.getNext = getNext;

    return that;
}
