type SelectItem = {
    id: string,
    name: string,
    color: string
}

type NotionAnnotations = {
    bold: boolean,
    italic: boolean,
    strikethrough: boolean,
    underline: boolean,
    code: boolean,
    color: string
}

type NotionText = {
    type: string,
    text: {
        content: string,
        link?: string
    },
    annotations: NotionAnnotations,
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
    formula: {
        type: 'string',
        string: string
    }
}

type NotionFormulaNumber = {
    id: string,
    type: 'formula',
    formula: {
        type: 'number',
        number: number
    }
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

type NotionUrl = {
    type: 'external',
    external: {
        url: string
    }
}

type NotionEmoji = {
    type: 'emoji',
    emoji: string
}

type NotionFile = {
    type: 'file',
    file: {
        url: string,
        expiry_time: string
    }
}

type NotionBulletedListItem = {
    rich_text: NotionText[],
    color: string
}

type NotionParagraph = NotionBulletedListItem

type Project = {
    name: NotionText[],
    company: string,
    type: SelectItem,
    role: SelectItem,
    language: SelectItem[],
    backend: SelectItem[],
    frontend: SelectItem[],
    webDbServer: SelectItem[],
    period: Period,
    responsibility: NotionText[],
    totalMonths: number,
    workingPeriod: string,
    note: NotionText[],
}

type Experience = {
    icon?: NotionUrl | NotionEmoji | NotionFile,
    name: NotionText[],
    type: SelectItem,
    role: SelectItem,
    address: NotionText[],
    workingPeriod: string,
}

type Cert = {
    icon?: NotionUrl | NotionEmoji | NotionFile,
    name: NotionText[],
    type: SelectItem,
    issueOrganization: NotionText[],
    issueDate: Period
}

type Education = {
    icon?: NotionUrl | NotionEmoji | NotionFile,
    name: NotionText[],
    degree: NotionText[],
    fieldOfStudy: NotionText[],
    start: Period
    end: Period
}

type Profile = {
    name: NotionText[],
    cover: NotionUrl,
    icon: NotionUrl,
    aboutMe: NotionBulletedListItem[],
    contacts: NotionParagraph[],
    languages: NotionParagraph[],
}

type ExperienceResultSet = {
    company: Experience,
    projects: Project[],
    language: SelectItem[],
    frontend: SelectItem[],
    backend: SelectItem[],
    webDbServer: SelectItem[],
}

type ProjectResultSet = {
    company: string,
    icon?: NotionUrl | NotionEmoji | NotionFile,
    workingPeriod: string,
    projects: Project[]
}

type SkillResultSet = {
    name: string,
    item: SelectItem,
    projects: Project[],
    workingPeriod: string,
    totalMonths: number,
    highlighted: boolean
}
