import { classNames } from "./classname";

const setClassNames = (dom, value) => {
    dom.setAttribute('class', classNames(value));
};

export const el = (tag, attributes, ...children) => {
    const flattenedChildren = children.reduce((seed, x) => {
        seed.push(...(Array.isArray(x) ? x : [x]));
        return seed;
    }, []);

    if (typeof tag === 'function') {
        return tag({ ...attributes, children: flattenedChildren });
    }

    const dom = document.createElement(tag);

    if (attributes) {
        for (const name in attributes) {
            switch (name) {
                case 'className':
                    setClassNames(dom, attributes[name]);
                    break;
                case 'class':
                    throw new Error('class is not supported. Use className instead.');
                default:
                    dom.setAttribute(name, attributes[name]);
            }
        }
    }

    if (flattenedChildren.length) {
        for (const child of flattenedChildren) {
            const processedChild = typeof child === 'number' ? child.toString() : child;
            if (processedChild) {
                dom.appendChild(
                    typeof processedChild === 'string'
                        ? document.createTextNode(processedChild)
                        : processedChild
                );
            }
        }
    }

    return dom;
};

export const jsx = el;
export const jsxs = el;