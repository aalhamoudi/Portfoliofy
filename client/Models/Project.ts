export class ProjectModel {
    id: number;
    name: string;
    description: string;
    link: string;
    features: Feature[];
    technologies: Technology[];
    images: Image[];
}

export class Feature {
    id: number;
    title: string;
}

export class Technology {
    id: number;
    title: string;
}

export class Image {
    id: number;
    path: string;
}