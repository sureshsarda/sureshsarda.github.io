---
date: "2022-12-17"
tags:
  - java
  - reflection
  - unit-testing
title: Create a service mocking framework around Proxy.newProxyInstance
type: Essay
pinned: true
---

## Introducing `Proxy.newProxyInstance`

The Java Reflection API provides a helper method to create proxy implementation (substitute or placeholder for another object[1]) of any class.

The idea is to provide a list of classes or interfaces that this new proxy would inherit/implement and provide a callback which will be invoked every time the proxy is called.

### Code Example

With this knowledge and the documentation, let’s see if this in action and understand more from there.

```java

private interface Interface1 {
    void method1();
}

private interface Interface2 {
    void method2();
}

public static void main(String[] args) {
    Object o = Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(),
        new Class[]{Interface1.class, Interface2.class}, (proxy, method, args1) -> {

            System.out.println(method.getDeclaringClass());
            System.out.println(method.getName());

            return null;
        });

    Interface1 i1 = (Interface1) o;
    i1.method1();

    Interface1 i2 = (Interface1) o;
    i2.method2();
}
```

(Gist is present here: [https://gist.github.com/sureshsarda/7411796686f44eb5cd3d56e35e93c2f0](https://gist.github.com/sureshsarda/7411796686f44eb5cd3d56e35e93c2f0))

In the above code snippet,

- We have two interfaces - `Interface1` and `Interface2` both having two different methods - `method1` and `method2`
- We then create an object, a proxy object using `Proxy.newProxyInstance` and pass it the following items - a class loader, an array of interfaces this new object should implement and a callback or more precisely an `InvocationHandler`; basically a class that will be delegated an calls to the methods of this proxy class.
- Then we cast this object `o` to these interfaces and call the respective methods from them.

When we run this snippet, we see the Interface that this method belongs to and the name of the method. We also get the parameters as third argument to this handler but I have skipped that part.

```text
interface com.pracman.Application$Interface1
method1
interface com.pracman.Application$Interface2
method2
```

## Detailing the use case

Armed with this information, let’s try to build a small utility that will mock responses of a Service using static JSON responses. While testing we generally make calls to third party API or to the database which is time consuming. A faster and more robust way is to mock the response for this. Generally, we use mocks provided by these APIs or use an in memory database or using a mocking library like Mockito. But sometimes we just want something easy to set up and reusable.

### Requirements

The requirements are simple, we need a utility that will mock Services and return hard coded responses from a JSON files.

- We should be able to substitute any Service class with the mock
- The mocked class should return responses stored in JSON files from a predefined location
- To keep it simple for now, we will have simple parameters (how simple? you will see this later when we build it)

### First Draft

So, what we need for this utility? Well, we need an `InvocationHandler` that will return responses from a static directory. For now we will use the `resources` directory.

```java
public class StaticApiMock implements InvocationHandler {

    private String baseDirectory;

    public StaticApiMock(String baseDirectory) {
        this.baseDirectory = baseDirectory;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        // use the baseDirectory to get the file path  and read from it
        String filePath = baseDirectory + File.separator + method.getName() + ".json";
        InputStream resourceAsStream = proxy.getClass().getClassLoader().getResourceAsStream(filePath);
        assert resourceAsStream != null;
        String contents = new String(resourceAsStream.readAllBytes());
        return contents;
    }
}
```

Now this can be used from anywhere and we have a neat namespacing or grouping using directories which we can use. A sample invocation will look something like this:

```java
StaticApiMock mock = new StaticApiMock("users"); // users is a directory under which the json files will reside

UserService service = (UserService) Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(),
        new Class[]{UserService.class}, mock);

List<UserService.User> allUsers = service.getAllUsers();
```

But this fails. The `invoke` method returns a `String` and we expect List of Users. We need to parse and create the objects. We will use `Gson` and the return type of the method to achieve this:

```java
GSON.fromJson(contents, method.getGenericReturnType());
```
And it works! It returns the contents of the file prenset in that method name. [A complete code for this is present in this Github Repository](https://github.com/sureshsarda/jasperiments/tree/v1.0).

The call to this utility is still wholesome. We first create an instance of `StaticApiMock` and then uses a really long method call to create the mock. This can be improved by creating a factory method. Something like this can save a lot of typing:

```java
public static <T> T createMock(String baseDirectory, Class<T> tClass) {
    StaticApiMock mock = new StaticApiMock(baseDirectory);

    return tClass.cast(Proxy.newProxyInstance(Thread.currentThread().getContextClassLoader(),
            new Class[]{tClass}, mock));
}
```

Two things to observe here:

1. We are casting the object created using `Class<T>.cast` method
2. We are returning a generic type so we don't have to cast to `UserService` later

After this, creating a mock is as simple as doing this:`

```java
UserService service = StaticApiMock.createMock("users", UserService.class);
```

### Adding Features

This is a very rudementary implementation. We can improve it further by adding a host of new features, like filtering on arguments, calling different methods when different arguments are present to create a more reusable utility. But we will look at this in a future post.

## Conclusion

A proxy pattern is quite powerful when we want to swap implementations. Creating these proxies dynamically is even more powerful and Java reflection provides just a neat way to achieve this. In this article we saw how to leverage `Proxy.newProxyInstance` to quickly create mock services and return response from mocked JSON files.

## References and Further Reading

1. [https://refactoring.guru/design-patterns/proxy](https://refactoring.guru/design-patterns/proxy)
2. [https://docs.oracle.com/javase/7/docs/api/java/lang/reflect/Proxy.html](https://docs.oracle.com/javase/7/docs/api/java/lang/reflect/Proxy.html)