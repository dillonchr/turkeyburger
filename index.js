const MAX_LEN = process.env.PRINTER_LINE_LENGTH || 32;

const getRepeatedChar = (n, c) => Array(~~n).fill(0).map(() => c).join('');

const getSpaces = (n) => getRepeatedChar(n, ' ');

const rightJustifyLine = (text) => {
    const t = text.trim();
    const spaces = getSpaces(MAX_LEN - t.length);
    return spaces + t;
};

const centerLineWithRepeater = (text, char) => {
    const t = ' ' + text.trim() + ' ';
    const whitespace = MAX_LEN - t.length;
    const preText = getRepeatedChar(Math.ceil(whitespace / 2), char);
    const postText = getRepeatedChar(whitespace - preText.length, char);
    return preText + t + postText;
};

const centerLine = (text) => {
    return centerLineWithRepeater(text, ' ');
};

const spaceBetween = (left, right) => {
    const l = left.trim();
    const r = right.trim();
    const spaces = getSpaces(MAX_LEN - l.length - r.length);
    return l + spaces + r;
};

const fillLineWithChar = (char) => getRepeatedChar(MAX_LEN, char);

const autoWrapLongLine = (text, indent = 0) => {
    return text
        .split('\n')
        .map(line => {
            if (line.length > MAX_LEN) {
                return line.split(' ').reduce((whole, word, i) => {
                    if (!i) {
                        return word;
                    }
                    const lastIndexOfNewline = whole.lastIndexOf('\n');
                    const lastNewLine = lastIndexOfNewline !== -1 ? lastIndexOfNewline : 0;
                    const lengthSoFar = whole.substr(lastNewLine + 1).length;
                    const wouldBeNextLineLength = lengthSoFar + 1 + word.length;
                    if (wouldBeNextLineLength > MAX_LEN) {
                        return `${whole}\n${getSpaces(indent)}${word}`;
                    }
                    return `${whole} ${word}`;
                });
            }

            return line;
        })
        .join('\n');
};

const test = () => {
    console.log(fillLineWithChar('*'));
    console.log('From the window.');
    console.log(centerLine('We all are dear.'));
    console.log(rightJustifyLine('Well, here we are.'));
    console.log(fillLineWithChar(' '));
    console.log(autoWrapLongLine(`A function to execute on each element in the array (except for the first, if no initialValue is supplied), taking four arguments.`));
    console.log(fillLineWithChar(' '));
    console.log(autoWrapLongLine(`A function to execute on each element in the array (except for the first, if no initialValue is supplied), taking four arguments.`, 2));
    console.log(fillLineWithChar(' '));
    console.log(autoWrapLongLine(`A function to execute on each element in the array (except for the first, if no initialValue is supplied), taking four arguments.`, 4));
    console.log(fillLineWithChar(' '));
    console.log(fillLineWithChar('*'));
    console.log(centerLineWithRepeater('c 2019', '-'));
    console.log(spaceBetween('Printed:', '10/5/2019'));
};

test();
