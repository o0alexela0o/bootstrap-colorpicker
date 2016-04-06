!function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], a) : window.jQuery && !window.jQuery.fn.colorpicker && a(window.jQuery);
}(function(a) {
    "use strict";
    var b = {
        placement: "auto",
        container: !1,
        animation: !0,
        value: !1,
        vertical: !1,
        inline: !1,
        format: !1,
        input: "input",
        component: !1,
        palettes: [],
        paletteAdjustment: 9,
        baseWidth: 128,
        baseBarWidth: 16,
        baseHeight: 128,
        large: !1,
        updatePalettes: !0,
        okButton: !1,
        cancelButton: !1,
        currentComparer: !1,
        tooltip: !1,
        templates: {
            picker: '<div class="colorpicker"><div class="colorpicker-map"><div class="colorpicker-color"></div><div class="colorpicker-brightness"></div><div class="colorpicker-saturation"><i><b></b></i></div></div><div class="colorpicker-bar"><div class="colorpicker-hue"><i></i></div></div><div class="colorpicker-bar"><div class="colorpicker-alpha"><i></i></div></div><div class="colorpicker-palettes"></div></div>',
            palette: '<div class="colorpicker-bar colorpicker-bar-horizontal colorpicker-palette"><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div><div class="colorpicker-palette-color"></div></div>',
            popover: '<div class="popover colorpicker-popover"><div class="arrow"></div><div class="popover-content"></div></div>'
        }
    }, c = function(c, d) {
        this.element = a(c).addClass("colorpicker-element"), this.options = a.extend({}, b, this.element.data(), d), 
        this.options.baseWidth = this.options.large ? 2 * this.options.baseWidth : this.options.baseWidth, 
        this.options.baseBarWidth = this.options.large ? 2 * this.options.baseBarWidth : this.options.baseBarWidth, 
        this.options.baseHeight = this.options.large ? 2 * this.options.baseHeight : this.options.baseHeight, 
        this.component = this.options.component, this.component = this.component !== !1 ? this.element.find(this.component) : !1, 
        this.component !== !1 && 0 === this.component.length && (this.component = !1), this.container = this.options.container === !0 ? this.element : this.options.container, 
        this.container = this.container !== !1 ? a(this.container) : !1, this.input = this.element.is("input") ? this.element : this.options.input ? this.element.find(this.options.input) : !1, 
        this.input !== !1 && 0 === this.input.length && (this.input = !1), this._createPicker(), 
        this.color = tinycolor(this.getValue()), this.options.format = this.options.format === !1 ? this.color._format : this.options.format, 
        this._bindMouseEvents(), this._createPopover(), this._setPalettes(this.options.palettes), 
        this.hasInput() && this.input.on("keyup", a.proxy(function(b) {
            -1 === a.inArray(b.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ]) && this.update();
        }, this)), this._trigger("colorpickerCreate"), this.element.data("colorpicker", this), 
        a(a.proxy(function() {
            this.picker.element.trigger("mousedown"), this.update();
        }, this));
    };
    c.prototype = {
        constructor: c,
        options: {},
        _mousePointer: {
            top: 0,
            left: 0
        },
        _trigger: function(b, c) {
            this.element.trigger(a.extend({
                type: b,
                colorpicker: this
            }, c));
        },
        _error: function(a) {
            throw "Bootstrap Colorpicker Exception: " + a;
        },
        _hsvaFromGuides: function() {
            var a = {
                h: parseInt(this.picker.hue.element.find("i").css("top"), 10),
                s: parseInt(this.picker.saturation.element.find("i").css("left"), 10),
                v: parseInt(this.picker.saturation.element.find("i").css("top"), 10),
                a: parseInt(this.picker.alpha.element.find("i").css("top"), 10)
            };
            for (var b in a) (isNaN(a[b]) || a[b] < 0) && (a[b] = 0, console.error("isNaN or neg for: " + b)), 
            "h" === b ? a[b] = parseInt(360 * a[b] / this.options.baseWidth, 10) : (a[b] = parseInt(100 * a[b] / this.options.baseWidth, 10), 
            "v" === b && (a[b] = 100 - a[b], a[b] < 0 && (a[b] = -1 * a[b]))), "h" === b && a[b] > 360 ? a[b] = 360 : "h" !== b && a[b] > 100 && (a[b] = 100), 
            "a" === b && (a[b] = a[b] / 100);
            return a;
        },
        _hsvaFromValue: function(a) {
            var b = tinycolor(a).toHsv();
            return void 0 === b.a && (b.a = 1), b;
        },
        _mousedown: function(b) {
            b.stopPropagation(), b.preventDefault();
            var c = a(b.target), d = c.closest("div");
            if (!d.is(".colorpicker")) {
                if (d.is(".colorpicker-saturation")) this.currentSlider = a.extend({}, this.picker.saturation); else if (d.is(".colorpicker-hue")) this.currentSlider = a.extend({}, this.picker.hue); else {
                    if (!d.is(".colorpicker-alpha")) return !1;
                    this.currentSlider = a.extend({}, this.picker.alpha);
                }
                var e = d.offset();
                this.currentSlider.guide = d.find("i"), this.currentSlider.left = b.pageX - e.left, 
                this.currentSlider.top = b.pageY - e.top, this._mousePointer = {
                    left: b.pageX,
                    top: b.pageY
                }, a(document).on({
                    "mousemove.colorpicker": a.proxy(this._mousemove, this),
                    "mouseup.colorpicker": a.proxy(this._mouseup, this)
                }).trigger("mousemove");
            }
            return !1;
        },
        _mousemove: function(a) {
            a.stopPropagation(), a.preventDefault();
            var b = Math.max(0, Math.min(this.currentSlider.maxLeft, this.currentSlider.left + ((a.pageX || this._mousePointer.left) - this._mousePointer.left))), c = Math.max(0, Math.min(this.currentSlider.maxTop, this.currentSlider.top) + ((a.pageY || this._mousePointer.top) - this._mousePointer.top));
            return c >= this.currentSlider.maxTop && (c = this.currentSlider.maxTop), b >= this.currentSlider.maxLeft && (b = this.currentSlider.maxLeft), 
            this.currentSlider.guide.css("left", b + "px"), this.currentSlider.guide.css("top", c + "px"), 
            this._trigger("colorpickerMove", {
                hsla: this._updateColorFromGuidelines()
            }), !1;
        },
        _mouseup: function(b) {
            return b.stopPropagation(), b.preventDefault(), a(document).off({
                "mousemove.colorpicker": this._mousemove,
                "mouseup.colorpicker": this._mouseup
            }), !1;
        },
        _bindMouseEvents: function() {
            this.picker.element.on("mousedown.colorpicker", a.proxy(this._mousedown, this)), 
            this.options.inline === !1 && a(window.document).on("click.colorpicker", a.proxy(function(b) {
                var c = a(b.target);
                return c.hasClass("colorpicker-element") && (!c.hasClass("colorpicker-element") || c.is(this.element)) || 0 !== c.parents(".colorpicker-popover").length || this.hide(), 
                b.stopPropagation(), b.preventDefault(), !1;
            }, this));
        },
        _setPalettes: function(b) {
            var c = this;
            return a.isArray(b) ? (this.picker.palettes.element.html(""), a(b).each(function(b, d) {
                var e = a(c.options.templates.palette), f = 0;
                a.isArray(d) ? a(d).each(function(a, b) {
                    f = c._fillPalette(e, b, f);
                }) : f = c._fillPalette(e, d, f), c.picker.palettes.element.append(e);
            }), void this.picker.palettes.element.find(".colorpicker-palette-color").on("click", function(b) {
                var d = a(this).find("i");
                return d.length > 0 && c.update(d.css("backgroundColor")), b.stopPropagation(), 
                b.preventDefault(), !1;
            })) : !1;
        },
        _setPaletteColor: function(b, c, d, e, f) {
            e = e || !1, f = f || "custom";
            var g = c.find(".colorpicker-palette-color:eq(" + d + ")");
            return g.length > 0 && (e = e ? e : b, g.html(a('<i class="colorpicker-palette-' + f + '" data-colorpicker-palette-color="' + b + '"></i>').attr("title", e).css("backgroundColor", b))), 
            g;
        },
        _fillPalette: function(b, c, d) {
            var e = this, f = d || 0;
            switch (d = f, c) {
              case "current":
                var g = e.color.toString(e.options.format);
                e._setPaletteColor(g, b, d, g + " current", "current"), f++;
                break;

              case "previous":
                if (e.previousColor) {
                    var g = e.previousColor.toString(e.options.format);
                    e._setPaletteColor(g, b, d, g + " previous", "previous"), f++;
                }
                break;

              case "triad":
                a(tinycolor.triad(e.color)).each(function(a, c) {
                    return 0 === a ? void d-- : (c = c.toString(e.options.format), e._setPaletteColor(c, b, a + d, c + " triad", "triad"), 
                    void f++);
                });
                break;

              case "tetrad":
                a(tinycolor.tetrad(e.color)).each(function(a, c) {
                    return 0 === a ? void d-- : (c = c.toString(e.options.format), e._setPaletteColor(c, b, a + d, c + " tetrad", "tetrad"), 
                    void f++);
                });
                break;

              case "complementary":
                a(tinycolor.splitcomplement(e.color)).each(function(a, c) {
                    return 0 === a ? void d-- : (c = c.toString(e.options.format), e._setPaletteColor(c, b, a + d, c + " complementary", "complementary"), 
                    void f++);
                });
                break;

              case "monochromatic":
                a(tinycolor.monochromatic(e.color, 12)).each(function(a, c) {
                    return 0 === a ? void d-- : (c = c.toString(e.options.format), e._setPaletteColor(c, b, a + d, c + " monochromatic", "monochromatic"), 
                    void f++);
                });
                break;

              case "analogous":
                a(tinycolor.analogous(e.color, 12)).each(function(a, c) {
                    return 0 === a ? void d-- : (c = c.toString(e.options.format), e._setPaletteColor(c, b, a + d, c + " analogous", "analogous"), 
                    void f++);
                });
                break;

              case "lighten":
              case "darken":
              case "saturate":
              case "desaturate":
              case "brighten":
                for (var h = 0; 11 > h; h++) {
                    var i = e.options.paletteAdjustment * (h + 1), g = tinycolor[c](e.color, i).toString(e.options.format);
                    e._setPaletteColor(g, b, h + d, g + " " + c + " " + i + "%", c), f++;
                }
                break;

              case "lightness":
                for (var j = [], h = 0; 6 > h; h++) {
                    var i = e.options.paletteAdjustment * (h + 1);
                    j.push(tinycolor.darken(e.color, i).toString(e.options.format));
                }
                j = j.reverse();
                for (var h = 6; h >= 0; h--) {
                    var k = 100 - e.options.paletteAdjustment * (h + 1);
                    e._setPaletteColor(j[h], b, h + d, j[h] + " darken " + k + "%", "darken"), f++;
                }
                d += 6;
                for (var h = 0; 5 > h; h++) {
                    var i = e.options.paletteAdjustment * (h + 1), g = tinycolor.lighten(e.color, i).toString(e.options.format);
                    e._setPaletteColor(g, b, h + d, g + " lighten " + i + "%", "lighten"), f++;
                }
                break;

              case "mixed":
                var l = [ "lighten", "darken", "saturate", "desaturate", "brighten", "greyscale" ], m = 0;
                a(l).each(function(a, c) {
                    var g = tinycolor[c](e.color, 2 * e.options.paletteAdjustment).toString(e.options.format);
                    if (e._setPaletteColor(g, b, m + d, g + " " + c, c), m++, f++, "greyscale" !== c) {
                        var g = tinycolor[c](e.color, 4 * e.options.paletteAdjustment).toString(e.options.format);
                        e._setPaletteColor(g, b, m + d, g + " " + c, c), m++, f++;
                    }
                });
                break;

              default:
                a.isArray(c) ? a(c).each(function(a, c) {
                    e._setPaletteColor(tinycolor(c).toString(e.options.format), b, a + d, c), f++;
                }) : (e._setPaletteColor(tinycolor(c).toString(e.options.format), b, d, c), f++);
            }
            return f;
        },
        _createPopover: function() {
            var b = this;
            this.element.popover({
                placement: this.options.placement,
                container: this.container,
                animation: this.options.animation,
                template: this.options.templates.popover,
                content: this.picker.element,
                html: !0,
                trigger: "manual"
            }).on("focus", function() {
                a(this).popover("show");
            }).on("show.bs.popover", function() {
                b.update();
            });
        },
        _createPicker: function(b) {
            b = b || {};
            var c = a(this.options.templates.picker);
            c.find(".colorpicker-map i").css({
                top: this.options.baseHeight + 2 + "px",
                left: "2px"
            }), c.find(".colorpicker-bar i").css({
                top: this.options.baseHeight / 2 + 2 + "px",
                left: "0px"
            }), this.picker = {
                element: c,
                map: {
                    element: c.find(".colorpicker-map:first"),
                    width: this.options.baseWidth,
                    height: this.options.baseHeight,
                    maxTop: 0,
                    maxLeft: 0
                },
                color: {
                    element: c.find(".colorpicker-color:first"),
                    width: this.options.baseWidth,
                    height: this.options.baseHeight,
                    maxTop: 0,
                    maxLeft: 0
                },
                hue: {
                    element: c.find(".colorpicker-hue:first"),
                    width: this.options.baseBarWidth,
                    height: this.options.baseHeight,
                    maxTop: this.options.baseHeight,
                    maxLeft: 0
                },
                saturation: {
                    element: c.find(".colorpicker-saturation:first"),
                    width: this.options.baseWidth,
                    height: this.options.baseHeight,
                    maxTop: this.options.baseHeight,
                    maxLeft: this.options.baseWidth
                },
                brightness: {
                    element: c.find(".colorpicker-brightness:first"),
                    width: this.options.baseWidth,
                    height: this.options.baseHeight,
                    maxTop: this.options.baseHeight,
                    maxLeft: this.options.baseWidth
                },
                alpha: {
                    element: c.find(".colorpicker-alpha:first"),
                    width: this.options.baseBarWidth,
                    height: this.options.baseHeight,
                    maxTop: this.options.baseHeight,
                    maxLeft: 0
                },
                palettes: {
                    element: c.find(".colorpicker-palettes:first"),
                    width: this.options.baseWidth,
                    height: 0,
                    maxTop: 0,
                    maxLeft: 0
                }
            }, this.picker = a.extend(!0, this.picker, b), this.options.large === !0 ? (this.picker.element.addClass("colorpicker-2x"), 
            this.options.templates.popover = this.options.templates.popover.replace("colorpicker-popover", "colorpicker-popover colorpicker-popover-2x")) : (this.picker.element.removeClass("colorpicker-2x"), 
            this.options.templates.popover = this.options.templates.popover.replace("colorpicker-popover-2x", ""));
        },
        _updateComponents: function() {
            var a = this._hsvaFromValue(this.color);
            if (a.s = 100, a.v = 1, a.a = 1, this.picker.color.element.css("backgroundColor", tinycolor(a).toString("hex")), 
            this.picker.alpha.element.css("backgroundColor", this.color.toRgbString()), this.options.updatePalettes && this._setPalettes(this.options.palettes), 
            this.component !== !1) {
                var b = this.component.find("i").eq(0);
                b.length > 0 ? b.css({
                    backgroundColor: this.getColor()
                }) : this.component.css({
                    backgroundColor: this.getColor()
                });
            }
        },
        _updateGuides: function() {
            var a = this._hsvaFromValue(this.color);
            console.info(a);
            var b = {
                h: parseInt(a.h * this.picker.hue.height / 360, 10),
                s: parseInt(100 * a.s / this.picker.saturation.height, 10),
                v: parseInt(100 * a.v / this.picker.brightness.width, 10),
                a: parseInt(100 * a.a * this.picker.alpha.height / 100, 10)
            };
            return this.picker.hue.element.find("i").css("top", b.h + "px"), this.picker.saturation.element.find("i").css({
                top: b.s + "px",
                left: b.v + "px"
            }), this.picker.alpha.element.find("i").css("top", b.a + "px"), console.log(b), 
            b;
        },
        _updateColorFromGuidelines: function() {
            var a = this._hsvaFromGuides();
            return this.update(a, !1), a;
        },
        setColor: function(a) {
            return this.color = tinycolor(a), this.color.isValid() ? (this._updateComponents(), 
            this.previousColor = tinycolor(this.color.toString()), this._trigger("colorpickerChange", {
                value: a
            }), this.color) : (console.warn("Invalid color: "), console.log(a), !1);
        },
        getColor: function() {
            return this.color.toString(this.options.format);
        },
        setValue: function(a) {
            return a = this.setColor(a), a !== !1 && (this.hasInput() ? this.input.val(this.getColor()) : this.element.data("color", this.getColor())), 
            a;
        },
        getValue: function(a) {
            a = a || "";
            var b = a;
            return b = this.hasInput() ? this.input.val() : this.element.data("color"), (void 0 === b || "" === b || null === b || b === !1) && (b = a), 
            b;
        },
        hasInput: function() {
            return this.input !== !1;
        },
        isDisabled: function() {
            return this.hasInput() ? this.input.prop("disabled") === !0 : !1;
        },
        show: function() {
            this.element.popover("show");
        },
        hide: function() {
            this.element.popover("hide");
        },
        update: function(a, b) {
            return b = b !== !1 ? !0 : !1, a = a ? a : this.getValue(this.color), this._trigger("colorpickerUpdating"), 
            this.setValue(a), b && this._updateGuides(), this.picker.element.hide().show(), 
            this._trigger("colorpickerUpdated"), a;
        },
        destroy: function() {
            this.picker.remove(), this.element.removeData("colorpicker").removeData("color").off(".colorpicker"), 
            this.element.popover("destroy"), this.input !== !1 && this.input.off(".colorpicker"), 
            this.component !== !1 && this.component.off(".colorpicker"), this.element.removeClass("colorpicker-element"), 
            this._trigger("colorpickerDestroy");
        },
        disable: function() {
            return this.hasInput() ? (this.input.prop("disabled", !0), !0) : !1;
        },
        enable: function() {
            return this.hasInput() ? (this.input.prop("disabled", !1), !0) : !1;
        }
    }, a.colorpicker = c, a.fn.colorpicker = function(b) {
        var d = arguments;
        return this.each(function() {
            var e = a(this), f = e.data("colorpicker"), g = "object" == typeof b ? b : {};
            f || "string" == typeof b ? "string" == typeof b && f[b].apply(f, Array.prototype.slice.call(d, 1)) : e.data("colorpicker", new c(this, g));
        });
    };
});