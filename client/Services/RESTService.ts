import * as $ from "jquery"

import Owner from "../Models/Owner"
import { EducationTimepoint, ExperienceTimepoint } from "../Models/Timepoint"
import Skill from "../Models/Skill"
import { ProjectModel}  from "../Models/Project"

let url = "/";

export function getOwner(callback: (data: Owner) => any)
{
    $.ajax({
        url: url + "api/owner/",
        dataType: "json",
        success: (data) => {
            callback(data);
        }
    });
}

export function getProject(projectId: number, callback: (data: ProjectModel) => any) {
    $.ajax({
        url: url + "api/projects/" + projectId,
        dataType: "json",
        success: (data) => {
            callback(data);
        }
    });
}

export function getProjects(callback: (data: ProjectModel[]) => any) {
    $.ajax({
        url: url + "api/projects/",
        dataType: "json",
        success: (data) => {
            callback(data);
        }
    });
}

export function getSkills(callback: (data: Skill[]) => any) {
    $.ajax({
        url: url + "api/skills/",
        dataType: "json",
        success: (data) => {
            callback(data);
        }
    });
}

export function getEducationTimepoints(callback: (data: EducationTimepoint[]) => any) {
    $.ajax({
        url: url + "api/educationtimepoints/",
        dataType: "json",
        success: (data) => {
            callback(data);
        }
    });
}

export function getExperienceTimepoints(callback: (data: ExperienceTimepoint[]) => any) {
    $.ajax({
        url: url + "api/experiencetimepoints/",
        dataType: "json",
        success: (data) => {
            callback(data);
        }
    });
}