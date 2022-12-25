class LinkedList {
    constructor() {
        this._length = 0;
    }
    get length() {
        return this._length;
    }
    clear() {
        this._length = 0;
        this._first = undefined;
        this._last = undefined;
    }
    get first() {
        return this._first ? this._first.data : undefined;
    }
    get last() {
        return this._last ? this._last.data : undefined;
    }
    append(data) {
        if (this._length == 0) {
            this._first = new LinkedListNode(data);
            this._first.next = this._first;
            this._last = this._first;
            this._length = 1;
        }
        else {
            const node = new LinkedListNode(data, this._last.next);
            this._last.next = node;
            this._last = node;
            this._length += 1;
        }
        return this._last;
    }
    insert(data, where) {
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
        const found = this._findNode(what, true);
        if (found.length == 0) {
            return undefined;
        }
        const { prevNode, node: refNode } = found[0];
        const node = new LinkedListNode(data);
        if (useBefore) {
            node.next = refNode;
            prevNode.next = node;
            if (refNode === this._first) {
                this._first = node;
            }
        }
        else {
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
    remove(what) {
        const found = this._findNode(what, true);
        if (found.length == 0) {
            return 0;
        }
        else {
            this._removeNode(found[0]);
            return 1;
        }
    }
    removeAll(what) {
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
    replace(what, data) {
        const found = this._findNode(what, true);
        if (found.length == 0) {
            return undefined;
        }
        else {
            found[0].node.data = data;
            return found[0].node;
        }
    }
    replaceAll(what, data) {
        const found = this._findNode(what, false);
        if (found.length == 0) {
            return [];
        }
        else {
            return found.map((item) => {
                item.node.data = data;
                return item.node;
            });
        }
    }
    find(what) {
        const found = this._findNode(what, true);
        if (found.length == 0) {
            return undefined;
        }
        else {
            return found[0].node;
        }
    }
    findNext(what) {
        const found = this._findNode(what, true);
        if (found.length == 0) {
            return undefined;
        }
        else {
            if (found[0].node.next && found[0].node != this._last) {
                return found[0].node.next;
            }
            return undefined;
        }
    }
    findAll(what) {
        const found = this._findNode(what, false);
        return found.map((f) => f.node);
    }
    _findNode(what, firstMatchOnly) {
        const r = [];
        if (this._length == 0) {
            return r;
        }
        // find node(s) to be removed
        let prevNode = this._last;
        for (const n of this._nodeIterator()) {
            if (what === n ||
                what === n.data ||
                (what instanceof Function && what(n.data))) {
                r.push({ prevNode, node: n });
                if (firstMatchOnly)
                    break;
            }
            prevNode = n;
        }
        return r;
    }
    _removeNode({ prevNode, node, }) {
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
            }
            else {
                currentNode = currentNode.next;
            }
        }
    }
}
class LinkedListNode {
    constructor(data, next) {
        this.next = next;
        this.data = data;
    }
}

class OrderedMap {
    constructor(from) {
        this.list = new LinkedList();
        this.map = new Map();
        if (from != undefined) {
            const iter = from instanceof OrderedMap ? from.entries() : from;
            for (const [k, v] of iter) {
                this.set(k, v);
            }
        }
    }
    get first() {
        return this.list.first;
    }
    get last() {
        return this.list.last;
    }
    get length() {
        return this.list.length;
    }
    set(key, value, reference, after) {
        if (reference !== undefined && key != reference) {
            if (!this.map.has(reference)) {
                throw `Unknown reference key: ${reference}`;
            }
            if (this.list.find(key)) {
                this.list.remove(key);
            }
            if (after) {
                this.list.insert(key, { after: reference });
            }
            else {
                this.list.insert(key, { before: reference });
            }
        }
        else {
            if (!this.list.find(key)) {
                this.list.append(key);
            }
        }
        this.map.set(key, value);
        return this;
    }
    get(key) {
        return this.map.get(key);
    }
    changeKey(prevKey, newKey) {
        if (!this.map.has(prevKey)) {
            throw `Key not found: ${prevKey}`;
        }
        if (this.map.has(newKey)) {
            if (newKey != prevKey) {
                throw `Key already in use: ${newKey}`;
            }
            else {
                return this;
            }
        }
        if (prevKey == newKey) {
            return this;
        }
        this.list.insert(newKey, { before: prevKey });
        this.list.remove(prevKey);
        this.map.set(newKey, this.map.get(prevKey));
        this.map.delete(prevKey);
        return this;
    }
    remove(key) {
        const value = this.map.get(key);
        if (value !== undefined) {
            this.map.delete(key);
            this.list.remove(key);
        }
        return value;
    }
    clear() {
        this.map.clear();
        this.list.clear();
        return this;
    }
    has(key) {
        return this.map.has(key);
    }
    entries() {
        const that = this;
        return {
            *[Symbol.iterator]() {
                for (const key of that.list) {
                    yield [key, that.map.get(key)];
                }
            },
        };
    }
    keys() {
        const that = this;
        return {
            *[Symbol.iterator]() {
                for (const key of that.list) {
                    yield key;
                }
            },
        };
    }
    *[Symbol.iterator]() {
        for (const key of this.list) {
            yield this.map.get(key);
        }
    }
}

export { LinkedList, LinkedListNode, OrderedMap };
