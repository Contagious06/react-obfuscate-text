import * as React from "react";

interface Props {
    text?: string;
}

let globalStyle: HTMLStyleElement | null = null;
let componentCount = 0;

const rand = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randStrGenerator = (range: string) => {
    return (length: number) => {
        let text = "";

        for (let i = 0; i < length; i++) {
            text += range.charAt(rand(0, range.length - 1));
        }
    
        return text;
    };
}

const randText = randStrGenerator("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
const randAlpha = randStrGenerator("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");

const generate = (amount: number) => {
    const arr = new Array(amount);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = randText(5);
    }

    return arr;
}

const hiddenElements = generate(5);
const visibleElements = generate(5);

const randItem = (items: any) => {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
};

const createKlasses = (elements: string[], props: string) => {
    return elements.map((klass) => {
        return `.${klass} {
      ${props}
      }`
    });
}

const generateStyles = () => {
    const hidden = "display: none;";
    const visiable = "display: inline-block;";

    return [
        ...createKlasses(hiddenElements, hidden),
        ...createKlasses(visibleElements, visiable),
    ];
}

class ObfuscateText extends React.Component<Props> {

    componentDidMount() {
        if (!globalStyle) {
            globalStyle = document.createElement("style");
            document.head.appendChild(globalStyle);

            const newStyles = generateStyles().join("\n");
            globalStyle.innerHTML = newStyles;
        }

        componentCount++;
    }

    componentWillUnmount() {
        if (componentCount <= 0) {
            componentCount = 0;

            if (globalStyle) {
                const parentNode = globalStyle.parentNode;
                if (parentNode) {
                    parentNode.removeChild(globalStyle);
                }
            }

            globalStyle = null;
        }
    }

    shouldComponentUpdate(nextProps: Props) {
     return nextProps.text !== this.props.text;
    }

    render() {
        const {
            text = ""
        } = this.props;

        const children: any = [];
        const key = () => {
            return `key-${children.length}`;
        };

        const span = (text: string, className: string) => {
            return <span key={key()} className={className}>
                {text}
            </span>;
        }

        const space = () => {
            return <span key={key()}> </span>;
        }

        for (let i = 0; i < text.length; i++) {
            const end = rand(1, 2);
            const value = text.slice(i, i + end);

            const fillAmount = rand(1, 2);
            for (let j = 0; j < fillAmount; j++) {
                const txt = randAlpha(2);
                const className = randItem(hiddenElements);
                children.push(span(txt, className));
            }

            if (value.startsWith(" ")) {
                children.push(space());
            }

            const className = randItem(visibleElements);
            children.push(span(value.trim(), className));
            i += end - 1;

            if (value.endsWith(" ")) {
                children.push(space());
            }
        }

        return (<>
                {children}
            </>
        );
    }
}

export default ObfuscateText;
