import { Header, Icon, Right, Button, Left, Body, Title } from 'native-base'
import React from 'react'

const AppHeader = ({ headerTitle, backAction, rightAction }) => {
  return (
    <Header>
      {backAction ? (
        <Left>
          <Button transparent onPress={backAction}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
      ) : null}
      <Body>
        <Title>{headerTitle}</Title>
      </Body>
      <Right>{rightAction ? rightAction : null}</Right>
    </Header>
  )
}

export default AppHeader
