import * as React from "react";
import { View, Carousel, CarouselElement, Highlights, Highlight, Project, Projects } from "../Components/Content";

import { ProjectModel, Feature, Technology, Image } from "../Models/Project"

import { getProjects } from "../Services/JSONService"

declare function require(string): string;
const bg = require("../../public/images/ProjectsBg.jpg");

export class ProjectsView extends React.Component<{}, { projects: ProjectModel[]}> {
    constructor() {
        super();
        this.state = {
            projects: getProjects()
        };
    }

    render() {
        return ( 
            <View id="Projects" bgImage={bg} bgColor="black">
                <Projects>
                    {this.state.projects.map((project, index) => {
                        var features: string[] = new Array<string>();
                        var technologies: string[] = new Array<string>();
                        var images: string[] = new Array<string>();

                        project.features.map((feature, index) => features.push(feature.title));
                        project.technologies.map((technology, index) => technologies.push(technology.title));
                        project.images.map((image, index) => images.push(image.path));

                        return (
                            <Project key={index}
                                name={project.name.replace(/\s/g, '')}
                                description={project.description}
                                link={project.link}
                                features={features}
                                technologies={technologies}
                                images={images}>
                            </Project>
                        );
                    })}
                </Projects>
            </View>
        );
    }
}