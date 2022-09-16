import {useEffect, useState} from 'react'
import { View,TouchableOpacity, Image, FlatList, Text } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import {useRoute, useNavigation} from '@react-navigation/native'
import {Entypo} from '@expo/vector-icons'

import LogoImg from '../../assets/logo-nlw-esports.png'
import { THEME } from '../../theme';

import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch'


import { styles } from './styles';
import { Heading } from '../../components/Heading';



export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const navigator = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams;

  async function getDiscordUser(adsId:string) {
    fetch(`http://192.168.15.4:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord));
  }

  useEffect(()=>{ 
    fetch(`http://192.168.15.4:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data));
  },[]);

  function handleGoBack(){
    navigator.goBack()
  }



  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
          onPress={handleGoBack}>
            <Entypo 
            name="chevron-thin-left"
            color={THEME.COLORS.CAPTION_300}
            size={25}
            />
          </TouchableOpacity>

          <Image 
            source={LogoImg}
            style={styles.logo}/>
            
           <View style={styles.rigth}/>

        </View>

        <Image 
        source={{uri: game.bannerUrl}}
        style={styles.cover}
        resizeMode="cover"
        />

        <Heading 
        title={game.title}
        subtitle="Conect-se e comece a jogar!"
        />

        <FlatList 
        data={duos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <DuoCard 
          data={item}
          onConect={()=> getDiscordUser(item.id)} />
        )}
        horizontal
        style={styles.containerList}
        contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContet]}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={()=> (
          <Text style={styles.emptyListText}>
            Não há anúncios publicados ainda. 🫤
          </Text>
        )}
        />

        <DuoMatch
        visible={discordDuoSelected.length > 0}
        discord={discordDuoSelected}
        onClose={()=> setDiscordDuoSelected('')}
        
        />
      </SafeAreaView>
    </Background>
  );
}