/* Start BX slider*/
jQuery(document).ready(function ($) {
	$('.nav li, .nav li').on({
	 mouseenter: function() {
		$(this).children('ul').stop(true, true).slideDown(400);
	 },
	 mouseleave: function() {
		$(this).children('ul').slideUp(100);
	 }
	});
    /* BX slider 1*/
    if ($('.main_slider').length) {
        $('.main_slider').bxSlider({
            minSlides: 1,
            maxSlides: 50,
            slideMargin: 18,
            speed: 1500,
            auto: true,
			infiniteLoop: true,
            adaptiveHeightSpeed: 800
        });
    }
    if ($('.book_detail_slider').length) {
        $('.book_detail_slider').bxSlider({
            minSlides: 1,
            maxSlides: 8,
            slideMargin: 18,
            speed: 1500
        });
    }
	 if ($('.book_info').length) {
        $('.book_info').bxSlider({
            minSlides: 1,
            maxSlides: 8,
            slideMargin: 18,
            speed: 1500
        });
    }
    if ($('#mobile_slider').length) {
        $('#mobile_slider').bxSlider({
            minSlides: 1,
            maxSlides: 8,
            slideMargin: 18,
            mode: 'horizontal',
            useCSS: false,
            easing: 'easeOutElastic',
            speed: 2000
        });
    }
    if ($('#author_slider').length) {
        $('#author_slider').bxSlider({
            auto: true,
            minSlides: 1,
            maxSlides: 8,
            slideMargin: 30,
            speed: 500
        });
    }
    if ($('#testimonials').length) {
        $('#testimonials').bxSlider({
            minSlides: 1,
            maxSlides: 8,
            slideMargin: 25,
            speed: 500
        });
    }
    if ($('#books-slider').length) {
        $('#books-slider').bxSlider({
            minSlides: 1,
            maxSlides: 8,
            slideMargin: 0,
            speed: 500
        });
    }
    if ($('#books-slider2').length) {
        $('#books-slider2').bxSlider({
            minSlides: 1,
            maxSlides: 8,
            slideMargin: 0,
            speed: 500
        });
    }
	
	var prettyphoto_js = $("[data-rel^='prettyPhoto']");
	if (prettyphoto_js.length) {
        prettyphoto_js.prettyPhoto();
    }
	
	
    /* BX slider 1*/
	
	 $(".home_nav a").click(function(event){
         event.preventDefault();
         //calculate destination place
         var dest=0;
         if($(this.hash).offset().top > $(document).height()-$(window).height()){
              dest=$(document).height()-$(window).height()-80;
         }else{
              dest=$(this.hash).offset().top-80;
         }
         //go to destination
         $('html,body').animate({scrollTop:dest}, 2000,'swing');
     });
});
/* End BX slider*/


