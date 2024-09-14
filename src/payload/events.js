const generateEvents = (numOfEvents = 100, availWidth = 1920, availHeight = 1080) => {
    const events = [];
    let lastEventTime = null;
    let x = Math.floor(Math.random() * availWidth);
    let y = Math.floor(Math.random() * availHeight);

    for (let i = 0; i < numOfEvents; i++) {
        let dx = Math.floor(Math.random() * 20) - 10;
        let dy = Math.floor(Math.random() * 20) - 10;

        x += dx;
        y += dy;

        x = Math.max(0, Math.min(x, availWidth));
        y = Math.max(0, Math.min(y, availHeight));

        let currentEventTime = new Date().getTime();
        
        let timeDiff = lastEventTime ? currentEventTime - lastEventTime : currentEventTime;
        
        lastEventTime = currentEventTime;

        events.push(`|mm|${x},${y}|${timeDiff}`);
    }

    return events;
}

export default generateEvents;