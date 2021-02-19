import React, { useState } from 'react'
import { useSession } from 'next-auth/client'
import styled from 'styled-components'
import Navigation from '../../molecules/AppBar/Navigation'
import SideBar from '../SideBar/SideBar'
import MenuButton from '../../atoms/MenuButton/MenuButton'
import ServiceIcon from '../../atoms/Image/ServiceIcon'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.light};
  padding: 0.2rem;
`

const Left = styled.div`
  display: flex;
`
const Right = styled.div`
  display: flex;
  margin-left: auto;
`

const Header: React.FC = () => {
  const [session, loading] = useSession()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Wrapper>
      <Left>
        <MenuButton onClick={() => setIsOpen(!isOpen)} />
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <ServiceIcon />
      </Left>
      <Right>
        <Navigation session={session} loading={loading} />
      </Right>
    </Wrapper>
  )
}

export default Header
