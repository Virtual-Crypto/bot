const fs = require('fs')

module.exports = async (client) => {
    client.console.info('Ready')

    client.colors = {
        orange: '#ff9e08',
        yellow: '#f0ff08',
        green: '#42ff08',
        cyan: '#08ffa2',
        lightblue: '#08aeff',
        blue: '#080dff',
        purple: '#9908ff',
        pink: '#f008ff',
        red: '#ff0808'
    };
    client.emoji = {
        company: client.emojis.cache.get('803766003964182528'),
        wallet: client.emojis.cache.get('803760169938583592'),
        bank: client.emojis.cache.get('803760170063626290'),
        gold: client.emojis.cache.get('803760170022338590'),
        btc: client.emojis.cache.get('803759417521602603'),
        coins: client.emojis.cache.get('803760169502507039'),
        chest: client.emojis.cache.get('803760171230298152'),
        capital: client.emojis.cache.get('803761669075107850'),
        action: client.emojis.cache.get('803770826347773953'),
        evolution: client.emojis.cache.get('805040655474360342')
    };

    client.bugs = new Map();
}