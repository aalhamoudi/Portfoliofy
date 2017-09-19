import Owner from "./Owner";
import { EducationTimepoint, ExperienceTimepoint } from "./Timepoint"
import Skill from "./Skill"
import { ProjectModel } from "./Project"

export default class File {
    owner: Owner;
    educationTimepoints: EducationTimepoint[];
    experienceTimepoints: ExperienceTimepoint[];
    skills: Skill[];
    projects: ProjectModel[];
}