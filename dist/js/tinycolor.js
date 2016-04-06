!function() {
    function a(a) {
        var c = {
            r: 0,
            g: 0,
            b: 0
        }, e = 1, g = !1, h = !1;
        return "string" == typeof a && (a = t(a)), "object" == typeof a && (a.hasOwnProperty("r") && a.hasOwnProperty("g") && a.hasOwnProperty("b") ? (c = b(a.r, a.g, a.b), 
        g = !0, h = "%" === String(a.r).substr(-1) ? "prgb" : "rgb") : a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("v") ? (a.s = q(a.s), 
        a.v = q(a.v), c = f(a.h, a.s, a.v), g = !0, h = "hsv") : a.hasOwnProperty("h") && a.hasOwnProperty("s") && a.hasOwnProperty("l") && (a.s = q(a.s), 
        a.l = q(a.l), c = d(a.h, a.s, a.l), g = !0, h = "hsl"), a.hasOwnProperty("a") && (e = a.a)), 
        e = j(e), {
            ok: g,
            format: a.format || h,
            r: z(255, A(c.r, 0)),
            g: z(255, A(c.g, 0)),
            b: z(255, A(c.b, 0)),
            a: e
        };
    }
    function b(a, b, c) {
        return {
            r: 255 * k(a, 255),
            g: 255 * k(b, 255),
            b: 255 * k(c, 255)
        };
    }
    function c(a, b, c) {
        a = k(a, 255), b = k(b, 255), c = k(c, 255);
        var d, e, f = A(a, b, c), g = z(a, b, c), h = (f + g) / 2;
        if (f == g) d = e = 0; else {
            var i = f - g;
            switch (e = h > .5 ? i / (2 - f - g) : i / (f + g), f) {
              case a:
                d = (b - c) / i + (c > b ? 6 : 0);
                break;

              case b:
                d = (c - a) / i + 2;
                break;

              case c:
                d = (a - b) / i + 4;
            }
            d /= 6;
        }
        return {
            h: d,
            s: e,
            l: h
        };
    }
    function d(a, b, c) {
        function d(a, b, c) {
            return 0 > c && (c += 1), c > 1 && (c -= 1), 1 / 6 > c ? a + 6 * (b - a) * c : .5 > c ? b : 2 / 3 > c ? a + (b - a) * (2 / 3 - c) * 6 : a;
        }
        var e, f, g;
        if (a = k(a, 360), b = k(b, 100), c = k(c, 100), 0 === b) e = f = g = c; else {
            var h = .5 > c ? c * (1 + b) : c + b - c * b, i = 2 * c - h;
            e = d(i, h, a + 1 / 3), f = d(i, h, a), g = d(i, h, a - 1 / 3);
        }
        return {
            r: 255 * e,
            g: 255 * f,
            b: 255 * g
        };
    }
    function e(a, b, c) {
        a = k(a, 255), b = k(b, 255), c = k(c, 255);
        var d, e, f = A(a, b, c), g = z(a, b, c), h = f, i = f - g;
        if (e = 0 === f ? 0 : i / f, f == g) d = 0; else {
            switch (f) {
              case a:
                d = (b - c) / i + (c > b ? 6 : 0);
                break;

              case b:
                d = (c - a) / i + 2;
                break;

              case c:
                d = (a - b) / i + 4;
            }
            d /= 6;
        }
        return {
            h: d,
            s: e,
            v: h
        };
    }
    function f(a, b, c) {
        a = 6 * k(a, 360), b = k(b, 100), c = k(c, 100);
        var d = x.floor(a), e = a - d, f = c * (1 - b), g = c * (1 - e * b), h = c * (1 - (1 - e) * b), i = d % 6, j = [ c, g, f, f, h, c ][i], l = [ h, c, c, g, f, f ][i], m = [ f, f, h, c, c, g ][i];
        return {
            r: 255 * j,
            g: 255 * l,
            b: 255 * m
        };
    }
    function g(a, b, c, d) {
        var e = [ p(y(a).toString(16)), p(y(b).toString(16)), p(y(c).toString(16)) ];
        return d && e[0].charAt(0) == e[0].charAt(1) && e[1].charAt(0) == e[1].charAt(1) && e[2].charAt(0) == e[2].charAt(1) ? e[0].charAt(0) + e[1].charAt(0) + e[2].charAt(0) : e.join("");
    }
    function h(a, b, c, d) {
        var e = [ p(r(d)), p(y(a).toString(16)), p(y(b).toString(16)), p(y(c).toString(16)) ];
        return e.join("");
    }
    function i(a) {
        var b = {};
        for (var c in a) a.hasOwnProperty(c) && (b[a[c]] = c);
        return b;
    }
    function j(a) {
        return a = parseFloat(a), (isNaN(a) || 0 > a || a > 1) && (a = 1), a;
    }
    function k(a, b) {
        n(a) && (a = "100%");
        var c = o(a);
        return a = z(b, A(0, parseFloat(a))), c && (a = parseInt(a * b, 10) / 100), x.abs(a - b) < 1e-6 ? 1 : a % b / parseFloat(b);
    }
    function l(a) {
        return z(1, A(0, a));
    }
    function m(a) {
        return parseInt(a, 16);
    }
    function n(a) {
        return "string" == typeof a && -1 != a.indexOf(".") && 1 === parseFloat(a);
    }
    function o(a) {
        return "string" == typeof a && -1 != a.indexOf("%");
    }
    function p(a) {
        return 1 == a.length ? "0" + a : "" + a;
    }
    function q(a) {
        return 1 >= a && (a = 100 * a + "%"), a;
    }
    function r(a) {
        return Math.round(255 * parseFloat(a)).toString(16);
    }
    function s(a) {
        return m(a) / 255;
    }
    function t(a) {
        a = a.replace(u, "").replace(v, "").toLowerCase();
        var b = !1;
        if (D[a]) a = D[a], b = !0; else if ("transparent" == a) return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: "name"
        };
        var c;
        return (c = F.rgb.exec(a)) ? {
            r: c[1],
            g: c[2],
            b: c[3]
        } : (c = F.rgba.exec(a)) ? {
            r: c[1],
            g: c[2],
            b: c[3],
            a: c[4]
        } : (c = F.hsl.exec(a)) ? {
            h: c[1],
            s: c[2],
            l: c[3]
        } : (c = F.hsla.exec(a)) ? {
            h: c[1],
            s: c[2],
            l: c[3],
            a: c[4]
        } : (c = F.hsv.exec(a)) ? {
            h: c[1],
            s: c[2],
            v: c[3]
        } : (c = F.hex8.exec(a)) ? {
            a: s(c[1]),
            r: m(c[2]),
            g: m(c[3]),
            b: m(c[4]),
            format: b ? "name" : "hex8"
        } : (c = F.hex6.exec(a)) ? {
            r: m(c[1]),
            g: m(c[2]),
            b: m(c[3]),
            format: b ? "name" : "hex"
        } : (c = F.hex3.exec(a)) ? {
            r: m(c[1] + "" + c[1]),
            g: m(c[2] + "" + c[2]),
            b: m(c[3] + "" + c[3]),
            format: b ? "name" : "hex"
        } : !1;
    }
    var u = /^[\s,#]+/, v = /\s+$/, w = 0, x = Math, y = x.round, z = x.min, A = x.max, B = x.random, C = function G(b, c) {
        if (b = b ? b : "", c = c || {}, b instanceof G) return b;
        if (!(this instanceof G)) return new G(b, c);
        var d = a(b);
        this._r = d.r, this._g = d.g, this._b = d.b, this._a = d.a, this._roundA = y(100 * this._a) / 100, 
        this._format = c.format || d.format, this._gradientType = c.gradientType, this._r < 1 && (this._r = y(this._r)), 
        this._g < 1 && (this._g = y(this._g)), this._b < 1 && (this._b = y(this._b)), this._ok = d.ok, 
        this._tc_id = w++;
    };
    C.prototype = {
        isDark: function() {
            return this.getBrightness() < 128;
        },
        isLight: function() {
            return !this.isDark();
        },
        isValid: function() {
            return this._ok;
        },
        getFormat: function() {
            return this._format;
        },
        getAlpha: function() {
            return this._a;
        },
        getBrightness: function() {
            var a = this.toRgb();
            return (299 * a.r + 587 * a.g + 114 * a.b) / 1e3;
        },
        setAlpha: function(a) {
            return this._a = j(a), this._roundA = y(100 * this._a) / 100, this;
        },
        toHsv: function() {
            var a = e(this._r, this._g, this._b);
            return {
                h: 360 * a.h,
                s: a.s,
                v: a.v,
                a: this._a
            };
        },
        toHsvString: function() {
            var a = e(this._r, this._g, this._b), b = y(360 * a.h), c = y(100 * a.s), d = y(100 * a.v);
            return 1 == this._a ? "hsv(" + b + ", " + c + "%, " + d + "%)" : "hsva(" + b + ", " + c + "%, " + d + "%, " + this._roundA + ")";
        },
        toHsl: function() {
            var a = c(this._r, this._g, this._b);
            return {
                h: 360 * a.h,
                s: a.s,
                l: a.l,
                a: this._a
            };
        },
        toHslString: function() {
            var a = c(this._r, this._g, this._b), b = y(360 * a.h), d = y(100 * a.s), e = y(100 * a.l);
            return 1 == this._a ? "hsl(" + b + ", " + d + "%, " + e + "%)" : "hsla(" + b + ", " + d + "%, " + e + "%, " + this._roundA + ")";
        },
        toHex: function(a) {
            return g(this._r, this._g, this._b, a);
        },
        toHexString: function(a) {
            return "#" + this.toHex(a);
        },
        toHex8: function() {
            return h(this._r, this._g, this._b, this._a);
        },
        toHex8String: function() {
            return "#" + this.toHex8();
        },
        toRgb: function() {
            return {
                r: y(this._r),
                g: y(this._g),
                b: y(this._b),
                a: this._a
            };
        },
        toRgbString: function() {
            return 1 == this._a ? "rgb(" + y(this._r) + ", " + y(this._g) + ", " + y(this._b) + ")" : "rgba(" + y(this._r) + ", " + y(this._g) + ", " + y(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function() {
            return {
                r: y(100 * k(this._r, 255)) + "%",
                g: y(100 * k(this._g, 255)) + "%",
                b: y(100 * k(this._b, 255)) + "%",
                a: this._a
            };
        },
        toPercentageRgbString: function() {
            return 1 == this._a ? "rgb(" + y(100 * k(this._r, 255)) + "%, " + y(100 * k(this._g, 255)) + "%, " + y(100 * k(this._b, 255)) + "%)" : "rgba(" + y(100 * k(this._r, 255)) + "%, " + y(100 * k(this._g, 255)) + "%, " + y(100 * k(this._b, 255)) + "%, " + this._roundA + ")";
        },
        toName: function() {
            return 0 === this._a ? "transparent" : this._a < 1 ? !1 : E[g(this._r, this._g, this._b, !0)] || !1;
        },
        toFilter: function(a) {
            var b = "#" + h(this._r, this._g, this._b, this._a), c = b, d = this._gradientType ? "GradientType = 1, " : "";
            if (a) {
                var e = C(a);
                c = e.toHex8String();
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + d + "startColorstr=" + b + ",endColorstr=" + c + ")";
        },
        toString: function(a) {
            var b = !!a;
            a = a || this._format;
            var c = !1, d = this._a < 1 && this._a >= 0, e = !b && d && ("hex" === a || "hex6" === a || "hex3" === a || "name" === a);
            return e ? "name" === a && 0 === this._a ? this.toName() : this.toRgbString() : ("rgb" === a && (c = this.toRgbString()), 
            "prgb" === a && (c = this.toPercentageRgbString()), ("hex" === a || "hex6" === a) && (c = this.toHexString()), 
            "hex3" === a && (c = this.toHexString(!0)), "hex8" === a && (c = this.toHex8String()), 
            "name" === a && (c = this.toName()), "hsl" === a && (c = this.toHslString()), "hsv" === a && (c = this.toHsvString()), 
            c || this.toHexString());
        }
    }, C.fromRatio = function(a, b) {
        if ("object" == typeof a) {
            var c = {};
            for (var d in a) a.hasOwnProperty(d) && ("a" === d ? c[d] = a[d] : c[d] = q(a[d]));
            a = c;
        }
        return C(a, b);
    }, C.equals = function(a, b) {
        return a && b ? C(a).toRgbString() == C(b).toRgbString() : !1;
    }, C.random = function() {
        return C.fromRatio({
            r: B(),
            g: B(),
            b: B()
        });
    }, C.desaturate = function(a, b) {
        b = 0 === b ? 0 : b || 10;
        var c = C(a).toHsl();
        return c.s -= b / 100, c.s = l(c.s), C(c);
    }, C.saturate = function(a, b) {
        b = 0 === b ? 0 : b || 10;
        var c = C(a).toHsl();
        return c.s += b / 100, c.s = l(c.s), C(c);
    }, C.greyscale = function(a) {
        return C.desaturate(a, 100);
    }, C.lighten = function(a, b) {
        b = 0 === b ? 0 : b || 10;
        var c = C(a).toHsl();
        return c.l += b / 100, c.l = l(c.l), C(c);
    }, C.brighten = function(a, b) {
        b = 0 === b ? 0 : b || 10;
        var c = C(a).toRgb();
        return c.r = A(0, z(255, c.r - y(255 * -(b / 100)))), c.g = A(0, z(255, c.g - y(255 * -(b / 100)))), 
        c.b = A(0, z(255, c.b - y(255 * -(b / 100)))), C(c);
    }, C.darken = function(a, b) {
        b = 0 === b ? 0 : b || 10;
        var c = C(a).toHsl();
        return c.l -= b / 100, c.l = l(c.l), C(c);
    }, C.complement = function(a) {
        var b = C(a).toHsl();
        return b.h = (b.h + 180) % 360, C(b);
    }, C.spin = function(a, b) {
        var c = C(a).toHsl(), d = (y(c.h) + b) % 360;
        return c.h = 0 > d ? 360 + d : d, C(c);
    }, C.mix = function(a, b, c) {
        c = 0 === c ? 0 : c || 50;
        var d, e = C(a).toRgb(), f = C(b).toRgb(), g = c / 100, h = 2 * g - 1, i = f.a - e.a;
        d = h * i == -1 ? h : (h + i) / (1 + h * i), d = (d + 1) / 2;
        var j = 1 - d, k = {
            r: f.r * d + e.r * j,
            g: f.g * d + e.g * j,
            b: f.b * d + e.b * j,
            a: f.a * g + e.a * (1 - g)
        };
        return C(k);
    }, C.triad = function(a) {
        var b = C(a).toHsl(), c = b.h;
        return [ C(a), C({
            h: (c + 120) % 360,
            s: b.s,
            l: b.l
        }), C({
            h: (c + 240) % 360,
            s: b.s,
            l: b.l
        }) ];
    }, C.tetrad = function(a) {
        var b = C(a).toHsl(), c = b.h;
        return [ C(a), C({
            h: (c + 90) % 360,
            s: b.s,
            l: b.l
        }), C({
            h: (c + 180) % 360,
            s: b.s,
            l: b.l
        }), C({
            h: (c + 270) % 360,
            s: b.s,
            l: b.l
        }) ];
    }, C.splitcomplement = function(a) {
        var b = C(a).toHsl(), c = b.h;
        return [ C(a), C({
            h: (c + 72) % 360,
            s: b.s,
            l: b.l
        }), C({
            h: (c + 216) % 360,
            s: b.s,
            l: b.l
        }) ];
    }, C.analogous = function(a, b, c) {
        b = b || 6, c = c || 30;
        var d = C(a).toHsl(), e = 360 / c, f = [ C(a) ];
        for (d.h = (d.h - (e * b >> 1) + 720) % 360; --b; ) d.h = (d.h + e) % 360, f.push(C(d));
        return f;
    }, C.monochromatic = function(a, b) {
        b = b || 6;
        for (var c = C(a).toHsv(), d = c.h, e = c.s, f = c.v, g = [], h = 1 / b; b--; ) g.push(C({
            h: d,
            s: e,
            v: f
        })), f = (f + h) % 1;
        return g;
    }, C.readability = function(a, b) {
        var c = C(a), d = C(b), e = c.toRgb(), f = d.toRgb(), g = c.getBrightness(), h = d.getBrightness(), i = Math.max(e.r, f.r) - Math.min(e.r, f.r) + Math.max(e.g, f.g) - Math.min(e.g, f.g) + Math.max(e.b, f.b) - Math.min(e.b, f.b);
        return {
            brightness: Math.abs(g - h),
            color: i
        };
    }, C.readable = function(a, b) {
        var c = C.readability(a, b);
        return c.brightness > 125 && c.color > 500;
    }, C.mostReadable = function(a, b) {
        for (var c = null, d = 0, e = !1, f = 0; f < b.length; f++) {
            var g = C.readability(a, b[f]), h = g.brightness > 125 && g.color > 500, i = 3 * (g.brightness / 125) + g.color / 500;
            (h && !e || h && e && i > d || !h && !e && i > d) && (e = h, d = i, c = C(b[f]));
        }
        return c;
    };
    var D = C.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    }, E = C.hexNames = i(D), F = function() {
        var a = "[-\\+]?\\d+%?", b = "[-\\+]?\\d*\\.\\d+%?", c = "(?:" + b + ")|(?:" + a + ")", d = "[\\s|\\(]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")\\s*\\)?", e = "[\\s|\\(]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")[,|\\s]+(" + c + ")\\s*\\)?";
        return {
            rgb: new RegExp("rgb" + d),
            rgba: new RegExp("rgba" + e),
            hsl: new RegExp("hsl" + d),
            hsla: new RegExp("hsla" + e),
            hsv: new RegExp("hsv" + d),
            hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    }();
    "undefined" != typeof module && module.exports ? module.exports = C : "function" == typeof define && define.amd ? define(function() {
        return C;
    }) : window.tinycolor = C;
}();