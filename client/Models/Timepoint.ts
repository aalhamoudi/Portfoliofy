export default class Timepoint {
    id: number;
    time: string;
    title: string;
    description: string;
    icon: string;
}

export class EducationTimepoint extends Timepoint { }

export class ExperienceTimepoint extends Timepoint { }