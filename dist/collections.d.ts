type TNodeSelector<TData> = TData | ((d: TData) => boolean) | LinkedListNode<TData>;
declare class LinkedList<TData> implements Iterable<TData> {
    private _first?;
    private _last?;
    private _length;
    get length(): number;
    clear(): void;
    get first(): TData | undefined;
    get last(): TData | undefined;
    append(data: TData): LinkedListNode<TData>;
    insert(data: TData, where?: {
        before?: TNodeSelector<TData>;
        after?: TNodeSelector<TData>;
    }): LinkedListNode<TData> | undefined;
    remove(what: TNodeSelector<TData>): 0 | 1;
    removeAll(what?: TNodeSelector<TData>): number;
    replace(what: TNodeSelector<TData>, data: TData): LinkedListNode<TData> | undefined;
    replaceAll(what: TNodeSelector<TData>, data: TData): LinkedListNode<TData>[];
    find(what: TData | ((d: TData) => boolean) | LinkedListNode<TData>): LinkedListNode<TData> | undefined;
    findNext(what: TData | ((d: TData) => boolean) | LinkedListNode<TData>): LinkedListNode<TData> | undefined;
    findAll(what: TData | ((d: TData) => boolean) | LinkedListNode<TData>): LinkedListNode<TData>[];
    _findNode(what: TData | ((d: TData) => boolean) | LinkedListNode<TData>, firstMatchOnly?: boolean): {
        prevNode: LinkedListNode<TData>;
        node: LinkedListNode<TData>;
    }[];
    _removeNode({ prevNode, node, }: {
        prevNode: LinkedListNode<TData>;
        node: LinkedListNode<TData>;
    }): void;
    [Symbol.iterator](): Generator<TData, void, unknown>;
    _nodeIterator(): Generator<LinkedListNode<TData>, void, unknown>;
}
declare class LinkedListNode<TData> {
    next?: LinkedListNode<TData>;
    data: TData;
    constructor(data: TData, next?: LinkedListNode<TData>);
}

declare class OrderedMap<K, V> implements Iterable<V> {
    list: LinkedList<K>;
    map: Map<K, V>;
    constructor(from?: Iterable<[K, V]> | OrderedMap<K, V>);
    get first(): K | undefined;
    get last(): K | undefined;
    get length(): number;
    set(key: K, value: V, reference?: K, after?: boolean): this;
    get(key: K): V | undefined;
    changeKey(prevKey: K, newKey: K): this;
    remove(key: K): V | undefined;
    clear(): this;
    has(key: K): boolean;
    entries(): Iterable<[K, V]>;
    keys(): Iterable<K>;
    [Symbol.iterator](): Iterator<V>;
}

declare function reduce<T, U>(rf: (r: U, x: T) => U, iter: Iterable<T>, initValue: U): U;

export { LinkedList, LinkedListNode, OrderedMap, reduce };
