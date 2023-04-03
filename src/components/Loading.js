import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <div className='section section-center'>
      <Wrapper>
        <div className='loading'>
          <div className='red'>
            <div className='blue'>
              <div className='yellow'></div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .loading {
    width: 6rem;
    height: 6rem;
    margin: 0 auto;
    /* margin-top: 10rem; */
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: var(--clr-primary-5);
    animation: spinner 2s linear infinite;
  }
  .red {
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
    /* margin-top: 10rem; */
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: red;
    animation: spinner 2s linear infinite;
  }
  .blue {
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
    /* margin-top: 10rem; */
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: blue;
    animation: spinner 2s linear infinite;
  }
  .yellow {
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    /* margin-top: 10rem; */
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: yellow;
    animation: spinner 2s linear infinite;
  }
`;

export default Loading;
