import * as React from "react"

import * as $ from "jquery"


export class ScrollIndicator extends React.Component<{}, {}> {
    componentDidMount() {
        if (/Mobi/.test(navigator.userAgent)) {
            $("#scrollIndicator").hide();
        }
    }
    render() {
        var containerStyle = {
            width: 34,
            height: 55,
            margin: "auto",
            position: "absolute",
            bottom: 40,
            left: "calc(50% - 17px)"
        };
        var mouseStyle = {
            width: 3,
            height: 50,
            padding: "10px 15px",
            border: "3px solid white",
            borderRadius: 25,
            opacity: 0.75
        };
        var scrollerStyle = {
            width: 3,
            height: 10,
            borderRadius: "25%",
            backgroundColor: "white",
            animationName: "scroll",
            animationDuration: "2.2s",
            animationTimingFunction: "cubic-bezier(0.15,0.41,0.69,0.94)",
            animationIterationCount: "infinite"
        };

        return (
            <div id="scrollIndicator" style={containerStyle}>
                <div style={mouseStyle}>
                    <div style={scrollerStyle}></div>
                </div>
            </div>
        );

    }
}

export class HorizontalScrollIndicator extends React.Component<{}, {}> {
    render() {
        var containerStyle = {
            width: 34,
            height: 55,
            margin: "auto",
            position: "absolute",
            bottom: 110,
            left: "calc(50% - 17px)"
        };
        var mouseStyle = {
            width: 3,
            height: 50,
            padding: "10px 15px",
            border: "3px solid white",
            borderRadius: 25,
            opacity: 0.75
        };
        var scrollerStyle = {
            width: 10,
            height: 3,
            borderRadius: "25%",
            backgroundColor: "white",
            animationName: "horizontalScroll",
            animationDuration: "2.2s",
            animationTimingFunction: "cubic-bezier(0.15,0.41,0.69,0.94)",
            animationIterationCount: "infinite",
            marginLeft: -10
        };

        return (
            <div id="horizontalScrollIndicator" className="hidden-sm-up" style={containerStyle}>
                <div style={mouseStyle}>
                    <div style={scrollerStyle}></div>
                </div>
            </div>
        );

    }
}