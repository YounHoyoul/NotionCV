import slugify from "slugify";

const REPLACEMENT: { [key: string]: string } = {
    '++': 'pp',
    '#': 's'
};

export const slug = (data: string) => {
    for (const key in REPLACEMENT) {
        data = data.replace(key, REPLACEMENT[key]);
    }
    return slugify(data, { lower: true, strict: true });
}