type AnyFunction = (...args: any[]) => any;
// 去某个子域
type Optional<T> = { [K in keyof T]+?: T[K] }

declare namespace IPainter {
    // type Foo<T> = T extends {t: infer Test} ? Test: string

    // type One = Foo<Number>
    // type Two = Foo<{t:Boolean}>
    // type Three = Foo<{a:String, t:()=>void}>

}
