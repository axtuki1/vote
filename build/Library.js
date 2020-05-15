"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Library {
    static dialog(content, force_ok = false, autoClose = 0) {
        let dom = $("<div></div>").addClass("dialog-wrapper");
        const dialog_close = () => {
            dom.addClass("closing");
            setTimeout(() => {
                dom.remove();
            }, 2000);
        };
        dom.append($("<div></div>").append($("<div></div>").addClass("icon").html('<i class="fa fa-info-circle" aria-hidden="true"></i>')).append($("<div></div>").addClass("txt").html(content)).append($("<div></div>").addClass("button").html("OK").on({
            "click": dialog_close
        })).addClass("dialog").on({ "click": (e) => { e.stopPropagation(); } }));
        if (!force_ok) {
            dom.on({
                "click": dialog_close
            });
        }
        if (autoClose > 0) {
            setTimeout(dialog_close, autoClose);
        }
        $("body").append(dom);
        setTimeout(() => {
            dom.addClass("show");
        }, 10);
    }
    static floor(base, ext) {
        return Math.floor(base * (10 ^ ext)) / (10 ^ ext);
    }
}
exports.Library = Library;
