---
date: 2023-12-13
tags:
  - java
  - programming
title: Proxy Interfaces In Java
type: Essay
pinned: true
toc: true
---

Java provides a static method `Proxy.newProxyInstance` as part of it's Reflection API. This static method returns a proxy class for a given set of interfaces.
It requires only 3 things:

1. A class loader
2. A list of interfaces that this proxy should implement
3. An `InvacationHandler`. This is like a callback which is invoked when methods on this proxy are called.

## Proxy Class Properties

1. The proxy classes are `public`, `final` and `non-abstract`
2. This proxy classes extend `java.lang.reflect.Proxy`
3. Implements all interfaces provided (in the order) at the time of creation
4. `proxy instanceof Foo` returns `true` and `(Foo) proxy` succeeds without any `ClassCastExceptions`

```java
public interface Account {
    BigInteger computeBalance(BigInteger considerDeductions);
}

InvocationHandler handler = new InvocationHandler() {
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println(method); // the method that is being called
        System.out.println(args); // parameters passed to that method
        return BigInteger.ONE;
    }
};
Account accountProxy = (Account) Proxy.newProxyInstance(
    Account.class.getClassLoader(), 
    new Class[]{
    Account.class
    }, 
    handler
);

System.out.println(accountProxy.computeBalance(BigInteger.ZERO));
```

## Use Cases

1. Mockito and similar libraries
2. When you want to make batched calls