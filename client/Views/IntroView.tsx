import * as React from "react";

import { View } from "../Components/Content"
import { Row, Column } from "../Components/Primitives"

import Owner from "../Models/Owner"
import { getOwner } from "../Services/JSONService"

declare function require(string): string;
const bg = require("../../public/images/IntroBg.jpg");
const profile = require("../../public/images/profile.svg");


export class IntroView extends React.Component<{}, {owner: Owner}> {
    constructor() {
        super();
        this.state = {
            owner: getOwner()
        };
    }
    
    render() {
        return ( 
            <View id="Intro" bgImage={bg} bgColor="black">
                <Row style={{ position: "relative", top: "20%", width: "100%", margin: 0 }}>
                    <Column style={{ margin: "auto", padding: 0 }} size={8}>
                        <div>
                            <img className="img-fluid" src={profile} style={{ height: "30vh", maxWidth: 250, maxHeight: 250, display: "block", margin: "0 auto" }} />
                            <hr style={{ width: 250, height: 1, backgroundColor: "white" }} />
                            <h1 className="brand-name" style={{ textAlign: "center", color: "white" }}>{this.state.owner.name}</h1>
                            <p style={{ textAlign: "center", color: "white"}}>{this.state.owner.about}</p>
                        </div>
                    </Column>
                </Row>
            </View>
        );
    }
}