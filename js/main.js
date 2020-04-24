"use strict";

(function($) {
    var $win = $(window),
        $doc = $(document),
        resizeTimer = false;
    
    // ------------------------------------------------------------ PJAX
    BKR.module.pjax = {
        area: "#contents",
        link: "a.pjax",
        
        init: function() {
            $.pjax({
                area: this.area,
                link: this.link,
                wait: 1000,
                ajax: {
                    timeout: 2500
                },
                //scrollTop: null,
                load: {
                    //head: 'meta, link',
                    //script: true
                },
                cache: {
                    click: true,
                    submit: true,
                    popstate: true
                },
                callbacks: {
                    //timeout: 2500,
                    ajax: {
                        success: function(event, setting, data, textStatus, jqXHR) {
                            //console.log("success");
                            var href = event.currentTarget.href;
                            if (!href) href = location.href;
                            BKR.module.pjax.idRewrite(href);
                        }
                    },
                    update: {
                        url: {
                            after: function() {
                            }
                        },
                        script: {
                            after: function() {
                            }
                        }
                    }
                }
            });
            $doc.bind('pjax:fetch', this.onFetch);
            $win.bind("pjax:unload", this.onUnload);
            $doc.bind("pjax:DOMContentLoaded", this.onDOMContentLoaded);
            //$doc.bind("pjax:ready", this.onReady);
            //$doc.bind("pjax:render", this.onRender);
            $win.bind("pjax:load", this.onLoad);
        },
        
        
        // ------------------------------ 
        onDOMContentLoaded: function() {
            //console.log("3. DOMContentLoaded");
            BKR.module.component();
        },
        
        // ------------------------------ 
        onReady: function() {
            //console.log("4. ready");
        },
        
        // ------------------------------ 
        onRender: function() {
            //console.log("5. render");
        },
        
        // ------------------------------ 
        onLoad: function() {
            //console.log("6. load");
        }
    };
    
    BKR.module.mainVisual = {
        init: function() {
            //console.log("on");
            this.peopleAction();
        },
        peopleAction: function() {
            var $peopleElm = $(".main-people li");
            
            $peopleElm.on("mouseenter", function() {
                //console.log("hov");
                var self = this,
                    actionArr = [ "jumping", "spining", "swaying", "shaking" ],
                    ran = Math.floor(Math.random() * actionArr.length),
                    cls = actionArr[ran];
                
                $(this).addClass(cls);
                setTimeout(function() {
                    $(self).removeClass(cls);
                }, 600);
            }).on("click", function() {
                var self = this;
                
                $(this).addClass("hi");
                setTimeout(function() {
                    $(self).removeClass("hi");
                }, 600);
            });
        },
        clear: function() {
            var $peopleElm = $(".main-people li");
            $peopleElm.off("mouseenter click");
        }
    };
    
    
    
    // ------------------------------------------------------------ 
    BKR.module.onlyOnce = function() {
        BKR.common.onLoad();
    };
    
    BKR.module.component = function() {
        if (BKR.pageId === "top") {
            if (!BKR.visualLoaded) {
                BKR.mainVisualObj.init();
            }
        } else {
            BKR.module.preLoad.init();
        }
    };
    
    BKR.module.onLoad = function() {
        //console.log("onload");
        BKR.module.onlyOnce();
        BKR.module.component();
    };
    
    BKR.module.onResize = function() {
        BKR.common.onResize();
        if (resizeTimer !== false) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            BKR.common.onResized();
        }, 200);
    };
    
    BKR.module.onScroll = function() {
        BKR.common.onScroll();
    };
    
    // ------------------------------------------------------------ 
    $win.on({
        "load": BKR.module.onLoad,
        "resize": BKR.module.onResize,
        "scroll": BKR.module.onScroll
    });
})(jQuery);


/* requestAnimationFrame */
(function(w, r) {
    w['r'+r] = w['r'+r] || w['webkitR'+r] || w['mozR'+r] || w['msR'+r] || w['oR'+r] || function(c){ w.setTimeout(c, 1000 / 60); };
})(this, 'equestAnimationFrame');