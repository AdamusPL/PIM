export function convertHSVToRGB(h, sInput, vInput) {
    const s = sInput / 100;
    const v = vInput / 100;

    const C = v * s;
    const X = C * (1 - Math.abs((h / 60) % 2 - 1));
    const m = v - C;

    let rPrim = 0, gPrim = 0, bPrim = 0;

    if (h < 60) {
        rPrim = C;
        gPrim = X;
        bPrim = 0;
    }
    else if (h < 120) {
        rPrim = X;
        gPrim = C;
        bPrim = 0;
    }
    else if (h < 180) {
        rPrim = 0;
        gPrim = C;
        bPrim = X;
    }
    else if (h < 240) {
        rPrim = 0;
        gPrim = X;
        bPrim = C;
    }
    else if (h < 300) {
        rPrim = X;
        gPrim = 0;
        bPrim = C;
    }
    else {
        rPrim = C;
        gPrim = 0;
        bPrim = X;
    }

    const rFinal = (rPrim + m) * 255;
    const gFinal = (gPrim + m) * 255;
    const bFinal = (bPrim + m) * 255;

    return { r: Math.round(rFinal).toString(), g: Math.round(gFinal).toString(), b: Math.round(bFinal).toString() };
}

export function convertCMYKToRGB(cInput, mInput, yInput, kInput) {
    const c = cInput / 100;
    const m = mInput / 100;
    const y = yInput / 100;
    const k = kInput / 100;

    const rFinal = 255 * (1 - c) * (1 - k);
    const gFinal = 255 * (1 - m) * (1 - k);
    const bFinal = 255 * (1 - y) * (1 - k);

    return { r: Math.round(rFinal).toString(), g: Math.round(gFinal).toString(), b: Math.round(bFinal).toString() };
}

export function convertHexToRGB(hex) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r: r.toString(), g: g.toString(), b: b.toString() };
}

export function convertRGBToHex(r, g, b) {
    const rgb = (r << 16) | (g << 8) | (b << 0);
    return (0x1000000 + rgb).toString(16).slice(1);
}

function mod(a, n) {
    return a - (n * Math.floor(a / n));
}

export function convertRGBToHSV(rInput, gInput, bInput) {

    const r = rInput / 255;
    const g = gInput / 255;
    const b = bInput / 255;

    const Cmax = Math.max(r, g, b);
    const Cmin = Math.min(r, g, b);
    const delta = Cmax - Cmin;

    let h = 0, s = 0, v = 0;

    //h
    if (delta === 0) {
        h = 0;
    }
    else if (Cmax === r) {
        h = 60 * (mod(((g - b) / delta), 6));
    }
    else if (Cmax === g) {
        h = 60 * ((b - r) / delta + 2);
    }
    else if (Cmax === b) {
        h = 60 * ((r - g) / delta + 4);
    }

    //s
    if (Cmax === 0) {
        s = 0
    }
    else {
        s = delta / Cmax * 100;
    }

    //v
    v = Cmax * 100;

    return { h: h.toFixed(2).toString(), s: s.toFixed(2).toString(), v: v.toFixed(2).toString() };
}

export function convertRGBToCMYK(rInput, gInput, bInput) {
    const r = rInput / 255;
    const g = gInput / 255;
    const b = bInput / 255;

    const k = (1 - Math.max(r, g, b));

    let c = 0, m = 0, y = 0;
    if (1 - k != 0) {
        c = ((1 - r - k) / (1 - k));
        m = ((1 - g - k) / (1 - k));
        y = ((1 - b - k) / (1 - k));
    }

    return { c: Math.round(c * 100).toString(), m: Math.round(m * 100).toString(), y: Math.round(y * 100).toString(), k: Math.round(k * 100).toString() };
}