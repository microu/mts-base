import { LinkedList, LinkedListNode, reduce } from "../../src/collections/";

function numbersList(n: number): LinkedList<number> {
  const ll = new LinkedList<number>();
  for (let i = 0; i < n; i += 1) {
    ll.append(i);
  }
  return ll;
}

function randomElt<TData>(ll: LinkedList<TData>): TData {
  const a = Array.from(ll);
  return a[Math.floor(Math.random() * a.length)];
}

describe("New LinkedList", () => {
  test("Empty is Empty", () => {
    const ll = new LinkedList<number>();
    expect(ll.length).toBe(0);
  });

  test("Empty list iteration", () => {
    const ll = new LinkedList<number>();
    let a: number[] = [];
    for (const n of ll) {
      a.push(n);
    }
    expect(a.length).toBe(0);
  });
});

describe("Append to LinkedList", () => {
  test("Append 10 numbers", () => {
    const ll = numbersList(10);
    expect(ll.length).toBe(10);
  });
  test("Iterate Other", () => {
    const ll = numbersList(10);
    const iter = ll[Symbol.iterator]();
    for (let i = 0; i < 10; i += 1) {
      expect(iter.next()).toStrictEqual({ value: i, done: false });
    }

    expect(iter.next()).toStrictEqual({ value: undefined, done: true });
    expect(iter.next()).toStrictEqual({ value: undefined, done: true });
  });
});

describe("remove method", () => {
  test("Remove by data value in direct order", () => {
    const ll = numbersList(10);
    for (let i = 0; i < 10; i += 1) {
      ll.remove(i);
      expect(ll.length).toBe(9 - i);
      let a = Array.from(ll);
      expect(a.length).toBe(9 - i);
      if (i < 9) {
        expect(a[0]).toBe(i + 1);
        expect(a.at(-1)).toBe(9);
      }
    }
  });

  test("Remove by data value in reverse order", () => {
    const ll = numbersList(10);
    for (let i = 9; i >= 0; i -= 1) {
      ll.remove(i);
      expect(ll.length).toBe(i);
      let a = Array.from(ll);
      expect(a.length).toBe(i);
      if (i > 0) {
        expect(a[0]).toBe(0);
        expect(a.at(-1)).toBe(i - 1);
      }
    }
  });

  test("Remove by data value in random order", () => {
    const n = 20;
    const ll = numbersList(n);
    for (let i = 0; i < n; i += 1) {
      let j = randomElt(ll);
      ll.remove(j);
      expect(ll.length).toBe(n - 1 - i);
      let a = Array.from(ll);
      expect(a.length).toBe(n - 1 - i);
    }
  });

  test("Remove: select by Node", () => {
    const n = 20;
    const ll = new LinkedList<number>();
    const evenNodes: LinkedListNode<number>[] = [];
    const oddNodes: LinkedListNode<number>[] = [];
    for (let i = 0; i < n; i += 1) {
      let node = ll.append(i);
      if (i % 2 == 0) {
        evenNodes.push(node);
      } else {
        oddNodes.push(node);
      }
    }
    for (const node of evenNodes) {
      expect(ll.find(node.data)).toBeTruthy();
      ll.remove(node);
      expect(ll.find(node.data)).toBeFalsy();
    }
    expect(ll.length).toBe(n / 2);
    for (const node of oddNodes) {
      expect(ll.find(node.data)).toBeTruthy();
      ll.remove(node);
      expect(ll.find(node.data)).toBeFalsy();
    }
    expect(ll.length).toBe(0);
  });

  test("Remove: select by filter", () => {
    const n = 20;
    const ll = numbersList(n);

    while (ll.remove((i) => i % 2 == 0)) {}
    expect(ll.length).toBe(n / 2);

    while (ll.remove((i) => i % 2 == 1)) {}
    expect(ll.length).toBe(0);
  });
});

describe("removeAll method", () => {
  test("Alternate values", () => {
    const n = 100;
    const ll = new LinkedList();
    for (let i = 0; i < n; i++) {
      ll.append(i % 2);
    }
    expect(ll.length).toBe(n);
    expect(ll.findAll(0).length).toBe(n / 2);
    expect(ll.findAll(1).length).toBe(n / 2);

    ll.removeAll((x: number) => x == 1);
    expect(ll.findAll(0).length).toBe(n / 2);
    expect(ll.findAll(1).length).toBe(0);
    expect(ll.length).toBe(n / 2);
    ll.removeAll(0);
    expect(ll.findAll(0).length).toBe(0);
    expect(ll.findAll(1).length).toBe(0);
    expect(ll.length).toBe(0);
  });

  test("Random values", () => {
    const n = 5000;
    const ll = new LinkedList();
    for (let i = 0; i < n; i++) {
      ll.append(Math.floor(Math.random() * 3));
    }

    const n0 = ll.findAll(0).length;
    const n1 = ll.findAll(1).length;
    const n2 = ll.findAll(2).length;

    expect(ll.length).toBe(n);
    expect(n0 + n1 + n2).toBe(n);

    ll.removeAll((x: number) => x == 2);
    expect(ll.length).toBe(n - n2);
    expect(ll.findAll(0).length).toBe(n0);
    expect(ll.findAll(1).length).toBe(n1);
    expect(ll.findAll(2).length).toBe(0);

    ll.removeAll(1);
    expect(ll.length).toBe(n - n2 - n1);
    expect(ll.findAll(0).length).toBe(n0);
    expect(ll.findAll(1).length).toBe(0);
    expect(ll.findAll(2).length).toBe(0);

    ll.removeAll(() => true);
    expect(ll.length).toBe(0);
    expect(ll.findAll(0).length).toBe(0);
    expect(ll.findAll(1).length).toBe(0);
    expect(ll.findAll(2).length).toBe(0);
  });
});

