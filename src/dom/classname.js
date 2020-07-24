export const classNames = (...classes) => {
    return classes.reduce((classStrings, clazz) => {
        if (Array.isArray(clazz)) {
            return [...classStrings, classNames(...clazz)]
        } else if (typeof clazz === 'string') {
            return [...classStrings, clazz];
        } else if (clazz === null || clazz === undefined) {
            return classStrings;
        } else {
            return [
                ...classStrings,
                ...Object.entries(clazz)
                    .filter(([ _, conditional ]) => conditional)
                    .map(([ clazz ]) => clazz)
            ]
        }
    }, []).join(' ');
}