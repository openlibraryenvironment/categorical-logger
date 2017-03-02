# stripes-logger

Copyright (C) 2017 The Open Library Foundation

This software is distributed under the terms of the Apache License, Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Introduction

Simple category-based logging for Stripes.

By "category-based", we mean that stripes-logger can easily be configured to include or exclude different classes of log message (e.g. "app", "core", "calc", "okapiUrl", whatever we decide to include. This is much more flexible than the traditional approach of escalating levels DEBUG -> INFO -> WARN -> ERROR -> FATAL. (it can also of cours be turned off completely in production.)

It was created to fix issue https://issues.folio.org/browse/STRIPES-226 since, surprisingly, nothing similar seemed to exist.

## Example usage

```
const Logger = require('./stripes-logger.js');
const l = new Logger('redux,action');
l.setTimestamp(true);
l.log('path', `substitutePath generated ${path}`);
l.log('action', 'user searched for', query);
```

This pulls in the library and creates a logger which is configured to emit messages in the categories "redux" and "action". It further congfigures the logger to include timestamps in its messages. Finally, two messages are logged: one in the "path" category (for which no output will be generated since that category is not configured in the present logger) and one in the "action" category (which _will_ be emitted).

## API

The API is gratifyingly small: a single class with a constructor, three trivial setter methods and two proper methods.

### Constructor

The constructor returns a logging object which carries a small amount
of configuration. That configuration can be passed in when the object
is created, or subsequently changed using the three setters. The
constructor arguments, all optional, are:

1. `categories`. A comma-separated list of zero or more short strings, each of which is the name of a logging category. There is no predefined list of such categories: each application is welcome to make up its own.

2. `prefix`. If provided, a short string which is emitted at the beginning of each log message.

3. `timestamp`. A boolean. If true, then an ISO-formatted timestamp is included in each log message.

### Setters

There are three of these, corresponding to the three arguments to the constructor:

1. `l.setCategories(STRING)` -- sets the active categories.

1. `l.setPrefix(STRING)` -- sets the prefix.

1. `l.setTimestamp(BOOL)` -- sets whether or not a timestamp is included in subsequent log messages.

### Logging

All logging is done with a single method, `l.log(STRING, ...VALUES)`. Its first argument is a string naming one of the application's logging categories, and the subsequent arguments are values to be included in the log message. The message is emitted only if the specified category is one of those congfigured in the logger.

If there is exactly one value, and that value is a function, when it is evaluated and its return value is logged. This is useful when generation of the log message is itself an expensive operation that should not be done if the message is not going to be emitted anyway (because its category is not configured). Use it like this;

```
l.log('hostname', () => lookUpHostNameByIP(hostName()));
```

Output is always to the JavaScript console.

### Category inquiry

You can ask a logger whether it has a particular category enabled using `l.hasCategory(cat)`. This is a rather ugly back-door, but it's necessary for cases where another library does its own console-logging -- for example, [redux-logger](https://github.com/evgenyrodionov/redux-logger) -- and you need to create a predicate for it based on the logger's categories.

