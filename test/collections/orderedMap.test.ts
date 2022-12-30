import { OrderedMap } from "../../src/collections";

function alphabet(n: number, firstLetter = "a"): [string, number][] {
  return Array.from(new Array(n), (_, i) => [
    String.fromCharCode(firstLetter.charCodeAt(0) + i),
    i + 1,
  ]);
}

describe("new OrderedMap", () => {
  test("new empty map", () => {
    const om = new OrderedMap<string, number>();
    expect(om.length).toBe(0);
    expect(om.first).toBeUndefined();
    expect(om.last).toBeUndefined();
    expect(om.has("a")).toBe(false);
  });

  test("new nom empy map", () => {
    const n = 25;
    const a = alphabet(n);
    expect(a[0]).toStrictEqual(["a", 1]);
    expect(a[n - 1]).toStrictEqual(["y", n]);
    expect(a.length).toBe(n);

    const om0 = new OrderedMap(a);
    const om1 = new OrderedMap(om0);
    for (const om of [om0, om1]) {
      expect(om.length).toBe(n);
      expect(om.first).toBe("a");
      expect(om.last).toBe("y");
      expect(om.has("a")).toBe(true);
      expect(om.get("a")).toBe(1);
      expect(om.has("z")).toBe(false);
      expect(om.get("z")).toBeUndefined();
    }
  });
});

describe("OrderedMap - set method", () => {
  test("Set existing key", () => {
    const n = 10;
    const a = alphabet(n, "A");
    const om = new OrderedMap(a);
    expect(om.length).toBe(n);

    for (const [k, v] of a) {
      expect(om.get(k)).toBe(v);
      expect(om.has(k)).toBe(true)
      om.set(k, v * 10);
      expect(om.length).toBe(n);
    }
    for (const [k, v] of a) {
      expect(om.get(k)).toBe(v * 10);
      expect(om.has(k)).toBe(true)
    }
  });

  test("Set non existing key", () => {
    const n = 10;
    const a = alphabet(n, "a");
    const om = new OrderedMap(a);
    const A = alphabet(n, "A");

    expect(om.length).toBe(n);
    let len = n;
    for (const [k, v] of A) {
      expect(om.get(k)).toBeUndefined();
      expect(om.has(k)).toBe(false)
      om.set(k, v);
      expect(om.has(k)).toBe(true)
      len += 1;
      expect(om.length).toBe(len);
    }
    expect(om.length).toBe(2 * n);

    for (const [k, v] of a) {
      expect(om.get(k)).toBe(v);
      expect(om.has(k)).toBe(true)
    }
    for (const [k, v] of A) {
      expect(om.get(k)).toBe(v);
      expect(om.has(k)).toBe(true)
    }
  });

  test("Insert new key before", () => {
    const n = 10;
    const a = alphabet(n, "a");
    const om = new OrderedMap(a);
    const A = alphabet(n, "A");

    let len = n;
    for (let i = 0; i < n; i += 1) {
      const [k, _v] = a[i];
      const [kk, vv] = A[i];
      expect(om.get(kk)).toBeUndefined();
      om.set(kk, vv, k);
      expect(om.get(kk)).toBe(vv);
      len += 1;
      expect(om.length).toBe(len);
    }
    expect(om.length).toBe(2 * n);
    let index = 0;
    for (const [k, v] of om.entries()) {
      const i = Math.floor(index / 2);
      if (index % 2 == 0) {
        expect(k).toBe(A[i][0]);
        expect(v).toBe(A[i][1]);
      } else {
        expect(k).toBe(a[i][0]);
        expect(v).toBe(a[i][1]);
      }
      index += 1;
    }
  });

  test("Insert new key after", () => {
    const n = 10;
    const a = alphabet(n, "a");
    const om = new OrderedMap(a);
    const A = alphabet(n, "A");

    let len = n;
    for (let i = 0; i < n; i += 1) {
      const [k, _v] = a[i];
      const [kk, vv] = A[i];
      expect(om.get(kk)).toBeUndefined();
      om.set(kk, vv, k, true); // true => after
      expect(om.get(kk)).toBe(vv);
      len += 1;
      expect(om.length).toBe(len);
    }
    expect(om.length).toBe(2 * n);

    let index = 0;
    for (const [k, v] of om.entries()) {
      const i = Math.floor(index / 2);
      if (index % 2 == 0) {
        expect(k).toBe(a[i][0]);
        expect(v).toBe(a[i][1]);
      } else {
        expect(k).toBe(A[i][0]);
        expect(v).toBe(A[i][1]);
      }
      index += 1;
    }
  });

  test("Set and move exiting key before", () => {
    const n = 10;
    const a = alphabet(n, "a");
    const om = new OrderedMap(a);
    let prevKey = "a";
    om.set("a", om.get("a")! * 10);
    for (const [k, v] of a.slice(1)) {
      om.set(k, v * 10, prevKey);
      expect(om.length).toBe(n);
      prevKey = k;
    }
    expect(Array.from(om.keys())).toStrictEqual(
      a.map((entry) => entry[0]).reverse()
    );
    expect(Array.from(om)).toStrictEqual(
      a.map((entry) => entry[1] * 10).reverse()
    );
  });

  test("Set and move exiting key after", () => {
    const n = 10;
    const a = alphabet(n, "a");
    const om = new OrderedMap(a);
    let prevKey = om.last;
    om.set(prevKey!, om.get(prevKey!)! * 10);
    for (const [k, v] of [...a].reverse().slice(1)) {
      om.set(k, v * 10, prevKey, true); // true=> after
      prevKey = k;
      expect(om.length).toBe(n);
    }
    expect(Array.from(om.keys())).toStrictEqual(
      a.map((entry) => entry[0]).reverse()
    );
    expect(Array.from(om)).toStrictEqual(
      a.map((entry) => entry[1] * 10).reverse()
    );
  });

  test("Set bedore or after with key == reference", () => {
    const n = 10;
    const a = alphabet(n, "a");
    const om = new OrderedMap(a);

    for (const [k, v] of a) {
      expect(om.get(k)).toBe(v);
      om.set(k, v * 10, k); // before
      expect(om.get(k)).toBe(v * 10);
      expect(om.length).toBe(n);
    }

    expect(Array.from(om.keys())).toStrictEqual(a.map((entry) => entry[0]));
    expect(Array.from(om)).toStrictEqual(a.map((entry) => entry[1] * 10));

    for (const [k, v] of a) {
      expect(om.get(k)).toBe(v * 10);
      om.set(k, v * 100, k, true); // after
      expect(om.get(k)).toBe(v * 100);
      expect(om.length).toBe(n);
    }
    expect(Array.from(om.keys())).toStrictEqual(a.map((entry) => entry[0]));
    expect(Array.from(om)).toStrictEqual(a.map((entry) => entry[1] * 100));
  });
});

