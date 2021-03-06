# PubSub
[![Build](https://github.com/stewie1570/PubSub/workflows/Build/badge.svg)](https://github.com/stewie1570/PubSub/actions)
[![Codecov](https://img.shields.io/codecov/c/github/stewie1570/PubSub)](https://codecov.io/gh/stewie1570/PubSub)
[![npm version](https://badge.fury.io/js/js-pubsub.svg)](https://badge.fury.io/js/js-pubsub)

A simple Pub/Sub implementation for JavaScript that also contains an ask/tell paradigm.


Here is some example usage from some of the tests:

```jsx
import { Pubsub } from 'js-pubsub'

var pubsub = new Pubsub();

it("publish to same topic receives callback with correct argument", () => {
    //Arrange
    var argResult;
    pubsub.subscribe({ toTopic: "arg test", withCallback: result => argResult = result });

    //Act
    pubsub.publish({ toTopic: "arg test", withData: "it worked" });

    //Assert
    expect(argResult).to.equal("it worked");
});

it("should allow tellers to answer questions using parameters for context", () => {
    //Arrange
    //Act
    pubsub.answerFor("topic", p1 => `answer${p1}`);

    //Assert
    expect(pubsub.askFor("topic", 1)).to.equal("answer1");
});
```
