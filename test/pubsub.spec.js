import { Pubsub } from '../src/pubsub';

describe("PubSub", () => {
    var pubsub = null;

    describe("Ask/Answer", () => {
        beforeEach(() => {
            pubsub = new Pubsub();
        });

        it("should throw exception on ask request with no teller", () => {
            //Arrange
            var exceptionMessage = null;

            //Act
            try {
                pubsub.askFor("something that doesn't exist");
            }
            catch (ex) { exceptionMessage = ex.message; }

            //Assert
            expect(exceptionMessage).to.equal("No available answer for 'something that doesn't exist'.");
        });

        it("should allow tellers to answer questions", () => {
            //Arrange
            //Act
            pubsub.answerFor("topic", p1 => `answer${p1}`);

            //Assert
            expect(pubsub.askFor("topic", 1)).to.equal("answer1");
        });

        it("should use only the most recent answer provider.", () => {
            //Arrange
            //Act
            pubsub.answerFor("topic", () => "old answer");
            pubsub.answerFor("topic", () => "new answer");

            //Assert
            expect(pubsub.askFor("topic", 1)).to.equal("new answer");
        });
    });

    describe("Publish/Subscribe", () => {
        var receivedCallback = null;

        beforeEach(() => {
            receivedCallback = false;
            pubsub = new Pubsub();
        });

        it("publish to same subscribed topic receives callback", () => {
            //Arrange
            pubsub.subscribe({ toTopic: "subscribed topic", withCallback: () => receivedCallback = true });
            
            //Act
            pubsub.publish({ toTopic: "subscribed topic" });

            //Assert
            expect(receivedCallback).to.equal(true);
        });

        it("publish to different topic doesn't receive callback", () => {
            //Arrange
            //Act
            pubsub.publish({ toTopic: "unsubscribed topic" });

            //Assert
            expect(receivedCallback).to.equal(false);
        });

        it("publish to same topic receives callback with correct argument", () => {
            //Arrange
            var argResult;
            pubsub.subscribe({ toTopic: "arg test", withCallback: result => argResult = result });

            //Act
            pubsub.publish({ toTopic: "arg test", withData: "it worked" });

            //Assert
            expect(argResult).to.equal("it worked");
        });
    });
});