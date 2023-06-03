type SelectItem = {
    id: string,
    name: string,
    color: string
}

type NotionText = {
    type: string,
    text: {
        content: string,
        link?: string
    },
    annotations: {
        bold: boolean,
        italic: boolean,
        strikethrough: boolean,
        underline: boolean,
        code: boolean,
        color: string
    },
    plain_text: string,
    href?: string
}

type NotionTitle = {
    id: string, 
    type: 'title', 
    title: NotionText[]
};

type NotionRichText = {
    id: string, 
    type: 'rich_text', 
    rich_text: NotionText[]
};

type NotionFormulaString = {
    id: string,
    type: 'formula',
    formula: { type: 'string', string: string }
}

type NotionFormulaNumber = {
    id: string,
    type: 'formula',
    formula: { type: 'number', number: number }
}

type NotionSelect = {
    id: string,
    type: 'select',
    select: SelectItem
}

type NotionMultiSelect = {
    id: string,
    type: 'multi_select',
    multi_select: SelectItem[]
}

type Period = {
    start: string,
    end?: string,
    time_zone?: string
}

type NotionDate = {
    id: string,
    type: 'date',
    date: Period
}

type Project = {
    Name: NotionText[],
    Company?: string,
    Type?: SelectItem,
    Role?: SelectItem,
    Language?: SelectItem[],
    Backend?: SelectItem[],
    Frontend?: SelectItem[],
    WebDbServer?: SelectItem[],
    Period?: Period,
    Responsibility: NotionText[],
    WorkingMonths?: number,
    WorkingPeriod: string
}