import { View, Text, ViewProps } from 'react-native';

import { styles } from './styles';

interface Props extends ViewProps {
    title: string,
    subtitle: string
}

export function Heading({title, subtitle, ...rest}: Props) { // o ... rest é o restande das coisas que a ViewProps oferece
  return (
    // Tem que declarar ela aqui
    <View style={styles.container} {...rest}>  
        <Text style={styles.title}>
            {title}
        </Text>
        <Text style={styles.subtitle}>
            {subtitle}
        </Text>

    </View>
  );
}