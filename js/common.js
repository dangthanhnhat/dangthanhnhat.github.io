"use strict";

var BKR = BKR || {};

(function($) {
    var $win = $(window), $doc = $(document);
    
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('firefox') != -1) {
        $("html").addClass("isFirefox");
    }
    
    // ------------------------------------------------------------ 
    BKR.pageId = "";
    BKR.module = function() {};
    BKR.loaded = false;
    BKR.rootDir = "";
    BKR.pageDir = "";
    BKR.imgExt = (Modernizr.csstransitions) ? ".svg" : ".png";
    BKR.visualLoaded = false;
    
    // ------------------------------------------------------------ 
    BKR.mainVisualObj = {
        h: "",
        mainCloud: [],
        mainCar: [],
        mainHelicopter: "",
        peopleSizeData: [
            { width: 27, height: 52 }, // 1
            { width: 26, height: 59 }, // 2
            { width: 30, height: 50 }, // 3
            { width: 28, height: 50 }, // 4
            { width: 66, height: 60 }, // 5
            { width: 23, height: 46 }, // 6
            { width: 25, height: 22 }, // 7
            { width: 42, height: 42 }, // 8
            { width: 22, height: 52 }, // 9
            { width: 42, height: 50 }, // 10
            
            { width: 24, height: 40 }, // 11
            { width: 42, height: 32 }, // 12
            { width: 21, height: 20 }, // 13
            { width: 35, height: 40 }, // 14
            { width: 19, height: 25 }, // 15
            { width: 10, height: 30 }, // 16
            { width: 25, height: 55 }, // 17
            { width: 50, height: 67 }, // 18
            { width: 48, height: 49 }, // 19
            { width: 43, height: 56 }, // 20
            
            { width: 25, height: 59 }, // 21
            { width: 21, height: 42 }, // 22
            { width: 26, height: 59 }, // 23
            { width: 26, height: 59 }, // 24
            { width: 21, height: 59 }, // 25
            { width: 23, height: 56 }, // 26
            { width: 31, height: 55 }, // 27
            { width: 19, height: 55 }, // 28
            { width: 66, height: 57 }, // 29
            { width: 37, height: 45 }, // 30
            
            { width: 54, height: 60 }, // 31
            { width: 34, height: 61 }, // 32
            { width: 46, height: 59 }, // 33
            { width: 48, height: 59 }  // 34
        ],
        
        init: function() {
            var cloudLength = 9,
                carLength = 4,
                heliLength = 1,
                peopleLength = 34;
            
            $("#main-visual").append(
                $("<img>").attr({
                    "data-pc": "img/main_town.png",
                    "data-sp": "img/sp/main_town.png",
                    "alt": "",
                    "class": "main-bg tgl"
                })
            );
            $("#main-visual").append(
                $("<ul>").addClass("main-people")
            );
            
            this.addObj({
                len: cloudLength,
                elm: "<div>",
                elmCls: "main-cloud main-cloud",
                src: "main_cloud",
                imgCls: "cloud-obj tgl",
                target: "#main-visual"
            });
            this.addObj({
                len: carLength,
                elm: "<div>",
                elmCls: "main-car main-car",
                src: "main_car",
                imgCls: "car-obj tgl",
                target: "#main-visual"
            });
            this.addObj({
                len: heliLength,
                elm: "<div>",
                elmCls: "main-helicopter main-helicopter",
                src: "main_helicopter",
                imgCls: "helicopter-obj tgl",
                target: "#main-visual"
            });
            this.addObj({
                len: peopleLength,
                elm: "<li>",
                elmCls: "main-people",
                src: "main_people",
                imgCls: "people-obj pcOnly",
                target: ".main-people",
                size: this.peopleSizeData
            });
            $("#main-visual").wrapInner(
                $("<div>").addClass("visual-sky")
            );
            BKR.visualLoaded = true;
            BKR.module.mainVisual.init();
            BKR.module.preLoad.init();
        },
        
        addObj: function(data) {
            var obj = [],
                num = "",
                n = 0,
                w = 0,
                h = 0,
                addAttr = {},
                addCls = "",
                pcImgDir = "img/",
                spImgDir = "img/sp/",
                imgExt = ".png";
            
            for (var i = 0; i < data.len; i++) {
                n = i + 1;
                num = (n < 10) ? "_0" + n : "_" + n;
                addAttr = {
                    "alt": "",
                    "class": data.imgCls
                };
                
                if (data.src === "main_people") {
                    addCls = data.elmCls + n;
                    w = data.size[i].width;
                    h = data.size[i].height;
                    addAttr.src = pcImgDir + data.src + num + imgExt;
                    addAttr.width = w;
                    addAttr.height = h;
                } else if (data.src === "main_helicopter") {
                    addCls = data.elmCls;
                    addAttr["data-pc"] = pcImgDir + data.src + imgExt;
                    addAttr["data-sp"] = spImgDir + data.src + imgExt;
                } else {
                    addCls = data.elmCls + " " + data.elmCls + n;
                    addAttr["data-pc"] = pcImgDir + data.src + num + imgExt;
                    addAttr["data-sp"] = spImgDir + data.src + num + imgExt;
                }
                
                //console.log(addAttr);
                obj[i] = $(data.elm).addClass(addCls).append(
                    $("<img>").attr(addAttr)
                );
                //console.log(data.target, obj[i]);
                $(data.target).append(obj[i]);
            }
        },
    };
    
    // ------------------------------------------------------------ 
    BKR.module.preLoad = {
        toggleImgElms: [],
        pcImgArr: [],
        spImgArr: [],
        pcOnlyImgElms: [],
        pcOnlyImgArr: [],
        completedLength: 0,
        
        init: function() {
            //console.log(BKR.pageDir, BKR.pageId);
            if (BKR.pageId === "top") {
                this.toggleImgLength = $("img.tgl").length;
                this.pcOnlyImgLength = $("img.pcOnly").length;
            } else {
                this.toggleImgLength = $("#contents img.tgl").length;
                this.pcOnlyImgLength = $("#contents img.pcOnly").length;
            }
            //console.log("preLoad", this.toggleImgLength);
            if (this.toggleImgLength <= 0) {
                this.loadedAction(100);
                return;
            }
            
            this.isPcImgs = Modernizr.mq("(min-width: 768px)") ? false : true;
            
            var self = this;
            $("img.tgl").each(function() {
                self.toggleImgElms.push($(this));
            });
            $("img.pcOnly").each(function() {
                self.pcOnlyImgElms.push($(this));
            });
            
            for (var i = 0; i < this.toggleImgLength; i++) {
                this.pcImgArr.push( this.toggleImgElms[i].data("pc") );
                this.spImgArr.push( this.toggleImgElms[i].data("sp") );
            }
            for (var i = 0; i < this.pcOnlyImgLength; i++) {
                this.pcOnlyImgArr.push( this.pcOnlyImgElms[i].data("pc") );
            }
            
            var spPhotoElm = [];
            for (var j = 0; j < this.toggleImgLength; j++) {
                spPhotoElm[j] = new Image();
                spPhotoElm[j].src = this.spImgArr[j];
            }
            this.tglPhoto();
            
            if (Modernizr.mq("(min-width: 768px)") || !Modernizr.touchevents) {
                for (var i = 0; i < this.pcOnlyImgLength; i++) {
                    this.pcOnlyImgElms[i].attr("src", this.pcOnlyImgArr[i]);
                }
            }
            
            $("img.tgl").on("load", function() {
                self.completedLength++;
                if (self.completedLength >= self.toggleImgLength) {
                    self.loadedAction(600);
                }
            });
        },
        loadedAction: function(dur) {
            if (!BKR.loaded) {
                BKR.loaded = true;
                BKR.body.addClass("loaded");
            }
        },
        toPcPhoto: function() {
            for (var i = 0; i < this.toggleImgLength; i++) {
                this.toggleImgElms[i].attr("src", this.pcImgArr[i]);
            }
        },
        toSpPhoto: function() {
            for (var i = 0; i < this.toggleImgLength; i++) {
                this.toggleImgElms[i].attr("src", this.spImgArr[i]);
            }
        },
        tglPhoto: function() {
            if (Modernizr.mq("(max-width: 767px)")) {
                if (this.isPcImgs) {
                    this.isPcImgs = !this.isPcImgs;
                    this.toSpPhoto();
                }
            } else {
                if (!this.isPcImgs) {
                    this.isPcImgs = !this.isPcImgs;
                    this.toPcPhoto();
                }
            }
        }
    };
    
    // ------------------------------------------------------------ 
    BKR.sizeSet = function() {
        BKR.winW = $win.innerWidth();
        BKR.winH = $win.innerHeight();
    };
    
    // ------------------------------------------------------------ 
    BKR.posSet = function() {
        BKR.winTop = $win.scrollTop();
    };
    
    // ------------------------------------------------------------ 
    BKR.setting = function() {
        BKR.body = $("body");
        BKR.pageId = BKR.body.data("page");
        BKR.sizeSet();
        BKR.posSet();
    };
    
    BKR.common = {
        onLoad: function() {
            BKR.setting();
        },
        onResize: function() {
            BKR.module.preLoad.tglPhoto();
        },
        onResized: function() {
            BKR.sizeSet();
        },
        onScroll: function() {
            BKR.posSet();
        }
    };
})(jQuery);