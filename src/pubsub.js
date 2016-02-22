export class Pubsub {
    constructor() {
        this.pubSubCallBacks = [];
        this.askTellCallBacks = [];
    }

    askFor(topic) {
        for (var key in this.askTellCallBacks) {
            if (topic == this.askTellCallBacks[key].topic)
                return this.askTellCallBacks[key]
                    .callback
                    .apply(window, Array.prototype.splice.call(arguments, 1, arguments.length - 1));
        }

        throw new Error(`No available answer for '${topic}'.`);
    };

    answerFor(topic, provider) {
        for (var key in this.askTellCallBacks) {
            if (this.askTellCallBacks[key].topic == topic) {
                this.askTellCallBacks[key].callback = provider;
                return;
            }
        }

        this.askTellCallBacks.push({ topic: topic, callback: provider });
    };

    subscribe({toTopic, withCallback}) {
        this.pubSubCallBacks.push({ topic: toTopic, callback: withCallback });
    };

    publish({toTopic, withData}) {
        for (var key in this.pubSubCallBacks) {
            if (toTopic == this.pubSubCallBacks[key].topic)
                this.pubSubCallBacks[key].callback(withData);
        }
    };
}