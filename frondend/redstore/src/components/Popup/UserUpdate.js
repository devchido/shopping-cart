import React, { Component } from 'react'

export class UserUpdate extends Component {
  render() {
    
    return (
      <>
        <div className='modal'>
            <div className='modal_inner'>
                <div className='modal_header'>
                    <p>Webcome to Nodemy</p>
                    <i class="fa fa-times"></i>
                </div>
                <div className='modal_body'>
                    <h2>Modal</h2>
                    <p>Đây là phần body</p>
                </div>
                <div className='modal_footer'>
                    <button>Close</button>
                </div>
            </div>
        </div>
      </>
    )
  }
}

export default UserUpdate