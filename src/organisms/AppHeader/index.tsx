import React from 'react';
import Logo from '../../molecules/Logo';
import { Colors } from '../../../theme';
import { SafeAreaView } from 'react-native';
import Row from '../../atoms/Row';
import { Heading, Paragraph } from '../../atoms/Text';
import { LangMap } from '../../../helpers/constants';
import LangMenu from '../../molecules/LangMenu';

function AppHeader() {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.Teal }}>
      <Row
        style={{
          height: 48,
          paddingHorizontal: 12,
        }}>
        <Logo header />
        <Heading.Medium style={{ color: Colors.Navy, marginLeft: 12, flex: 1 }}>
          LangAi
        </Heading.Medium>
        <LangMenu />
      </Row>
    </SafeAreaView>
  );
}

export default AppHeader;
