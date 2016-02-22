#PubSub
[![Build](https://travis-ci.org/stewie1570/PubSub.svg)](https://travis-ci.org/stewie1570/PubSub)
[![npm version](https://badge.fury.io/js/js-pubsub.svg)](https://badge.fury.io/js/js-pubsub)

A simple Pub/Sub implementation for JavaScript that also contains an ask/tell paradigm.


Here is some example usage from some of the tests:

        it("publish to same subscribed topic receives callback", () => {
            //Arrange
            pubsub.subscribe({ toTopic: "subscribed topic", withCallback: () => receivedCallback = true });
            
            //Act
            pubsub.publish({ toTopic: "subscribed topic" });

            //Assert
            expect(receivedCallback).to.equal(true);
        });
        
        it("should allow tellers to answer questions", () => {
            //Arrange
            //Act
            pubsub.answerFor("topic", function (p1) { return "answer" + p1; });

            //Assert
            expect(pubsub.askFor("topic", 1)).to.equal("answer1");
        });
