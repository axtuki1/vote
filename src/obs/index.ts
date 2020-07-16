import { Library } from "../Library";

$(function(){
    let url = "ws://"+document.domain+"/";
    if(location.protocol == 'https:'){
        url = "wss://"+document.domain+"/"
    }

    const update = () => {
        $(".obs-area").removeClass("show");
        if( !settings["viewOBS"] ){
            $(".obs-area").addClass("show");
        }
        $(".vote-group").html("");
        const data = voteType;
        let i = 1, widlist = [];
        allData = 0;
        Object.keys(voteData).forEach(key => {
            allData = allData + voteData[key].length
        });

        if(settings["viewData"]){
            $(".title").html(title + " [ "+allData+" ]");
        } else {
            $(".title").html(title);
        }
        let wid = "calc("+100/oneline+"% - 10px)";
        if(Object.keys(data).length <= oneline){
            wid = "calc("+100/Object.keys(data).length+"% - 10px)";
        }
        let ol = 0;
        Object.keys(data).forEach(key => {
            if( ol >= oneline ){
                widlist[i] = "calc("+100/oneline+"% - 10px)";
                ol = 0;
                i++;
            }
            ol++;
        });
        if(ol != 0){
            widlist[i] = "calc("+100/ol+"% - 10px)";
        }
        console.log(widlist[i]);
        
        i = 1;
        Object.keys(data).forEach(key => {
            const element = data[key];
            if($(".vote-group-"+i).get(0) == null){
                $(".vote-group").append(
                    $("<div></div>").addClass("vote-group-"+i)
                );
            } else if($(".vote-group-"+i+" > *").length >= oneline){
                i++;
                $(".vote-group").append(
                    $("<div></div>").addClass("vote-group-"+i)
                );
            }
            let el = $("<div></div>").addClass("vote");
            el.append($("<div></div>").html(element["text"]));
            el.get(0).dataset.id = key;
            if( settings["viewData"] ){
                let per = "0.0%", len = 0;
                if( voteData[key] != null ){
                    len = voteData[key].length;
                    if(((len/allData) * 100) % 1 == 0){
                        per = Library.floor((len/allData) * 100,1) +".0%";
                    } else {
                        per = Library.floor((len/allData) * 100,1) +"%";
                    }
                    
                }
                el.append(
                    $("<div></div>").addClass("data-wrapper").append(
                        $("<div></div>").addClass("data-per").html( 
                            per
                        )
                    ).append(
                        $("<div></div>").addClass("data").html(len+"")
                    )
                );
            }
            if( oneline >= 4 ){
                el.css("flex-direction", "column");
            }
            $(".vote-group-"+i).append(
                $("<div></div>").addClass("vote-wrapper").append(el).css("background",element["backColor"]).css("color",element["color"]).css("width",(widlist[i] != null?widlist[i]:wid))
            );
        });
    }





    let ws = new WebSocket(url);
    let settings = {}, voteType = {}, voteData = {}, title = "", oneline = 8, allData = 0;

    ws.addEventListener("message", e => {
        const data = JSON.parse(e.data);
        // console.log(data);
        
        if( data.mode == "update-settings" ){
            settings = data.settings;
        } else if( data.mode == "update-title" ){
            title = data.title;
        } else if( data.mode == "update-type" ){
            voteType = data.type;
        } else if( data.mode == "update-data" ){
            if(voteData[data.type] == null) voteData[data.type] = [];
            voteData = data.data;
        } else if( data.mode == "update-oneline" ){
            oneline = data.oneline;
        } else if( data.mode == "hello" ){
            voteData = data.data;
            settings = data.settings;
            voteType = data.voteType;
            title = data.title;
            oneline = data.oneLine;
        } 
        update();
    });
    ws.addEventListener("open", e => {
        ws.send(JSON.stringify({
            mode: "hello"
        }));
    });
    ws.addEventListener("close", e => {
        ws = new WebSocket(url);
    });



});