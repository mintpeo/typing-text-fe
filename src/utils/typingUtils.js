export function checkTyping(targetText, typedText) {
    const result = [];
    console.log(targetText);

    for (let i = 0; i < targetText.length; i++) {
        let status = "none";

        if (typedText[i] === targetText[i]) {
            status = "correct";
        } else {
            status = "wrong";
        }

        result.push({
            char: targetText[i],
            status: status
        });
    }

    return result;
}

export function countText(targetText) {
    return targetText.split(" ");
}