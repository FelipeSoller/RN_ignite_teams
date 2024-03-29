import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { getAllGroups } from '@storage/group/getAllGroups';

import { Container } from './styles';
import { Loading } from '@components/Loading';

export const Groups = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate('new')
  }

  const fetchGroups = async () => {
    try {
      setIsLoading(true)

      const data = await getAllGroups()
      setGroups(data)

    } catch (error) {
      console.log(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma"/>

      {
        isLoading ?
        <Loading /> :
        <FlatList
          data={groups}
          keyExtractor={item => item}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
        />
      }


      <Button
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
    </Container>
  );
}


