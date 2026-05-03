// this is a publisher - subscriber problem in which user needs to subcribe 
const PubSub = {
    subscribers: {},
    subscribe: function(eventName, func) {
        if(!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }
        this.subscribers[eventName].push(func);
    },
    publish: function(eventName, messageData) {
        let subs = this.subscribers[eventName];

        if(subs.length) {
            for(sub of subs) {
                sub(messageData);
                // sub.call(this.subscribers, messageData); no need of binding
            }
        }
    }
}

const handleAlert = (messageData) => {
    console.log(`Alert Recieved: ${messageData.message} (from: ${messageData.sender})`)
}

PubSub.subscribe('userAlerts', handleAlert);

const handleAlert2 = (messageData) => {
    console.log(`New Alert Recieved: ${messageData.message} (from: ${messageData.sender})`);
}

PubSub.subscribe('userAlerts', handleAlert2)


PubSub.publish('userAlerts', {message: 'A user signed up!', sender: '1'})