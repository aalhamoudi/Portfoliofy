import * as $ from "jquery"

import File from "../Models/File"
import Owner from "../Models/Owner"
import { EducationTimepoint, ExperienceTimepoint } from "../Models/Timepoint"
import Skill from "../Models/Skill"
import { ProjectModel}  from "../Models/Project"

const url = "/data.json";
let file : File;

export function loadData() {
    return $.getJSON(url, data => file = data).promise();
}

export function getFile() {
    return file;
}

export function getOwner() {
    return file.owner;
}

export function getProjects() {
    return file.projects;
}

export function getSkills() {
    return file.skills;
}

export function getEducationTimepoints() {
    return file.educationTimepoints;
}

export function getExperienceTimepoints() {
    return file.experienceTimepoints;
}