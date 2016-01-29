#PubSub
[![Build](https://travis-ci.org/stewie1570/PubSub.svg)](https://travis-ci.org/stewie1570/PubSub)
[![npm version](https://badge.fury.io/js/js-pubsub.svg)](https://badge.fury.io/js/js-pubsub)

A simple Pub/Sub implementation for JavaScript that also contains an ask/tell paradigm.


Here is some example usage from some of the tests:

        it("publish to same topic receives callback with correct argument", function ()
        {
            //Arrange
            var argResult;
            pubsub.subscribe("arg test", function (result) { argResult = result; });

            //Act
            pubsub.publish("arg test", "it worked");

            //Assert
            expect(argResult).toBe("it worked");
        });
        
        it("should allow tellers to answer questions", function ()
        {
            //Arrange
            //Act
            pubsub.answerFor("topic", function (p1) { return "answer" + p1; });

            //Assert
            expect(pubsub.askFor("topic", 1)).toBe("answer1");
        });
