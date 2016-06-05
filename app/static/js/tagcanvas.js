(function (t) {
    "use strict";
    var i, e, s = Math.abs, n = Math.sin, h = Math.cos, a = Math.max, o = Math.min, r = Math.ceil, l = Math.sqrt, f = Math.pow, u = {}, g = {}, c = {
        0: "0,",
        1: "17,",
        2: "34,",
        3: "51,",
        4: "68,",
        5: "85,",
        6: "102,",
        7: "119,",
        8: "136,",
        9: "153,",
        a: "170,",
        A: "170,",
        b: "187,",
        B: "187,",
        c: "204,",
        C: "204,",
        d: "221,",
        D: "221,",
        e: "238,",
        E: "238,",
        f: "255,",
        F: "255,"
    }, d, m, w, p, x, v, y, T = document, S, C = {};
    for (i = 0; i < 256; ++i) {
        e = i.toString(16);
        if (i < 16)e = "0" + e;
        g[e] = g[e.toUpperCase()] = i.toString() + ","
    }
    function b(t) {
        return typeof t != "undefined"
    }

    function z(t) {
        return typeof t == "object" && t != null
    }

    function D(t, i, e) {
        return isNaN(t) ? e : o(e, a(i, t))
    }

    function A() {
        return false
    }

    function I() {
        return (new Date).valueOf()
    }

    function M(t, i) {
        var e = [], s = t.length, n;
        for (n = 0; n < s; ++n)e.push(t[n]);
        e.sort(i);
        return e
    }

    function O(t) {
        var i = t.length - 1, e, s;
        while (i) {
            s = ~~(Math.random() * i);
            e = t[i];
            t[i] = t[s];
            t[s] = e;
            --i
        }
    }

    function F(t, i, e) {
        this.x = t;
        this.y = i;
        this.z = e
    }

    x = F.prototype;
    x.length = function () {
        return l(this.x * this.x + this.y * this.y + this.z * this.z)
    };
    x.dot = function (t) {
        return this.x * t.x + this.y * t.y + this.z * t.z
    };
    x.cross = function (t) {
        var i = this.y * t.z - this.z * t.y, e = this.z * t.x - this.x * t.z, s = this.x * t.y - this.y * t.x;
        return new F(i, e, s)
    };
    x.angle = function (t) {
        var i = this.dot(t), e;
        if (i == 0)return Math.PI / 2;
        e = i / (this.length() * t.length());
        if (e >= 1)return 0;
        if (e <= -1)return Math.PI;
        return Math.acos(e)
    };
    x.unit = function () {
        var t = this.length();
        return new F(this.x / t, this.y / t, this.z / t)
    };
    function k(t, i) {
        i = i * Math.PI / 180;
        t = t * Math.PI / 180;
        var e = n(t) * h(i), s = -n(i), a = -h(t) * h(i);
        return new F(e, s, a)
    }

    function P(t) {
        this[1] = {1: t[0], 2: t[1], 3: t[2]};
        this[2] = {1: t[3], 2: t[4], 3: t[5]};
        this[3] = {1: t[6], 2: t[7], 3: t[8]}
    }

    p = P.prototype;
    P.Identity = function () {
        return new P([1, 0, 0, 0, 1, 0, 0, 0, 1])
    };
    P.Rotation = function (t, i) {
        var e = n(t), s = h(t), a = 1 - s;
        return new P([s + f(i.x, 2) * a, i.x * i.y * a - i.z * e, i.x * i.z * a + i.y * e, i.y * i.x * a + i.z * e, s + f(i.y, 2) * a, i.y * i.z * a - i.x * e, i.z * i.x * a - i.y * e, i.z * i.y * a + i.x * e, s + f(i.z, 2) * a])
    };
    p.mul = function (t) {
        var i = [], e, s, n = t.xform ? 1 : 0;
        for (e = 1; e <= 3; ++e)for (s = 1; s <= 3; ++s) {
            if (n)i.push(this[e][1] * t[1][s] + this[e][2] * t[2][s] + this[e][3] * t[3][s]); else i.push(this[e][s] * t)
        }
        return new P(i)
    };
    p.xform = function (t) {
        var i = {}, e = t.x, s = t.y, n = t.z;
        i.x = e * this[1][1] + s * this[2][1] + n * this[3][1];
        i.y = e * this[1][2] + s * this[2][2] + n * this[3][2];
        i.z = e * this[1][3] + s * this[2][3] + n * this[3][3];
        return i
    };
    function E(t, i, e, s) {
        var a, o, r, f, u = [], g = Math.PI * (3 - l(5)), c = 2 / t;
        for (a = 0; a < t; ++a) {
            o = a * c - 1 + c / 2;
            r = l(1 - o * o);
            f = a * g;
            u.push([h(f) * r * i, o * e, n(f) * r * s])
        }
        return u
    }

    function B(t, i, e, s, a) {
        var o, r = [], f = Math.PI * (3 - l(5)), u = 2 / t, g, c, d, m;
        for (g = 0; g < t; ++g) {
            c = g * u - 1 + u / 2;
            o = g * f;
            d = h(o);
            m = n(o);
            r.push(i ? [c * e, d * s, m * a] : [d * e, c * s, m * a])
        }
        return r
    }

    function R(t, i, e, s, a, o) {
        var r, l = [], f = Math.PI * 2 / i, u, g, c;
        for (u = 0; u < i; ++u) {
            r = u * f;
            g = h(r);
            c = n(r);
            l.push(t ? [o * e, g * s, c * a] : [g * e, o * s, c * a])
        }
        return l
    }

    function N(t, i, e, s) {
        return B(t, 0, i, e, s)
    }

    function _(t, i, e, s) {
        return B(t, 1, i, e, s)
    }

    function L(t, i, e, s, n) {
        n = isNaN(n) ? 0 : n * 1;
        return R(0, t, i, e, s, n)
    }

    function H(t, i, e, s, n) {
        n = isNaN(n) ? 0 : n * 1;
        return R(1, t, i, e, s, n)
    }

    function W(t) {
        var i = new Image;
        i.onload = function () {
            var e = i.width / 2, s = i.height / 2;
            t.centreFunc = function (t, n, h, a, o) {
                t.setTransform(1, 0, 0, 1, 0, 0);
                t.globalAlpha = 1;
                t.drawImage(i, a - e, o - s)
            }
        };
        i.src = t.centreImage
    }

    function X(t, i) {
        var e = t, s, n, h = (i * 1).toPrecision(3) + ")";
        if (t[0] === "#") {
            if (!u[t])if (t.length === 4)u[t] = "rgba(" + c[t[1]] + c[t[2]] + c[t[3]]; else u[t] = "rgba(" + g[t.substr(1, 2)] + g[t.substr(3, 2)] + g[t.substr(5, 2)];
            e = u[t] + h
        } else if (t.substr(0, 4) === "rgb(" || t.substr(0, 4) === "hsl(") {
            e = t.replace("(", "a(").replace(")", "," + h)
        } else if (t.substr(0, 5) === "rgba(" || t.substr(0, 5) === "hsla(") {
            s = t.lastIndexOf(",") + 1, n = t.indexOf(")");
            i *= parseFloat(t.substring(s, n));
            e = t.substr(0, s) + i.toPrecision(3) + ")"
        }
        return e
    }

    function Y(t, i) {
        if (window.G_vmlCanvasManager)return null;
        var e = T.createElement("canvas");
        e.width = t;
        e.height = i;
        return e
    }

    function U() {
        var t = Y(3, 3), i, e;
        if (!t)return false;
        i = t.getContext("2d");
        i.strokeStyle = "#000";
        i.shadowColor = "#fff";
        i.shadowBlur = 3;
        i.globalAlpha = 0;
        i.strokeRect(2, 2, 2, 2);
        i.globalAlpha = 1;
        e = i.getImageData(2, 2, 1, 1);
        t = null;
        return e.data[0] > 0
    }

    function V(t, i, e, s) {
        var n = t.createLinearGradient(0, 0, i, 0), h;
        for (h in s)n.addColorStop(1 - h, s[h]);
        t.fillStyle = n;
        t.fillRect(0, e, i, 1)
    }

    function q(t, i, e) {
        var s = 1024, n = 1, h = t.weightGradient, r, l, f, u;
        if (t.gCanvas) {
            l = t.gCanvas.getContext("2d");
            n = t.gCanvas.height
        } else {
            if (z(h[0]))n = h.length; else h = [h];
            t.gCanvas = r = Y(s, n);
            if (!r)return null;
            l = r.getContext("2d");
            for (f = 0; f < n; ++f)V(l, s, f, h[f])
        }
        e = a(o(e || 0, n - 1), 0);
        u = l.getImageData(~~((s - 1) * i), e, 1, 1).data;
        return "rgba(" + u[0] + "," + u[1] + "," + u[2] + "," + u[3] / 255 + ")"
    }

    function G(t, i, e, n, h, a, o, r, l, f, u, g) {
        var c = h + (r || 0) + (l.length && l[0] < 0 ? s(l[0]) : 0), d = a + (r || 0) + (l.length && l[1] < 0 ? s(l[1]) : 0), m, w;
        t.font = i;
        t.textBaseline = "top";
        t.fillStyle = e;
        o && (t.shadowColor = o);
        r && (t.shadowBlur = r);
        l.length && (t.shadowOffsetX = l[0], t.shadowOffsetY = l[1]);
        for (m = 0; m < n.length; ++m) {
            w = 0;
            if (u) {
                if ("right" == g) {
                    w = f - u[m]
                } else if ("centre" == g) {
                    w = (f - u[m]) / 2
                }
            }
            t.fillText(n[m], c + w, d);
            d += parseInt(i)
        }
    }

    function j(t, i, e, s, n, h, a) {
        if (h) {
            t.beginPath();
            t.moveTo(i, e + n - h);
            t.arcTo(i, e, i + h, e, h);
            t.arcTo(i + s, e, i + s, e + h, h);
            t.arcTo(i + s, e + n, i + s - h, e + n, h);
            t.arcTo(i, e + n, i, e + n - h, h);
            t.closePath();
            t[a ? "stroke" : "fill"]()
        } else {
            t[a ? "strokeRect" : "fillRect"](i, e, s, n)
        }
    }

    function Z(t, i, e, s, n, h, a, o, r) {
        this.strings = t;
        this.font = i;
        this.width = e;
        this.height = s;
        this.maxWidth = n;
        this.stringWidths = h;
        this.align = a;
        this.valign = o;
        this.scale = r
    }

    y = Z.prototype;
    y.SetImage = function (t, i, e, s, n, h, a, o) {
        this.image = t;
        this.iwidth = i * this.scale;
        this.iheight = e * this.scale;
        this.ipos = s;
        this.ipad = n * this.scale;
        this.iscale = o;
        this.ialign = h;
        this.ivalign = a
    };
    y.Align = function (t, i, e) {
        var s = 0;
        if (e == "right" || e == "bottom")s = i - t; else if (e != "left" && e != "top")s = (i - t) / 2;
        return s
    };
    y.Create = function (t, i, e, n, h, r, l, f, u) {
        var g, c, d, m, w, p, x, v, y, T, S, C, b, z, D, A = s(l[0]), I = s(l[1]), M, O;
        f = a(f, A + r, I + r);
        w = 2 * (f + n);
        x = 2 * (f + n);
        c = this.width + w;
        d = this.height + x;
        y = T = f + n;
        if (this.image) {
            S = C = f + n;
            b = this.iwidth;
            z = this.iheight;
            if (this.ipos == "top" || this.ipos == "bottom") {
                if (b < this.width)S += this.Align(b, this.width, this.ialign); else y += this.Align(this.width, b, this.align);
                if (this.ipos == "top")T += z + this.ipad; else C += this.height + this.ipad;
                c = a(c, b + w);
                d += z + this.ipad
            } else {
                if (z < this.height)C += this.Align(z, this.height, this.ivalign); else T += this.Align(this.height, z, this.valign);
                if (this.ipos == "right")S += this.width + this.ipad; else y += b + this.ipad;
                c += b + this.ipad;
                d = a(d, z + x)
            }
        }
        g = Y(c, d);
        if (!g)return null;
        w = x = n / 2;
        p = c - n;
        v = d - n;
        D = o(u, p / 2, v / 2);
        m = g.getContext("2d");
        if (i) {
            m.fillStyle = i;
            j(m, w, x, p, v, D)
        }
        if (n) {
            m.strokeStyle = e;
            m.lineWidth = n;
            j(m, w, x, p, v, D, true)
        }
        if (r || A || I) {
            M = Y(c, d);
            if (M) {
                O = m;
                m = M.getContext("2d")
            }
        }
        G(m, this.font, t, this.strings, y, T, 0, 0, [], this.maxWidth, this.stringWidths, this.align);
        if (this.image)m.drawImage(this.image, S, C, b, z);
        if (O) {
            m = O;
            h && (m.shadowColor = h);
            r && (m.shadowBlur = r);
            m.shadowOffsetX = l[0];
            m.shadowOffsetY = l[1];
            m.drawImage(M, 0, 0)
        }
        return g
    };
    function Q(t, i, e) {
        var s = Y(i, e), n;
        if (!s)return null;
        n = s.getContext("2d");
        n.drawImage(t, (i - t.width) / 2, (e - t.height) / 2);
        return s
    }

    function J(t, i, e) {
        var s = Y(i, e), n;
        if (!s)return null;
        n = s.getContext("2d");
        n.drawImage(t, 0, 0, i, e);
        return s
    }

    function K(t, i, e, s, n, h, a, r, l, f) {
        var u = i + (2 * r + h) * s, g = e + (2 * r + h) * s, c = Y(u, g), d, m, w, p, x, v, y, T;
        if (!c)return null;
        h *= s;
        l *= s;
        m = w = h / 2;
        p = u - h;
        x = g - h;
        r = r * s + m;
        d = c.getContext("2d");
        T = o(l, p / 2, x / 2);
        if (n) {
            d.fillStyle = n;
            j(d, m, w, p, x, T)
        }
        if (h) {
            d.strokeStyle = a;
            d.lineWidth = h;
            j(d, m, w, p, x, T, true)
        }
        if (f) {
            v = Y(u, g);
            y = v.getContext("2d");
            y.drawImage(t, r, r, i, e);
            y.globalCompositeOperation = "source-in";
            y.fillStyle = a;
            y.fillRect(0, 0, u, g);
            y.globalCompositeOperation = "destination-over";
            y.drawImage(c, 0, 0);
            y.globalCompositeOperation = "source-over";
            d.drawImage(v, 0, 0)
        } else {
            d.drawImage(t, r, r, t.width, t.height)
        }
        return {image: c, width: u / s, height: g / s}
    }

    function $(t, i, e, s, n) {
        var h, r, l = parseFloat(i), f = a(e, s);
        h = Y(e, s);
        if (!h)return null;
        if (i.indexOf("%") > 0)l = f * l / 100; else l = l * n;
        r = h.getContext("2d");
        r.globalCompositeOperation = "source-over";
        r.fillStyle = "#fff";
        if (l >= f / 2) {
            l = o(e, s) / 2;
            r.beginPath();
            r.moveTo(e / 2, s / 2);
            r.arc(e / 2, s / 2, l, 0, 2 * Math.PI, false);
            r.fill();
            r.closePath()
        } else {
            l = o(e / 2, s / 2, l);
            j(r, 0, 0, e, s, l, true);
            r.fill()
        }
        r.globalCompositeOperation = "source-in";
        r.drawImage(t, 0, 0, e, s);
        return h
    }

    function tt(t, i, e, n, h, a, o) {
        var r = s(o[0]), l = s(o[1]), f = i + (r > a ? r + a : a * 2) * n, u = e + (l > a ? l + a : a * 2) * n, g = n * ((a || 0) + (o[0] < 0 ? r : 0)), c = n * ((a || 0) + (o[1] < 0 ? l : 0)), d, m;
        d = Y(f, u);
        if (!d)return null;
        m = d.getContext("2d");
        h && (m.shadowColor = h);
        a && (m.shadowBlur = a * n);
        o && (m.shadowOffsetX = o[0] * n, m.shadowOffsetY = o[1] * n);
        m.drawImage(t, g, c, i, e);
        return {image: d, width: f / n, height: u / n}
    }

    function it(t, i, e) {
        var s = parseInt(t.toString().length * e), n = parseInt(e * 2 * t.length), h = Y(s, n), a, o, r, l, f, u, g, c;
        if (!h)return null;
        a = h.getContext("2d");
        a.fillStyle = "#000";
        a.fillRect(0, 0, s, n);
        G(a, e + "px " + i, "#fff", t, 0, 0, 0, 0, [], "centre");
        o = a.getImageData(0, 0, s, n);
        r = o.width;
        l = o.height;
        c = {min: {x: r, y: l}, max: {x: -1, y: -1}};
        for (u = 0; u < l; ++u) {
            for (f = 0; f < r; ++f) {
                g = (u * r + f) * 4;
                if (o.data[g + 1] > 0) {
                    if (f < c.min.x)c.min.x = f;
                    if (f > c.max.x)c.max.x = f;
                    if (u < c.min.y)c.min.y = u;
                    if (u > c.max.y)c.max.y = u
                }
            }
        }
        if (r != s) {
            c.min.x *= s / r;
            c.max.x *= s / r
        }
        if (l != n) {
            c.min.y *= s / l;
            c.max.y *= s / l
        }
        h = null;
        return c
    }

    function et(t) {
        return "'" + t.replace(/(\'|\")/g, "").replace(/\s*,\s*/g, "', '") + "'"
    }

    function st(t, i, e) {
        e = e || T;
        if (e.addEventListener)e.addEventListener(t, i, false); else e.attachEvent("on" + t, i)
    }

    function nt(t, i, e) {
        e = e || T;
        if (e.removeEventListener)e.removeEventListener(t, i); else e.detachEvent("on" + t, i)
    }

    function ht(t, i, e, s) {
        var n = s.imageScale, h, a, o, r, l, f;
        if (!i.complete)return st("load", function () {
            ht(t, i, e, s)
        }, i);
        if (!t.complete)return st("load", function () {
            ht(t, i, e, s)
        }, t);
        i.width = i.width;
        i.height = i.height;
        if (n) {
            t.width = i.width * n;
            t.height = i.height * n
        }
        e.iw = t.width;
        e.ih = t.height;
        if (s.txtOpt) {
            a = t;
            h = s.zoomMax * s.txtScale;
            l = e.iw * h;
            f = e.ih * h;
            if (l < i.naturalWidth || f < i.naturalHeight) {
                a = J(t, l, f);
                if (a)e.fimage = a
            } else {
                l = e.iw;
                f = e.ih;
                h = 1
            }
            if (parseFloat(s.imageRadius))e.image = e.fimage = t = $(e.image, s.imageRadius, l, f, h);
            if (!e.HasText()) {
                if (s.shadow) {
                    a = tt(e.image, l, f, h, s.shadow, s.shadowBlur, s.shadowOffset);
                    if (a) {
                        e.fimage = a.image;
                        e.w = a.width;
                        e.h = a.height
                    }
                }
                if (s.bgColour || s.bgOutlineThickness) {
                    o = s.bgColour == "tag" ? at(e.a, "background-color") : s.bgColour;
                    r = s.bgOutline == "tag" ? at(e.a, "color") : s.bgOutline || s.textColour;
                    l = e.fimage.width;
                    f = e.fimage.height;
                    if (s.outlineMethod == "colour") {
                        a = K(e.fimage, l, f, h, o, s.bgOutlineThickness, s.outlineColour, s.padding, s.bgRadius, 1);
                        if (a)e.oimage = a.image
                    }
                    a = K(e.fimage, l, f, h, o, s.bgOutlineThickness, r, s.padding, s.bgRadius);
                    if (a) {
                        e.fimage = a.image;
                        e.w = a.width;
                        e.h = a.height
                    }
                }
                if (s.outlineMethod == "size") {
                    if (s.outlineIncrease > 0) {
                        e.iw += 2 * s.outlineIncrease;
                        e.ih += 2 * s.outlineIncrease;
                        l = h * e.iw;
                        f = h * e.ih;
                        a = J(e.fimage, l, f);
                        e.oimage = a;
                        e.fimage = Q(e.fimage, e.oimage.width, e.oimage.height)
                    } else {
                        l = h * (e.iw + 2 * s.outlineIncrease);
                        f = h * (e.ih + 2 * s.outlineIncrease);
                        a = J(e.fimage, l, f);
                        e.oimage = Q(a, e.fimage.width, e.fimage.height)
                    }
                }
            }
        }
        e.Init()
    }

    function at(t, i) {
        var e = T.defaultView, s = i.replace(/\-([a-z])/g, function (t) {
            return t.charAt(1).toUpperCase()
        });
        return e && e.getComputedStyle && e.getComputedStyle(t, null).getPropertyValue(i) || t.currentStyle && t.currentStyle[s]
    }

    function ot(t, i, e) {
        var s = 1, n;
        if (i) {
            s = 1 * (t.getAttribute(i) || e)
        } else if (n = at(t, "font-size")) {
            s = n.indexOf("px") > -1 && n.replace("px", "") * 1 || n.indexOf("pt") > -1 && n.replace("pt", "") * 1.25 || n * 3.3
        }
        return s
    }

    function rt(t) {
        return t.target && b(t.target.id) ? t.target.id : t.srcElement.parentNode.id
    }

    function lt(t, i) {
        var e, s, n = parseInt(at(i, "width")) / i.width, h = parseInt(at(i, "height")) / i.height;
        if (b(t.offsetX)) {
            e = {x: t.offsetX, y: t.offsetY}
        } else {
            s = Tt(i.id);
            if (b(t.changedTouches))t = t.changedTouches[0];
            if (t.pageX)e = {x: t.pageX - s.x, y: t.pageY - s.y}
        }
        if (e && n && h) {
            e.x /= n;
            e.y /= h
        }
        return e
    }

    function ft(t) {
        var i = t.target || t.fromElement.parentNode, e = Dt.tc[i.id];
        if (e) {
            e.mx = e.my = -1;
            e.UnFreeze();
            e.EndDrag()
        }
    }

    function ut(t) {
        var i, e = Dt, s, n, h = rt(t);
        for (i in e.tc) {
            s = e.tc[i];
            if (s.tttimer) {
                clearTimeout(s.tttimer);
                s.tttimer = null
            }
        }
        if (h && e.tc[h]) {
            s = e.tc[h];
            if (n = lt(t, s.canvas)) {
                s.mx = n.x;
                s.my = n.y;
                s.Drag(t, n)
            }
            s.drawn = 0
        }
    }

    function gt(t) {
        var i = Dt, e = T.addEventListener ? 0 : 1, s = rt(t);
        if (s && t.button == e && i.tc[s]) {
            i.tc[s].BeginDrag(t)
        }
    }

    function ct(t) {
        var i = Dt, e = T.addEventListener ? 0 : 1, s = rt(t), n;
        if (s && t.button == e && i.tc[s]) {
            n = i.tc[s];
            ut(t);
            if (!n.EndDrag() && !n.touchState)n.Clicked(t)
        }
    }

    function dt(t) {
        var i = rt(t), e = i && Dt.tc[i], s;
        if (e && t.changedTouches) {
            if (t.touches.length == 1 && e.touchState == 0) {
                e.touchState = 1;
                e.BeginDrag(t);
                if (s = lt(t, e.canvas)) {
                    e.mx = s.x;
                    e.my = s.y;
                    e.drawn = 0
                }
            } else if (t.targetTouches.length == 2 && e.pinchZoom) {
                e.touchState = 3;
                e.EndDrag();
                e.BeginPinch(t)
            } else {
                e.EndDrag();
                e.EndPinch();
                e.touchState = 0
            }
        }
    }

    function mt(t) {
        var i = rt(t), e = i && Dt.tc[i];
        if (e && t.changedTouches) {
            switch (e.touchState) {
                case 1:
                    e.Draw();
                    e.Clicked();
                    break;
                case 2:
                    e.EndDrag();
                    break;
                case 3:
                    e.EndPinch()
            }
            e.touchState = 0
        }
    }

    function wt(t) {
        var i, e = Dt, s, n, h = rt(t);
        for (i in e.tc) {
            s = e.tc[i];
            if (s.tttimer) {
                clearTimeout(s.tttimer);
                s.tttimer = null
            }
        }
        s = h && e.tc[h];
        if (s && t.changedTouches && s.touchState) {
            switch (s.touchState) {
                case 1:
                case 2:
                    if (n = lt(t, s.canvas)) {
                        s.mx = n.x;
                        s.my = n.y;
                        if (s.Drag(t, n))s.touchState = 2
                    }
                    break;
                case 3:
                    s.Pinch(t)
            }
            s.drawn = 0
        }
    }

    function pt(t) {
        var i = Dt, e = rt(t);
        if (e && i.tc[e]) {
            t.cancelBubble = true;
            t.returnValue = false;
            t.preventDefault && t.preventDefault();
            i.tc[e].Wheel((t.wheelDelta || t.detail) > 0)
        }
    }

    function xt(t) {
        var i, e = Dt;
        clearTimeout(e.scrollTimer);
        for (i in e.tc) {
            e.tc[i].Pause()
        }
        e.scrollTimer = setTimeout(function () {
            var t, i = Dt;
            for (t in i.tc) {
                i.tc[t].Resume()
            }
        }, e.scrollPause)
    }

    function vt() {
        yt(I())
    }

    function yt(t) {
        var i = Dt.tc, e;
        Dt.NextFrame(Dt.interval);
        t = t || I();
        for (e in i)i[e].Draw(t)
    }

    function Tt(t) {
        var i = T.getElementById(t), e = i.getBoundingClientRect(), s = T.documentElement, n = T.body, h = window, a = h.pageXOffset || s.scrollLeft, o = h.pageYOffset || s.scrollTop, r = s.clientLeft || n.clientLeft, l = s.clientTop || n.clientTop;
        return {x: e.left + a - r, y: e.top + o - l}
    }

    function St(t, i, e, s) {
        var n = t.radius * t.z1 / (t.z1 + t.z2 + i.z);
        return {x: i.x * n * e, y: i.y * n * s, z: i.z, w: (t.z1 - i.z) / t.z2}
    }

    function Ct(t) {
        this.e = t;
        this.br = 0;
        this.line = [];
        this.text = [];
        this.original = t.innerText || t.textContent
    }

    v = Ct.prototype;
    v.Empty = function () {
        for (var t = 0; t < this.text.length; ++t)if (this.text[t].length)return false;
        return true
    };
    v.Lines = function (t) {
        var i = t ? 1 : 0, e, s, n;
        t = t || this.e;
        e = t.childNodes;
        s = e.length;
        for (n = 0; n < s; ++n) {
            if (e[n].nodeName == "BR") {
                this.text.push(this.line.join(" "));
                this.br = 1
            } else if (e[n].nodeType == 3) {
                if (this.br) {
                    this.line = [e[n].nodeValue];
                    this.br = 0
                } else {
                    this.line.push(e[n].nodeValue)
                }
            } else {
                this.Lines(e[n])
            }
        }
        i || this.br || this.text.push(this.line.join(" "));
        return this.text
    };
    v.SplitWidth = function (t, i, e, s) {
        var n, h, a, o = [];
        i.font = s + "px " + e;
        for (n = 0; n < this.text.length; ++n) {
            a = this.text[n].split(/\s+/);
            this.line = [a[0]];
            for (h = 1; h < a.length; ++h) {
                if (i.measureText(this.line.join(" ") + " " + a[h]).width > t) {
                    o.push(this.line.join(" "));
                    this.line = [a[h]]
                } else {
                    this.line.push(a[h])
                }
            }
            o.push(this.line.join(" "))
        }
        return this.text = o
    };
    function bt(t, i) {
        this.ts = I();
        this.tc = t;
        this.tag = i;
        this.x = this.y = this.w = this.h = this.sc = 1;
        this.z = 0;
        this.Draw = t.pulsateTo < 1 && t.outlineMethod != "colour" ? this.DrawPulsate : this.DrawSimple;
        this.radius = t.outlineRadius | 0;
        this.SetMethod(t.outlineMethod)
    }

    d = bt.prototype;
    d.SetMethod = function (t) {
        var i = {
            block: ["PreDraw", "DrawBlock"],
            colour: ["PreDraw", "DrawColour"],
            outline: ["PostDraw", "DrawOutline"],
            classic: ["LastDraw", "DrawOutline"],
            size: ["PreDraw", "DrawColour"],
            none: ["LastDraw"]
        }, e = i[t] || i.outline;
        if (t == "none") {
            this.Draw = function () {
                return 1
            }
        } else {
            this.drawFunc = this[e[1]]
        }
        this[e[0]] = this.Draw
    };
    d.Update = function (t, i, e, s, n, h, a, o) {
        var r = this.tc.outlineOffset, l = 2 * r;
        this.x = n * t + a - r;
        this.y = n * i + o - r;
        this.w = n * e + l;
        this.h = n * s + l;
        this.sc = n;
        this.z = h
    };
    d.DrawOutline = function (t, i, e, s, n, h) {
        var a = o(this.radius, n / 2, s / 2);
        t.strokeStyle = h;
        j(t, i, e, s, n, a, true)
    };
    d.DrawColour = function (t, i, e, s, n, h, a, o, r) {
        if (a.oimage) {
            a.alpha = 1;
            a.Draw(t, o, r, a.oimage);
            return 1
        }
        return this[a.image ? "DrawColourImage" : "DrawColourText"](t, i, e, s, n, h, a, o, r)
    };
    d.DrawColourText = function (t, i, e, s, n, h, a, o, r) {
        var l = a.colour;
        a.colour = h;
        a.alpha = 1;
        a.Draw(t, o, r);
        a.colour = l;
        return 1
    };
    d.DrawColourImage = function (t, i, e, s, n, h, r, l, f) {
        var u = t.canvas, g = ~~a(i, 0), c = ~~a(e, 0), d = o(u.width - g, s) + .5 | 0, m = o(u.height - c, n) + .5 | 0, w;
        if (S)S.width = d, S.height = m; else S = Y(d, m);
        if (!S)return this.SetMethod("outline");
        w = S.getContext("2d");
        w.drawImage(u, g, c, d, m, 0, 0, d, m);
        t.clearRect(g, c, d, m);
        r.alpha = 1;
        r.Draw(t, l, f);
        t.setTransform(1, 0, 0, 1, 0, 0);
        t.save();
        t.beginPath();
        t.rect(g, c, d, m);
        t.clip();
        t.globalCompositeOperation = "source-in";
        t.fillStyle = h;
        t.fillRect(g, c, d, m);
        t.restore();
        t.globalCompositeOperation = "destination-over";
        t.drawImage(S, 0, 0, d, m, g, c, d, m);
        t.globalCompositeOperation = "source-over";
        return 1
    };
    d.DrawBlock = function (t, i, e, s, n, h) {
        var a = o(this.radius, n / 2, s / 2);
        t.fillStyle = h;
        j(t, i, e, s, n, a)
    };
    d.DrawSimple = function (t, i, e, s) {
        var n = this.tc;
        t.setTransform(1, 0, 0, 1, 0, 0);
        t.strokeStyle = n.outlineColour;
        t.lineWidth = n.outlineThickness;
        t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0;
        t.globalAlpha = 1;
        return this.drawFunc(t, this.x, this.y, this.w, this.h, n.outlineColour, i, e, s)
    };
    d.DrawPulsate = function (t, i, e, s) {
        var n = I() - this.ts, a = this.tc;
        t.setTransform(1, 0, 0, 1, 0, 0);
        t.strokeStyle = a.outlineColour;
        t.lineWidth = a.outlineThickness;
        t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0;
        t.globalAlpha = a.pulsateTo + (1 - a.pulsateTo) * (.5 + h(2 * Math.PI * n / (1e3 * a.pulsateTime)) / 2);
        return this.drawFunc(t, this.x, this.y, this.w, this.h, a.outlineColour, i, e, s)
    };
    d.Active = function (t, i, e) {
        return i >= this.x && e >= this.y && i <= this.x + this.w && e <= this.y + this.h
    };
    d.PreDraw = d.PostDraw = d.LastDraw = A;
    function zt(t, i, e, s, n, h, a, o, r, l, f, u, g, c) {
        this.tc = t;
        this.image = null;
        this.text = i;
        this.text_original = c;
        this.line_widths = [];
        this.title = e.title || null;
        this.a = e;
        this.position = new F(s[0], s[1], s[2]);
        this.x = this.y = this.z = 0;
        this.w = n;
        this.h = h;
        this.colour = a || t.textColour;
        this.bgColour = o || t.bgColour;
        this.bgRadius = r | 0;
        this.bgOutline = l || this.colour;
        this.bgOutlineThickness = f | 0;
        this.textFont = u || t.textFont;
        this.padding = g | 0;
        this.sc = this.alpha = 1;
        this.weighted = !t.weight
    }

    m = zt.prototype;
    m.Init = function (t) {
        var i = this.tc;
        this.outline = new bt(i, this);
        this.textHeight = i.textHeight;
        if (this.HasText()) {
            this.Measure(i.ctxt, i)
        } else {
            this.w = this.iw;
            this.h = this.ih
        }
        this.SetShadowColour = i.shadowAlpha ? this.SetShadowColourAlpha : this.SetShadowColourFixed;
        this.SetDraw(i)
    };
    m.Draw = A;
    m.HasText = function () {
        return this.text && this.text[0].length > 0
    };
    m.EqualTo = function (t) {
        var i = t.getElementsByTagName("img");
        if (this.a.href != t.href)return 0;
        if (i.length)return this.image.src == i[0].src;
        return (t.innerText || t.textContent) == this.text_original
    };
    m.SetImage = function (t) {
        this.image = this.fimage = t
    };
    m.SetDraw = function (t) {
        this.Draw = this.fimage ? t.ie > 7 ? this.DrawImageIE : this.DrawImage : this.DrawText;
        t.noSelect && (this.CheckActive = A)
    };
    m.MeasureText = function (t) {
        var i, e = this.text.length, s = 0, n;
        for (i = 0; i < e; ++i) {
            this.line_widths[i] = n = t.measureText(this.text[i]).width;
            s = a(s, n)
        }
        return s
    };
    m.Measure = function (t, i) {
        var e = it(this.text, this.textFont, this.textHeight), s, n, h, a, o, r, l, f, u;
        l = e ? e.max.y + e.min.y : this.textHeight;
        t.font = this.font = this.textHeight + "px " + this.textFont;
        r = this.MeasureText(t);
        if (i.txtOpt) {
            s = i.txtScale;
            n = s * this.textHeight;
            h = n + "px " + this.textFont;
            a = [s * i.shadowOffset[0], s * i.shadowOffset[1]];
            t.font = h;
            o = this.MeasureText(t);
            u = new Z(this.text, h, o + s, s * l + s, o, this.line_widths, i.textAlign, i.textVAlign, s);
            if (this.image)u.SetImage(this.image, this.iw, this.ih, i.imagePosition, i.imagePadding, i.imageAlign, i.imageVAlign, i.imageScale);
            f = u.Create(this.colour, this.bgColour, this.bgOutline, s * this.bgOutlineThickness, i.shadow, s * i.shadowBlur, a, s * this.padding, s * this.bgRadius);
            if (i.outlineMethod == "colour") {
                this.oimage = u.Create(i.outlineColour, this.bgColour, i.outlineColour, s * this.bgOutlineThickness, i.shadow, s * i.shadowBlur, a, s * this.padding, s * this.bgRadius)
            } else if (i.outlineMethod == "size") {
                e = it(this.text, this.textFont, this.textHeight + i.outlineIncrease);
                n = e.max.y + e.min.y;
                h = s * (this.textHeight + i.outlineIncrease) + "px " + this.textFont;
                t.font = h;
                o = this.MeasureText(t);
                u = new Z(this.text, h, o + s, s * n + s, o, this.line_widths, i.textAlign, i.textVAlign, s);
                if (this.image)u.SetImage(this.image, this.iw + i.outlineIncrease, this.ih + i.outlineIncrease, i.imagePosition, i.imagePadding, i.imageAlign, i.imageVAlign, i.imageScale);
                this.oimage = u.Create(this.colour, this.bgColour, this.bgOutline, s * this.bgOutlineThickness, i.shadow, s * i.shadowBlur, a, s * this.padding, s * this.bgRadius);
                if (i.outlineIncrease > 0)f = Q(f, this.oimage.width, this.oimage.height); else this.oimage = Q(this.oimage, f.width, f.height)
            }
            if (f) {
                this.fimage = f;
                r = this.fimage.width / s;
                l = this.fimage.height / s
            }
            this.SetDraw(i);
            i.txtOpt = !!this.fimage
        }
        this.h = l;
        this.w = r
    };
    m.SetFont = function (t, i, e, s) {
        this.textFont = t;
        this.colour = i;
        this.bgColour = e;
        this.bgOutline = s;
        this.Measure(this.tc.ctxt, this.tc)
    };
    m.SetWeight = function (t) {
        var i = this.tc, e = i.weightMode.split(/[, ]/), s, n, h = t.length;
        if (!this.HasText())return;
        this.weighted = true;
        for (n = 0; n < h; ++n) {
            s = e[n] || "size";
            if ("both" == s) {
                this.Weight(t[n], i.ctxt, i, "size", i.min_weight[n], i.max_weight[n], n);
                this.Weight(t[n], i.ctxt, i, "colour", i.min_weight[n], i.max_weight[n], n)
            } else {
                this.Weight(t[n], i.ctxt, i, s, i.min_weight[n], i.max_weight[n], n)
            }
        }
        this.Measure(i.ctxt, i)
    };
    m.Weight = function (t, i, e, s, n, h, o) {
        t = isNaN(t) ? 1 : t;
        var r = (t - n) / (h - n);
        if ("colour" == s)this.colour = q(e, r, o); else if ("bgcolour" == s)this.bgColour = q(e, r, o); else if ("bgoutline" == s)this.bgOutline = q(e, r, o); else if ("size" == s) {
            if (e.weightSizeMin > 0 && e.weightSizeMax > e.weightSizeMin) {
                this.textHeight = e.weightSize * (e.weightSizeMin + (e.weightSizeMax - e.weightSizeMin) * r)
            } else {
                this.textHeight = a(1, t * e.weightSize)
            }
        }
    };
    m.SetShadowColourFixed = function (t, i, e) {
        t.shadowColor = i
    };
    m.SetShadowColourAlpha = function (t, i, e) {
        t.shadowColor = X(i, e)
    };
    m.DrawText = function (t, i, e) {
        var s = this.tc, n = this.x, h = this.y, a = this.sc, o, r;
        t.globalAlpha = this.alpha;
        t.fillStyle = this.colour;
        s.shadow && this.SetShadowColour(t, s.shadow, this.alpha);
        t.font = this.font;
        n += i / a;
        h += e / a - this.h / 2;
        for (o = 0; o < this.text.length; ++o) {
            r = n;
            if ("right" == s.textAlign) {
                r += this.w / 2 - this.line_widths[o]
            } else if ("centre" == s.textAlign) {
                r -= this.line_widths[o] / 2
            } else {
                r -= this.w / 2
            }
            t.setTransform(a, 0, 0, a, a * r, a * h);
            t.fillText(this.text[o], 0, 0);
            h += this.textHeight
        }
    };
    m.DrawImage = function (t, i, e, s) {
        var n = this.x, h = this.y, a = this.sc, o = s || this.fimage, r = this.w, l = this.h, f = this.alpha, u = this.shadow;
        t.globalAlpha = f;
        u && this.SetShadowColour(t, u, f);
        n += i / a - r / 2;
        h += e / a - l / 2;
        t.setTransform(a, 0, 0, a, a * n, a * h);
        t.drawImage(o, 0, 0, r, l)
    };
    m.DrawImageIE = function (t, i, e) {
        var s = this.fimage, n = this.sc, h = s.width = this.w * n, a = s.height = this.h * n, o = this.x * n + i - h / 2, r = this.y * n + e - a / 2;
        t.setTransform(1, 0, 0, 1, 0, 0);
        t.globalAlpha = this.alpha;
        t.drawImage(s, o, r)
    };
    m.Calc = function (t, i) {
        var e, s = this.tc, n = s.minBrightness, h = s.maxBrightness, a = s.max_radius;
        e = t.xform(this.position);
        this.xformed = e;
        e = St(s, e, s.stretchX, s.stretchY);
        this.x = e.x;
        this.y = e.y;
        this.z = e.z;
        this.sc = e.w;
        this.alpha = i * D(n + (h - n) * (a - this.z) / (2 * a), 0, 1)
    };
    m.UpdateActive = function (t, i, e) {
        var s = this.outline, n = this.w, h = this.h, a = this.x - n / 2, o = this.y - h / 2;
        s.Update(a, o, n, h, this.sc, this.z, i, e);
        return s
    };
    m.CheckActive = function (t, i, e) {
        var s = this.tc, n = this.UpdateActive(t, i, e);
        return n.Active(t, s.mx, s.my) ? n : null
    };
    m.Clicked = function (t) {
        var i = this.a, e = i.target, s = i.href, n;
        if (e != "" && e != "_self") {
            if (self.frames[e]) {
                self.frames[e].document.location = s
            } else {
                try {
                    if (top.frames[e]) {
                        top.frames[e].document.location = s;
                        return
                    }
                } catch (h) {
                }
                window.open(s, e)
            }
            return
        }
        if (T.createEvent) {
            n = T.createEvent("MouseEvents");
            n.initMouseEvent("click", 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
            if (!i.dispatchEvent(n))return
        } else if (i.fireEvent) {
            if (!i.fireEvent("onclick"))return
        }
        T.location = s
    };
    function Dt(t, i, e) {
        var s, n, h = T.getElementById(t), l = ["id", "class", "innerHTML"], f;
        if (!h)throw 0;
        if (b(window.G_vmlCanvasManager)) {
            h = window.G_vmlCanvasManager.initElement(h);
            this.ie = parseFloat(navigator.appVersion.split("MSIE")[1])
        }
        if (h && (!h.getContext || !h.getContext("2d").fillText)) {
            n = T.createElement("DIV");
            for (s = 0; s < l.length; ++s)n[l[s]] = h[l[s]];
            h.parentNode.insertBefore(n, h);
            h.parentNode.removeChild(h);
            throw 0
        }
        for (s in Dt.options)this[s] = e && b(e[s]) ? e[s] : b(Dt[s]) ? Dt[s] : Dt.options[s];
        this.canvas = h;
        this.ctxt = h.getContext("2d");
        this.z1 = 250 / a(this.depth, .001);
        this.z2 = this.z1 / this.zoom;
        this.radius = o(h.height, h.width) * .0075;
        this.max_radius = 100;
        this.max_weight = [];
        this.min_weight = [];
        this.textFont = this.textFont && et(this.textFont);
        this.textHeight *= 1;
        this.imageRadius = this.imageRadius.toString();
        this.pulsateTo = D(this.pulsateTo, 0, 1);
        this.minBrightness = D(this.minBrightness, 0, 1);
        this.maxBrightness = D(this.maxBrightness, this.minBrightness, 1);
        this.ctxt.textBaseline = "top";
        this.lx = (this.lock + "").indexOf("x") + 1;
        this.ly = (this.lock + "").indexOf("y") + 1;
        this.frozen = this.dx = this.dy = this.fixedAnim = this.touchState = 0;
        this.fixedAlpha = 1;
        this.source = i || t;
        this.repeatTags = o(64, ~~this.repeatTags);
        this.minTags = o(200, ~~this.minTags);
        if (~~this.scrollPause > 0)Dt.scrollPause = ~~this.scrollPause; else this.scrollPause = 0;
        if (this.minTags > 0 && this.repeatTags < 1 && (s = this.GetTags().length))this.repeatTags = r(this.minTags / s) - 1;
        this.transform = P.Identity();
        this.startTime = this.time = I();
        this.mx = this.my = -1;
        this.centreImage && W(this);
        this.Animate = this.dragControl ? this.AnimateDrag : this.AnimatePosition;
        this.animTiming = typeof Dt[this.animTiming] == "function" ? Dt[this.animTiming] : Dt.Smooth;
        if (this.shadowBlur || this.shadowOffset[0] || this.shadowOffset[1]) {
            this.ctxt.shadowColor = this.shadow;
            this.shadow = this.ctxt.shadowColor;
            this.shadowAlpha = U()
        } else {
            delete this.shadow
        }
        this.Load();
        if (i && this.hideTags) {
            (function (t) {
                if (Dt.loaded)t.HideTags(); else st("load", function () {
                    t.HideTags()
                }, window)
            })(this)
        }
        this.yaw = this.initial ? this.initial[0] * this.maxSpeed : 0;
        this.pitch = this.initial ? this.initial[1] * this.maxSpeed : 0;
        if (this.tooltip) {
            this.ctitle = h.title;
            h.title = "";
            if (this.tooltip == "native") {
                this.Tooltip = this.TooltipNative
            } else {
                this.Tooltip = this.TooltipDiv;
                if (!this.ttdiv) {
                    this.ttdiv = T.createElement("div");
                    this.ttdiv.className = this.tooltipClass;
                    this.ttdiv.style.position = "absolute";
                    this.ttdiv.style.zIndex = h.style.zIndex + 1;
                    st("mouseover", function (t) {
                        t.target.style.display = "none"
                    }, this.ttdiv);
                    T.body.appendChild(this.ttdiv)
                }
            }
        } else {
            this.Tooltip = this.TooltipNone
        }
        if (!this.noMouse && !C[t]) {
            C[t] = [["mousemove", ut], ["mouseout", ft], ["mouseup", ct], ["touchstart", dt], ["touchend", mt], ["touchcancel", mt], ["touchmove", wt]];
            if (this.dragControl) {
                C[t].push(["mousedown", gt]);
                C[t].push(["selectstart", A])
            }
            if (this.wheelZoom) {
                C[t].push(["mousewheel", pt]);
                C[t].push(["DOMMouseScroll", pt])
            }
            if (this.scrollPause) {
                C[t].push(["scroll", xt, window])
            }
            for (s = 0; s < C[t].length; ++s) {
                n = C[t][s];
                st(n[0], n[1], n[2] ? n[2] : h)
            }
        }
        if (!Dt.started) {
            f = window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            Dt.NextFrame = f ? Dt.NextFrameRAF : Dt.NextFrameTimeout;
            Dt.interval = this.interval;
            Dt.NextFrame(this.interval);
            Dt.started = 1
        }
    }

    w = Dt.prototype;
    w.SourceElements = function () {
        if (T.querySelectorAll)return T.querySelectorAll("#" + this.source);
        return [T.getElementById(this.source)]
    };
    w.HideTags = function () {
        var t = this.SourceElements(), i;
        for (i = 0; i < t.length; ++i)t[i].style.display = "none"
    };
    w.GetTags = function () {
        var t = this.SourceElements(), i, e = [], s, n, h;
        for (h = 0; h <= this.repeatTags; ++h) {
            for (s = 0; s < t.length; ++s) {
                i = t[s].getElementsByTagName("a");
                for (n = 0; n < i.length; ++n) {
                    e.push(i[n])
                }
            }
        }
        return e
    };
    w.Message = function (t) {
        var i = [], e, s, a = t.split(""), o, r, l, f;
        for (e = 0; e < a.length; ++e) {
            if (a[e] != " ") {
                s = e - a.length / 2;
                o = T.createElement("A");
                o.href = "#";
                o.innerText = a[e];
                l = 100 * n(s / 9);
                f = -100 * h(s / 9);
                r = new zt(this, a[e], o, [l, 0, f], 2, 18, "#000", "#fff", 0, 0, 0, "monospace", 2, a[e]);
                r.Init();
                i.push(r)
            }
        }
        return i
    };
    w.CreateTag = function (t) {
        var i, e, s, n, h, a, o, r, l = [0, 0, 0];
        if ("text" != this.imageMode) {
            i = t.getElementsByTagName("img");
            if (i.length) {
                e = new Image;
                e.src = i[0].src;
                if (!this.imageMode) {
                    s = new zt(this, "", t, l, 0, 0);
                    s.SetImage(e);
                    ht(e, i[0], s, this);
                    return s
                }
            }
        }
        if ("image" != this.imageMode) {
            h = new Ct(t);
            n = h.Lines();
            if (!h.Empty()) {
                a = this.textFont || et(at(t, "font-family"));
                if (this.splitWidth)n = h.SplitWidth(this.splitWidth, this.ctxt, a, this.textHeight);
                o = this.bgColour == "tag" ? at(t, "background-color") : this.bgColour;
                r = this.bgOutline == "tag" ? at(t, "color") : this.bgOutline
            } else {
                h = null
            }
        }
        if (h || e) {
            s = new zt(this, n, t, l, 2, this.textHeight + 2, this.textColour || at(t, "color"), o, this.bgRadius, r, this.bgOutlineThickness, a, this.padding, h && h.original);
            if (e) {
                s.SetImage(e);
                ht(e, i[0], s, this)
            } else {
                s.Init()
            }
            return s
        }
    };
    w.UpdateTag = function (t, i) {
        var e = this.textColour || at(i, "color"), s = this.textFont || et(at(i, "font-family")), n = this.bgColour == "tag" ? at(i, "background-color") : this.bgColour, h = this.bgOutline == "tag" ? at(i, "color") : this.bgOutline;
        t.a = i;
        t.title = i.title;
        if (t.colour != e || t.textFont != s || t.bgColour != n || t.bgOutline != h)t.SetFont(s, e, n, h)
    };
    w.Weight = function (t) {
        var i = t.length, e, s, n, h = [], a, o = this.weightFrom ? this.weightFrom.split(/[, ]/) : [null], r = o.length;
        for (s = 0; s < i; ++s) {
            h[s] = [];
            for (n = 0; n < r; ++n) {
                e = ot(t[s].a, o[n], this.textHeight);
                if (!this.max_weight[n] || e > this.max_weight[n])this.max_weight[n] = e;
                if (!this.min_weight[n] || e < this.min_weight[n])this.min_weight[n] = e;
                h[s][n] = e
            }
        }
        for (n = 0; n < r; ++n) {
            if (this.max_weight[n] > this.min_weight[n])a = 1
        }
        if (a) {
            for (s = 0; s < i; ++s) {
                t[s].SetWeight(h[s])
            }
        }
    };
    w.Load = function () {
        var t = this.GetTags(), i = [], e, s, n, h, o, r, l, f, u = [], g = {
            sphere: E,
            vcylinder: N,
            hcylinder: _,
            vring: L,
            hring: H
        };
        if (t.length) {
            u.length = t.length;
            for (f = 0; f < t.length; ++f)u[f] = f;
            this.shuffleTags && O(u);
            h = 100 * this.radiusX;
            o = 100 * this.radiusY;
            r = 100 * this.radiusZ;
            this.max_radius = a(h, a(o, r));
            for (f = 0; f < t.length; ++f) {
                s = this.CreateTag(t[u[f]]);
                if (s)i.push(s)
            }
            this.weight && this.Weight(i, true);
            if (this.shapeArgs) {
                this.shapeArgs[0] = i.length
            } else {
                n = this.shape.toString().split(/[(),]/);
                e = n.shift();
                if (typeof window[e] === "function")this.shape = window[e]; else this.shape = g[e] || g.sphere;
                this.shapeArgs = [i.length, h, o, r].concat(n)
            }
            l = this.shape.apply(this, this.shapeArgs);
            this.listLength = i.length;
            for (f = 0; f < i.length; ++f)i[f].position = new F(l[f][0], l[f][1], l[f][2])
        }
        if (this.noTagsMessage && !i.length)i = this.Message("No tags");
        this.taglist = i
    };
    w.Update = function () {
        var t = this.GetTags(), i = [], e = this.taglist, s, n = [], h = [], a, o, l, f, u;
        if (!this.shapeArgs)return this.Load();
        if (t.length) {
            l = this.listLength = t.length;
            o = e.length;
            for (f = 0; f < o; ++f) {
                i.push(e[f]);
                h.push(f)
            }
            for (f = 0; f < l; ++f) {
                for (u = 0, s = 0; u < o; ++u) {
                    if (e[u].EqualTo(t[f])) {
                        this.UpdateTag(i[u], t[f]);
                        s = h[u] = -1
                    }
                }
                if (!s)n.push(f)
            }
            for (f = 0, u = 0; f < o; ++f) {
                if (h[u] == -1)h.splice(u, 1); else++u
            }
            if (h.length) {
                O(h);
                while (h.length && n.length) {
                    f = h.shift();
                    u = n.shift();
                    i[f] = this.CreateTag(t[u])
                }
                h.sort(function (t, i) {
                    return t - i
                });
                while (h.length) {
                    i.splice(h.pop(), 1)
                }
            }
            u = i.length / (n.length + 1);
            f = 0;
            while (n.length) {
                i.splice(r(++f * u), 0, this.CreateTag(t[n.shift()]))
            }
            this.shapeArgs[0] = l = i.length;
            a = this.shape.apply(this, this.shapeArgs);
            for (f = 0; f < l; ++f)i[f].position = new F(a[f][0], a[f][1], a[f][2]);
            this.weight && this.Weight(i)
        }
        this.taglist = i
    };
    w.SetShadow = function (t) {
        t.shadowBlur = this.shadowBlur;
        t.shadowOffsetX = this.shadowOffset[0];
        t.shadowOffsetY = this.shadowOffset[1]
    };
    w.Draw = function (t) {
        if (this.paused)return;
        var i = this.canvas, e = i.width, s = i.height, n = 0, h = (t - this.time) * Dt.interval / 1e3, a = e / 2 + this.offsetX, o = s / 2 + this.offsetY, r = this.ctxt, l, f, u, g = -1, c = this.taglist, d = c.length, m = this.frontSelect, w = this.centreFunc == A, p;
        this.time = t;
        if (this.frozen && this.drawn)return this.Animate(e, s, h);
        p = this.AnimateFixed();
        r.setTransform(1, 0, 0, 1, 0, 0);
        for (u = 0; u < d; ++u)c[u].Calc(this.transform, this.fixedAlpha);
        c = M(c, function (t, i) {
            return i.z - t.z
        });
        if (p && this.fixedAnim.active) {
            l = this.fixedAnim.tag.UpdateActive(r, a, o)
        } else {
            this.active = null;
            for (u = 0; u < d; ++u) {
                f = this.mx >= 0 && this.my >= 0 && this.taglist[u].CheckActive(r, a, o);
                if (f && f.sc > n && (!m || f.z <= 0)) {
                    l = f;
                    g = u;
                    l.tag = this.taglist[u];
                    n = f.sc
                }
            }
            this.active = l
        }
        this.txtOpt || this.shadow && this.SetShadow(r);
        r.clearRect(0, 0, e, s);
        for (u = 0; u < d; ++u) {
            if (!w && c[u].z <= 0) {
                try {
                    this.centreFunc(r, e, s, a, o)
                } catch (x) {
                    alert(x);
                    this.centreFunc = A
                }
                w = true
            }
            if (!(l && l.tag == c[u] && l.PreDraw(r, c[u], a, o)))c[u].Draw(r, a, o);
            l && l.tag == c[u] && l.PostDraw(r)
        }
        if (this.freezeActive && l) {
            this.Freeze()
        } else {
            this.UnFreeze();
            this.drawn = d == this.listLength
        }
        if (this.fixedCallback) {
            this.fixedCallback(this, this.fixedCallbackTag);
            this.fixedCallback = null
        }
        p || this.Animate(e, s, h);
        l && l.LastDraw(r);
        i.style.cursor = l ? this.activeCursor : "";
        this.Tooltip(l, this.taglist[g])
    };
    w.TooltipNone = function () {
    };
    w.TooltipNative = function (t, i) {
        if (t)this.canvas.title = i && i.title ? i.title : ""; else this.canvas.title = this.ctitle
    };
    w.SetTTDiv = function (t, i) {
        var e = this, s = e.ttdiv.style;
        if (t != e.ttdiv.innerHTML)s.display = "none";
        e.ttdiv.innerHTML = t;
        i && (i.title = e.ttdiv.innerHTML);
        if (s.display == "none" && !e.tttimer) {
            e.tttimer = setTimeout(function () {
                var t = Tt(e.canvas.id);
                s.display = "block";
                s.left = t.x + e.mx + "px";
                s.top = t.y + e.my + 24 + "px";
                e.tttimer = null
            }, e.tooltipDelay)
        }
    };
    w.TooltipDiv = function (t, i) {
        if (t && i && i.title) {
            this.SetTTDiv(i.title, i)
        } else if (!t && this.mx != -1 && this.my != -1 && this.ctitle.length) {
            this.SetTTDiv(this.ctitle)
        } else {
            this.ttdiv.style.display = "none"
        }
    };
    w.Transform = function (t, i, e) {
        if (i || e) {
            var s = n(i), a = h(i), o = n(e), r = h(e), l = new P([r, 0, o, 0, 1, 0, -o, 0, r]), f = new P([1, 0, 0, 0, a, -s, 0, s, a]);
            t.transform = t.transform.mul(l.mul(f))
        }
    };
    w.AnimateFixed = function () {
        var t, i, e, s, n;
        if (this.fadeIn) {
            i = I() - this.startTime;
            if (i >= this.fadeIn) {
                this.fadeIn = 0;
                this.fixedAlpha = 1
            } else {
                this.fixedAlpha = i / this.fadeIn
            }
        }
        if (this.fixedAnim) {
            if (!this.fixedAnim.transform)this.fixedAnim.transform = this.transform;
            t = this.fixedAnim, i = I() - t.t0, e = t.angle, s, n = this.animTiming(t.t, i);
            this.transform = t.transform;
            if (i >= t.t) {
                this.fixedCallbackTag = t.tag;
                this.fixedCallback = t.cb;
                this.fixedAnim = this.yaw = this.pitch = 0
            } else {
                e *= n
            }
            s = P.Rotation(e, t.axis);
            this.transform = this.transform.mul(s);
            return this.fixedAnim != 0
        }
        return false
    };
    w.AnimatePosition = function (t, i, e) {
        var s = this, n = s.mx, h = s.my, a, o;
        if (!s.frozen && n >= 0 && h >= 0 && n < t && h < i) {
            a = s.maxSpeed, o = s.reverse ? -1 : 1;
            s.lx || (s.yaw = (n * 2 * a / t - a) * o * e);
            s.ly || (s.pitch = (h * 2 * a / i - a) * -o * e);
            s.initial = null
        } else if (!s.initial) {
            if (s.frozen && !s.freezeDecel)s.yaw = s.pitch = 0; else s.Decel(s)
        }
        this.Transform(s, s.pitch, s.yaw)
    };
    w.AnimateDrag = function (t, i, e) {
        var s = this, n = 100 * e * s.maxSpeed / s.max_radius / s.zoom;
        if (s.dx || s.dy) {
            s.lx || (s.yaw = s.dx * n / s.stretchX);
            s.ly || (s.pitch = s.dy * -n / s.stretchY);
            s.dx = s.dy = 0;
            s.initial = null
        } else if (!s.initial) {
            s.Decel(s)
        }
        this.Transform(s, s.pitch, s.yaw)
    };
    w.Freeze = function () {
        if (!this.frozen) {
            this.preFreeze = [this.yaw, this.pitch];
            this.frozen = 1;
            this.drawn = 0
        }
    };
    w.UnFreeze = function () {
        if (this.frozen) {
            this.yaw = this.preFreeze[0];
            this.pitch = this.preFreeze[1];
            this.frozen = 0
        }
    };
    w.Decel = function (t) {
        var i = t.minSpeed, e = s(t.yaw), n = s(t.pitch);
        if (!t.lx && e > i)t.yaw = e > t.z0 ? t.yaw * t.decel : 0;
        if (!t.ly && n > i)t.pitch = n > t.z0 ? t.pitch * t.decel : 0
    };
    w.Zoom = function (t) {
        this.z2 = this.z1 * (1 / t);
        this.drawn = 0
    };
    w.Clicked = function (t) {
        var i = this.active;
        try {
            if (i && i.tag)if (this.clickToFront === false || this.clickToFront === null)i.tag.Clicked(t); else this.TagToFront(i.tag, this.clickToFront, function () {
                i.tag.Clicked(t)
            }, true)
        } catch (e) {
        }
    };
    w.Wheel = function (t) {
        var i = this.zoom + this.zoomStep * (t ? 1 : -1);
        this.zoom = o(this.zoomMax, a(this.zoomMin, i));
        this.Zoom(this.zoom)
    };
    w.BeginDrag = function (t) {
        this.down = lt(t, this.canvas);
        t.cancelBubble = true;
        t.returnValue = false;
        t.preventDefault && t.preventDefault()
    };
    w.Drag = function (t, i) {
        if (this.dragControl && this.down) {
            var e = this.dragThreshold * this.dragThreshold, s = i.x - this.down.x, n = i.y - this.down.y;
            if (this.dragging || s * s + n * n > e) {
                this.dx = s;
                this.dy = n;
                this.dragging = 1;
                this.down = i
            }
        }
        return this.dragging
    };
    w.EndDrag = function () {
        var t = this.dragging;
        this.dragging = this.down = null;
        return t
    };
    function At(t) {
        var i = t.targetTouches[0], e = t.targetTouches[1];
        return l(f(e.pageX - i.pageX, 2) + f(e.pageY - i.pageY, 2))
    }

    w.BeginPinch = function (t) {
        this.pinched = [At(t), this.zoom];
        t.preventDefault && t.preventDefault()
    };
    w.Pinch = function (t) {
        var i, e, s = this.pinched;
        if (!s)return;
        e = At(t);
        i = s[1] * e / s[0];
        this.zoom = o(this.zoomMax, a(this.zoomMin, i));
        this.Zoom(this.zoom)
    };
    w.EndPinch = function (t) {
        this.pinched = null
    };
    w.Pause = function () {
        this.paused = true
    };
    w.Resume = function () {
        this.paused = false
    };
    w.SetSpeed = function (t) {
        this.initial = t;
        this.yaw = t[0] * this.maxSpeed;
        this.pitch = t[1] * this.maxSpeed
    };
    w.FindTag = function (t) {
        if (!b(t))return null;
        b(t.index) && (t = t.index);
        if (!z(t))return this.taglist[t];
        var i, e, s;
        if (b(t.id))i = "id", e = t.id; else if (b(t.text))i = "innerText", e = t.text;
        for (s = 0; s < this.taglist.length; ++s)if (this.taglist[s].a[i] == e)return this.taglist[s]
    };
    w.RotateTag = function (t, i, e, s, n, h) {
        var a = t.xformed, o = new F(a.x, a.y, a.z), r = k(e, i), l = o.angle(r), f = o.cross(r).unit();
        if (l == 0) {
            this.fixedCallbackTag = t;
            this.fixedCallback = n
        } else {
            this.fixedAnim = {angle: -l, axis: f, t: s, t0: I(), cb: n, tag: t, active: h}
        }
    };
    w.TagToFront = function (t, i, e, s) {
        this.RotateTag(t, 0, 0, i, e, s)
    };
    Dt.Start = function (t, i, e) {
        Dt.Delete(t);
        Dt.tc[t] = new Dt(t, i, e)
    };
    function It(t, i) {
        Dt.tc[i] && Dt.tc[i][t]()
    }

    Dt.Linear = function (t, i) {
        return i / t
    };
    Dt.Smooth = function (t, i) {
        return .5 - h(i * Math.PI / t) / 2
    };
    Dt.Pause = function (t) {
        It("Pause", t)
    };
    Dt.Resume = function (t) {
        It("Resume", t)
    };
    Dt.Reload = function (t) {
        It("Load", t)
    };
    Dt.Update = function (t) {
        It("Update", t)
    };
    Dt.SetSpeed = function (t, i) {
        if (z(i) && Dt.tc[t] && !isNaN(i[0]) && !isNaN(i[1])) {
            Dt.tc[t].SetSpeed(i);
            return true
        }
        return false
    };
    Dt.TagToFront = function (t, i) {
        if (!z(i))return false;
        i.lat = i.lng = 0;
        return Dt.RotateTag(t, i)
    };
    Dt.RotateTag = function (t, i) {
        if (z(i) && Dt.tc[t]) {
            if (isNaN(i.time))i.time = 500;
            var e = Dt.tc[t].FindTag(i);
            if (e) {
                Dt.tc[t].RotateTag(e, i.lat, i.lng, i.time, i.callback, i.active);
                return true
            }
        }
        return false
    };
    Dt.Delete = function (t) {
        var i, e;
        if (C[t]) {
            e = T.getElementById(t);
            if (e) {
                for (i = 0; i < C[t].length; ++i)nt(C[t][i][0], C[t][i][1], e)
            }
        }
        delete C[t];
        delete Dt.tc[t]
    };
    Dt.NextFrameRAF = function () {
        requestAnimationFrame(yt)
    };
    Dt.NextFrameTimeout = function (t) {
        setTimeout(vt, t)
    };
    Dt.tc = {};
    Dt.options = {
        z1: 2e4,
        z2: 2e4,
        z0: 2e-4,
        freezeActive: false,
        freezeDecel: false,
        activeCursor: "pointer",
        pulsateTo: 1,
        pulsateTime: 3,
        reverse: false,
        depth: .5,
        maxSpeed: .05,
        minSpeed: 0,
        decel: .95,
        interval: 20,
        minBrightness: .1,
        maxBrightness: 1,
        outlineColour: "#ffff99",
        outlineThickness: 2,
        outlineOffset: 5,
        outlineMethod: "outline",
        outlineRadius: 0,
        textColour: "#ff99ff",
        textHeight: 15,
        textFont: "Helvetica, Arial, sans-serif",
        shadow: "#000",
        shadowBlur: 0,
        shadowOffset: [0, 0],
        initial: null,
        hideTags: true,
        zoom: 1,
        weight: false,
        weightMode: "size",
        weightFrom: null,
        weightSize: 1,
        weightSizeMin: null,
        weightSizeMax: null,
        weightGradient: {0: "#f00", .33: "#ff0", .66: "#0f0", 1: "#00f"},
        txtOpt: true,
        txtScale: 2,
        frontSelect: false,
        wheelZoom: true,
        zoomMin: .3,
        zoomMax: 3,
        zoomStep: .05,
        shape: "sphere",
        lock: null,
        tooltip: null,
        tooltipDelay: 300,
        tooltipClass: "tctooltip",
        radiusX: 1,
        radiusY: 1,
        radiusZ: 1,
        stretchX: 1,
        stretchY: 1,
        offsetX: 0,
        offsetY: 0,
        shuffleTags: false,
        noSelect: false,
        noMouse: false,
        imageScale: 1,
        paused: false,
        dragControl: false,
        dragThreshold: 4,
        centreFunc: A,
        splitWidth: 0,
        animTiming: "Smooth",
        clickToFront: false,
        fadeIn: 0,
        padding: 0,
        bgColour: null,
        bgRadius: 0,
        bgOutline: null,
        bgOutlineThickness: 0,
        outlineIncrease: 4,
        textAlign: "centre",
        textVAlign: "middle",
        imageMode: null,
        imagePosition: null,
        imagePadding: 2,
        imageAlign: "centre",
        imageVAlign: "middle",
        noTagsMessage: true,
        centreImage: null,
        pinchZoom: false,
        repeatTags: 0,
        minTags: 0,
        imageRadius: 0,
        scrollPause: false
    };
    for (i in Dt.options)Dt[i] = Dt.options[i];
    window.TagCanvas = Dt;
    jQuery.fn.tagcanvas = function (i, e) {
        var s = {
            pause: function () {
                t(this).each(function () {
                    It("Pause", t(this)[0].id)
                })
            }, resume: function () {
                t(this).each(function () {
                    It("Resume", t(this)[0].id)
                })
            }, reload: function () {
                t(this).each(function () {
                    It("Load", t(this)[0].id)
                })
            }, update: function () {
                t(this).each(function () {
                    It("Update", t(this)[0].id)
                })
            }, tagtofront: function () {
                t(this).each(function () {
                    Dt.TagToFront(t(this)[0].id, e)
                })
            }, rotatetag: function () {
                t(this).each(function () {
                    Dt.RotateTag(t(this)[0].id, e)
                })
            }, "delete": function () {
                t(this).each(function () {
                    Dt.Delete(t(this)[0].id)
                })
            }, setspeed: function () {
                t(this).each(function () {
                    Dt.SetSpeed(t(this)[0].id, e)
                })
            }
        };
        if (typeof i == "string" && s[i]) {
            s[i].apply(this);
            return this
        } else {
            Dt.jquery = 1;
            t(this).each(function () {
                Dt.Start(t(this)[0].id, e, i)
            });
            return Dt.started
        }
    };
    st("load", function () {
        Dt.loaded = 1
    }, window)
})(jQuery);
// 关于标签云效果的设置
$(document).ready(function () {
    $("#my3DTags").tagcanvas({
        textFont: "Georgia,Optima",
        textColour: 'blue',
        outlineColour: "orange",
        weight: !0,
        reverse: !0,
        depth: .2,
        maxSpeed: .06,
        bgRadius: 1,
        freezeDecel: !0
    }, "tags") || $("#myTags").hide()
});