describe("OrderedMap - changeKey method", () => {
  test("Uppercase", () => {
    const n = 10;
    const a = alphabet(n, "a");
    const A = alphabet(n, "A");
    const om = new OrderedMap(a);
    expect(om.length).toBe(n);

    for (const [k, _v] of a) {
      om.changeKey(k, k.toUpperCase());
    }
    expect(Array.from(om.keys())).toStrictEqual(A.map((entry) => entry[0]));
    expect(Array.from(om)).toStrictEqual(a.map((entry) => entry[1]));
  });

  test("Throw error cases", () => {
    const n = 26;
    const a = alphabet(n, "a");
    const A = alphabet(n, "A");
    const om = new OrderedMap(a);
    expect(om.length).toBe(n);

    for (const [k, _v] of A) {
      expect(() => {
        om.changeKey(k, k.toLowerCase());
      }).toThrow("Key not found");
    }
    for (const [k, _v] of a.slice(1)) {
      const newK = String.fromCharCode(k.charCodeAt(0) - 1);
      expect(() => {
        om.changeKey(k, newK);
      }).toThrow(`Key already in use: ${newK}`);
    }
  });
});

describe("OrderedMap - remove method", () => {
  test("Remove first and last", () => {
    const n = 10;
    const a = alphabet(n, "a");
    const om = new OrderedMap(a);
    expect(om.length).toBe(n);

    expect(om.remove(om.first!)).toBe(a[0][1]);
    expect(om.remove(om.last!)).toBe(a[n - 1][1]);

    expect(om.length).toBe(n - 2);
    expect(om.remove(om.first!)).toBe(a[1][1]);
    expect(om.remove(om.last!)).toBe(a[n - 2][1]);
  });

  test("Remove all one by one", () => {
    const n = 10;
    const a = alphabet(n, "a");
    const om = new OrderedMap(a);
    expect(om.length).toBe(n);

    let len = n;
    for (const [k, v] of a) {
      expect(om.get(k)).toBe(v);
      expect(om.remove(k)).toBe(v);
      len -= 1;
      expect(om.get(k)).toBeUndefined();
      expect(om.length).toBe(len);
    }
    expect(om.length).toBe(0);
    expect(om.first).toBeUndefined();
    expect(om.last).toBeUndefined();
  });
});