/* Start Flip Slider Slider*/
(function () {

    var event = jQuery.event,

        //helper that finds handlers by type and calls back a function, this is basically handle
        // events - the events object
        // types - an array of event types to look for
        // callback(type, handlerFunc, selector) - a callback
        // selector - an optional selector to filter with, if there, matches by selector
        //     if null, matches anything, otherwise, matches with no selector
        findHelper = function (events, types, callback, selector) {
            var t, type, typeHandlers, all, h, handle,
                namespaces, namespace,
                match;
            for (t = 0; t < types.length; t++) {
                type = types[t];
                all = type.indexOf(".") < 0;
                if (!all) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
                }
                typeHandlers = (events[type] || []).slice(0);

                for (h = 0; h < typeHandlers.length; h++) {
                    handle = typeHandlers[h];

                    match = (all || namespace.test(handle.namespace));

                    if (match) {
                        if (selector) {
                            if (handle.selector === selector) {
                                callback(type, handle.origHandler || handle.handler);
                            }
                        } else if (selector === null) {
                            callback(type, handle.origHandler || handle.handler, handle.selector);
                        } else if (!handle.selector) {
                            callback(type, handle.origHandler || handle.handler);

                        }
                    }


                }
            }
        };

    /**
     * Finds event handlers of a given type on an element.
     * @param {HTMLElement} el
     * @param {Array} types an array of event names
     * @param {String} [selector] optional selector
     * @return {Array} an array of event handlers
     */
    event.find = function (el, types, selector) {
        var events = ($._data(el) || {}).events,
            handlers = [],
            t, liver, live;

        if (!events) {
            return handlers;
        }
        findHelper(events, types, function (type, handler) {
            handlers.push(handler);
        }, selector);
        return handlers;
    };
    /**
     * Finds all events.  Group by selector.
     * @param {HTMLElement} el the element
     * @param {Array} types event types
     */
    event.findBySelector = function (el, types) {
        var events = $._data(el).events,
            selectors = {},
            //adds a handler for a given selector and event
            add = function (selector, event, handler) {
                var select = selectors[selector] || (selectors[selector] = {}),
                    events = select[event] || (select[event] = []);
                events.push(handler);
            };

        if (!events) {
            return selectors;
        }
        //first check live:
        /*$.each(events.live || [], function( i, live ) {
			if ( $.inArray(live.origType, types) !== -1 ) {
				add(live.selector, live.origType, live.origHandler || live.handler);
			}
		});*/
        //then check straight binds
        findHelper(events, types, function (type, handler, selector) {
            add(selector || "", type, handler);
        }, null);

        return selectors;
    };
    event.supportTouch = "ontouchend" in document;

    $.fn.respondsTo = function (events) {
        if (!this.length) {
            return false;
        } else {
            //add default ?
            return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
        }
    };
    $.fn.triggerHandled = function (event, data) {
        event = (typeof event == "string" ? $.Event(event) : event);
        this.trigger(event, data);
        return event.handled;
    };
    /**
     * Only attaches one event handler for all types ...
     * @param {Array} types llist of types that will delegate here
     * @param {Object} startingEvent the first event to start listening to
     * @param {Object} onFirst a function to call
     */
    event.setupHelper = function (types, startingEvent, onFirst) {
        if (!onFirst) {
            onFirst = startingEvent;
            startingEvent = null;
        }
        var add = function (handleObj) {

            var bySelector, selector = handleObj.selector || "";
            if (selector) {
                bySelector = event.find(this, types, selector);
                if (!bySelector.length) {
                    $(this).delegate(selector, startingEvent, onFirst);
                }
            } else {
                //var bySelector = event.find(this, types, selector);
                if (!event.find(this, types, selector).length) {
                    event.add(this, startingEvent, onFirst, {
                        selector: selector,
                        delegate: this
                    });
                }
            }
        },
            remove = function (handleObj) {
                var bySelector, selector = handleObj.selector || "";
                if (selector) {
                    bySelector = event.find(this, types, selector);
                    if (!bySelector.length) {
                        $(this).undelegate(selector, startingEvent, onFirst);
                    }
                } else {
                    if (!event.find(this, types, selector).length) {
                        event.remove(this, startingEvent, onFirst, {
                            selector: selector,
                            delegate: this
                        });
                    }
                }
            };
        $.each(types, function () {
            event.special[this] = {
                add: add,
                remove: remove,
                setup: function () {},
                teardown: function () {}
            };
        });
    };
})(jQuery);
(function ($) {
    var isPhantom = /Phantom/.test(navigator.userAgent),
        supportTouch = !isPhantom && "ontouchend" in document,
        scrollEvent = "touchmove scroll",
        // Use touch events or map it to mouse events
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
        data = function (event) {
            var d = event.originalEvent.touches ?
                event.originalEvent.touches[0] :
                event;
            return {
                time: (new Date).getTime(),
                coords: [d.pageX, d.pageY],
                origin: $(event.target)
            };
        };

    /**
     * @add jQuery.event.swipe
     */
    var swipe = $.event.swipe = {
        /**
         * @attribute delay
         * Delay is the upper limit of time the swipe motion can take in milliseconds.  This defaults to 500.
         *
         * A user must perform the swipe motion in this much time.
         */
        delay: 500,
        /**
         * @attribute max
         * The maximum distance the pointer must travel in pixels.  The default is 75 pixels.
         */
        max: 75,
        /**
         * @attribute min
         * The minimum distance the pointer must travel in pixels.  The default is 30 pixels.
         */
        min: 30
    };

    $.event.setupHelper([

        /**
         * @hide
         * @attribute swipe
         */
        "swipe",
        /**
         * @hide
         * @attribute swipeleft
         */
        'swipeleft',
        /**
         * @hide
         * @attribute swiperight
         */
        'swiperight',
        /**
         * @hide
         * @attribute swipeup
         */
        'swipeup',
        /**
         * @hide
         * @attribute swipedown
         */
        'swipedown'
    ], touchStartEvent, function (ev) {
        var
        // update with data when the event was started
        start = data(ev),
            stop,
            delegate = ev.delegateTarget || ev.currentTarget,
            selector = ev.handleObj.selector,
            entered = this;

        function moveHandler(event) {
            if (!start) {
                return;
            }
            // update stop with the data from the current event
            stop = data(event);

            // prevent scrolling
            if (Math.abs(start.coords[0] - stop.coords[0]) > 10) {
                event.preventDefault();
            }
        };
        // Attach to the touch move events
        $(document.documentElement).bind(touchMoveEvent, moveHandler)
            .one(touchStopEvent, function (event) {
                $(this).unbind(touchMoveEvent, moveHandler);
                // if start and stop contain data figure out if we have a swipe event
                if (start && stop) {
                    // calculate the distance between start and stop data
                    var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
                        deltaY = Math.abs(start.coords[1] - stop.coords[1]),
                        distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    // check if the delay and distance are matched
                    if (stop.time - start.time < swipe.delay && distance >= swipe.min) {
                        var events = ['swipe'];
                        // check if we moved horizontally
                        if (deltaX >= swipe.min && deltaY < swipe.min) {
                            // based on the x coordinate check if we moved left or right
                            events.push(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight");
                        } else
                        // check if we moved vertically
                        if (deltaY >= swipe.min && deltaX < swipe.min) {
                            // based on the y coordinate check if we moved up or down
                            events.push(start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup");
                        }
                        // trigger swipe events on this guy
                        $.each($.event.find(delegate, events, selector), function () {
                            this.call(entered, ev, {
                                start: start,
                                end: stop
                            })
                        })
                    }
                }
                // reset start and stop
                start = stop = undefined;
            })
    });
})(jQuery)

 
    $(function () {
       
			var Page = (function() {
				
				var config = {
						$bookBlock : $( '#bb-bookblock' ),
						$navNext : $( '#bb-nav-next' ),
						$navPrev : $( '#bb-nav-prev' ),
						$navFirst : $( '#bb-nav-first' ),
						$navLast : $( '#bb-nav-last' )
					},
					init = function() {
						config.$bookBlock.bookblock( {
							speed : 1000,
							shadowSides : 0.8,
							shadowFlip : 0.4,
							autoplay : true
						} );
						initEvents();
					},
					initEvents = function() {
						
						var $slides = config.$bookBlock.children();

						// add navigation events
						config.$navNext.on( 'click touchstart', function() {
							config.$bookBlock.bookblock( 'next' );
							return false;
						} );

						config.$navPrev.on( 'click touchstart', function() {
							config.$bookBlock.bookblock( 'prev' );
							return false;
						} );

						config.$navFirst.on( 'click touchstart', function() {
							config.$bookBlock.bookblock( 'first' );
							return false;
						} );

						config.$navLast.on( 'click touchstart', function() {
							config.$bookBlock.bookblock( 'last' );
							return false;
						} );
						
						// add swipe events
						$slides.on( {
							'swipeleft' : function( event ) {
								config.$bookBlock.bookblock( 'next' );
								return false;
							},
							'swiperight' : function( event ) {
								config.$bookBlock.bookblock( 'prev' );
								return false;
							}
						} );

						// add keyboard events
						$( document ).keydown( function(e) {
							var keyCode = e.keyCode || e.which,
								arrow = {
									left : 37,
									up : 38,
									right : 39,
									down : 40
								};

							switch (keyCode) {
								case arrow.left:
									config.$bookBlock.bookblock( 'prev' );
									break;
								case arrow.right:
									config.$bookBlock.bookblock( 'next' );
									break;
							}
						} );
					};

					return { init : init };

			})();
		
				Page.init();
	
    });
    /* End Flip Slider Slider*/
 


$(window).load(function () {

    if ($('.container-draggable').length) {
        var originX = $('.container-draggable').position().left;
    }

    $('.btn-drag-watch').mousedown(function (e) {
        var elt = $(this),
            topParent = elt.parents('.photo').position().top,
            leftParent = elt.parents('.photo').position().left,
            heightParent = elt.parents('.photo').height(),
            widthParent = elt.parents('.photo').width(),
            topContainer = elt.parents('.side').position().top + parseFloat(elt.parents('.side').css('padding-top'));

        e.preventDefault();
        elt.addClass('active');

        $(document).bind('mousemove', function (e) {
            var pageX = e.pageX - elt.parents('.photo').parent().offset().left,
                pageY = e.pageY - topContainer;

            if (pageX > leftParent && pageX < leftParent + widthParent) {
                $('.photo .face').css({
                    width: pageX - leftParent + 2
                });
                $('.photo .dos').css({
                    width: leftParent + widthParent - pageX + 2
                });

                elt.parent().css({
                    right: originX - pageX + elt.parent().width() / 2
                });
            }

            if (pageY > topParent && pageY < topParent + heightParent) {
                elt.css({
                    bottom: topParent + heightParent - pageY - elt.height()
                })
            }

            $(this).mouseup(function () {
                $(this).unbind('mousemove');

                elt.removeClass('active').stop().animate({
                    bottom: 0
                }, 600, 'easeInOutQuart');
            });

            e.preventDefault();
            return false;
        });
        return false;
    })

});

$(function () {
    var header = $('#header').offset().top;
    $(window).scroll(function () {
        if ($(window).scrollTop() > header) {
            $('#header').addClass("sticky");
        } else {
            $('#header').removeClass("sticky");
        }
    });
});


$(document).ready(function() {
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 500, function() {
            location.hash = target;
          });
        });
      }
    }
  });
 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
 
});

