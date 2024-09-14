const encodePayload = (payload, key = 'cdababcddcba') => {
    const generateSubKey = (str, segmentCount, multiplier = 31) => {
        if (str === '') {
            return '';
        }
        const characters = 'abcdhijkxy';
        const segmentLength = parseInt(str.length / segmentCount);
        const subKeys = [];
        for (let i = 0; i < segmentCount; i++) {
            let charCodeSum = 0;
            const start = i * segmentLength;
            const end = i == segmentCount - 1 ? segmentLength + str.length % segmentCount : segmentLength;
            for (let j = 0; j < end; j++) {
                const index = start + j;
                if (index < str.length) {
                    charCodeSum += str.charCodeAt(index);
                }
            }
            charCodeSum = charCodeSum * multiplier;
            subKeys.push(characters.charAt(charCodeSum % characters.length));
        }
        return subKeys.join('');
    };

    const reverseKey = key.split('').reverse().join('');
    const combinedKey = reverseKey + generateSubKey(reverseKey, 4);
    return xorEncode(payload, combinedKey);
};

const xorEncode = (payload, key) => {
    if (!payload) {
        return '';
    }

    let encodedStr = '';

    for (let i = 0; i < payload.length; i++) {
        encodedStr += String.fromCharCode(payload.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }

    return base64Encode(encodedStr);
};


const base64Encode = (str) => {
    return Buffer.from(str).toString('base64');
};

const calculateAsciiSum = (inputString) => {
    let asciiSum = 0;
    
    for (var i = 0; i < inputString.length; i++) {
        asciiSum += inputString.charCodeAt(i);
    }
    
    return asciiSum;
};


const randomOddInt = () => {
    return parseInt(Math.random() * 50) * 2 + 1;
}

const randomIntBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}