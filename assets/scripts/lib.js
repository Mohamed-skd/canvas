export class NumberFn {
  range(max = 100, min = 0, step = 1, type = 0) {
    const arr = [];
    while (min <= max) {
      arr.push(min);
      min += step;
    }

    const str = arr.join(" ");
    const types = [arr, str];
    return types[type];
  }

  rand(max = 100, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  avg(nums) {
    if (!nums.length) return 0;
    const sum = nums.reduce((a, b) => a + b);
    return sum / nums.length;
  }

  median(nums) {
    const sorted = nums.toSorted((a, b) => a - b);

    if (!(sorted.length & 1)) {
      const mid = sorted.length / 2;
      return this.avg([sorted[mid - 1], sorted[mid]]);
    } else {
      const floor = Math.floor(sorted.length / 2);
      return sorted[floor];
    }
  }

  clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  dist(point1, point2) {
    return Math.hypot(point1[0] - point2[0], point1[1] - point2[1]);
  }

  destPosition(src, angle, length) {
    const radAngle = this.degToRad(angle);
    const toX = src[0] + Math.cos(radAngle) * length;
    const toY = src[1] + Math.sin(radAngle) * length;
    return [toX, toY];
  }

  diff(num1, num2) {
    return Math.abs(num1 - num2);
  }

  radToDeg(rad) {
    return rad * (180 / Math.PI);
  }

  degToRad(deg) {
    return deg * (Math.PI / 180);
  }

  loop(n, start = 0, end = 100) {
    n = n < start ? end : n;
    n = n > end ? start : n;
    return n;
  }

  formatTwoDigit(val) {
    return val < 10 ? `0${val}` : val;
  }

  areEqualPoints(point1, ...points) {
    return points.every((p) => p[0] === point1[0] && p[1] === point1[1]);
  }

  isBetween(num, min, max, strict = true) {
    return strict ? num > min && num < max : num >= min && num <= max;
  }
}
export class StringFn {
  strRev(str) {
    return str.split("").reverse().join("");
  }

  sanitize(str, limit = 100) {
    if (!str) return null;
    if (typeof str !== "string") return null;

    const sanitized = str.trim();
    if (!sanitized) return null;

    if (sanitized.length > limit) return null;
    return sanitized;
  }
}
export class DateFn {
  constructor() {
    this.numFn = new NumberFn();
  }

  dateToUnix(date) {
    return Math.round(Date.parse(date) / 1000);
  }

  unixToDate(unix) {
    return new Date(unix * 1000);
  }

  daysToSeconds(day = 7) {
    return day * 86400;
  }

  secondsToDays(seconds) {
    return Math.round(seconds / 86400);
  }

  today() {
    const date = new Date();
    const day = this.numFn.formatTwoDigit(date.getDate());
    const month = this.numFn.formatTwoDigit(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  time() {
    const date = new Date();
    const hours = this.numFn.formatTwoDigit(date.getHours());
    const minutes = this.numFn.formatTwoDigit(date.getMinutes());
    const seconds = this.numFn.formatTwoDigit(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
  }

  datetime() {
    return `${this.today()} ${this.time()}`;
  }
}
export class FetchFn {
  async #returnData(req, returnType) {
    let data;

    switch (returnType) {
      case "json":
        data = await req.json();
        break;
      case "text":
        data = await req.text();
        break;
    }

    return data;
  }

  async get(value = null, returnType = "json", target = location.href) {
    const request = this.objToHttpReq(value);
    const req = await fetch(`${target}${request}`);
    return await this.#returnData(req, returnType);
  }

  async post(value = null, returnType = "json", target = location.href) {
    const request = this.objToHttpReq(value);
    const req = await fetch(target, {
      method: "post",
      body: request.substring(1),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    return await this.#returnData(req, returnType);
  }

  objToHttpReq(value = null) {
    let req = "?";
    if (!value) return req;

    for (const key in value) {
      const val = `${value[key]}`.trim();
      req += `${encodeURIComponent(key)}=${encodeURIComponent(val)}&`;
    }
    return req;
  }

  httpReqToObj(req) {
    const obj = {};
    const tab = req.includes("?") ? req.split("?") : req;
    const values = typeof tab === "string" ? tab.split("&") : tab[1].split("&");

    for (let i = 0; i < values.length; i++) {
      const tab = values[i].split("=");
      obj[tab[0]] = tab[1].trim();
    }
    return obj;
  }
}
