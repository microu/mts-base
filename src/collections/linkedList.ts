type TNodeSelector<TData> =
  | TData
  | ((d: TData) => boolean)
  | LinkedListNode<TData>;

export class LinkedList<TData> implements Iterable<TData>{
  private _first?: LinkedListNode<TData>;
  private _last?: LinkedListNode<TData>;
  private _length: number = 0;

  get length() {
    return this._length;
  }

  clear() {
    this._length = 0;
    this._first = undefined;
    this._last = undefined;
  }

  get first():TData|undefined{
    return this._first ? this._first.data: undefined
  }

  get last():TData|undefined{
    return this._last ? this._last.data: undefined
  }


  append(data: TData): LinkedListNode<TData> {
    if (this._length == 0) {
      this._first = new LinkedListNode<TData>(data);
      this._first.next = this._first;
      this._last = this._first;
      this._length = 1;
    } else {
      const node = new LinkedListNode<TData>(data, this._last!.next);
      this._last!.next = node;
      this._last = node;
      this._length += 1;
    }
    return this._last;
  }

  insert(
    data: TData,
    where?: { before?: TNodeSelector<TData>; after?: TNodeSelector<TData> }
  ): LinkedListNode<TData> | undefined {
    if (where === undefined) {
      return this.append(data);
    }

    const useBefore = where.hasOwnProperty("before");

    if (!(useBefore || where.hasOwnProperty("after"))) {
      throw `Either before or after property must be defined`;
    }
    if (useBefore && where.hasOwnProperty("after")) {
      throw `Either before or after property must be defined, not both`;
    }
    const what = where.hasOwnProperty("before") ? where.before : where.after;
    const found = this._findNode(what!, true);

    if (found.length == 0) {
      return undefined;
    }

    const { prevNode, node: refNode } = found[0];
    const node = new LinkedListNode<TData>(data);
    if (useBefore) {
      node.next = refNode;
      prevNode.next = node;
      if (refNode === this._first) {
        this._first = node;
      }
    } else {
      const nextNode = refNode.next;
      refNode.next = node;
      node.next = nextNode;
      if (refNode === this._last) {
        this._last = node;
      }
    }

    this._length += 1;

    return node;
  }

  remove(what: TNodeSelector<TData>) {
    const found = this._findNode(what, true);
    if (found.length == 0) {
      return 0;
    } else {
      this._removeNode(found[0]);
      return 1;
    }
  }

  removeAll(what?: TNodeSelector<TData>) {
    if (what === undefined) {
      const n = this._length;
      this.clear();
      return n;
    }
    const found = this._findNode(what, false);

    // remove in reverse order to ensure proper linking
    for (let i = found.length - 1; i >= 0; i -= 1) {
      this._removeNode(found[i]);
    }

    return found.length;
  }

  replace(what: TNodeSelector<TData>, data: TData) {
    const found = this._findNode(what, true);
    if (found.length == 0) {
      return undefined;
    } else {
      found[0].node.data = data;
      return found[0].node;
    }
  }

  replaceAll(what: TNodeSelector<TData>, data: TData) {
    const found = this._findNode(what, false);
    if (found.length == 0) {
      return [];
    } else {
      return found.map((item) => {
        item.node.data = data;
        return item.node;
      });
    }
  }

  find(what: TData | ((d: TData) => boolean) | LinkedListNode<TData>) {
    const found = this._findNode(what, true);
    if (found.length == 0) {
      return undefined;
    } else {
      return found[0].node;
    }
  }

  findNext(what: TData | ((d: TData) => boolean) | LinkedListNode<TData>) {
    const found = this._findNode(what, true);
    if (found.length == 0) {
      return undefined;
    } else {
      if (found[0].node.next &&  found[0].node != this._last) {
        return found[0].node.next;
      }
      return undefined;
    }
  }


  findAll(what: TData | ((d: TData) => boolean) | LinkedListNode<TData>) {
    const found = this._findNode(what, false);
    return found.map((f) => f.node);
  }

  _findNode(
    what: TData | ((d: TData) => boolean) | LinkedListNode<TData>,
    firstMatchOnly?: boolean
  ) {
    const r: {
      prevNode: LinkedListNode<TData>;
      node: LinkedListNode<TData>;
    }[] = [];
    if (this._length == 0) {
      return r;
    }

    // find node(s) to be removed
    let prevNode: LinkedListNode<TData> = this._last!;
    for (const n of this._nodeIterator()) {
      if (
        what === n ||
        what === n.data ||
        (what instanceof Function && what(n.data))
      ) {
        r.push({ prevNode, node: n });
        if (firstMatchOnly) break;
      }
      prevNode = n;
    }
    return r;
  }

  _removeNode({
    prevNode,
    node,
  }: {
    prevNode: LinkedListNode<TData>;
    node: LinkedListNode<TData>;
  }) {
    if (this.length == 1) {
      this._length = 0;
      this._first = undefined;
      this._last = undefined;
      return;
    }
    prevNode.next = node.next;
    if (node === this._first) {
      this._first = node.next;
    }

    if (node === this._last) {
      this._last = prevNode;
    }

    this._length -= 1;
  }

  *[Symbol.iterator]() {
    for (const node of this._nodeIterator()) {
      yield node.data;
    }
  }

  *_nodeIterator() {
    let currentNode = this._first;
    while (currentNode) {
      yield currentNode;
      if (currentNode == this._last) {
        currentNode = undefined;
      } else {
        currentNode = currentNode.next;
      }
    }
  }
}

export class LinkedListNode<TData> {
  next?: LinkedListNode<TData>;
  data: TData;
  constructor(data: TData, next?: LinkedListNode<TData>) {
    this.next = next;
    this.data = data;
  }
}
