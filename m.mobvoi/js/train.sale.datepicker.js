/* ===========================================================
 * bootstrap-datepicker.js v1.3.0
 * http://twitter.github.com/bootstrap/javascript.html#datepicker
 * ===========================================================
 * Copyright 2011 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributed by Scott Torborg - github.com/storborg
 * Loosely based on jquery.date_input.js by Jon Leighton, heavily updated and
 * rewritten to match bootstrap javascript approach and add UI features.
 * =========================================================== */


!function($) { 
  var STANDALONE = true;
  var selector = '[data-datepicker]',
      all = [];
  function clearDatePickers(except) {
    var ii;
    for(ii = 0; ii < all.length; ii++) {
      if(all[ii] != except) {
        all[ii].hide();
      }
    }
  }
  function DatePicker(element, options ) {
    this.$el = $(element);
    var options = $.extend({}, $.fn.datepicker.defaults, options );
    $.extend(this, options);
    this.$el.data("datepicker", this);
    all.push(this);
    this.init();    
  }
  DatePicker.prototype = {
    init: function() {
      var $years = this.nav('years', 12);
      var $months = this.nav('months', 1);
      var $nav = $("<div>").addClass("nav").append($months).append($years);
      this.$month = $months.find(".name");
      this.$year = $years.find(".name");
      $calendar = $("<div>").addClass("calendar");
      // Populate day of week headers, realigned by startOfWeek.
      for (var i = 0; i < this.shortDayNames.length; i ++) {
        $calendar.append('<div class="dow">' + this.shortDayNames[(i + this.startOfWeek) % 7] + '</div>');
      };
      this.$days = $('<div></div>').addClass('days');
      $calendar.append(this.$days);
      this.$picker = $('<div></div>')
        .addClass('datepicker')
        .append($nav)
        .append($calendar)
        .appendTo($(".dialog_content"));

        this.$el.change($.proxy(function() { this.selectDate(); }, this));
      this.selectDate();
      if (STANDALONE) {
        this.$el.hide();
        this.show();
      } else {
        this.$el.focus(this.show).click(this.show);
        this.hide();
      }
    }, 
    nav: function(c, months) {
      switch(c) {
        case "months":
        var $subnav = $('<div>' +
          '<span class="prev button"> < </span>' +
          '<span class="name"></span>' +
          '<span class="next button"> > </span>' +
          '</div>').addClass(c);
        break;
        case "years":
        var $subnav = $('<div>' +
          '<span class="name"></span>' +
          '</div>').addClass(c);                
      }
      $('.prev', $subnav).click($.proxy(function() { this.ahead(-months, 0) }, this));
      $('.next', $subnav).click($.proxy(function() { this.ahead(months, 0) }, this));
      return $subnav;
    }, 
    updateName: function($area, s) {
      // Update either the month or year field
      $area.html(s);
    },
    selectMonth: function(date) {
      var newMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      if (!this.curMonth || !(this.curMonth.getFullYear() == newMonth.getFullYear() && this.curMonth.getMonth() == newMonth.getMonth())) {
        this.curMonth = newMonth;
        var rangeStart = this.rangeStart(date), rangeEnd = this.rangeEnd(date);
        var num_days = this.daysBetween(rangeStart, rangeEnd);
        this.$days.empty();
        for (var ii = 0; ii <= num_days; ii++) {
          var thisDay = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate() + ii, 12, 00);
          var $day = $('<div></div>').attr('date', this.format(thisDay));
          $day.text(thisDay.getDate());
          if (thisDay.getMonth() != date.getMonth() || new Date().getTime() - thisDay.getTime() > 0) {
            $day.addClass('overlap');
          };
          this.$days.append($day);
        };
        this.updateName(this.$month, this.monthNames[date.getMonth()]);
        this.updateName(this.$year, this.curMonth.getFullYear());

        this.$days.find('div').click($.proxy(function(e) {
          if(new Date().getTime() - new Date(e.target.attributes[0].value).getTime() < 86400000) {
            var $targ = $(e.target);
            // The date= attribute is used here to provide relatively fast
            // selectors for setting certain date cells.
            this.update($targ.attr("date"));
            this.$days.find('div').removeClass('selected');
            $targ.addClass('selected');
            // Don't consider this selection final if we're just going to an
            // adjacent month.
            if(!$targ.hasClass('overlap')) {
              this.hide();
            }
          } else {
            return false;
          }
        }, this));
        $("[date='" + this.format(new Date()) + "']", this.$days).addClass('today');
      };
      // $('.selected', this.$days).removeClass('selected');
      // $('[date="' + this.selectedDateStr + '"]', this.$days).addClass('selected');
    }, 
    selectDate: function(date) {

      if (typeof(date) == "undefined") {
        date = this.parse(this.$el.val());
      }
        if (!date) date = new Date();
        this.selectedDate = date;
        this.selectedDateStr = this.format(this.selectedDate);
        this.selectMonth(this.selectedDate);
      }

    , update: function(s) {
        this.$el.val(s);
        this.$el.trigger('change');
      }

    , show: function(e) {
        e && e.stopPropagation();

        // Hide all other datepickers.
        if (!STANDALONE) clearDatePickers(this);

        var offset = this.$el.offset();

        if (!STANDALONE) {
          this.$picker.css({
            top: offset.top + this.$el.outerHeight() + 2,
            left: offset.left,
            position: 'absolute',
            zIndex: '900',
            margin: '0 0 18px 0'
          });
        }
        this.$picker.show();

        if (!STANDALONE) $('html').on('keydown', this.keyHandler);
      }

    , hide: function() {
        if (!STANDALONE) this.$picker.hide();
        if (!STANDALONE) $('html').off('keydown', this.keyHandler);
      }


    , parse: function(s) {
        // Parse a partial RFC 3339 string into a Date.
        var m;
        if ((m = s.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2})$/))) {
          return new Date(m[1], m[2] - 1, m[3]);
        } else {
          return null;
        }
      }

    , format: function(date) {
        // Format a Date into a string as specified by RFC 3339.
        var month = (date.getMonth() + 1).toString(),
            dom = date.getDate().toString();
        if (month.length === 1) {
          month = '0' + month;
        }
        if (dom.length === 1) {
          dom = '0' + dom;
        }
        return date.getFullYear() + '-' + month + "-" + dom;
      }

    , ahead: function(months, days) {
        // Move ahead ``months`` months and ``days`` days, both integers, can be
        // negative.
        this.selectDate(new Date(this.selectedDate.getFullYear(),
                                 this.selectedDate.getMonth() + months,
                                 this.selectedDate.getDate() + days));
      }

    , proxy: function(meth) {
        // Bind a method so that it always gets the datepicker instance for
        // ``this``. Return ``this`` so chaining calls works.
        this[meth] = $.proxy(this[meth], this);
        return this;
      }

    , daysBetween: function(start, end) {
        // Return number of days between ``start`` Date object and ``end``.
        var start = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
        var end = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
        return (end - start) / 86400000;
      }, 

    findClosest: function(dow, date, direction) {
        // From a starting date, find the first day ahead of behind it that is
        // a given day of the week.
        var difference = direction * (Math.abs(date.getDay() - dow - (direction * 7)) % 7);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + difference);
      },

    rangeStart: function(date) {
      // Get the first day to show in the current calendar view.
      return this.findClosest(this.startOfWeek, new Date(date.getFullYear(), date.getMonth()), -1);
    }, 

    rangeEnd: function(date) {
      // Get the last day to show in the current calendar view.
      return this.findClosest((this.startOfWeek - 1) % 7, new Date(date.getFullYear(), date.getMonth() + 1, 0), 1);
    }

  };
  
  /* DATEPICKER PLUGIN DEFINITION
   * ============================ */

  $.fn.datepicker = function(options) {
    return this.each(function() {
      new DatePicker(this, options); 
    });
  };

 
  $(function() {
    $(selector).datepicker();
    if(!STANDALONE) {
      $("html").click(clearDatePickers);
    }
  });


  $.fn.datepicker.DatePicker = DatePicker;
  $.fn.datepicker.defaults = {
    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    shortDayNames: ["日", "一", "二", "三", "四", "五", "六"],
    startOfWeek: 1
  };
} (window.Zepto);

