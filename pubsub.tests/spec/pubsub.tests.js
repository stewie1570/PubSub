describe("PubSub", function ()
{
    var pubsub = null;

    describe("Ask/Answer", function ()
    {
        beforeEach(function ()
        {
            pubsub = new Pubsub();
        });

        it("should throw exception on ask request with no teller", function ()
        {
            //Arrange
            var exception = null;

            //Act
            try
            {
                pubsub.askFor("something that doesn't exist");
            }
            catch (ex) { exception = ex; }

            //Assert
            expect(exception).toBe("No available answer for 'something that doesn't exist'.");
        });

        it("should allow tellers to answer questions", function ()
        {
            //Arrange
            //Act
            pubsub.answerFor("topic", function (p1) { return "answer" + p1; });

            //Assert
            expect(pubsub.askFor("topic", 1)).toBe("answer1");
        });

        it("should use only the most recent answer provider.", function ()
        {
            //Arrange
            //Act
            pubsub.answerFor("topic", function () { return "old answer"; });
            pubsub.answerFor("topic", function () { return "new answer"; });

            //Assert
            expect(pubsub.askFor("topic", 1)).toBe("new answer");
        });
    });

    describe("Publish/Subscribe", function ()
    {
        var receivedCallback = null;

        beforeEach(function ()
        {
            receivedCallback = false;
            pubsub = new Pubsub();
            pubsub.subscribe("subscribed topic", function () { receivedCallback = true; });
        });

        it("publish to same subscribed topic receives callback", function ()
        {
            //Arrange
            //Act
            pubsub.publish("subscribed topic");

            //Assert
            expect(receivedCallback).toBeTruthy();
        });

        it("publish to different topic doesn't receive callback", function ()
        {
            //Arrange
            //Act
            pubsub.publish("unsubscribed topic");

            //Assert
            expect(receivedCallback).toBeFalsy();
        });

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
    });
});