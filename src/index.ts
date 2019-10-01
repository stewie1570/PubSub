type Callback = (...args: any[]) => void;

export class Pubsub {
    pubSubCallBacks: Array<any>;
    askTellCallBacks: Array<any>;

    constructor() {
        this.pubSubCallBacks = [];
        this.askTellCallBacks = [];
    }

    askFor(topic: string, ...args: any[]) {
        for (var key in this.askTellCallBacks) {
            if (topic === this.askTellCallBacks[key].topic)
                return this.askTellCallBacks[key].callback(...args);
        }

        throw new Error(`No available answer for '${topic}'.`);
    };

    answerFor(topic: string, provider: Callback) {
        for (var key in this.askTellCallBacks) {
            if (this.askTellCallBacks[key].topic === topic) {
                this.askTellCallBacks[key].callback = provider;
                return;
            }
        }

        this.askTellCallBacks.push({ topic: topic, callback: provider });
    };

    subscribe({ toTopic, withCallback }: { toTopic: string, withCallback: Callback }) {
        this.pubSubCallBacks.push({ topic: toTopic, callback: withCallback });
    };

    publish({ toTopic, withData }: { toTopic: string, withData?: any }) {
        for (var key in this.pubSubCallBacks) {
            if (toTopic == this.pubSubCallBacks[key].topic)
                this.pubSubCallBacks[key].callback(withData);
        }
    };
}