// Second JS Script======================================================================>>

(function($) {

var version = '1.4.10',
    defaults = {
      exclude: [],
      excludeWithin:[],
      offset: 0,

      // one of 'top' or 'left'
      direction: 'top',

      // jQuery set of elements you wish to scroll (for $.smoothScroll).
      //  if null (default), $('html, body').firstScrollable() is used.
      scrollElement: null,

      // only use if you want to override default behavior
      scrollTarget: null,

      // fn(opts) function to be called before scrolling occurs.
      // `this` is the element(s) being scrolled
      beforeScroll: function() {},

      // fn(opts) function to be called after scrolling occurs.
      // `this` is the triggering element
      afterScroll: function() {},
      easing: 'swing',
      speed: 400,

      // coefficient for "auto" speed
      autoCoefficent: 2
    },

    getScrollable = function(opts) {
      var scrollable = [],
          scrolled = false,
          dir = opts.dir && opts.dir == 'left' ? 'scrollLeft' : 'scrollTop';

      this.each(function() {

        if (this == document || this == window) { return; }
        var el = $(this);
        if ( el[dir]() > 0 ) {
          scrollable.push(this);
        } else {
          // if scroll(Top|Left) === 0, nudge the element 1px and see if it moves
          el[dir](1);
          scrolled = el[dir]() > 0;
          if ( scrolled ) {
            scrollable.push(this);
          }
          // then put it back, of course
          el[dir](0);
        }
      });

      // If no scrollable elements, fall back to <body>,
      // if it's in the jQuery collection
      // (doing this because Safari sets scrollTop async,
      // so can't set it to 1 and immediately get the value.)
      if (!scrollable.length) {
        this.each(function(index) {
          if (this.nodeName === 'BODY') {
            scrollable = [this];
          }
        });
      }

      // Use the first scrollable element if we're calling firstScrollable()
      if ( opts.el === 'first' && scrollable.length > 1 ) {
        scrollable = [ scrollable[0] ];
      }

      return scrollable;
    },
    isTouch = 'ontouchend' in document;

$.fn.extend({
  scrollable: function(dir) {
    var scrl = getScrollable.call(this, {dir: dir});
    return this.pushStack(scrl);
  },
  firstScrollable: function(dir) {
    var scrl = getScrollable.call(this, {el: 'first', dir: dir});
    return this.pushStack(scrl);
  },

  smoothScroll: function(options) {
    options = options || {};
    var opts = $.extend({}, $.fn.smoothScroll.defaults, options),
        locationPath = $.smoothScroll.filterPath(location.pathname);

    this
    .unbind('click.smoothscroll')
    .bind('click.smoothscroll', function(event) {
      var link = this,
          $link = $(this),
          exclude = opts.exclude,
          excludeWithin = opts.excludeWithin,
          elCounter = 0, ewlCounter = 0,
          include = true,
          clickOpts = {},
          hostMatch = ((location.hostname === link.hostname) || !link.hostname),
          pathMatch = opts.scrollTarget || ( $.smoothScroll.filterPath(link.pathname) || locationPath ) === locationPath,
          thisHash = escapeSelector(link.hash);

      if ( !opts.scrollTarget && (!hostMatch || !pathMatch || !thisHash) ) {
        include = false;
      } else {
        while (include && elCounter < exclude.length) {
          if ($link.is(escapeSelector(exclude[elCounter++]))) {
            include = false;
          }
        }
        while ( include && ewlCounter < excludeWithin.length ) {
          if ($link.closest(excludeWithin[ewlCounter++]).length) {
            include = false;
          }
        }
      }

      if ( include ) {
        event.preventDefault();

        $.extend( clickOpts, opts, {
          scrollTarget: opts.scrollTarget || thisHash,
          link: link
        });

        $.smoothScroll( clickOpts );
      }
    });

    return this;
  }
});

$.smoothScroll = function(options, px) {
  var opts, $scroller, scrollTargetOffset, speed,
      scrollerOffset = 0,
      offPos = 'offset',
      scrollDir = 'scrollTop',
      aniProps = {},
      aniOpts = {},
      scrollprops = [];


  if (typeof options === 'number') {
    opts = $.fn.smoothScroll.defaults;
    scrollTargetOffset = options;
  } else {
    opts = $.extend({}, $.fn.smoothScroll.defaults, options || {});
    if (opts.scrollElement) {
      offPos = 'position';
      if (opts.scrollElement.css('position') == 'static') {
        opts.scrollElement.css('position', 'relative');
      }
    }
  }

  opts = $.extend({link: null}, opts);
  scrollDir = opts.direction == 'left' ? 'scrollLeft' : scrollDir;

  if ( opts.scrollElement ) {
    $scroller = opts.scrollElement;
    scrollerOffset = $scroller[scrollDir]();
  } else {
    $scroller = $('html, body').firstScrollable();
  }

  // beforeScroll callback function must fire before calculating offset
  opts.beforeScroll.call($scroller, opts);

  scrollTargetOffset = (typeof options === 'number') ? options :
                        px ||
                        ( $(opts.scrollTarget)[offPos]() &&
                        $(opts.scrollTarget)[offPos]()[opts.direction] ) ||
                        0;

  aniProps[scrollDir] = scrollTargetOffset + scrollerOffset + opts.offset;
  speed = opts.speed;

  // automatically calculate the speed of the scroll based on distance / coefficient
  if (speed === 'auto') {

    // if aniProps[scrollDir] == 0 then we'll use scrollTop() value instead
    speed = aniProps[scrollDir] || $scroller.scrollTop();

    // divide the speed by the coefficient
    speed = speed / opts.autoCoefficent;
  }

  aniOpts = {
    duration: speed,
    easing: opts.easing,
    complete: function() {
      opts.afterScroll.call(opts.link, opts);
    }
  };

  if (opts.step) {
    aniOpts.step = opts.step;
  }

  if ($scroller.length) {
    $scroller.stop().animate(aniProps, aniOpts);
  } else {
    opts.afterScroll.call(opts.link, opts);
  }
};

$.smoothScroll.version = version;
$.smoothScroll.filterPath = function(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
};

// default options
$.fn.smoothScroll.defaults = defaults;

function escapeSelector (str) {
  return str.replace(/(:|\.)/g,'\\$1');
}

})(jQuery);

