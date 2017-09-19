import * as React from "react"

export class Form extends React.Component<{}, {}> {
    render() {
        return (
            <div className="form">
                {this.props.children}
            </div>
        )
    }
}

export class InlineForm extends React.Component<{}, {}> {
    render() {
        return (
            <div className="form-inline">
                {this.props.children}
            </div>
        )
    }
}

export class Input extends React.Component<{type: string, symbol: string, placeholder: string}, {}> {
    render() {
        return (
            <div className="input-group">
                <span className="input-group-addon">{this.props.symbol}</span>
                <input type={this.props.type} className="form-control" placeholder={this.props.placeholder} />
            </div>
        )
    }
}
