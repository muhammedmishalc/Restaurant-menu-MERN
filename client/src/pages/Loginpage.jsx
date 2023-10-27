import React, { useState } from 'react';
import axios from 'axios'
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';

function Loginpage() {

  const [justifyActive, setJustifyActive] = useState('tab1');;
  const [input, setInput] = useState({});;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  const submit = (e) => {
    e.preventDefault()
    const details = new FormData()
    const value = input.image.name
    console.log(value);
    details.append('file', input.image)
    details.append('filename', input.filename)
    axios.post('http://localhost:2500/reg/addcustomer', details).then((response) => {
      console.log('image uploaded');
    }).catch((error) => {
      console.log(error);
    })

  }
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Create
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>


          <MDBInput wrapperClass='mb-4' label='Phone' id='form1' type='text' />
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

          <div className="d-flex justify-content-between mx-4 mb-4">
            {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" href='/home'>Sign in</MDBBtn>
          <p className="text-center">First time here? <a href="#!" onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>Create account</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          <div>
            <div class="mb-4 d-flex justify-content-center">
              <img src="https://mdbootstrap.com/img/Photos/Others/placeholder.jpg"
                alt="example placeholder" style={{ width: '200px' }} />
            </div>
            <div class="d-flex justify-content-center">
              <div class="btn btn-secondary btn-rounded">
                <label class="form-label text-white m-1" for="customFile1">+ Add image</label>
                <input type="file" class="form-control d-none" onChange={(e) => { setInput({ ...input, 'image': e.target.files[0],'filename':e.target.files[0].name }) }} id="customFile1" />
              </div>
            </div>
          </div><br />

          {/* <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm" />
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm" />
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm" />
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm" />
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div> */}

          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' />
          <MDBInput wrapperClass='mb-4' label='Phone' id='form1' type='email' />
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' />

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" onClick={submit}>Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default Loginpage;
