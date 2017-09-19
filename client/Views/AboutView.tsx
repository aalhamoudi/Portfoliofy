import * as React from "react";

import { View, Journal, Article, Highlights, Highlight, Timeline, Timepoint } from "../Components/Content"

import { EducationTimepoint, ExperienceTimepoint} from "../Models/Timepoint"
import Skill from "../Models/Skill"

import { getEducationTimepoints, getExperienceTimepoints, getSkills} from "../Services/JSONService"

declare function require(string): string;
const bg = require("../../public/images/background.svg");
const educationBg = require("../../public/images/EducationBg.jpg");
const experienceBg = require("../../public/images/ExperienceBg.jpg");
const skillsBg = require("../../public/images/SkillsBg.jpg");


export class AboutView extends React.Component<{}, {educationTimepoints: EducationTimepoint[], experienceTimepoints: ExperienceTimepoint[], skills: Skill[]}> {
    constructor() {
        super();
        this.state = {
            educationTimepoints: getEducationTimepoints(),
            experienceTimepoints: getExperienceTimepoints(),
            skills: getSkills()
        };
    }


    render() {
        return ( 
            <View id="About" bgImage={bg} bgColor="black">
                <Journal>
                    <Article title="Education" description="Description" image={educationBg}>
                        <Timeline>
                            {this.state.educationTimepoints.map((timepoint, index) => 
                                <Timepoint key={index} time={timepoint.time} icon={timepoint.icon} title={timepoint.title} description={timepoint.description} />
                                )}
                        </Timeline>
                    </Article>
                    <Article title="Experience" description="Description" image={experienceBg} >
                        <Timeline>
                            {this.state.experienceTimepoints.map((timepoint, index) =>
                                <Timepoint key={index} time={timepoint.time} icon={timepoint.icon} title={timepoint.title} description={timepoint.description} />
                            )}
                        </Timeline>
                    </Article>
                    <Article title="Skills" description="Description" image={skillsBg}>
                        <Highlights>
                            {this.state.skills.map((skill, index) => 
                                <Highlight key={index} image={skill.image} title={skill.title}>{skill.description}</Highlight>
                             )}
                        </Highlights>
                    </Article>
                </Journal>
            </View>
        );
    }
}