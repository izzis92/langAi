import React, { useContext, useMemo } from 'react';
import { View } from 'react-native';
import Row from '../../atoms/Row';
import { Heading, Label, Paragraph } from '../../atoms/Text';
import {
  LangContext,
  LangContextType,
  LangKey,
} from '../../context/lang/langContext';
import { LangMap } from '../../../helpers/constants';
import { Menu } from 'react-native-paper';
import { Icon } from '@rneui/themed';

const LangMenu = () => {
  const [showLangModal, setShowLangModal] = React.useState(false);
  const { lang, setLang } = useContext(LangContext) as LangContextType;

  const menuItems = useMemo(
    () =>
      Object.keys(LangMap).map(key => (
        <Menu.Item
          key={key}
          onPress={() => {
            setLang(key as LangKey);
            setShowLangModal(false);
          }}
          title={LangMap[key as LangKey]}
        />
      )),
    [setLang, setShowLangModal],
  );
  return (
    <Row>
      <Paragraph.Medium>
        Language:{' '}
        <Label.Large onPress={() => setShowLangModal(true)}>
          {LangMap[lang]}
        </Label.Large>
      </Paragraph.Medium>
      <Menu
        visible={showLangModal}
        onDismiss={() => setShowLangModal(false)}
        anchor={
          <Icon onPress={() => setShowLangModal(true)} name="arrow-drop-down" />
        }>
        {menuItems}
      </Menu>
    </Row>
  );
};

export default LangMenu;
