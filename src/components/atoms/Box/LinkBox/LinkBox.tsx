import React from 'react'
import styled from 'styled-components'

type Props = {}

const Parallelogram = styled.div`
  clip-path: polygon(6% 0, 100% 0, 95% 100%, 0 87%);
`

const Outer = styled(Parallelogram)`
  background-color: ${({ theme }) => theme.colors.border};

  /* centering */
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary.light};
    opacity: 0;
  }
  &:hover:after {
    opacity: 0.7;
  }
`

const Inner = styled(Parallelogram)`
  background-color: ${({ theme }) => theme.colors.surface};

  width: 90%;
  height: 90%;
  margin: 5px;

  /* centering */
  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  color: #fff;
`

const Box: React.FC<Props> = ({ children }) => {
  return (
    <Outer>
      <Inner>
        <Wrapper>{children}</Wrapper>
      </Inner>
    </Outer>
  )
}

export default Box
