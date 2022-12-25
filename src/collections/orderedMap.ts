import { LinkedList } from "./linkedList";

export class OrderedMap<K, V> implements Iterable<V> {
  list = new LinkedList<K>();
  map = new Map<K, V>();

  constructor(from?: Iterable<[K, V]> | OrderedMap<K, V>) {
    if (from != undefined) {
      const iter = from instanceof OrderedMap ? from.entries() : from;
      for (const [k, v] of iter) {
        this.set(k, v);
      }
    }
  }

  get first(): K | undefined {
    return this.list.first;
  }

  get last(): K | undefined {
    return this.list.last;
  }

  get length(): number {
    return this.list.length;
  }

  set(key: K, value: V, reference?: K, after?: boolean): this {
    if (reference !== undefined && key != reference) {
      if (!this.map.has(reference)) {
        throw `Unknown reference key: ${reference}`;
      }
      if (this.list.find(key)) {
        this.list.remove(key);
      }
      if (after) {
        this.list.insert(key, { after: reference });
      } else {
        this.list.insert(key, { before: reference });
      }
    } else {
      if (!this.list.find(key)) {
        this.list.append(key);
      }
    }

    this.map.set(key, value);

    return this;
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  changeKey(prevKey: K, newKey: K): this {
    if (!this.map.has(prevKey)) {
      throw `Key not found: ${prevKey}`;
    }
    if (this.map.has(newKey)) {
      if (newKey != prevKey) {
        throw `Key already in use: ${newKey}`;
      } else {
        return this;
      }
    }
    if (prevKey == newKey) {
      return this;
    }
    this.list.insert(newKey, { before: prevKey });
    this.list.remove(prevKey);
    this.map.set(newKey, this.map.get(prevKey)!);
    this.map.delete(prevKey);

    return this;
  }

  remove(key: K): V | undefined {
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

  has(key: K): boolean {
    return this.map.has(key);
  }

  entries(): Iterable<[K, V]> {
    const that = this;
    return {
      *[Symbol.iterator]() {
        for (const key of that.list) {
          yield [key, that.map.get(key)!];
        }
      },
    };
  }
  keys(): Iterable<K> {
    const that = this;
    return {
      *[Symbol.iterator]() {
        for (const key of that.list) {
          yield key;
        }
      },
    };
  }

  *[Symbol.iterator](): Iterator<V> {
    for (const key of this.list) {
      yield this.map.get(key)!;
    }
  }
}