describe("insert method", () => {
  test("insert before", () => {
    const n = 10;
    const N = 5;
    const ll = numbersList(10);
    for (let I = 0; I < N - 1; I += 1) {
      for (let i = 0; i < n; i++) {
        expect(ll.insert(i, { before: i })).toBeTruthy();
      }
    }

    expect(ll.length).toBe(n * N);
    const a = Array.from(ll);
    for (let i = 0; i <= N; i++) {
      for (let I = 0; I < N - 1; I += 1) {
        expect(a[i * N + I]).toBe(i);
      }
      expect(ll.findAll(i).length).toBe(N);
    }
  });

  test("insert after", () => {
    const n = 10;
    const N = 5;
    const ll = numbersList(10);
    for (let I = 0; I < N - 1; I += 1) {
      for (let i = 0; i < n; i++) {
        expect(ll.insert(i, { after: i })).toBeTruthy();
      }
    }
    expect(ll.length).toBe(n * N);
    const a = Array.from(ll);
    for (let i = 0; i <= N; i++) {
      for (let I = 0; I < N - 1; I += 1) {
        expect(a[i * N + I]).toBe(i);
      }
      expect(ll.findAll(i).length).toBe(N);
    }
  });
});

describe("method replace", () => {
  test("simple replace", () => {
    const n = 10;
    const ll = numbersList(n);
    const replacedNodes: (LinkedListNode<number> | undefined)[] = [];
    for (let i = 0; i < n; i += 1) {
      let node = ll.replace(i, i + 10);
      expect(node).toBeInstanceOf(LinkedListNode);
      replacedNodes.push(node);
    }

    expect(Array.from(ll)).toStrictEqual([
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ]);

    for (const n of replacedNodes) {
      ll.remove(n!);
    }
    expect(ll.length).toBe(0);
  });

  test("Somehow more complex replace", () => {
    const n = 10;
    const N = 10;
    const ll = new LinkedList<number>();
    for (let i = 0; i < n; i++) {
      for (let I = 0; I < N; I++) {
        ll.append(i);
      }
    }
    expect(ll.length).toBe(n * N);
    for (let i = 0; i < n; i++) {
      for (let I = 0; I < N; I++) {
        ll.replace(i, 100 + i * 10 + I);
      }
    }
    let expectedN = 100;
    for (const n of ll) {
      expect(n).toBe(expectedN);
      expectedN += 1;
    }
  });
});

describe("method replaceAll", () => {
  test("replace by n + 10", () => {
    const n = 100;
    const ll = new LinkedList<number>();
    for (let i = 0; i < n; i += 1) {
      ll.append(Math.floor(Math.random() * 10));
    }
    expect(ll.length).toBe(n);
    const sum0 = reduce((x, y) => x + y, ll, 0);
    for (let i = 0; i < 10; i++) {
      ll.replaceAll(i, i + 10);
    }

    const sum1 = reduce((x, y) => x + y, ll, 0);
    expect(sum1).toBe(sum0 + n * 10);
  });
});

describe("Method findNext", () => {
  test("Find existing next", () => {
    const n = 100;
    const ll = new LinkedList<number>();
    for (let i = 0; i < n; i += 1) {
      ll.append(i);
    }
    expect(ll.last).toBe(99);
    expect(ll.first).toBe(0);
    expect(ll.length).toBe(100);

    for (let i = 0; i < n - 1; i += 1) {
      expect(ll.findNext(i)).toBeDefined();
      expect(ll.findNext(i)!.data).toBe(i + 1);
    }
  });

  test("Find non existing next", () => {
    const n = 10;
    const ll = new LinkedList<number>();
    for (let i = 0; i < n; i += 1) {
      ll.append(i);
    }
    expect(ll.last).toBe(n - 1);
    expect(ll.first).toBe(0);
    expect(ll.length).toBe(n);

    expect(ll.findNext(-1)).not.toBeDefined();
    expect(ll.findNext(0)).toBeDefined();
    expect(ll.findNext(n - 2)).toBeDefined();
    expect(ll.findNext(n - 1)).not.toBeDefined();
    expect(ll.findNext(n)).not.toBeDefined();
    expect(ll.findNext(n + 1)).not.toBeDefined();

    const empty = new LinkedList<number>();
    for (let i = 1; i < 1000; i++) {
      const v = Math.floor(Math.random() * 100);
      expect(empty.findNext(v)).not.toBeDefined();
    }
  });
});
