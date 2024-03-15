import { Highlight } from "@components/Highlight"
import { Header } from "@components/Header"
import { Button } from "@components/Button"

import { Container, Content, Icon } from "./styles"
import { Input } from "@components/Input"

export const NewGroup = () => {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie uma turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" />
        <Button title="Criar" />
      </Content>
    </Container>
  )
}