```javascript
document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // DOM
    // ========================================

    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");

    const clearButton = document.getElementById("clearButton");
    const copyButton = document.getElementById("copyButton");

    const swapButton = document.getElementById("swapButton");
    const clearOutputButton =
        document.getElementById("clearOutputButton");

    const charCount = document.getElementById("charCount");
    const lineCount = document.getElementById("lineCount");
    const byteCount = document.getElementById("byteCount");
    const spaceCount = document.getElementById("spaceCount");


    // ========================================
    // 解析
    // ========================================

    function updateAnalysis() {

        const text = inputText.value;

        charCount.textContent = [...text].length;

        lineCount.textContent =
            text === "" ? 0 : text.split("\n").length;

        byteCount.textContent =
            new TextEncoder().encode(text).length;

        spaceCount.textContent =
            (text.match(/\s/g) || []).length;
    }


    // ========================================
    // 出力
    // ========================================

    function setOutput(text) {
        outputText.value = text;
        updateAnalysis();
    }


    // ========================================
    // 変換
    // ========================================

    function hiraganaToKatakana(text) {
        return text.replace(
            /[\u3041-\u3096]/g,
            char =>
                String.fromCharCode(
                    char.charCodeAt(0) + 0x60
                )
        );
    }


    function katakanaToHiragana(text) {
        return text.replace(
            /[\u30A1-\u30F6]/g,
            char =>
                String.fromCharCode(
                    char.charCodeAt(0) - 0x60
                )
        );
    }


    function toLowerCase(text) {
        return text.toLowerCase();
    }


    function toUpperCase(text) {
        return text.toUpperCase();
    }


    function fullToHalf(text) {
        return text.replace(
            /[！-～]/g,
            char =>
                String.fromCharCode(
                    char.charCodeAt(0) - 0xFEE0
                )
        );
    }


    function halfToFull(text) {
        return text.replace(
            /[!-~]/g,
            char =>
                String.fromCharCode(
                    char.charCodeAt(0) + 0xFEE0
                )
        );
    }


    function reverseText(text) {
        return [...text].reverse().join("");
    }


    // ========================================
    // 加工
    // ========================================

    function removeSpaces(text) {
        return text.replace(/\s/g, "");
    }


    function removeEmptyLines(text) {
        return text
            .split("\n")
            .filter(line => line.trim() !== "")
            .join("\n");
    }


    function removeDuplicateLines(text) {
        return [...new Set(text.split("\n"))].join("\n");
    }


    function reverseLines(text) {
        return text.split("\n").reverse().join("\n");
    }


    function shuffleLines(text) {

        const lines = text.split("\n");

        for (let i = lines.length - 1; i > 0; i--) {

            const j =
                Math.floor(Math.random() * (i + 1));

            [lines[i], lines[j]] =
                [lines[j], lines[i]];
        }

        return lines.join("\n");
    }


    // ========================================
    // エンコード
    // ========================================

    function base64Encode(text) {

        const bytes =
            new TextEncoder().encode(text);

        let binary = "";

        bytes.forEach(byte => {
            binary += String.fromCharCode(byte);
        });

        return btoa(binary);
    }


    function base64Decode(text) {

        try {

            const binary = atob(text);

            const bytes =
                Uint8Array.from(
                    binary,
                    char => char.charCodeAt(0)
                );

            return new TextDecoder().decode(bytes);

        } catch {

            return "Base64として正しくありません。";
        }
    }


    function urlEncode(text) {
        return encodeURIComponent(text);
    }


    function urlDecode(text) {

        try {
            return decodeURIComponent(text);
        } catch {
            return "URLエンコードされた文字列として正しくありません。";
        }
    }


    function htmlEncode(text) {

        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }


    function htmlDecode(text) {

        const textarea =
            document.createElement("textarea");

        textarea.innerHTML = text;

        return textarea.value;
    }


    // ========================================
    // 文字コード
    // ========================================

    function asciiCode(text) {

        return [...text]
            .map(char => {

                const code =
                    char.charCodeAt(0);

                return code <= 127
                    ? `${char} → ${code}`
                    : `${char} → ASCII対象外`;

            })
            .join("\n");
    }


    function unicodeCodePoint(text) {

        return [...text]
            .map(char => {

                const code =
                    char.codePointAt(0);

                return (
                    `${char} → U+` +
                    code
                        .toString(16)
                        .toUpperCase()
                        .padStart(4, "0")
                );

            })
            .join("\n");
    }


    function unicodeEscape(text) {

        return [...text]
            .map(char => {

                const code =
                    char.codePointAt(0);

                if (code <= 0xFFFF) {

                    return (
                        "\\u" +
                        code
                            .toString(16)
                            .padStart(4, "0")
                    );
                }

                return "\\u{" + code.toString(16) + "}";

            })
            .join("");
    }


    function utf8Bytes(text) {

        return [...new TextEncoder().encode(text)]
            .map(byte =>
                byte
                    .toString(16)
                    .toUpperCase()
                    .padStart(2, "0")
            )
            .join(" ");
    }


    // ========================================
    // ツール一覧
    // ========================================

    const tools = {

        "hiragana-katakana": hiraganaToKatakana,
        "katakana-hiragana": katakanaToHiragana,
        "lowercase": toLowerCase,
        "uppercase": toUpperCase,
        "full-half": fullToHalf,
        "half-full": halfToFull,
        "reverse": reverseText,

        "remove-spaces": removeSpaces,
        "remove-empty-lines": removeEmptyLines,
        "remove-duplicate-lines": removeDuplicateLines,
        "reverse-lines": reverseLines,
        "shuffle-lines": shuffleLines,

        "base64-encode": base64Encode,
        "base64-decode": base64Decode,
        "url-encode": urlEncode,
        "url-decode": urlDecode,
        "html-encode": htmlEncode,
        "html-decode": htmlDecode,

        "ascii": asciiCode,
        "unicode-codepoint": unicodeCodePoint,
        "unicode-escape": unicodeEscape,
        "utf8-bytes": utf8Bytes
    };


    // ========================================
    // ツールボタン
    // ========================================

    document
        .querySelectorAll("[data-tool]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const tool =
                    tools[button.dataset.tool];

                if (!tool) {
                    return;
                }

                try {

                    const result =
                        tool(inputText.value);

                    setOutput(result);

                } catch (error) {

                    console.error(error);

                    outputText.value =
                        "処理中にエラーが発生しました。";
                }
            });
        });


    // ========================================
    // 入力クリア
    // ========================================

    clearButton.addEventListener("click", () => {

        inputText.value = "";
        outputText.value = "";

        updateAnalysis();
    });


    // ========================================
    // コピー
    // ========================================

    copyButton.addEventListener("click", async () => {

        if (outputText.value === "") {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                outputText.value
            );

            copyButton.textContent =
                "コピーしました！";

            setTimeout(() => {
                copyButton.textContent = "コピー";
            }, 1200);

        } catch (error) {

            console.error(error);

            copyButton.textContent =
                "コピー失敗";

            setTimeout(() => {
                copyButton.textContent = "コピー";
            }, 1200);
        }
    });


    // ========================================
    // 入力と出力を入れ替え
    // ========================================

    swapButton.addEventListener("click", () => {

        const oldInput = inputText.value;
        const oldOutput = outputText.value;

        inputText.value = oldOutput;
        outputText.value = oldInput;

        updateAnalysis();
    });


    // ========================================
    // 出力クリア
    // ========================================

    clearOutputButton.addEventListener("click", () => {

        outputText.value = "";
    });


    // ========================================
    // タブ切り替え
    // ========================================

    document
        .querySelectorAll(".tab")
        .forEach(tab => {

            tab.addEventListener("click", () => {

                document
                    .querySelectorAll(".tab")
                    .forEach(item => {
                        item.classList.remove("active");
                    });


                document
                    .querySelectorAll(".tab-content")
                    .forEach(content => {
                        content.classList.remove("active");
                    });


                tab.classList.add("active");


                const target =
                    document.getElementById(
                        tab.dataset.tab
                    );


                if (target) {
                    target.classList.add("active");
                }
            });
        });


    // ========================================
    // 入力時に解析
    // ========================================

    inputText.addEventListener(
        "input",
        updateAnalysis
    );


    // ========================================
    // 初期化
    // ========================================

    updateAnalysis();

});
```
