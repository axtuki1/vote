"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Library_1 = require("../Library");
$(function () {
    const update = () => {
        fetch("/api/v1/getVoteType").then(function (response) {
            return response.json();
        })
            .then(function (json) {
            const data = json;
            if (data["data"] != null) {
                let i = 1, oneline = data["oneLine"];
                if (data["oneLine"] == null)
                    oneline = 8;
                $(".vote-group").html("");
                $(".top").hide();
                $(".vote-wrapper").show();
                Object.keys(data["data"]).forEach(key => {
                    const element = data["data"][key];
                    if ($(".vote-group-" + i).get(0) == null) {
                        $(".vote-group").append($("<div></div>").addClass("vote-group-" + i));
                    }
                    else if ($(".vote-group-" + i + " > *").length >= oneline) {
                        i++;
                        $(".vote-group").append($("<div></div>").addClass("vote-group-" + i));
                    }
                    let el = $("<div></div>").addClass("vote").append(element["text"]).css("background", element["backColor"]).css("color", element["color"]).css("width", "calc(" + 100 / oneline + "% - 10px)");
                    el.get(0).dataset.id = key;
                    $(".vote-group-" + i).append(el);
                });
            }
            else if (data["mode"] == "error") {
                $(".top").html(data["text"]);
            }
        }).catch((reason) => {
        });
    };
    update();
    const send = (type) => {
        fetch("/api/v1/postVote", {
            method: 'POST',
            body: JSON.stringify({ type: type }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        })
            .then(function (json) {
            const data = json;
            if (data["mode"] == "ok") {
                Library_1.Library.dialog("投票しました");
            }
            else if (data["mode"] == "error") {
                Library_1.Library.dialog(data["text"]);
            }
        });
    };
    $(document).on("click", ".vote-group .vote", (e) => {
        const target = e.target;
        console.log(target);
        send(target.getAttribute("data-id"));
    });
});
