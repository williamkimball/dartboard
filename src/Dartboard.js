import React, { Component } from 'react'
import ApplicationViews from './ApplicationViews'

import "bootstrap/dist/css/bootstrap.min.css"

export default class Dartboard extends Component {
    render() {
        return(
            <React.Fragment>
                <ApplicationViews />
            </React.Fragment>
        )
    }
}