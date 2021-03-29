import React, { Children, Component } from 'react';
import './tabItem.css'
class TabItem extends Component {
    render() { 
        return ( <div className='tabItem'>
            {this.props.children}
        </div> );
    }
}
 
export default TabItem;